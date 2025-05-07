import { decorate, observable, action, computed, toJS } from 'mobx';
import { Log } from 'tools';
import { uiStore } from 'store';
import { VALIDATION_ERROR_TYPE } from '../constants';
import { coordinates2CellKey } from '../tools';

// const unhashRegex = /^x(\d+)y(\d+)z(\d+)$/gu;

class MapStore {
  // source data
  spreadSheetData = null;

  pageData = [];

  // metricId: [cell,...]
  metric2cells = {};

  // cellId: [metricId,...]
  cell2metrics = {};

  // cell-to-cell location for values
  label2Value = {};

  // plain data for all of the metrics
  plainData = {};

  // for waiting for action after
  // dropping the label
  currentDroppedItem = null;

  reportingConfig = null;

  // metric2cells object entries array that matches mappings saved in DB
  savedMappings = [];

  errorInfo = {};

  // RIGHTMOST or CLOSEST
  mode = 'CLOSEST';

  page = 0;

  reset = () => {
    Log.log('[MapStore] reset');
    this.spreadSheetData = null;
    this.pageData = [];
    this.metric2cells = {};
    this.cell2metrics = {};
    this.label2Value = {};
    this.plainData = {};
    this.savedMappings = [];
    this.currentDroppedItem = null;
    this.errorInfo = {};
  };

  setSourceData = (data, mappingData) => {
    Log.log('[MapStore] setData', data);

    this.reset();

    data.forEach((page) => {
      page.page.forEach((row) => {
        row.row.forEach((col) => {
          this.plainData[col.cellKey] = col;
        });
      });
    });

    this.spreadSheetData = data;

    this.importMapping(mappingData); // for cases when mapping loaded faster

    this.setPage(0);
  };

  setPage = (pageIndex) => {
    uiStore.addLoading('TABLE_DISPLAY');
    setTimeout(() => {
      this.pageData = this.spreadSheetData[pageIndex].page.map((row) =>
        row.row.map((cell) => cell.cellKey),
      );

      this.page = pageIndex;

      setTimeout(() => {
        uiStore.endLoading('TABLE_DISPLAY');
      }, 50);
    }, 50);
  };

  mapLabel = ({ metricId, labelCellKey, isValuesRight }) => {
    if (this.isMapped({ metricId, labelCellKey })) {
      return false;
    }
    Log.log('[MapStore] mapLabel', metricId, labelCellKey);

    this.metric2cells[metricId] = [
      ...(this.metric2cells[metricId] || []),
      labelCellKey,
    ];

    this.cell2metrics[labelCellKey] = [
      ...(this.cell2metrics[labelCellKey] || []),
      metricId,
    ];

    this.updateCell(labelCellKey, {
      isLabel: true,
      isValuesRight: isValuesRight || this.isValuesRight,
    });

    return true;
  };

  unMap = ({ metricId, labelCellKey }) => {
    Log.log('[MapStore] unMap', metricId, labelCellKey);

    // update metric2cell
    let newValue = (this.metric2cells[metricId] || []).filter(
      (itemKey) => itemKey !== labelCellKey,
    );
    if (newValue.length < 1) {
      delete this.metric2cells[metricId];
    } else {
      this.metric2cells[metricId] = newValue;
    }

    // update cell2metrics
    newValue = (this.cell2metrics[labelCellKey] || []).filter(
      (item) => item !== metricId,
    );
    if (newValue.length < 1) {
      delete this.cell2metrics[labelCellKey];
      this.updateCell(labelCellKey, { isLabel: false });
      this.updateCell(this.label2Value[labelCellKey], { isValue: false });
    } else {
      this.cell2metrics[labelCellKey] = newValue;
    }
  };

  // cet Value cell of Label cell
  setLabelValue = ({ labelCellKey, valueCellKey, isValuesRight }) => {
    Log.log('[MapStore] setLabelValue', labelCellKey, valueCellKey);
    this.updateCell(this.label2Value[labelCellKey], { isValue: false });
    this.updateCell(valueCellKey, { isValue: true });
    if (typeof isValuesRight !== 'undefined') {
      this.updateCell(labelCellKey, { isValuesRight });
    }
    this.label2Value[labelCellKey] = valueCellKey;
  };

  setCurrentDroppedItem = ({ metricId, labelCellKey }) => {
    Log.log('[MapStore] setCurrentDroppedItem', metricId, labelCellKey);
    this.currentDroppedItem = { metricId, labelCellKey };
  };

  updateCell = (cellKey, newData) => {
    this.plainData[cellKey] = { ...this.plainData[cellKey], ...newData };
  };

  // search next string in row
  // return cellKey
  findValueCell = (labelCellKey) => {
    // const valueCellKey = this.label2Value[labelCellKey];
    // if (valueCellKey) {
    //   return valueCellKey;
    // }

    const { x, y } = this.plainData[labelCellKey];
    const row = this.pageData[y];
    if (row.length === x + 1) return undefined;

    const searchFrom = row.slice(x + 1);
    if (this.mode === 'RIGHTMOST') {
      searchFrom.reverse();
    }

    return searchFrom.find(
      (item) => this.plainData[item].value.trim().length > 0,
    );
  };

  isMapped = ({ metricId, labelCellKey }) =>
    !!this.cell2metrics[labelCellKey] &&
    this.cell2metrics[labelCellKey].includes(metricId);

  setReportingConfig = (config) => {
    this.reportingConfig = config;
  };

  // import already existing Mappings
  // from back-end response
  importMapping = (mappingData) => {
    Log.log('[MapStore] importMapping', mappingData);

    (mappingData ?? []).forEach(({ cell, metric }) => {
      // import item
      const labelCellKey = coordinates2CellKey(
        cell.labelColumn,
        cell.labelRow,
        cell.labelPageNum,
      );
      const valueCellKey = coordinates2CellKey(
        cell.valueColumn,
        cell.valueRow,
        cell.valuePageNum,
      );
      const metricId = metric.id;

      // ignore extinct items
      if (!this.plainData[labelCellKey] || !this.plainData[valueCellKey])
        return;

      this.mapLabel({
        metricId,
        labelCellKey,
        isValuesRight: cell.valuesRight,
      });
      this.setLabelValue({ labelCellKey, valueCellKey });
    });

    this.savedMappings = Object.entries(this.metric2cells);
  };

  setErrorInfo = (error) => {
    const errorInfo = {};

    if (error && error.data && error.data.errorType === VALIDATION_ERROR_TYPE) {
      error.data.errorFields.forEach((field) => {
        if (field.detailedData) {
          const {
            valueColumn: col,
            valueRow: row,
            valuePageNum: page,
          } = field.detailedData;

          errorInfo[coordinates2CellKey(col, row, page)] =
            field.detailedMessage;
        }
      });
    }

    this.errorInfo = errorInfo;
  };

  clearErrorInfo = () => {
    this.errorInfo = {};
  };

  storeImports = (mappingData) => {
    // for cases when spreadsheet data loaded faster
    if (this.spreadSheetLoaded) {
      this.importMapping(mappingData);
    }
  };

  get allLabelsHasValues() {
    const labelCellKeys = Object.keys(this.cell2metrics);
    const label2Value = toJS(this.label2Value);
    return labelCellKeys.every((labelCellKey) =>
      Object.prototype.hasOwnProperty.call(label2Value, labelCellKey),
    );
  }

  get spreadSheetLoaded() {
    return this.spreadSheetData !== null;
  }

  // TODO: process isValuesRight
  prepareDataForSave = () => {
    const { companyId, year, quarter } = this.reportingConfig;
    const cells = [];

    Object.keys(this.cell2metrics).forEach((labelCellKey) => {
      this.cell2metrics[labelCellKey].forEach((metricId) => {
        const valueCellKey = this.label2Value[labelCellKey];

        const cell = {
          foundAfter: '',
          foundBefore: '',
          isNegate: false,
          isRequired: true,
          isValuesRight: this.plainData[labelCellKey].isValuesRight || false,
          labelColumn: this.plainData[labelCellKey].x,
          labelPageNum: this.plainData[labelCellKey].z,
          labelRow: this.plainData[labelCellKey].y,
          labelText: this.plainData[labelCellKey].value,
          valueColumn: this.plainData[valueCellKey].x,
          valuePageNum: this.plainData[valueCellKey].z,
          valueRow: this.plainData[valueCellKey].y,
          valueText: this.plainData[valueCellKey].value,
          metricId,
          companyId,
          year,
          quarter,
        };
        cells.push(cell);
      });
    });

    this.savedMappings = Object.entries(this.metric2cells);

    return {
      companyId,
      year,
      quarter,
      cells,
    };
  };

  setMode = (mode) => {
    if (this.mode !== mode) {
      this.mode = mode;
      return true;
    }
    return false;
  };

  get isValuesRight() {
    return this.mode === 'RIGHTMOST';
  }

  findLabelCell4ValueCell = (valueCellKey) => {
    const { column, pageNum, row } = this.plainData[valueCellKey];
    if (column < 1) {
      return null;
    }
    return `x0y${row}z${pageNum}`;
  };
}
decorate(MapStore, {
  spreadSheetData: observable,
  pageData: observable,
  metric2cells: observable,
  cell2metrics: observable,
  label2Value: observable,
  plainData: observable,
  currentDroppedItem: observable,
  setSourceData: action,
  setPage: action,
  reset: action,
  mapLabel: action,
  unMap: action,
  setLabelValue: action,
  setCurrentDroppedItem: action,
  updateCell: action,
  reportingConfig: observable,
  setReportingConfig: action,
  importMapping: action,
  allLabelsHasValues: computed,
  spreadSheetLoaded: computed,
  mode: observable,
  setMode: action,
  page: observable,
  savedMappings: observable,
  errorInfo: observable,
  setErrorInfo: action,
  clearErrorInfo: action,
  storeImports: action,
});

export const mapStore = new MapStore();
