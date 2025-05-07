import React, { useCallback, useMemo } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { reportingConfigType, reportingType } from '../types';
import styles from './Header.module.scss';

const byPeriod = (a, b) => {
  if (a.year > b.year) {
    return -1;
  }
  if (a.year < b.year) {
    return 1;
  }
  if (a.quarter > b.quarter) {
    return -1;
  }
  if (a.quarter < b.quarter) {
    return 1;
  }

  return 0;
};

export const Header = ({ reportings, onConfigChange, reportingConfig }) => {
  const setReporting = useCallback(
    (value) => {
      const index = Number(value);
      const { year, quarter } = reportings[index];
      onConfigChange({ year, quarter });
    },
    [onConfigChange, reportings],
  );

  const reportingsSorted = useMemo(() => (reportings || []).sort(byPeriod), [
    reportings,
  ]);

  const { quarter, year } = reportingConfig;
  const reportingIndex = reportingsSorted.findIndex(
    (item) => item.year === year && item.quarter === quarter,
  );

  const selectOptions = reportingsSorted.map((reporting, index) => ({
    key: `${reporting.year}_${reporting.quarter}`,
    value: index,
    label: `${reporting.name} (${reporting.year}, Q${reporting.quarter})`,
  }));

  return (
    <Row>
      <Col sm={6}>
        <Form.Group as={Row} controlId="reporting">
          <Form.Label column sm="auto">
            Reporting file:
          </Form.Label>
          <Col>
            <Select
              value={reportingIndex > -1 ? reportingIndex : undefined}
              options={selectOptions}
              onChange={setReporting}
              placeholder="Select file"
              showSearch
              className={styles.select}
            />
          </Col>
        </Form.Group>
      </Col>
    </Row>
  );
};
Header.propTypes = {
  reportings: PropTypes.arrayOf(reportingType).isRequired,
  onConfigChange: PropTypes.func.isRequired,
  reportingConfig: reportingConfigType.isRequired,
};
