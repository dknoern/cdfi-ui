const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#2084AD',
      '@grid-gutter-width': '24px',
      '@layout-body-background': '#ECF0F2',
      '@layout-header-height': '72px',
      '@layout-header-background': '#FAFAFA',
      '@layout-header-padding': '10px @grid-gutter-width',
      '@border-radius-base': '4px',
      '@font-size-lg': '@font-size-base',
      '@input-border-color': '#99AAB2',
      '@select-border-color': '#99AAB2',
      '@picker-border-color': '#99AAB2',
      '@table-header-bg': '#002b3e',
      '@table-header-color': '#fff',
      '@table-header-sort-bg': '@table-header-bg',
      '@table-padding-vertical': '21px',
      '@table-padding-horizontal': '6px',
      '@table-row-hover-bg': 'unset',
      '@table-body-sort-bg': 'unset',
      '@table-selected-row-bg': '#ffffff',
      '@table-selected-row-hover-bg': 'unset',
    },
  }),
);
