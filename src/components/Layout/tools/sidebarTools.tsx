import React from 'react';
import { ViewModeConfig, ViewMode, Portfolio, Company } from 'types';
import { suffixURLPath } from 'tools';

enum MenuItemKey {
  dashboard = 'dashboard',
  charts = 'charts',
  libraries = 'libraries',
  metrics = 'metrics',
  mapper = 'mapper',
  forecasts = 'forecasts',
  tags = 'tags',
  notifications = 'notifications',
  users = 'users',
  subscriptions = 'subscriptions',
}

type MenuItemType = {
  icon: string;
  title: React.ReactElement | string;
  path: string;
  key: MenuItemKey;
};

type PickItem = Partial<MenuItemType> & {
  key: string;
};

const allMenuItems: MenuItemType[] = [
  {
    key: MenuItemKey.dashboard,
    icon: 'dash',
    title: 'Dashboard',
    path: '/dashboard',
  },
  {
    key: MenuItemKey.charts,
    icon: 'charts',
    title: 'Tables & Charts',
    path: '/data',
  },
  {
    key: MenuItemKey.libraries,
    icon: 'file',
    title: 'Libraries',
    path: '/libraries',
  },
  {
    key: MenuItemKey.metrics,
    icon: 'list',
    title: 'Metrics',
    path: '/metrics',
  },
  {
    key: MenuItemKey.mapper,
    icon: 'link',
    title: 'Mapper',
    path: '/manage/mapper',
  },
  {
    key: MenuItemKey.forecasts,
    icon: 'grow',
    title: 'Forecasts & Targets',
    path: '/forecasts',
  },
  {
    key: MenuItemKey.tags,
    icon: 'tags',
    title: 'Tags',
    path: '/tags',
  },
  {
    key: MenuItemKey.notifications,
    icon: 'notifications',
    title: 'Notifications',
    path: '/notifications',
  },
  {
    key: MenuItemKey.users,
    icon: 'notifications',
    title: 'Users',
    path: '/users',
  },
  {
    key: MenuItemKey.subscriptions,
    icon: 'notifications',
    title: 'Subscriptions',
    path: '/subscriptions',
  },
];

const pickMenuItems = (pickItems: PickItem[]): MenuItemType[] => {
  return pickItems.map((pickItem) => {
    return {
      ...allMenuItems.find((item) => item.key === pickItem.key),
      ...pickItem,
    } as MenuItemType;
  });
};

export const makeItems = (
  viewMode: ViewMode,
  viewModeConfig: ViewModeConfig,
): MenuItemType[] => {
  switch (viewMode) {
    case 'GLOBAL':
      return pickMenuItems([
        {
          key: MenuItemKey.dashboard,
          title: (
            <>
              Global <br /> Dashboard
            </>
          ),
        },
        {
          key: MenuItemKey.libraries,
          title: 'Global Library',
        },
        {
          key: MenuItemKey.metrics,
          title: (
            <>
              Global
              <br />
              Metrics
            </>
          ),
        },
        {
          key: MenuItemKey.tags,
          title: (
            <>
              Global
              <br />
              Tags
            </>
          ),
        },
      ]);
    case 'PORTFOLIO':
      return pickMenuItems([
        {
          key: MenuItemKey.dashboard,
          path: suffixURLPath('/dashboard', viewModeConfig),
        },
        {
          key: MenuItemKey.charts,
          path: suffixURLPath('/charts', viewModeConfig),
        },
      ]);
    case 'INVESTMENT':
      return pickMenuItems([
        {
          key: MenuItemKey.dashboard,
          path: suffixURLPath('/dashboard', viewModeConfig),
        },
        {
          key: MenuItemKey.charts,
          path: suffixURLPath('/charts', viewModeConfig),
        },
        {
          key: MenuItemKey.forecasts,
          path: suffixURLPath('/forecasts', viewModeConfig),
        },
        {
          key: MenuItemKey.libraries,
          path: suffixURLPath('/libraries', viewModeConfig),
        },
        {
          key: MenuItemKey.metrics,
          path: suffixURLPath('/metrics', viewModeConfig),
        },
        {
          key: MenuItemKey.mapper,
          path: suffixURLPath('/manage/mapper', viewModeConfig),
        },
        {
          key: MenuItemKey.notifications,
          path: suffixURLPath('/notifications', viewModeConfig),
        },
      ]);
    case 'FUNDMANAGER':
      return pickMenuItems([
        {
          key: MenuItemKey.users,
          path: suffixURLPath('/users', viewModeConfig),
        },
        {
          key: MenuItemKey.subscriptions,
          path: suffixURLPath('/subscriptions', viewModeConfig),
        },
      ]);
    case 'ENTITY':
      return pickMenuItems([
        {
          key: MenuItemKey.dashboard,
          path: suffixURLPath('/dashboard', viewModeConfig),
        },
      ]);
    default:
      return [];
  }
};

export const extractMenuItemIds = (
  key: React.Key,
): {
  portfolioId: Portfolio['id'];
  companyId: Company['id'];
  entityId: Company['id'];
} | null => {
  // for case with portfolio
  const res = /^p(\d+)c(\d+)$/gi.exec(`${key}`);
  if (res) {
    return {
      portfolioId: Number(res[1]),
      companyId: Number(res[2]),
      entityId: 0,
    };
  }
  // for case with entity
  const res2 = /^e(\d+)c(\d+)$/gi.exec(`${key}`);
  if (res2) {
    return {
      portfolioId: 0,
      companyId: Number(res2[2]),
      entityId: Number(res2[1]),
    };
  }
  return null;
};
