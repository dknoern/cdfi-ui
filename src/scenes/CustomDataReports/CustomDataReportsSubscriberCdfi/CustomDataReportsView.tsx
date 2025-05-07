import { Typography } from 'antd';
import React, { FC } from 'react';
import { CustomDataReportsTable } from './CustomDataReportsTable';
import { CustomDataReport } from 'types';

const { Paragraph } = Typography;

type CustomDataReportsViewProps = {
  data: CustomDataReport[];
};

export const CustomDataReportsView: FC<CustomDataReportsViewProps> = ({
  data,
}) => {

  return (
    <>
      <CustomDataReportsTable data={data ? data : []}></CustomDataReportsTable>
      <Paragraph style={{ marginTop: 20, fontStyle: 'italic' }}>
        * For your convenience, report Expiration Date is one year from
        delivery. Aeris reserves the right to shorten this period without
        notice. Please contact Aeris Support prior to Expiration Date if you
        need an extension.
      </Paragraph>
    </>
  );
};
