export interface ManagePlatformCard {
  title: string;
  description: string;
  path: string;
  key: string;
  disabled: boolean;
}

export const managePlatformCardContents = (
  isMetricAggregationEnabled?: boolean,
): ManagePlatformCard[] => {
  return [
    {
      title: 'Document Types',
      description:
        'Create, edit, or delete types of library documents, their folders, and attributes',
      path: 'document-types',
      key: 'documentTypes',
      disabled: false,
    },
    {
      title: 'Metrics',
      description:
        'Create, edit, or delete metrics categories and global metrics',
      path: 'metrics',
      key: 'metrics',
      disabled: false,
    },
    ...(isMetricAggregationEnabled
      ? [
          {
            title: 'Metric Aggregation',
            description: 'Create or edit aggregated metrics',
            path: 'aggregated-metrics',
            key: 'aggregated-metrics',
            disabled: false,
          },
        ]
      : []),
    {
      title: 'Report Groups',
      description: 'Manage Report Groups',
      path: 'report-groups',
      key: 'reportGroups',
      disabled: false,
    },
    {
      title: 'Global List Contents',
      description: 'Create, change, or discontinue items on drop-down lists',
      path: 'global-list-contents',
      key: 'globalListContents',
      disabled: false,
    },
    {
      title: 'Graphs',
      description: 'Manage Global graphs',
      path: 'graphs',
      key: 'graphs',
      disabled: false,
    },
    {
      title: 'Tax Jurisdictions',
      description: 'Create or modify Global Tax Jurisdictions',
      path: 'tax-jurisdictions',
      key: 'taxJurisdictions',
      disabled: false,
    },
    {
      title: 'Output Maps',
      description:
        'Manage the layout and order of data points in performance maps',
      path: 'output-maps',
      key: 'outputMaps',
      disabled: false,
    },
    {
      title: 'Value Fact Executions',
      description:
        'Manually run processing on data for performance map changes to take effect',
      path: 'value-facts',
      key: 'valueFactExecutions',
      disabled: false,
    },
    {
      title: 'Tags',
      description:
        'Create, edit, or delete Tags or Tag Categories. Also where we add the Icon images',
      path: 'tags',
      key: 'tags',
      disabled: false,
    },
    {
      title: 'Libraries',
      description: 'Manage document libraries.',
      path: 'libraries',
      key: 'libraries',
      disabled: false,
    },
    {
      title: 'System Email',
      description:
        'This process flow allows the Aeris Admin user to create and manage emails sent by the system.',
      path: 'system-email',
      key: 'systemEmail',
      disabled: false,
    },
    {
      title: 'Auto-generated System Email',
      description:
        'This process flow allows the Aeris Admin user to view auto-generated emails sent by the system.',
      path: 'auto-email',
      key: 'autoSystemEmail',
      disabled: false,
    },
    {
      title: 'Peer Groups',
      description: 'Edit which Peer Groups are assigned to a CDFI',
      path: 'peer-groups',
      key: 'peerGroups',
      disabled: false,
    },
    {
      title: 'Explorer Filters',
      description: 'Edit which additional filters are visible from Explorer',
      path: 'explorer-filters',
      key: 'explorerFilters',
      disabled: false,
    },
    {
      title: 'Global Performance Metrics',
      description: 'Edit which performance metrics are visible from Explorer',
      path: 'global-performance-metrics',
      key: 'globalPerformanceMetrics',
      disabled: false,
    },
  ];
};
