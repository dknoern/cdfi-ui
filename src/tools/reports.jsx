import React from 'react';

export const makeTab = (string) => <>&nbsp;&nbsp;&nbsp;{string}</>;

// for table's Digital value
const highlightValue = (value, strong) => {
  if (value.length < 1) return value;

  let id;
  switch (value.substr(0, 1)) {
    case '[':
      // green
      id = 'green';
      break;
    case '{':
      // red
      id = 'red';
      break;
    case '~':
      // orange
      id = 'orange';
      break;
    default:
      id = 'regular';
  }
  const className = `tableDigitValue tableDigitValue--${id}`;

  let textValue = id !== 'regular' ? value.substr(1) : value;
  if (textValue.length < 1) textValue = <>&nbsp;</>;

  if (strong) {
    return <strong className={className}>{textValue}</strong>;
  }

  return <span className={className}>{textValue}</span>;
};

const applyTableTitleStyle = (children) => (
  <span className="table-cell table-cell--title">{children}</span>
);

const multiLine = (string) => {
  if (string.indexOf(' ') < 0) return string;

  const parts = string.split(' ', 2);
  return (
    <>
      {parts[0]}
      <br />
      {parts[1]}
    </>
  );
};

export const extractColumns = (response, isInput) => {
  const result = [];
  result.push({
    key: 'mapName',
    name: applyTableTitleStyle(response.outputMapName),
    plainTextName: response.outputMapName,
  });
  if (isInput) {
    ['ROOT CATEGORY', 'CATEGORY', 'TAG NAME'].forEach((item) => {
      result.push({
        key: item.split(' ')[0].toLocaleLowerCase(),
        name: applyTableTitleStyle(
          <>
            {item.split(' ').map((part) => (
              <p key={part}>{part}</p>
            ))}
          </>,
        ),
        plainTextName: item,
      });
    });
  }
  response.columns.forEach((value, index) => {
    result.push({
      key: `c${index}`,
      name: applyTableTitleStyle(multiLine(value)),
      plainTextName: value,
    });
  });

  return result;
};

const buildDataLine = (
  data,
  equationId,
  isInput,
  tag = null,
  isAdditional = false,
) => {
  const row = {};
  const nameValue = data.total || isInput ? data.name : makeTab(data.name);

  row.mapName = data.strong ? <strong>{nameValue}</strong> : nameValue;
  row.mapNamePlainText = data.name;
  row.code = data.code;
  row.metricId = data.metricId;
  row.equationId = equationId;
  row.isAdditional = isAdditional;
  row.forecastIds = [];
  row.metricType = data.type;

  data.values.forEach((value, index) => {
    const amount = typeof value === 'string' ? value : value.value;

    if (typeof value !== 'string') {
      row.forecastIds.push(value.forecastId);
    }

    if (isInput) {
      row[`c${index}`] = highlightValue(amount, data.strong);
    } else {
      row[`c${index}`] = data.strong ? <strong>{amount}</strong> : amount;
    }
  });

  if (isInput && tag) {
    row.root = tag.category.parent && tag.category.parent.name;
    row.category = tag.category.name;
    row.tag = tag.name;
  }

  return row;
};

const addDataLines = ({ rows, datas, equationId, isInput }) => {
  datas.forEach((dataLine) => {
    if (dataLine.tags && dataLine.tags.length > 0) {
      dataLine.tags.forEach((tag, idx) => {
        rows.push(buildDataLine(dataLine, equationId, isInput, tag, idx > 0));
      });
    } else {
      rows.push(buildDataLine(dataLine, equationId, isInput));
    }
  });
};

export const extractRows = (response) => {
  const rows = [];
  const isInput = response.name.toLocaleLowerCase().indexOf('input') === 0;

  response.categories.forEach((category, categoryIndex) => {
    const { subCategories, name } = category;

    if (name) {
      if (categoryIndex > 0) {
        rows.push({});
      }

      rows.push({
        mapName: <strong>{name}</strong>,
      });
    }

    if (categoryIndex > 0 && !category.name) {
      rows.push({});
    }

    addDataLines({
      rows,
      datas: category.datas,
      equationId: category.id,
      isInput,
    });

    if (subCategories) {
      subCategories.forEach((subCat) => {
        rows.push({}); // exploder line

        // subcat name on separate line
        rows.push({
          mapName: makeTab(<strong>{subCat.name}</strong>),
        });

        addDataLines({
          rows,
          datas: subCat.datas,
          equationId: subCat.id,
          isInput,
        });
      });
    }
  });

  return rows;
};
