export const UI_STORE_FLOW_NAME = 'CONTACT_SUPPORT';
export const UI_STORE_OPERATION_NAME = 'CONTACT_SUPPORT';
export const formId = 'request_support';

export const categories = {
  logged: [
    {
      label: 'Entering or modifying reported data',
      value: 'ENTER_MODIFY_REPORT_DATA',
    },
    {
      label: 'Creating or modifying a Forecast',
      value: 'CREATE_MODIFY_FORECAST',
    },
    { label: 'Creating Graphs/Tables', value: 'CREATE_MODIFY_GRAPHS_TABLES' },
    {
      label: 'Creating or modifying a Reporting Entity',
      value: 'CREATE_MODIFY_REPORTING_ENTITY',
    },
    { label: 'Help with logging into Atlas', value: 'LOGIN_HELP' },
    { label: 'Mapping data', value: 'MAPPING_DATA' },
    {
      label: 'Uploading or downloading documents',
      value: 'UPLOAD_DOWNLOAD_DOC',
    },
    { label: 'Other', value: 'OTHER' },
  ],
  notLogged: [
    { label: 'Help with logging into Atlas', value: 'LOGIN_HELP' },
    { label: 'Other', value: 'OTHER' },
  ],
};
