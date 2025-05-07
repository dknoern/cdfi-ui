import React, { ReactNode } from 'react';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { ViewMode, Company, Portfolio, FMCompany, Investment } from 'types';
import { ConditionalTooltip } from 'components';
import { isTextLong } from 'tools';
import { globalLibraryStore } from 'scenes/Library/GlobalLibrary/store';
import styles from '../parts/Header.module.scss';

type BreadcrumbItem = {
  title: string;
  onClick: () => void;
};

type TitleMakerProps = {
  pathName: string;
  viewMode: ViewMode;
  company?: Investment | null;
  portfolio: Portfolio | null;
  fundManager?: FMCompany | null;
  entity?: Company | null;
};

const titleItems: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/data': 'Data',
  '/manage': 'Manage',
  '/libraries': 'Global Libraries',
  '/metrics': 'Global Metrics',
  '/tags': 'Tag Management',
};

const titleByLocation = (pathName: string): string => {
  if (pathName === '/dashboard') return 'Home';

  const key = Object.keys(titleItems).find(
    (pathPart) => pathName.indexOf(pathPart) === 0,
  );
  if (key) return titleItems[key];

  return 'Welcome';
};

// has company -> companyName
// has portfolio -> portfolioName
// global - section name
export const makeTitle = ({
  pathName,
  viewMode,
  company,
  entity,
  portfolio,
  fundManager,
}: TitleMakerProps): ReactNode => {
  const sectionTitle = titleByLocation(pathName);
  let titleText = sectionTitle;

  // TODO: extract title markup
  switch (viewMode) {
    case 'ENTITY': {
      titleText = entity ? entity.name : sectionTitle;

      return (
        <>
          <ConditionalTooltip
            condition={isTextLong(titleText, 40)}
            tooltipTitle={titleText}
          >
            <span className={styles.titleText}>{titleText}</span>
          </ConditionalTooltip>
          <Link to={`${pathName}/edit`}>
            <Button type="link" className={styles.editBtn}>
              <EditFilled />
            </Button>
          </Link>
        </>
      );
    }

    case 'PORTFOLIO':
      if (!portfolio) return sectionTitle;

      titleText = portfolio?.name ?? sectionTitle;

      return pathName.includes('dashboard') ? (
        <>
          <ConditionalTooltip
            condition={isTextLong(titleText, 40)}
            tooltipTitle={titleText}
          >
            <span className={styles.titleText}>{titleText}</span>
          </ConditionalTooltip>
          <Link to={`${pathName}/edit`}>
            <Button type="link" className={styles.editBtn}>
              <EditFilled />
            </Button>
          </Link>
          <Link to={`${pathName}/delete`}>
            <Button type="link" className={styles.editBtn}>
              <DeleteFilled />
            </Button>
          </Link>
        </>
      ) : (
        titleText
      );

    case 'FUNDMANAGER':
      titleText = fundManager?.name ?? sectionTitle;

      return (
        <ConditionalTooltip
          condition={isTextLong(titleText, 40)}
          tooltipTitle={titleText}
        >
          <span className={styles.titleText}>{titleText}</span>
        </ConditionalTooltip>
      );

    case 'INVESTMENT':
      titleText = company?.name ?? sectionTitle;

      return (
        <ConditionalTooltip
          condition={isTextLong(titleText, 40)}
          tooltipTitle={titleText}
        >
          <span className={styles.titleText}>{titleText}</span>
        </ConditionalTooltip>
      );

    default:
      return (
        <ConditionalTooltip
          condition={isTextLong(sectionTitle, 40)}
          tooltipTitle={sectionTitle}
        >
          <span className={styles.titleText}>{sectionTitle}</span>
        </ConditionalTooltip>
      );
  }
};

const canBePortfolioLevel = (pathName: string): boolean => {
  const canBe = ['/dashboard', '/charts'];
  return !!canBe.find((item) => pathName.indexOf(item) === 0);
};

const getFolderBreadCrumbs = (
  pathName: string,
): { title: string; link: string }[] => {
  const folderId = pathName.split('/')[4];
  const libraryId = pathName.split('/')[2];
  return [
    {
      title: globalLibraryStore.getLibraryData(Number(libraryId))?.name,
      link: `/libraries/${libraryId}`,
    },
    ...(globalLibraryStore.folderBreadcrumbMap.get(Number(folderId)) ?? []).map(
      (item) => ({
        title: item.name,
        link: `/libraries/${libraryId}/folder/${folderId}`,
      }),
    ),
  ];
};

export const makeBreadcrumbs = ({
  pathName,
  viewMode,
  portfolio,
  entity,
  goToFn,
}: TitleMakerProps & { goToFn: (url: string) => void }): BreadcrumbItem[] => {
  const res = [];
  if (viewMode === 'GLOBAL') {
    if (pathName.includes('libraries/')) {
      res.push({
        title: 'Global Libraries',
        onClick: () => goToFn('/libraries'),
      });
      if (pathName.includes('folder')) {
        res.push(
          ...getFolderBreadCrumbs(pathName).map((item) => ({
            title: item.title,
            onClick: (): void => goToFn(item.link),
          })),
        );
      }
    }
  }
  if (viewMode !== 'GLOBAL') {
    res.push({ title: 'Home', onClick: () => goToFn('/dashboard') });
  }
  if (viewMode === 'INVESTMENT' && portfolio) {
    const link = canBePortfolioLevel(pathName)
      ? pathName.replace(/\/company\/(\d+)/i, '')
      : `/dashboard${portfolio ? `/portfolio/${portfolio.id}` : ''}`;
    res.push({
      title: portfolio ? portfolio.name : 'Portfolio',
      onClick: () => goToFn(link),
    });
  }
  if (viewMode === 'INVESTMENT' && entity) {
    res.push({
      title: entity ? entity.name : 'Reporting entity',
      onClick: () => goToFn(`/dashboard/entity/${entity.id}`),
    });
  }
  return res;
};
