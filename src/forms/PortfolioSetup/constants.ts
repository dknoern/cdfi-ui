import { FormData } from './types';

export const stepInfo = [
  {
    key: 'generalInfo',
    title: 'General Information',
  },
  {
    key: 'selectMetrics',
    title: 'Assign Existing Metrics',
  },
  {
    key: 'customizeMetrics',
    title: 'Create & Customize Metrics',
  },
  {
    key: 'selectCharts',
    title: 'Select Tables & Charts',
  },
  {
    key: 'review',
    title: 'Review & Finish',
  },
];

export const formInitialState: FormData = {
  name: '',
  tags: [],
  investments: [],
  charts: [],
  assignedMetrics: [],
  libraryId: 0,
};

export const formName = 'PortfolioSetup';
