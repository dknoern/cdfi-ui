import React, { FC, useCallback, useState } from 'react';
import { WithCompanyTypeProps } from './types';
import { ContentLimiter, PageSectionWrapper } from '../../../../components';
import { Table, Row, Col, Card, Button } from 'antd';
import {
  initialRatingsColumns,
  ratingsNoReleaseDateColumns,
  ratingsActionButtons,
} from './constants';
import {
  useCdfiRatingsDetails,
  useCdfiOrgDetails,
  useCompanyUsersByCompanyType,
} from '../../../../dataManagement';
import { cdfiStore, userStore } from 'store';
import { CdfiRating } from 'types/cdfiRating';
import { GRID_GUTTER } from 'constants/ui';
import { DownloadOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import {apiProcessor, sortByString} from 'tools';
import { logoCard } from './constants';
import { downloadImage } from 'dataManagement/operations/documentOperations';
import { DownloadFileNames } from 'constants/downloadFileNames';
import { EditRatingsModal } from './EditRatingsModal';
import { CreateRatingsModal } from './CreateRatingsModal';
import { useCdfiLogo } from 'tools/useCdfiLogo';
import { LogoHeader } from './LogoHeader';
import tableStyles from 'components/ManageTableStyles.module.scss';
import {CompanyType} from "../../../../types";
import {ConfirmModal} from "../SubscriberDashboard/ConfirmModal/ConfirmModal";
import {ratingStore} from "../../../../store/ratingsStore";

type CdfiRatingData = CdfiRating & {
  key: React.Key;
};

function addIdAsKey(data: CdfiRating[]): CdfiRatingData[] {
  return data.map((rating) => ({ key: rating.id, ...rating }));
}

export const RatingsDashboard: FC<WithCompanyTypeProps> = () => {
  const [ratingToEdit, setRatingToEdit] = useState<CdfiRating | null>(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [isCloseModal, setIsCloseModal] = useState<any>(false);
  const [ratingId, setRatingId] = useState(null);

  const { cdfiId: id } = cdfiStore;
  const { data: cdfiOrgDetails } = useCdfiOrgDetails(id);
  const cdfi = cdfiOrgDetails ? cdfiOrgDetails.cdfi : undefined;
  const isRated = cdfi ? cdfi.rated : false;
  const cdfiName = cdfi ? cdfi.name : '';

  const {getDeleteEmailCategory} = ratingStore;
  const { data: cdfiRatings } = useCdfiRatingsDetails(id, isCloseModal);

  const cdfiRatingsWithKeys = addIdAsKey(
    cdfiRatings ? cdfiRatings.cdfiRatingsInfo.ratings : [],
  );

  const ratedLogoEpsIdObj = cdfiRatings
    ? cdfiRatings.cdfiRatingsInfo.ratedLogoDownload
    : '';
  const handleRatedEpsLogoClick = useCallback(() => {
    downloadImage('images', ratedLogoEpsIdObj, DownloadFileNames.ratedLogo);
  }, [ratedLogoEpsIdObj]);

  const ratedLogoPngIdObj = cdfiRatings
    ? cdfiRatings.cdfiRatingsInfo.ratedLogoDownloadPng
    : '';
  const handleRatedPngLogoClick = useCallback(() => {
    downloadImage('images', ratedLogoPngIdObj, DownloadFileNames.ratedLogoPng);
  }, [ratedLogoPngIdObj]);

  const ratingLogoEpsIdObj = cdfiRatings
    ? cdfiRatings.cdfiRatingsInfo.ratingLogoDownload
    : '';
  const handleRatingEpsClick = useCallback(() => {
    downloadImage('images', ratingLogoEpsIdObj, DownloadFileNames.ratingLogo);
  }, [ratingLogoEpsIdObj]);

  const ratingLogoPngIdObj = cdfiRatings
    ? cdfiRatings.cdfiRatingsInfo.ratingLogoDownloadPng
    : '';
  const handleRatingPngClick = useCallback(() => {
    downloadImage(
      'images',
      ratingLogoPngIdObj,
      DownloadFileNames.ratingLogoPng,
    );
  }, [ratingLogoPngIdObj]);

  const ratedSinceLogoEpsIdObj = cdfiRatings
    ? cdfiRatings.cdfiRatingsInfo.ratedSinceLogoDownload
    : '';
  const handleRatedSinceEpsLogoClick = useCallback(() => {
    downloadImage(
      'images',
      ratedSinceLogoEpsIdObj,
      DownloadFileNames.ratedSinceLogo,
    );
  }, [ratedSinceLogoEpsIdObj]);

  const ratedSinceLogoPngIdObj = cdfiRatings
    ? cdfiRatings.cdfiRatingsInfo.ratedSinceLogoDownloadPng
    : '';
  const handleRatedSincePngLogoClick = useCallback(() => {
    downloadImage(
      'images',
      ratedSinceLogoPngIdObj,
      DownloadFileNames.ratedSinceLogoPng,
    );
  }, [ratedSinceLogoPngIdObj]);

  const ratedLogoJpgIdObj = cdfiRatings
    ? cdfiRatings.cdfiRatingsInfo.ratedLogo
    : '';
  const ratedLogoJpgUrl = apiProcessor.makeEndpoint(
    'images',
    ratedLogoJpgIdObj,
  );

  const ratingLogoJpgidObj = cdfiRatings
    ? cdfiRatings.cdfiRatingsInfo.ratingLogo
    : '';
  const ratingLogoJpgUrl = apiProcessor.makeEndpoint(
    'images',
    ratingLogoJpgidObj,
  );

  const ratedSinceLogoJpgIdObj = cdfiRatings
    ? cdfiRatings.cdfiRatingsInfo.ratedSinceLogo
    : '';
  const ratedSinceLogoJpgUrl = apiProcessor.makeEndpoint(
    'images',
    ratedSinceLogoJpgIdObj,
  );

  const ratingsColumns =
    userStore.isAerisAdmin || userStore.isAerisAnalyst || userStore.isStaff || userStore.isContractor
      ? initialRatingsColumns
      : ratingsNoReleaseDateColumns;

  const columnFilterLast = ratingsColumns.filter(
    (col) => col.title !== 'Financial Strength',
  );

  const setAnalystList = (record: CdfiRating) => {
    // @ts-ignore
    return record?.analysts.sort((a, b): number => sortByString(a.firstName, b.firstName)).map((item: any, index: React.Key) => (
      <p
        key={index}
        style={{whiteSpace: 'nowrap',}}
      >{item?.firstName} {item.lastName} {!item?.enabled ? '(inactive)' : ''}</p>
    ))
  }

  const columnsWithEdit = [
    ...columnFilterLast,
    {
      title: 'Financial Strength',
      dataIndex: 'financialStrength',
      sorter: (a: CdfiRating, b: CdfiRating): number =>
        ('' + a.financialStrength).localeCompare(b.financialStrength),
      render: (text: string, record: CdfiRating) => {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginRight: '.5rem',
            }}
          >
            {text ? text : <span />}
          </div>
        );
      },
    },
    {
      title: 'Analyst(s)',
      dataIndex: 'analyst',
      width: 400,
      render: (text: string, record: CdfiRating) => {
        return (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: '.5rem',
              }}
            >
              <div style={{
                paddingRight: '10px',
              }}
              >{setAnalystList(record)}</div>
              <div>
                <EditFilled
                  style={{ paddingRight: '10px', color: '#2084ad' }}
                  onClick={() => setRatingToEdit(record)}
                />
                <DeleteFilled
                  style={{ color: '#2084ad' }}
                  onClick={() => {
                    // @ts-ignore
                    setRatingId(record.id);
                    setIsCloseModal(true)
                  }
                  }
                />
              </div>
            </div>
        );
      },
    },
  ];

  const setDeleteRatingId = () => {
    getDeleteEmailCategory(ratingId).then(() => {
      setIsCloseModal(false);
    })
  }

  const logo = useCdfiLogo(id);
  const { data } = useCompanyUsersByCompanyType(CompanyType.CARS);

  return (
    <ContentLimiter>
      <PageSectionWrapper
        title={'Ratings'}
        topTitle={<LogoHeader imgPath={logo} subTitle={cdfiName} />}
        ratings
        actionButtons={
          (userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor)
            ? ratingsActionButtons(() => setOpenCreateModal(true))
            : undefined
        }
      >
        <Table
          dataSource={cdfiRatingsWithKeys}
          columns={(userStore.isAerisAdmin || userStore.isStaff) ? columnsWithEdit : ratingsColumns}
          pagination={{ showSizeChanger: true }}
          size={'small'}
          showSorterTooltip
          className={tableStyles.table}
        />
      </PageSectionWrapper>
      {(userStore.isAerisAdmin || userStore.isCdfi || userStore.isStaff || userStore.isContractor) && (
        <PageSectionWrapper title="Ratings Logos">
          {isRated && (
            <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
              <Col>
                <Card
                  style={logoCard}
                  extra={[
                    <Button
                      key="ratedLogoEsp"
                      type="link"
                      onClick={handleRatedEpsLogoClick}
                      style={{ border: 'none' }}
                      icon={<DownloadOutlined />}
                    >
                      .eps
                    </Button>,
                    <Button
                      key="ratedLogoPng"
                      type="link"
                      onClick={handleRatedPngLogoClick}
                      style={{ border: 'none' }}
                      icon={<DownloadOutlined />}
                    >
                      .png
                    </Button>,
                  ]}
                  cover={<img alt="Aeris Rated Logo" src={ratedLogoJpgUrl} />}
                ></Card>
              </Col>
              <Col>
                <Card
                  style={logoCard}
                  extra={[
                    <Button
                      key="ratingLogoEsp"
                      type="link"
                      onClick={handleRatingEpsClick}
                      style={{ border: 'none' }}
                      icon={<DownloadOutlined />}
                    >
                      .eps
                    </Button>,
                    <Button
                      key="ratingLogoPng"
                      type="link"
                      onClick={handleRatingPngClick}
                      style={{ border: 'none' }}
                      icon={<DownloadOutlined />}
                    >
                      .png
                    </Button>,
                  ]}
                  cover={<img alt="Aeris Rating Logo" src={ratingLogoJpgUrl} />}
                ></Card>
              </Col>
              <Col>
                <Card
                  style={logoCard}
                  extra={[
                    <Button
                      key="ratedSinceLogoEsp"
                      type="link"
                      onClick={handleRatedSinceEpsLogoClick}
                      style={{ border: 'none' }}
                      icon={<DownloadOutlined />}
                    >
                      .eps
                    </Button>,
                    <Button
                      key="ratedSinceLogoPng"
                      type="link"
                      onClick={handleRatedSincePngLogoClick}
                      style={{ border: 'none' }}
                      icon={<DownloadOutlined />}
                    >
                      .png
                    </Button>,
                  ]}
                  cover={
                    <img
                      alt="Aeris Rated Since Logo"
                      src={ratedSinceLogoJpgUrl}
                    />
                  }
                ></Card>
              </Col>
            </Row>
          )}
          {!isRated && (
            <h1>There are currently no logos available for download.</h1>
          )}
        </PageSectionWrapper>
      )}
      {(userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor) && (
        <>
          <EditRatingsModal
            cdfiId={id}
            cdfiName={cdfiName}
            ratingToEdit={ratingToEdit}
            setRatingToEdit={setRatingToEdit}
            analysts={data}
          />
          <CreateRatingsModal
            cdfiId={id}
            cdfiName={cdfiName}
            openCreateModal={openCreateModal}
            setOpenCreateModal={setOpenCreateModal}
            analysts={data}
          />
          <ConfirmModal
            text='Do you really want to delete this rating?'
            visible={isCloseModal}
            onClose={(): void => setIsCloseModal(false)}
            setDelete={setDeleteRatingId}
            id={34}
          />
        </>
      )}
    </ContentLimiter>
  );
};
