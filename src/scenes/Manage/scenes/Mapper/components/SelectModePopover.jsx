import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Popover } from 'react-bootstrap';

export const SelectModePopover = ({ mode, setMode }) => (
  <Popover title="Data column">
    <Form>
      <FormGroup controlId="RIGHTMOST">
        <Form.Check
          type="checkbox"
          onChange={(event) => setMode(event.target.id)}
          checked={mode === 'RIGHTMOST'}
          label="Select rightmost value"
          custom
        />
      </FormGroup>
      <Form.Group controlId="CLOSEST">
        <Form.Check
          type="checkbox"
          onChange={(event) => setMode(event.target.id)}
          checked={mode === 'CLOSEST'}
          label="Select closest value"
          custom
        />
      </Form.Group>
    </Form>
  </Popover>
);
SelectModePopover.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};
