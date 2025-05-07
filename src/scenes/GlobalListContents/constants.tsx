import { ColumnProps } from 'antd/lib/table';
import React, { ReactNode } from 'react';
import { SupportRequestSubject } from 'types';
import { Button } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { updateSupportRequestSubject } from './tools';

export interface GlobalListContentCard {
  title: string;
  description: string;
  key: string;
  disabled: boolean;
}

export const globalListContentsCardContents: GlobalListContentCard[] = [
  {
    title: 'Support Request Subjects',
    description: 'Create, edit, or delete support request subject lines.',
    key: 'supportRequestSubjects',
    disabled: false,
  },
  {
    title: 'Areas Served',
    description: 'Create, edit, or archive Areas Served list.',
    key: 'states',
    disabled: false,
  },
  {
    title: 'Impact Area',
    description: 'Create, edit, or archive Impact Area list.',
    key: 'impactAreas',
    disabled: false,
  },
  {
    title: 'Sub Impact Area',
    description: 'Create, edit, or archive Sub Impact Area list.',
    key: 'subImpactAreas',
    disabled: false,
  },
  {
    title: 'Target Beneficiary',
    description: 'Create, edit, or archive Target Beneficiary list.',
    key: 'taxBeneficiaries',
    disabled: false,
  },
  {
    title: 'Lending Type',
    description: 'Create, edit, or archive Lending Type list.',
    key: 'primaryLendingType',
    disabled: false,
  },
  {
    title: 'Organization Type',
    description: 'Create, edit, or archive Organization Type list.',
    key: 'organizationTypes',
    disabled: false,
  },
];

export const makeSupportRequestSubjectsColumns = (
  setDeleteSupportRequestSubjectId: (id: number) => void,
  setEditSupportRequestSubjectId: (id: number) => void,
  setSubjectFieldValue: (id: string) => void,
): ColumnProps<SupportRequestSubject | any>[] => {
  const onDeleteClick = (supportRequestSubjectId: number) => () => {
    setDeleteSupportRequestSubjectId(supportRequestSubjectId);
  };

  const onRestoreClick = (id: number, subject: string) => {
    const payload = { subject: subject, isEnabled: true };
    updateSupportRequestSubject(id, payload);
  };

  const onEditClick =
    (supportRequestSubjectId: number, subjectFieldValue: string) => () => {
      setEditSupportRequestSubjectId(supportRequestSubjectId);
      setSubjectFieldValue(subjectFieldValue);
    };

  return [
    {
      key: 'subject',
      dataIndex: 'subject',
      title: 'Support Request Subject',
    },
    {
      key: 'actions',
      title: '',
      dataIndex: 'actions',
      align: 'right',
      width: 100,
      render: (value, subject): ReactNode => {
        if (!subject.isEnabled) {
          return (
            <Button
              type="link"
              style={{ color: 'red' }}
              onClick={() => onRestoreClick(subject.id, subject.subject)}
            >
              Restore
            </Button>
          );
        }

        return (
          <>
            <Button
              type="link"
              onClick={onEditClick(subject.id, subject.subject)}
              name="edit"
              value={subject.id}
              icon={<EditFilled />}
              title="Edit support request subject"
            />
            <Button
              type="link"
              onClick={onDeleteClick(subject.id)}
              name="delete"
              value={subject.id}
              icon={<DeleteFilled />}
              title="Archive support request subject"
            />
          </>
        );
      },
    },
  ];
};
