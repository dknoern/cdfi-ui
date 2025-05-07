import { IdObj, APIURIname, APIURI } from 'types/utility';

export const makeEndpoint = (
  idObj: IdObj = null,
): Record<APIURIname, APIURI> => {
  return {
    library: `/api/library/${idObj?.libraryId}/structure?companyId=${idObj?.companyId}`,
    metricCategoryAll: '/api/metric-categories',
    metricCategory: `/api/metric-categories/${idObj}`,
    addMetricCategory: '/api/metric-categories',
    editMetricCategory: `/api/metric-categories`,
    disableMetricCategory: `/api/metric-categories/${idObj}`,
    metricsByCategory: `/api/metrics/metricCategory/${idObj}`,
    metrics: `/api/metrics${idObj ? `?companyId=${idObj}` : ''}`,
    breakDownsAll: '/api/metricBreakdown/all',
    metricsUpdate: `/api/metrics/update/${idObj}`,
    metricsDelete: `/api/metrics/delete/${idObj}`,
    metricsDeleteV2: `/api/metrics?ids=${idObj?.metricIds}${
      idObj?.companyId ? `&pcId=${idObj.companyId}` : ''
    }`,
    company: `/api/companies/${idObj}`,
    outputmaps: `/api/financials/${idObj}/all`,
    report: `/api/financials/${idObj?.companyId}/report/${idObj?.reportId}`,
    config: `api/configurations`,
    activity: `/api/activities?companyType=${idObj}`,
    recentActivity: `/api/cdfis/${idObj}/activities?companyType=CDFI`,
    activityDelete: `/api/activities?activityIds=${idObj}`,
    cdfis: `/api/cdfis`,
    cdfi: `/api/cdfis/${idObj}`,
    cdfiCreate: `/api/cdfis`,
    cdfiActivities: `/api/cdfis/${idObj?.cdfiId}/activities?companyType=${idObj?.companyType}`,
    cdfiRatings: `/api/cdfis/${idObj}/ratings`,
    cdfiRatingsDelete: `api/cdfis/ratings/${idObj}`,
    cdfiRatingUpdate: `/api/cdfis/${idObj?.cdfiId}/ratings/${idObj?.ratingId}`,
    cdfiRatingsCreate: `/api/cdfis/${idObj}/ratings`,
    cdfiContacts: `/api/cdfis/${idObj}/contacts`,
    cdfiContactsUpdate: `/api/cdfis/${idObj?.cdfiId}/contacts/${idObj?.userId}`,
    cdfiContactsCreate: `/api/cdfis/${idObj}/contacts`,
    getCdfiStaticData: `/api/static-data/cdfi`,
    cdfiMetricsData: `/api/metricvalues?cdfiId=${idObj?.cdfiId}&dataset=${
      idObj?.dataset
    }${
      idObj?.showAllYears !== null ? `&showAllYears=${idObj?.showAllYears}` : ''
    }`,
    cdfiMetricsExcelReport: `/api/metricvalues/export?cdfiId=${
      idObj?.cdfiId
    }&dataset=${idObj?.dataset}${
      idObj?.showAllYears !== null ? `&showAllYears=${idObj?.showAllYears}` : ''
    }`,
    lendingTypes: `/api/platform-settings/lending-types`,
    updateLendingType: `/api/platform-settings/lending-types/${idObj}`,
    targetBeneficiaries: `/api/platform-settings/target-beneficiaries`,
    updateTargetBeneficiaries: `/api/platform-settings/target-beneficiaries/${idObj}`,
    areasServed: `/api/platform-settings/areas-served`,
    updateAreasServed: `/api/platform-settings/areas-served/${idObj}`,
    subImpactAreas: `/api/platform-settings/sub-impact-areas`,
    updateSubImpactAreas: `/api/platform-settings/sub-impact-areas/${idObj}`,
    impactAreas: `/api/platform-settings/impact-areas`,
    updateImpactAreas: `/api/platform-settings/impact-areas/${idObj}`,
    organizationTypes: `/api/platform-settings/organization-types`,
    updateOrganizationTypes: `/api/platform-settings/organization-types/${idObj}`,
    actionItems: `/api/cdfis/${idObj}/action-items`,
    aerisLibrary: `/api/cdfis/${idObj}/library`,
    cdfiSubscribers: `/api/cdfis/${idObj}/subscribers`,
    analysts: `/api/cdfis/${idObj}/analysts`,
    cdfiSubscriptions: `/api/subscribers/${idObj}/cdfis`,
    images: `/images/${idObj}`,
    factSheet: `/api/cdfis/${idObj}/fact-sheet`,
    ratingsCertificate: `api/cdfis/${idObj}/rating-certificate`,
    uploadDocuments: '/api/documents',
    documentItem: `/api/documents/${idObj}`,
    document: `/api/documents/${idObj?.filename}`,
    documents: `/api/documents${
      idObj?.cdfiId !== null ? `?cdfiId=${idObj?.cdfiId}&` : '?'
    }documentIdList=${idObj?.filename}`,
    setApproveDocument: `/api/documents/${idObj}/approve`,
    cdfiSubscriptionsDownload: `api/documents/${idObj}`,
    allAnalysts: '/api/users?companyType=CARS&role=Analyst&allFields=true',
    subscribers: `/api/subscribers`,
    subscriber: `/api/subscribers/${idObj}`,
    subscriberActivities: `/api/subscribers/${idObj?.subscriberId}/activities?activityType=${idObj?.activityType}`,
    subscriberContacts: `/api/subscribers/${idObj}/contacts`,
    subscriberContactsUpdate: `/api/subscribers/${idObj?.subscriberId}/contacts/${idObj?.userId}`,
    subscriberContactsCreate: `/api/subscribers/${idObj}/contacts`,
    subscriberSubscriptions:
      `/api/subscribers/${idObj?.subscriberId}/subscriptions?pageable.pageNumber=${idObj?.pageNumber}&pageable.pageSize=${idObj?.pageSize}` +
      `${idObj?.order ? `&field=${idObj?.field}&order=${idObj?.order}` : ''}`,
    subscriberSubscription: `/api/subscribers/${idObj?.subscriberId}/subscriptions/${idObj?.subscriptionId}`,
    subscriberSubscriptionsCreate: `/api/subscribers/${idObj}/subscriptions`,
    subscriberSubscriptionsUpdate: `/api/subscribers/${idObj?.subscriberId}/subscriptions/${idObj?.subscriptionId}`,
    subscriberSubscriptionsDelete: `/api/subscribers/${idObj?.subscriberId}/subscriptions/${idObj?.subscriptionId}`,
    delegatedSubscriptions: `/api/subscribers/${idObj}/delegated-subscriptions`,
    documentTypes: `/api/cdfis/${idObj}/document-types`,
    review: `/api/cdfis/${idObj?.cdfiId}/reviews/${idObj?.reviewId}/initials`,
    notes: `/api/cdfis/${idObj?.cdfiId}/reviews/${idObj?.reviewId}/notes`,
    notesDelete: `/api/cdfis/${idObj?.cdfiId}/reviews/${idObj?.reviewId}/notes/${idObj?.noteId}`,
    impersonate: `/api/users/${idObj}/impersonate`,
    unImpersonate: `/api/users/${idObj}/unimpersonate`,
    aerisAdminUsers: `/api/users?companyType=CARS&role=ADMIN&active=true&allFields=true`,
    subscriberCdfiUsers: `/api/users?companyType=${idObj}&active=true&allFields=false`,
    customDataReportsCreate: `api/custom-reports`,
    customDataReports: `/api/custom-reports?customReportType=${idObj}`,
    customDataReport: `/api/custom-reports/${idObj}`,
    customDataReportDocument: `/api/custom-reports/${idObj}/documents`,
    customDataReportSendToClient: `/api/custom-reports/${idObj}/release`,
    customDataReportsSubscriber: `/api/subscribers/${idObj}/custom-reports`,
    customDataReportsCdfi: `/api/cdfis/${idObj}/custom-reports`,
    customDataReportsZipDocuments: `/api/custom-reports/documents?reportIdList=${idObj}`,
    systemEmails: `/api/email/system-emails?pageNumber=${
      idObj?.pageNumber
    }&pageSize=${idObj?.pageSize}${
      idObj?.order !== undefined ? `&order=${idObj?.order}` : ''
    }${idObj?.field !== undefined ? `&field=${idObj?.field}` : ''}`,
    recentActivitiesGlobal: `/api/activities_page?companyType=${idObj?.companyType}&pageNumber=${idObj?.pageNumber}&pageSize=${idObj?.pageSize}&search=${idObj?.search}`,
    activitiesSearch: `/api/activities/search?${
      idObj?.companyId !== undefined ? `companyId=${idObj?.companyId}&` : ''
    }${
      idObj?.activities !== undefined
        ? `activityTypes=${idObj?.activities}&`
        : ''
    }&pageNumber=${idObj?.pageNumber}&pageSize=${idObj?.pageSize}`,
    activityCreate: '/api/activities',
    recentDataVarianceActivities: `/api/CompanyAssignmentStatus/report/status?
      ${idObj?.isCurrentPeriod ? `isCurrentPeriod=true&` : ''}
      ${idObj?.assignedToValues ? `&personIds=${idObj?.assignedToValues}` : ''}
      ${idObj?.companyFilterValues ? `&companyIds=${idObj?.companyFilterValues}` : ''}
      ${idObj?.statusFilterValues ? `&statuses=${idObj?.statusFilterValues}` : ''}
      &pageNumber=${idObj?.pageNumber}&pageSize=${idObj?.pageSize}`,
    recentDataVarianceCdfis: `/api/CompanyAssignmentStatus/report/cdfis?
      ${idObj?.isCurrentPeriod ? `isCurrentPeriod=true&` : ''}
      ${idObj?.assignedToValues ? `&personIds=${idObj?.assignedToValues}` : ''}
      ${idObj?.statusFilterValues ? `&statuses=${idObj?.statusFilterValues}` : ''}`,
    assignUsersDataVariance: `/api/CompanyAssignmentStatus`,
    companyStatusActivityLog: `/api/activities/byTypeAndPeriod?activityTypes=TASK_ASSIGNED_CHANGE,TASK_STATUS_CHANGE,METRIC_VALUE_CHANGE_ACCEPT,VARIANCE_DETECTED,REQUIRED_METRIC_DETECTED&companyId=${idObj?.companyId}&year=${idObj?.year}&quarter=${idObj?.quarter}`,
    systemEmail: `/api/email/system-emails/${idObj}`,
    recipientsGroup: '/api/email/system-emails/recipients',
    emailCategories: '/api/email/categories',
    emailReminders: '/api/email/system-emails/reminders',
    emailTrigger: '/api/email/system-emails/triggers',
    senderEmails: '/api/email/system-emails/senders',
    emailLog: `/api/email/system-emails/logs?pageNumber=${
      idObj?.pageNumber
    }&pageSize=${idObj?.pageSize}${
      idObj?.order !== undefined ? `&order=${idObj?.order}` : ''
    }${idObj?.field !== undefined ? `&field=${idObj?.field}` : ''}${
      idObj?.dateFrom !== undefined ? `&dateFrom=${idObj?.dateFrom}` : ''
    }${idObj?.dateTo !== undefined ? `&dateTo=${idObj?.dateTo}` : ''}`,
    autoEmailLog: `/api/email/auto-generated-emails/logs?pageNumber=${
      idObj?.pageNumber
    }&pageSize=${idObj?.pageSize}${
      idObj?.order !== undefined ? `&order=${idObj?.order}` : ''
    }${idObj?.field !== undefined ? `&field=${idObj?.field}` : ''}`,
    emailLogFile: `/api/email/system-emails/log-file?fileName=${idObj?.name}`,
    autoEmailLogFile: `/api/email/auto-generated-emails/log-file?fileName=${idObj?.name}`,
    emailTemplates: '/api/email/templates',
    updateEmailCategory: `/api/email/categories/${idObj}`,
    sendTestEmail: '/api/email/system-emails/test-email',
    sendCDFIEmail: '/api/email/system-emails/cdfi-send-email',
    emailCategoriesDelete: `/api/email/categories/${idObj}`,
    systemEmailUpdate: `/api/email/system-emails/${idObj}`,
    systemEmailDelete: `/api/email/system-emails/${idObj}`,
    emailCreateSystemEmail: '/api/email/system-emails',
    emailTemplate: `/api/email/templates/${idObj}`,
    generateRecipientsList: `/api/email/system-emails/recipient-emails`,
    generateEligibleCDFIList: `/api/email/system-emails/cdfi-recipient-emails`,
    supportHistorySendEmail: `/api/support-requests`,
    supportHistory: `/api/support-requests?companyId=${idObj}`,
    platformSettings: `/api/platform-settings`,
    platformSettingsParameter: `/api/platform-settings/${idObj}`,
    supportRequestSubject: `/api/platform-settings/support-request-subjects/${idObj}`,
    companiesAll: '/api/companies',
    companyCreate: '/api/companies',
    companyCreateV2: `/api/companies/v2${idObj ? `?portfolioId=${idObj}` : ''}`,
    companyUpdateV2: `/api/companies/${idObj}/pc`,
    reportInputs: `/api/financials/${idObj}/input`,
    reportTotal: '/api/financials/aggregate',
    adjustmentAdd: '/api/adjustment/add',
    companyGraphs: `/api/financials/${idObj}/graphs`,
    metricTagCategoryAll: `/api/tag/category/all`,
    metricTagCategoryCreate: '/api/tag/category',
    metricTagCategoryUpdate: '/api/tag/category',
    metricTagCategoryDelete: `/api/tag/category/${idObj}`,
    metricTagListDefault: '/api/tag/list/default',
    metricTagListCurrent: '/api/tag/list/current',
    metricTagIconGet: `/anonymous/tag/${idObj}/logo`,
    metricTagIconUpload: `/api/tag/${idObj}/iconUpload`,
    tagCreate: '/api/tag',
    tagUpdate: '/api/tag',
    tagDelete: `/api/tag/${idObj}`,
    tagIcon: `/anonymous/tag/${idObj}/logo`,
    metricTagRelate: `/api/tag/${idObj?.tagId}/relate?type=${idObj?.type}&itemId=${idObj?.itemId}&operation=${idObj?.operation}`,
    metricTagListLinked: `/api/tag/linked?type=${idObj?.type}&itemId=${idObj?.itemId}`,
    companiesByTags: `/api/companies?tags=${idObj}`,
    listRequiredMetrics: `/api/webform/list/${idObj?.companyId}/${idObj?.year}/${idObj?.quarter}`,
    saveMetricValues: `/api/webform/save/${idObj?.companyId}/${idObj?.year}/${idObj?.quarter}`,
    dataInputFile: '/api/library/upload',
    metricReportRequest: `/api/metric/request/${idObj}`,
    metricReportRequests: '/api/metric/request/my/created',
    metricReportReportedRequests: '/api/metric/request/my/reported',
    metricReportRequestCreate: '/api/metric/request',
    metricReportRequestUpdate: `/api/metric/request/${idObj}`,
    metricReportRequestApprove: `/api/metric/request/${idObj}/approve`,
    metricReportRequestDecline: `/api/metric/request/${idObj}/decline`,
    dataInputFormInfo: `/api/library/upload/info/${idObj}`,
    financialsExportRequest: `/api/financials/export/${idObj}`,
    financialsExportCheckStatus: `/api/financials/export/get_status/${idObj}`,
    financialsExportDownload: `/api/financials/export/get_report/${idObj}`,
    listLibraries: `/api/library/my${idObj ? `?companyId=${idObj}` : ''}`,
    libCreate: '/api/library/create',
    libUpdate: '/api/library/update',
    libUpdateContent: `/api/library/${idObj}/update/content`,
    libDelete: `/api/library/${idObj}/delete`,
    libGetStructure: `/api/library/${idObj}/structure`,
    libFolderCreate: `/api/libraries/folders?libraryId=${idObj?.libraryId}&pcId=${idObj?.companyId}`,
    libFolderUpdate: `/api/library_folder/update/${idObj?.id}?${
      idObj?.companyId ? `companyId=${idObj?.companyId}&` : ''
    }libraryId=${idObj?.libraryId}`,
    libFolderRemove: `/api/library_folder/remove/${idObj?.id}?${
      idObj?.companyId ? `companyId=${idObj?.companyId}&` : ''
    }libraryId=${idObj?.libraryId}`,
    libFolderListExisting: `/api/library_folder/append?${
      idObj?.companyId ? `companyId=${idObj.companyId}&` : ''
    }libraryId=${idObj?.libraryId}`,
    libFolderAppend: `/api/library_folder/append/${idObj?.id}?${
      idObj?.companyId ? `companyId=${idObj?.companyId}&` : ''
    }libraryId=${idObj?.libraryId}`,
    listLibDocTypes: '/api/library/doc_type/all',
    libDocTypesUpdate: '/api/library/doc_type/update',
    libDocTypesDelete: `/api/library/doc_type/delete/${idObj}`,
    libDocTypesAddExisting: `/api/library/doc_type/add_existing/${
      idObj?.id
    }?folderId=${idObj?.folderId}&libraryId=${idObj?.libraryId}${
      idObj?.companyId ? `&companyId=${idObj.companyId}` : ''
    }`,
    libDocTypesCreate: `/api/library/doc_type/add_new?libraryId=${
      idObj?.libraryId
    }${idObj?.companyId ? `&companyId=${idObj.companyId}` : ''}`,
    documentDelete: `/api/library/document/${idObj}`,
    aggregatedOutputMap: `/api/financials/aggregate/all/${idObj}`,
    reportInputsTotal: '/api/financials/aggregate/input',
    financialsExportGet: `/api/financials/export/get_report/${idObj}`,
    listMetricValueChangeRequests: `/api/metric_value_change_request/list${
      idObj ? `?companyId=${idObj}` : ''
    }`,
    approveMetricValueChangeRequest: `/api/metric_value_change_request/${idObj}/approve`,
    declineMetricValueChangeRequest: `/api/metric_value_change_request/${idObj}/decline`,
    metricValueChangeRequestHistory: `/api/metric_value_change_request/history?${
      idObj?.id ? `id=${idObj.id}` : ''
    }${
      idObj?.companyId
        ? `companyId=${idObj.companyId}&metricId=${idObj.metricId}&periodEndDate=${idObj.periodEndDate}`
        : ''
    }`,
    metricRename: '/api/metrics/rename',
    metricBindings: '/api/multimetric/all',
    multiMetricBind: '/api/metrics/bind',
    notificationsList: '/api/notifications/',
    notificationsPoll: `/api/notifications/?since=${idObj}`,
    notificationsMarkRead: `/api/notifications/read?notificationIds=${idObj}`,
    notificationsConfig: `/api/notifications/config?pcId=${idObj}`,
    forecastSets: `/api/forecast_set/company/${idObj}`,
    forecastSetsCreate: '/api/forecast_set',
    forecastSetsUpdate: `/api/forecast_set/${idObj}`,
    forecastSetsDelete: `/api/forecast_set/${idObj}`,
    forecastSetPeriods: `/api/forecast_set/${idObj}/periods`,
    forecastSetData: `/api/forecast/getBySet/${idObj?.id}?${
      idObj?.mapId ? `mapId=${idObj.mapId}&` : ''
    }companyId=${idObj?.companyId}`,
    forecastCellUpdate: `/api/forecasts/cell`,
    futurePeriodCreate: `/api/period/future?setId=${idObj}`,
    forecastAppend: '/api/forecast/save',
    metricRequestHierarchies: `/api/metric/request/${idObj}/hierarchies`,
    applyMetricRequestApproveForm: `/api/metric/request/${idObj}/submit`,
    outputMapsList: '/api/outputmap/all',
    outputMapCreate: '/api/outputmap/create',
    outputMapUpdate: '/api/outputmap/update',
    outputMapDelete: `/api/outputmap/delete/${idObj}`,
    outputMapStructure: `/api/outputmap/${idObj}/structure `,
    outputMapStructureUpdate: `/api/outputmap/${idObj}/structure/update `,
    outputMapCDFIsUpdate: `/api/outputmap/${idObj}/shared_companies`,
    equationsList: `/api/equations?type=${idObj?.type}`,
    equationCreate: '/api/equations',
    equationUpdate: `/api/equations`,
    equationDelete: `/api/equations/${idObj}`,
    libContentUpdate: `/api/library/${idObj}/update/content`,
    graphsByCompany: `/api/graphs/all/${idObj}`,
    graphCreate: '/api/graphs',
    graphUpdate: `/api/graphs/${idObj}`,
    graphDelete: `/api/graphs/${idObj}`,
    graphDeleteForCompany: `/api/graphs/${idObj?.graphId}?companyToRemove=${idObj?.companyId}`,
    graph: `/api/graphs/${idObj}`,
    graphEquations: `/api/graphs/${idObj}/equations`,
    graphSorting: `/api/graphs/${idObj}/position`,
    globalGraphsAll: `/api/graph/global-graphs?pageNumber=${
      idObj?.pageNumber
    }&pageSize=${idObj?.pageSize}${
      idObj?.order !== undefined ? `&order=${idObj?.order}` : ''
    }${idObj?.field !== undefined ? `&field=${idObj?.field}` : ''}`,
    globalGraphCreate: 'api/graph/global-graphs',
    globalGraphUpdate: `/api/graph/global-graphs/${idObj}`,
    globalGraphDelete: `/api/graph/global-graphs/${idObj}`,
    globalGraph: `/api/graph/global-graphs/${idObj}`,
    getGlobalGraphTypes: `/api/graph/graph-types`,
    getGlobalUnitTypes: `/api/graph/unit-types`,
    getGlobalPeriodTypes: `/api/graph/period-types`,
    portfoliosByOwner: `/api/portfolio-group/byOwner`,
    portfolioById: `/api/portfolio-group/${idObj}`,
    portfolioCreate: '/api/portfolio-group/',
    portfolioUpdate: `/api/portfolio-group/update/${idObj}`,
    portfolioDelete: `/api/portfolio-group/${idObj}`,
    portfolioGraphs: `/api/graphs/aggregate?portfolioId=${idObj}`,
    reportInputsTotalByPortfolio: `/api/financials/aggregate/input/${idObj}`,
    reportTotalByPortfolio: `/api/financials/aggregate/all/${idObj?.portfolioId}/${idObj?.reportId}`,
    outputmapsByPortfolio: `/api/outputmap/byGroup/${idObj}`,
    subscriptionsAtlas: '/api/subscriptions',
    userUpdatePassword: `/api/users/${idObj}/password`,
    submitUsername4PasswordReset: `/api/passwordreset/initiate`,
    submitUsername4PasswordResetAdmin: `/api/passwordreset/admin-reset`,
    resetPassword: `/api/passwordreset/reset`,
    acceptTermsOfService: `/api/users/${idObj}/accept-terms`,
    map: `/api/mapper/map/${idObj?.companyId}/${idObj?.year}/${idObj?.quarter}`,
    reporting: `/api/mapper/spreadsheet/${idObj?.companyId}/${idObj?.year}/${idObj?.quarter}`,
    reportings: `/api/mapper/periods/${idObj}`,
    mapSave: `/api/mapper/map/${idObj?.companyId}/${idObj?.year}/${idObj?.quarter}`,
    requiredMetrics: `/api/metrics/${idObj?.companyId}/required`,
    myCompanyInfoForPC: '/api/portfolio/info',
    fmKpiList: '/api/kpi/fm',
    fmKpiListCompany: `/api/kpi/fm?companyId=${idObj}`,
    fmKpiListPortfolio: `/api/kpi/fm?portfolioId=${idObj}`,
    pcKpiList: '/api/kpi/pc',
    graphDataByPC: `/api/graphs/${idObj?.graphId}/data?pcId=${idObj?.companyId}`,
    graphDataByPortfolio: `/api/graphs/${idObj?.graphId}/data?portfolioId=${idObj?.portfolioId}`,
    graphExport4PC: `/api/graphs/export?pcId=${idObj?.pcId}${
      idObj?.graphId ? `&graphId=${idObj?.graphId}` : ''
    }`,
    graphExport4Portfolio: `/api/graphs/export?portfolioId=${
      idObj?.portfolioId
    }${idObj?.graphId ? `&graphId=${idObj?.graphId}` : ''}`,
    forecastExport: `/api/forecasts/export?pcId=${idObj?.pcId}${
      idObj?.setId ? `&setId=${idObj?.setId}` : ''
    }&chartType=${idObj?.chartType}`,
    graphs: `/api/graphs${idObj ? '?' : ''}${
      idObj && Object.keys(idObj).length > 0
        ? Object.keys(idObj)
            .map((key) => `${key}=${idObj[key]}`)
            .join('&')
        : ''
    }`,
    reportedData: `/api/financials/${idObj}/input/v2`,
    reportedDataWithEmpty: `/api/financials/${idObj}/input/v2?isDataInput=true`,
    exportReportedData: `/api/financials/export/${idObj}/v2`,
    metricsPreview: `/api/graph/preview/metrics`,
    graphPreviewByCompanies: `/api/graph/preview`,
    getGraphTemplate: `/api/graphs/${idObj?.templateId}/template${
      idObj?.portfolioId ? `?portfolioId=${idObj.portfolioId}` : ''
    }`,
    pcAcceptedMetrics: `/api/metric/request/accepted_metrics`,
    saveReport4period: '/api/datainput/',
    portfolioMetrics: `/api/metrics/v2?portfolioId=${idObj}`,
    assignMetricsToPC: `/api/metrics/v2/request?pcId=${idObj}`,
    updateMetricV2: `/api/metrics/v2?pcId=${idObj}`,
    updateMetricsBatch: `/api/metrics/v2/batch?pcId=${idObj}`,
    createGlobalMetric: `/api/metrics`,
    updateGlobalMetric: `/api/metrics`,
    updateGlobalMetricsBatch: `/api/metrics/v2/batch`,
    fmCompaniesList: '/api/companies/?companyType=fund_manager_company',
    usersByCompany: `/api/users?companyType=${idObj}&allFields=true`,
    usersByCompanyType: `/api/users?companyType=${idObj}&allFields=true`,
    usersByCompanyAndRoles: `/api/users?companyType=${idObj?.companyType}&role=${idObj?.role}&active=true&allFields=true`,
    userGet: `/api/users/${idObj}`,
    subscriptionsByCompany: `/api/subscriptions?fmId=${idObj}`,
    subscriptionAvailableProductsByCompany: `/api/subscribers/${idObj?.companyId}/getAvailableCounts/${idObj?.subscriptionId}`,
    subscriptionsByCurrentUser: `/api/subscribers/currentUser`,
    addToMyCloud: `/investor/${idObj?.companyId}/addToMyCloud/${idObj?.subscriptionId}`,
    fmCompany: `/api/companies/${idObj}`,
    fmCompanyCreate: '/api/companies/',
    fmCompanyUpdate: `/api/companies/${idObj}/extended`,
    fmCompanyDelete: `/api/companies/${idObj}`,
    userCreate: `/api/users`,
    userUpdate: `/api/users/${idObj}`,
    userDelete: `/api/users/${idObj}`,
    userProfileUpdate: `/api/users/${idObj}/profile`,
    subscriptionCreate: '/api/subscriptions',
    subscriptionUpdate: `/api/subscriptions/${idObj}`,
    subscriptionDelete: `/api/subscriptions/${idObj}`,
    pcCompaniesList: '/api/companies/?companyType=portfolio',
    createMetricV2: `/api/metrics/v2?pcId=${idObj}`,
    metricsByCompaniesV2: `/api/metrics/v2?pcId=${idObj}`,
    portfolioCreateV2: '/api/portfolio-group/v2',
    portfolioByIdV2: `/api/portfolio-group/v2/${idObj}`,
    updatePortfolio: `/api/portfolio-group/v2/${idObj}`,
    myFMCompanyUpdate: `/api/companies/0/basic`,
    myFMCompany: '/api/companies/0',
    globalLibraries: `/api/libraries`,
    globalLibrary: `/api/libraries/structure?libraryId=${idObj}`,
    createLibrary: `/api/libraries`,
    updateLibrary: `/api/libraries`,
    fmLibrary: `/api/libraries/structure?pcId=${idObj}`,
    pcLibrary: `/api/libraries/structure?pcId=${idObj?.companyId}${
      idObj?.libraryId ? `&libraryId=${idObj?.libraryId}` : ''
    }`,
    companiesWithoutLibrary: `/api/libraries/pcs_without_library`,
    pcFolderCreate: `/api/libraries/folders?pcId=${idObj}`,
    globalFolderCreate: `/api/libraries/folders?libraryId=${idObj}`,
    updatePCFolder: `/api/libraries/folders/${idObj?.folderId}?pcId=${idObj?.companyId}`,
    updateGlobalFolder: `/api/libraries/folders/${idObj?.folderId}?libraryId=${idObj?.libraryId}`,
    updatePCDocument: `/api/library/document/${idObj}`,
    movePCFolder: `/api/library/document/move`,
    downloadLibraryFiles: `/api/libraries/download?files=${idObj}`,
    deleteGlobalLibrary: `/api/libraries/${idObj}`,
    deleteLibraryItems: `/api/library/document?folderIds=${idObj?.folderIds}&documentIds=${idObj?.documentIds}`,
    deleteGlobalLibraryFolders: `/api/libraries/folders?ids=${idObj}`,
    forecasts: `/api/forecasts?pcId=${idObj}`,
    forecast: `/api/forecasts/${idObj}`,
    forecastPreview: `/api/forecasts/preview?pcId=${idObj?.companyId}&metricIds=${idObj?.metricIds}&periodStart=${idObj?.periodStart}&periodEnd=${idObj?.periodEnd}&timePeriod=${idObj?.frequency}`,
    forecastCreate: '/api/forecasts/',
    forecastUpdate: `/api/forecasts/${idObj}`,
    forecastDataUpdate: `/api/forecasts/${idObj}/data`,
    getMetricsAndCompaniesTags: `/api/tag/table`,
    reportingTemplateDownload: '/api/library/document/reporting_template',
    dataInputPeriodDelete: `/api/period/?year=${idObj?.year}&quarter=${
      idObj?.quarter
    }${idObj?.companyId ? `&pcId=${idObj.companyId}` : ''}`,
    companyDashboard: `/api/dashboard?pcId=${idObj}`,
    companyReportedDataTableConfig: `/api/dashboard/reporting?pcId=${idObj}`,
    portfolioDashboard: `/api/dashboard?portfolioId=${idObj}`,
    aerisGraphDashboard: `/api/graph/dashboard?cdfiId=${idObj}`,
    aerisGraphForCdfi: `/api/graph/data?graphId=${idObj?.graphId}&cdfiId=${idObj?.companyId}`,
    aerisLibraryViewers: `/api/cdfis/${idObj}/library-viewers`,
    aerisLibraryDocumentsAccess: `/api/cdfis/${
      idObj?.cdfiId
    }/library-permissions/${idObj?.companyId}${
      idObj?.selectAll !== undefined ? `?selectAll=${idObj.selectAll}` : ''
    }`,
    updateDashboardGraphCategory: `/api/dashboard/category/${idObj}`,
    termsOfUse: '/api/users/terms',
    termsOfUseMD: '/api/documents/mds/terms-md',
    termsOfUsePDF: '/api/documents/pdfs/terms-pdf',
    privacyPolicyMD: '/api/documents/mds/privacy-md',
    privacyPolicyPDF: '/api/documents/pdfs/privacy-pdf',
    countriesList: '/api/info/countries',
    reportedDataV2: `/api/data_points`,
    reportedDataV2ForCompany: `/api/data_points?pcId=${idObj}`,
    reportedDataV2ForCompanies: `/api/data_points?pcIds=${idObj}`,
    reportedDataV2GraphForCompany: `/api/data_points/graph?graphId=${
      idObj?.graphId
    }${idObj?.pcId ? `&pcId=${idObj.pcId}` : ''}`,
    reportedDataV2GraphForPortfolio: `/api/data_points/graph?graphId=${
      idObj?.graphId
    }${idObj?.portfolioId ? `&portfolioId=${idObj?.portfolioId}` : ''}`,
    graphTemplate: `/api/graphs/${idObj?.id}${
      idObj?.portfolioId ? `?portfolioId=${idObj.portfolioId}` : ''
    }`,
    contactSupportRequestLogged: '/api/support',
    contactSupportRequestNotLogged: '/api/support/noAuth',
    investmentBrowse: '/api/investments',
    investmentRead: `/api/investments/${idObj}`,
    investmentEdit: `/api/investments/`,
    investmentAdd: '/api/investments',
    investmentDelete: `/api/investments/${idObj}`,
    analyticsMetric: '/api/analytics/metric',
    analyticsCdfi: '/api/analytics/cdfi',
    analyticsActivity: '/api/analytics/activity',
    allUsers:
      `/api/users/all-users?pageNumber=${idObj?.pageNumber}&pageSize=${idObj?.pageSize}&search=${idObj?.search}` +
      `${idObj?.order ? `&field=${idObj?.field}&order=${idObj?.order}` : ''}`,
    allOrganizations:
      `/api/companies?pageNumber=${idObj?.pageNumber}&pageSize=${idObj?.pageSize}&search=${idObj?.search}` +
      `${idObj?.order ? `&field=${idObj?.field}&order=${idObj?.order}` : ''}`,
    allSubscribers:
      `/api/subscribers/subscriptions?pageNumber=${idObj?.pageNumber}&pageSize=${idObj?.pageSize}&search=${idObj?.search}` +
      `${idObj?.order ? `&field=${idObj?.field}&order=${idObj?.order}` : ''}`,
    allSubscribersExport:
      `/api/subscribers/subscriptions/export?` +
      `${idObj?.order ? `&field=${idObj?.field}&order=${idObj?.order}` : ''}`,
    taxJurisdictionAll: `/api/tax-jurisdictions?pageNumber=${
      idObj?.pageNumber
    }&pageSize=${idObj?.pageSize}${
      idObj?.order !== undefined ? `&order=${idObj?.order}` : ''
    }${idObj?.field !== undefined ? `&field=${idObj?.field}` : ''}`,
    taxJurisdictionCreate: '/api/tax-jurisdictions',
    taxJurisdictionUpdate: `/api/tax-jurisdictions/${idObj}`,
    taxJurisdictionDelete: `/api/tax-jurisdictions/${idObj}`,
    taxJurisdiction: `/api/tax-jurisdictions/${idObj}`,
    allCdfis:
      `/api/cdfis-all?pageNumber=${idObj?.pageNumber}&pageSize=${idObj?.pageSize}&search=${idObj?.search}` +
      `${idObj?.order ? `&field=${idObj?.field}&order=${idObj?.order}` : ''}`,
    /*Deprecated*/
    cdfiPeerGroups: `/api/peergroups/${idObj}`,
    updatePeerGroups: `/api/peergroups/update/${idObj}`,
    createAEPeerPortfolio: `/peergroups`,
    getPutAEPeerPortfolio: `/peergroups/${idObj}`,
    /*End Deprecated*/
    peerGroup: `/api/peergroups/${idObj}`,
    peerGroups: `/api/peergroups/list?cdfiId=${idObj?.cdfiId || ''}&companyId=${
      idObj?.companyId || ''
    }&includeGlobal=${idObj?.includeGlobal}`,
    peerGroupsWithPermissions: `/api/peergroups/listWithPermissions?cdfiId=${
      idObj?.cdfiId || ''
    }&companyId=${idObj?.companyId || ''}&includeGlobal=${
      idObj?.includeGlobal
    }`,
    deletePeerGroup: `/api/peergroups/${idObj}`,
    createPeerGroup: '/api/peergroups',
    updatePeerGroup: '/api/peergroups',
    checkPeerGroupName: '/api/peergroups/existsByName',
    refreshGlobalPeerGroups: '/api/peergroups/refreshGlobalPeerGroups',
    sdgIrisTags: `/anonymous/tag/category/all`,
    getCdfisForPeerGroupOrPortfolio: `/api/cdfis-filtered`,
    getCdfisForSelector: `/anonymous/getAllCompanies`,
    reportEquations: `/api/peergroups/report/equations`,
    ratingsReport: `/api/peergroups/${idObj}/ratings/report`,
    exportReportPage: `/export?peerGroupId=${
      idObj?.peerOrPortId
    }&showCalendarYearView=${idObj?.showCalendarYearView}&allYears=${
      idObj?.allYears
    }&showInterim=${idObj?.showInterim}&showIncomplete=${
      idObj?.showIncomplete
    }${idObj?.equationIds?.reduce(
      (pre: string, cur: number) => pre + `&equationIds[]=${cur}`,
      '',
    )}`,
    exportComparisonPage: `/export?comparisonId=${
      idObj?.peerOrPortId
    }&showCalendarYearView=${idObj?.showCalendarYearView}&allYears=${
      idObj?.allYears
    }&showInterim=${idObj?.showInterim}&showIncomplete=${
      idObj?.showIncomplete
    }${idObj?.equationIds?.reduce(
      (pre: string, cur: number) => pre + `&equationIds[]=${cur}`,
      '',
    )}&compareAggregate=${idObj?.compareAggregate}`,
    peerAnalysisReport: `/api/peergroups/${idObj?.paramId}/equation/${idObj?.eqId}/report?useCalendarYear=${idObj?.showCalendarYearView}&showAllYears=${idObj?.allYears}&showInterim=${idObj?.showInterim}&showIncompleteCurrentYear=${idObj?.showIncomplete}`,
    comparison: `/api/comparison/${idObj}`,
    comparisons: `/api/comparison/listWithPermissions?companyId=${idObj}`,
    createComparison: `/api/comparison`,
    updateComparison: `/api/comparison`,
    checkComparisonName: '/api/comparison/existsByName',
    comparisonCDFIReport: `/api/peergroups/${idObj?.paramId}/equation/${idObj?.eqId}/cdfis/report?compareToCdfis=${idObj?.compareToCdfiIds}&CalendarYear=${idObj?.showCalendarYearView}&showAllYears=${idObj?.allYears}&showInterim=${idObj?.showInterim}&showIncompleteCurrentYear=${idObj?.showIncomplete}`,
    comparisonPeerGroupReport: `/api/peergroups/${idObj?.paramId}/equation/${idObj?.eqId}/peerGroup/report?compareToPeerGroupId=${idObj?.compareToPeerGroupId}&useCalendarYear=${idObj?.showCalendarYearView}&showAllYears=${idObj?.allYears}&showInterim=${idObj?.showInterim}&showIncompleteCurrentYear=${idObj?.showIncomplete}${idObj?.compareAggregation ? `&compareAggregation=${idObj?.compareAggregation}` : ""}`,
    deleteComparison: `api/comparison/${idObj}`,
    explorerFilters: `api/explorerfilters/currentUser`,
    appConfig: `/api/configurations`,
    getManageExplorerFilters: `/api/explorerfilters/list`,
    createManageExplorerFilter: '/api/explorerfilters',
    deleteManageExplorerFilter: `/api/explorerfilters/${idObj}`,
    getManageAvailableFilters: `/api/peergroups/report/equations`,
    getGlobalCDFIMetrics: `/peergroups/${idObj?.paramId}/report/${idObj?.cdfiId}?showCalendarYearView=${idObj?.showCalendarYearView}&showIncompleteYears=${idObj?.showIncomplete}
    &showInterim=${idObj?.showInterim}&showAllYears=${idObj?.allYears}&_=1717780509507`,
  };
};

export const APIEndpoint = (entity: APIURIname, idObj: IdObj): APIURI =>
  makeEndpoint(idObj)[entity];
