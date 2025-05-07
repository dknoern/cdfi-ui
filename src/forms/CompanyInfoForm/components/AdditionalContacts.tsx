import React, { FC, ReactNode } from 'react';
import { Row, Col, Form, Button, Input } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import {
  GRID_COL_FULL_ROW_SPAN,
  FORM_ITEM_VERTICAL_LABEL_SPAN,
  GRID_GUTTER,
  GRID_COL_QUARTER_ROW_SPAN,
} from 'constants/ui';
import { userFieldsRules } from 'constants/forms';
import { FormSecondaryLabel } from 'components';
import styles from './AdditionalContact.module.scss';

const SCOPE = 'additionalContacts';

const contactFields = [
  {
    name: 'name',
    placeholder: 'Name',
    type: 'text',
    rules: userFieldsRules.name,
  },
  {
    name: 'surname',
    placeholder: 'Surname',
    type: 'text',
    rules: userFieldsRules.surname,
  },
  {
    name: 'email',
    placeholder: 'Email',
    rules: userFieldsRules.email,
    type: 'email',
  },
  {
    name: 'title',
    placeholder: 'Title',
    type: 'text',
    rules: userFieldsRules.title,
  },
];

export const AdditionalContacts: FC = () => {
  return (
    <Form.Item
      className={`${styles.formItemNoBottomMargin} ${styles.additionalContacts}`}
      label={<FormSecondaryLabel text="Additional Contacts" hint="Optional" />}
      labelCol={{ span: FORM_ITEM_VERTICAL_LABEL_SPAN }}
    >
      <Form.List name={SCOPE}>
        {(formFields, { add, remove }): ReactNode => {
          return (
            <>
              <Row gutter={[GRID_GUTTER, 0]} align="middle">
                <Col span={GRID_COL_FULL_ROW_SPAN}>
                  {formFields.map((field, idx) => (
                    <Form.Item
                      key={field.key}
                      className={styles.formItemNoBottomMargin}
                      labelCol={{ span: FORM_ITEM_VERTICAL_LABEL_SPAN }}
                      label={
                        <>
                          Contact {idx + 1}
                          <Button
                            id={`removeButton${idx + 1}`}
                            type="link"
                            size="small"
                            className={styles.removeBtn}
                            icon={
                              <CloseCircleFilled
                                className={styles.removeIcon}
                              />
                            }
                            onClick={(): void => {
                              remove(field.name);
                            }}
                          />
                        </>
                      }
                    >
                      <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
                        {contactFields.map((item) => (
                          <Col
                            span={
                              item.name === 'title'
                                ? 5
                                : GRID_COL_QUARTER_ROW_SPAN
                            }
                            key={item.name}
                          >
                            <Form.Item
                              name={[field.name, item.name]}
                              rules={item.rules}
                              className={styles.formItemNoBottomMargin}
                            >
                              <Input
                                placeholder={item.placeholder}
                                type={item.type}
                              />
                            </Form.Item>
                          </Col>
                        ))}
                      </Row>
                    </Form.Item>
                  ))}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    id="addContactButton"
                    type="link"
                    size="small"
                    onClick={add}
                  >
                    + Add Additional Contact
                  </Button>
                </Col>
              </Row>
            </>
          );
        }}
      </Form.List>
    </Form.Item>
  );
};
