import React, { ReactText } from 'react';

const text = {
  common: {
    yes: 'Yes',
    no: 'No',
    accept: 'Accept',
    reject: 'Reject',
    close: 'Close',
    download: 'Download',
  },
  portfolioCompanyCreation: {
    reportingPeriodStartHint:
      'The Reporting Period start date is the first time the Reporting Entity must submit information to Atlas',
    relevantTagsDescription:
      'These will be used to help categorize your new investment and compare them to other investments with similar tags.',
    initialNotificationsTitle: 'Initial Email Notification',
    initialNotificationsHint: (
      <>
        The initial email notification is a reminder that the Reporting Period
        start date is coming up.
        <br />
        Select a date prior the Reporting Period Start Date when the initial
        notification email should be sent. This is not the same as the starting
        date of investment entered in General Information.
      </>
    ),
    initialNotificationsMessageHint:
      'Message to send to Reporting Entity contact about the first Reporting Period due date. Click into the field to edit.',
    librarySetupTitle:
      'Set up folders in the Document Library where the Reporting Entity will upload required documents.',
    librarySetupHint:
      'Select Existing Library Structures from the dropdown or create a new set of folders here.',
    metricAssignTitle:
      'Select existing metrics from the Global or Portfolio level view ',
    metricAssignDescription:
      'New Metrics or customizations to existing metrics can be made in the next step.',
    metricCustomTitle: 'Customize selected metrics or create new metrics',
    metricCustomDescr:
      'These adjustments can include the Tags, Code, Category, Frequency etc. Skip if no changes are needed.',
    configureDataReportingTitle:
      'Configure Reporting Entity level data reports',
    configureDataReportingDescription:
      'You can select whether to show Year-to-Date or Quarter-to-Date formatted report etc.',
    notificationsSetupTitle:
      'Adjust Notification preferences for the Reporting Entity contacts and yourself',
    upcomingDueDateText: 'Remind Reporting Entity of upcoming due date.',
    upcomingDueDateHint:
      'How many days before the due date should the reminder be sent?',
    upcomingDueDateMessageHint:
      'Reminder message to be sent to Reporting Entity contact about upcoming due date.',
    pastDueMessageHint:
      'Message to be sent to Reporting Entity contact for late report.',
    notificationForYourselfHint:
      'Be notified whenever the Reporting Entity uploads a requested information. Notifications are automatically set to "On"',
    createFolderLocalTemplateDescription:
      'This Folder will be added to all Libraries using this template unless you check the box below',
    createFolderLocalTemplateTitle:
      'Change template for this Reporting Entity only',
    finalTitle: 'New Reporting Entity Successfully Created',
    finalText1: ({ name }: { name: string }): ReactText =>
      `Would you like to upload historic Metric Data for ${name} into Atlas?`,
    finalText2: ({ periodStart }: { periodStart: string }): JSX.Element => (
      <>
        This will allow you to view historic data alongside new metric data,
        once entity&apos;s Reporting Period begins (<span>{periodStart}</span>
        ). You also can complete this step later.
      </>
    ),
  },
  chartsSetup: {
    createTitle: 'Set up a New Data Table / Chart',
    editTitle: 'Update existing Data Table / Chart',
    previewPlaceholder: 'Preview New Data Table / Chart here',
    generalInfoTitleCreate: 'Describe New Data Table / Chart',
    generalInfoTitleEdit: 'Describe Data Table / Chart',
    selectMetricsTitle4Company:
      'Select metrics to be included in your Table/Chart from the list below',
    selectMetricsTitle4Portfolio:
      'Select metrics to be included in your Table/Chart from the list below',
    finalMessageCreate: 'New chart has been successfully created',
    finalMessageEdit: 'Chart has been successfully updated',
  },
  forecastsSetup: {
    generalInfoTitleCreate: 'Describe New Forecast',
    generalInfoTitleEdit: 'Describe existing Forecast',
    selectMetricsTitle:
      'Select metrics to be included in your Forecast from the list below',
    fillDataInstructions:
      'Click a reporting period to add a forecast data value. To change Actual reported data values, go to the All Reported Data table on the Company Home page.',
    forecastDataTableCellInstructions:
      'Click a reporting period to add or change a forecast data value',
    actualDataTableCellInstructions:
      'To add or change Actual reported data values, go to the All Reported Data table on the Company Home page',
  },
  portfolioCompanyData: {
    processSuccessModalTitle: 'Your File Has Been Successfully Uploaded.',
    processSuccessModalDescription:
      'Thank you for submitting the requested data.',
    processSuccessModalInstructions:
      'After your Aeris Client has accepted your data, you can view it in this page',
    processFailureModalTitle: 'Uploading Failed.',
    processFailureModalDescription:
      'Thank you for submitting the requested data. You will be notified when <Aeris Client> has successfully processed your file.',
    processFailureModalInstructions:
      'Once processed, you can view your submitted data in this page',
    fileErrorModalDescription:
      'The file you are trying to upload contains data that could not be mapped.',
    fileErrorModalInstructions:
      'Please download the file and review the highlighted data. The downloaded file will also be saved to the Upload Error Files folder in the Library.',
  },
  portfolioCompanyMetrics: {
    pendingDescription:
      'Requestor is requesting that you submit data for the following metrics. Please review and accept or reject the requested metrics. After you accept, you can either input or upload data from the Data / Documents menu.',
    metricAssignTitle:
      'Select existing metrics from the Global or Portfolio level view ',
    metricAssignToPCDescription:
      'Customize selected metrics. These adjustments can include the Frequency.',
  },
  portfolioCreation: {
    globalMetricAssignTitle:
      'Select existing metrics from the Global Metrics list',
    companyMetricAssignTitle:
      'Select existing metrics from the list of Currently Reported Metrics',
    metricAssignDescription:
      'New Metrics or customizations to existing metrics can be made in the next step',
    metricCustomTitle: 'Customize selected metrics or create new metrics',
    metricCustomDescr:
      'These adjustments can include the Frequency. Skip if no changes are needed.',
    chartTitle: 'Select existing Tables / Charts',
  },
  charts: {
    emptyData: "There's no data to display",
  },
  notifications: {
    noItems: 'Currently you have 0 notifications',
  },
  libraries: {
    emptyData: 'No libraries found',
    fiscalYearSelectTitle: 'Fiscal Year',
    fiscalYearSelectDescription: 'Select fiscal year for document',
    fiscalQuarterSelectTitle: 'Fiscal Quarter',
    fiscalQuarterSelectDescription: 'Select fiscal quarter for document',
    fileUploadGeneralText: 'Select and upload a file',
    fileUploadGeneralDescription:
      "Use either drag'n'drop or file explorer to upload a file",
    fileUploadText: 'Drop file here or click to upload',
    fileUploadHint1: 'You can upload only Microsoft Excel (xls or xlsx) file',
    fileUploadHint2: 'You can upload any files',
    viewerAccessDesc:
      'Please select a viewer to allow access to selected files',
    viewer: 'Viewer',
    documentTypeSelectTitle: 'Document Type',
    documentTypeSelectDescription: 'Select a document type for the document',
  },
  formulas: {
    createFormulaDescription:
      'Create a formula by typing out Metrics, Functions and Mathematical Notations or by selecting combinations from the lists below.',
  },
  termsOfUse: {
    titleMain: 'Terms of Service',
    titleRejection: 'Warning!',
    textRejection:
      'The Terms of Service must be accepted before you can use Atlas. Are you sure you want to reject the Terms of Service?',
  },
  privacyPolicy: {
    titleMain: 'Privacy Policy',
  },
  requestSupport: {
    modalTitle: 'Request Atlas Support',
    description: 'Describe Your problem...',
  },
  authentication: {
    changePasswordTitle: 'Enter new password',
    changePasswordDescription:
      'Enter new password below to activate your account.',
    resetPasswordTitle: 'Password reset',
    resetPasswordDescription:
      'A password reset code has been sent to your email address. Enter the reset code and a new password below to reset your old password.',
    submitEmailDescription:
      'If you would like to reset your password, enter your email address below to have a password code to.',
    submitUsernamelDescription:
      'If you would like to reset your password, enter your username below to have a password code sent to your email.',
    passwordsMatchingError: `Passwords don't match`,
  },
  functionTooltips: {
    sumUsage: 'SUM(Metric_Code1, Metric_Code2 ...)',
    sumDescription: `Returns sum of all metric's values between the parentheses`,
    countUsage: 'COUNT(Metric_Code1, Metric_Code2...)',
    countDescription:
      'Returns a number of metrics between the parentheses that have value',
    productUsage: 'PRODUCT(Metric_Code1, Metric_Code2...)',
    productDescription:
      'Returns a projection of all metric values between the parentheses',
    averageUsage: 'AVERAGE(Metric_Code1, Metric_Code2...)',
    averageDescription:
      'Returns sum of all values between the parentheses divided by their number',
    medianUsage: 'MEDIAN(Metric_Code1, Metric_Code2...)',
    medianDescription:
      'Returns the median of the metric values between the parentheses',
    minUsage: 'MIN(Metric_Code1, Metric_Code2...)',
    minDescription:
      'Returns the minimum metric value among the metrics between the parentheses',
    maxUsage: 'MAX(Metric_Code1, Metric_Code2...)',
    maxDescription:
      'Returns the maximum metric value among the metrics between the parentheses',
  },
  mapper: {
    tableSectionTitle: 'Incoming Excel Reported Data for this Reporting Entity',
    metricsSectionTitle: 'Metrics you requested from this Reporting Entity',
    leavingPagePromptMessage:
      'Are you sure you want to leave? All entered data will be lost.',
    instructionsText: `During the initial upload of data from a Reporting Entity, use the Mapper to associate metrics and data provided by that Reporting Entity to the Metric labels you use in Atlas.\n\nAfter selecting a Reporting File (below), click on a metric label in the left panel, then drag and drop it on the associated Metric in the right panel. The data in the column nearest to the Reporting Entity’s metric label (left panel) will be associated with your metric label.\n\nIf you want to associate data from the far right column in the left panel, click on the icon in the upper left corner of the left panel spreadsheet and "Select rightmost value".`,
  },
  metricForm: {
    metricNameLabel: '1. Name of new metric',
    metricNameDescription: 'A Metric is a data point tracked on an investment.',
    metricTypeLabel: '2. Metric Type',
    metricTypeDescription:
      'The Metric Type describes the kind of data that will be reported for a metric. It can be numeric or text.',
    metricCodeLabel: '3. Metric Code',
    metricCodeDescription:
      'This is a short, unique code that represents this metric. It can be used while creating Formulas, Tables, and Graphs.',

    metricAccessLabel: '4. Metric Access',
    metricAccessDescription: 'Whether metric is public or not.',
    metricReportingFrequencyLabel: '4. Reporting Frequency',
    metricReportingFrequencyDescription:
      'Enter a value for how often data should be reported for this metric. Data can be reported Quarterly or Annually.',
    metricCategoryLabel4Global: '5. Category',
    metricCategoryLabel: '5. Category',
    metricCategoryDescription:
      'This is a broad, descriptive term for a group of similar metrics.',
    metricSubcategoryLabel4Global: '6. Subcategory',
    metricSubcategoryLabel: '6. Subcategory',
    metricSubcategoryDescription:
      'This is a more targeted sub-group for a given Category. For example, the Category “Asset” could have sub-categories of “Short-Term Asset” and “Long-Term Asset”.',
    metricMaxVarianceLabel: '7. Maximum Variance (%)',
    metricMaxVarianceDescription: 'A percentage of maximum variance.',
    metricComparePreviousLabel: '8. Compare Previous',
    metricComparePreviousDescription:
      'Select which previous time frame to compare to.',
    metricVarianceIncreaseLabel: '9. Increase Quarter / Year',
    metricVarianceIncreaseDescription:
      'Check this to mark an increase of variance. Can be used with a variance of 0 for any increase amount.',
    metricTagsLabel4Global: '6. Tags',
    metricTagsLabel: '7. Tags',
    metricTagsDescription:
      'This is a term that can be used to aggregate or organize data across multiple themes.',
  },
  aggregatedMetricForm: {
    metricNameLabel: '1. Metric Name',
    metricNameDescription: 'An Aggregated Metric is a computation of several regular metrics.',
    metricDescriptionLabel: '2. Metric Description',
    metricDescriptionDescription: 'Description for the Aggregated Metric.',
    metricUnitTypeLabel: '3. Unit Type',
    metricUnitTypeDescription: 'DOLLAR | PERCENTAGE | NUMBER',
    metricIncludedMetricsLabel: '4. Included Metrics',
    metricIncludedMetricsDescription: 'A List of regular metrics included into the Aggregated Metric.',
  },
  contactSupport: {
    instructionsText:
      'Thank You! Your request has been sent to our Support team. We will contact You soon.',
    instructionsText2: 'Request ID:',
  },
  investmentSetup: {
    finalTitle: 'New Investment Successfully Created',
    finalText1: ({ name }: { name: string }): ReactText =>
      `Would you like to upload historic Metric Data for ${name} into Atlas?`,
    finalText2: ({ periodStart }: { periodStart: string }): JSX.Element => (
      <>
        This will allow you to view historic data alongside new metric data,
        once entity&apos;s Reporting Period begins (<span>{periodStart}</span>
        ). You also can complete this step later.
      </>
    ),
  },
};

export const typography = <Area extends keyof typeof text>(
  area: Area,
): typeof text[Area] => text[area];
