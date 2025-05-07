import React from 'react';
import PropTypes from 'prop-types';
import { colLetter, coordinates2CellKey } from '../tools';
import { SourceCell } from './SourceCell';

const cellRendererProps = {
  columnIndex: PropTypes.number.isRequired,
  rowIndex: PropTypes.number.isRequired,
  key: PropTypes.string.isRequired,
  style: PropTypes.instanceOf(Object).isRequired,
};

export const cellRenderer = (page, errorInfo) => ({
  columnIndex,
  key,
  rowIndex,
  style,
}) => {
  const cellKey = coordinates2CellKey(columnIndex, rowIndex, page);

  return (
    <SourceCell
      key={key}
      cellKey={cellKey}
      errorMessage={errorInfo[cellKey]}
      style={style}
    />
  );
};

export const cellRendererCols = ({ columnIndex, key, style }) => {
  return (
    <div key={key} style={style}>
      {colLetter(columnIndex)}
    </div>
  );
};
cellRendererCols.propTypes = cellRendererProps;

export const cellRendererRows = ({ key, rowIndex, style }) => {
  return (
    <div key={key} style={style}>
      {rowIndex + 1}
    </div>
  );
};
cellRendererRows.propTypes = cellRendererProps;
