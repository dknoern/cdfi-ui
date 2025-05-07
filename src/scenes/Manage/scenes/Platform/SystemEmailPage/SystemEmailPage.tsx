import React, { useEffect, useState } from 'react';
import { ContentLimiter, PageSectionWrapper } from 'components';
import { CategoriesEmail } from './CategoriesEmail';
import { Button } from 'antd';
import { systemEmailStore } from '../../../../../store';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { SystemEmailTable } from './SystemEmailTable/SystemEmailTable';
import { ConfirmModal } from './ConfirmModal/ConfirmModal';
import styles from './SystemEmailPage.module.scss';
import { Link } from 'react-router-dom';
import { EmailLogTable } from './EmailLog/EmailLogTable';
import { globalMetricsColumns } from 'scenes/Metrics/constants';

export const SystemEmailPage = observer(() => {
  const {
    systemEmails,
    isToggleCustomEmailModal,
    isDeleteSystemEmail,
    getSystemEmails,
    getEmailCategories,
    setSystemEmail,
    setIsDeleteSystemEmail,
    setPagination,
    getEmailTemplates,
    getDeleteSystemEmail,
    systemEmail,
    pagination,
    setEmailTemplate,
    setCcEmailList,
    setBccEmailList,
    setIsEditForm,
    sorter,
  } = systemEmailStore;
  const [showEmailCategoryModal, setShowEmailCategoryModal] =
    useState<any>(false);
  const [isViewEmailLog, setIsViewEmailLog] = useState<any>(false);

  useEffect(() => {
    setPagination({ current: 0, pageSize: 20 });
    getEmailCategories();
    getEmailTemplates();
  }, []);

  useEffect(() => {
    getSystemEmails(0, 20, { order: 'ascend', field: 'emailCategoryId' });
  }, [isToggleCustomEmailModal]);

  const onCreateCategoryClick = () => {
    setShowEmailCategoryModal(true);
  };

  const deleteCustomEmail = async () => {
    await getDeleteSystemEmail(systemEmail?.id);
    setTimeout(await getSystemEmails(0, pagination.pageSize, sorter), 0);
    setIsDeleteSystemEmail(false);
  };

  const newCustomEmail = () => {
    setSystemEmail(null);
    setEmailTemplate(null);
    setCcEmailList([]);
    setBccEmailList([]);
    setIsEditForm(false);
  };

  const onViewEmailLogClick = () => {
    setIsViewEmailLog(!isViewEmailLog);
  };

  return (
    <>
      <div>
        <ContentLimiter>
          <PageSectionWrapper
            title={!isViewEmailLog ? 'Manage System Email' : 'Email Log'}
          >
            <div className={styles.wrapperButtons}>
              <Button
                id="createRatingButton"
                onClick={onCreateCategoryClick}
                type="primary"
              >
                Show Categories
              </Button>
              <Link to={'/custom-email'}>
                <Button type="primary" onClick={newCustomEmail}>
                  Create New Custom Email
                </Button>
              </Link>
              <Button
                id="viewEmailLog"
                onClick={onViewEmailLogClick}
                type="primary"
              >
                {!isViewEmailLog
                  ? 'View Email Log'
                  : 'View Manage System Email'}
              </Button>
            </div>
            <CategoriesEmail
              visible={showEmailCategoryModal}
              onClose={(): void => setShowEmailCategoryModal(false)}
            />
            {toJS(systemEmails) !== null && !isViewEmailLog ? (
              <SystemEmailTable
                id="globalSystemEmailTable"
                layout="fixed"
                dataSource={toJS(systemEmails.content)}
                columnNamesList={globalMetricsColumns}
                scroll={{ y: 500 }}
              />
            ) : (
              <EmailLogTable />
            )}
            <ConfirmModal
              visible={isDeleteSystemEmail}
              onClose={(): void => setIsDeleteSystemEmail(false)}
              onClick={deleteCustomEmail}
              text="Do you really want to delete this custom Email?"
              buttonText="Delete"
            />
          </PageSectionWrapper>
        </ContentLimiter>
      </div>
    </>
  );
});
