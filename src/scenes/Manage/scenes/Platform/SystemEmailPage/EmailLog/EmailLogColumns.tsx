import React, {ReactNode} from "react";
import { EyeFilled } from "@ant-design/icons";
import {Button} from "antd";
import {systemEmailStore} from "../../../../../../store";
import { formatInTimeZone } from 'date-fns-tz';
import styles from "./EmailLog.module.scss";


export const emailLogColumns = [
  {
    key: 'dateSent',
    title: 'Date Sent',
    dataIndex: 'dateSent',
    fixed: true,
    width: 200,
    sorter: true,
    render: (value: string, record: any ): ReactNode => {
      return formatInTimeZone(`${record.dateSent}Z`, 'America/New_York', 'Pp z')
    },
    defaultSortOrder: 'ascend',
  },
  {
    key: 'id',
    title: 'Email ID',
    dataIndex: 'code',
    render: (value: string, record: any): ReactNode => (
      record.emailDetails.code
    ),
    fixed: true,
    width: 200,
  },
  {
    key: 'recipientList',
    title: 'Recipient List',
    dataIndex: 'recipientList',
    render: (value: string, record: any): ReactNode => {
      const {getEmailLogFile, setLoadingEmailLogFile} = systemEmailStore;

     return (
       <p onClick={() => {
         setLoadingEmailLogFile(true)
         getEmailLogFile(record.recipientList).then(() => {
           setLoadingEmailLogFile(false)
         })
       }}
       style={{cursor: 'pointer'}}
          className={styles.nameFile}
       >{record.recipientList}</p>
     )
    },
    fixed: true,
    width: 200,
  },
  {
    key: 'actions',
    title: 'Actions',
    dataIndex: 'actions',
    fixed: false,
    width: 50,
    render: (value: string, record: any) : ReactNode => {
      const {setIsViewEmailDetails, setEmailLogDetails} = systemEmailStore;

      return (
        <Button
          onClick={() => {
            setIsViewEmailDetails(true);
            setEmailLogDetails(record.emailDetails);
          }}
          type="link"
          icon={<EyeFilled />}
        />
      );
    }
  },
]
