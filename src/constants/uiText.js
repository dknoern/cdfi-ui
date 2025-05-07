export const uiText = (field, operation, params) =>
  ({
    general: {
      dataLoading: 'Loading data...',
      dataLoadingError:
        'Something went wrong during data loading. Please try again later.',
      noItemsToShow: 'No items to show',
      batchDeleteConfirm: 'Do you really want to delete selected items?',
    },
    activities: {
      loadError: 'An error occurred during loading activities.',
      deleteOk: 'Activities were deleted.',
      deleteError: 'An error occurred deleting activities.',
    },
    associations: {
      created: 'Request created',
      updated: 'Request updated',
      notCreated:
        'An error occurred during creating the request. Please, try again later',
      notUpdated:
        'An error occurred during updating the request. Please, try again later',
      hasWithhold:
        'Your request contains metrics set to "not required". These kinds of request are forbidden.',
    },
    cdfis: {
      loadError: 'An error occurred while loading CDFIs.',
      createError: 'An error occurred while creating the CDFI.',
      updateError: 'An error occurred while updating the CDFI.',
      updateOk: 'The CDFI was successfully updated.',
      createOk: 'The CDFI was successfully created',
      deleteError: 'An error occurred while deleting the CDFI.',
      deleteOk: 'The CDFI was successfully deleted.',
    },
    cdfiActivities: {
      loadError: 'An error occurred while loading activities.',
    },
    cdfiContacts: {
      loadError: 'An error occurred while loading the CDFI contacts.',
      updateOk: 'The CDFI contact was successfully updated.',
      updateError: 'An error occurred while updating the CDFI contact.',
      createError: 'An error occurred while creating the CDFI contact.',
      createOk: 'The CDFI contact was successfully created.',
    },
    subscriberContacts: {
      loadError: 'An error occurred while loading the subscriber contacts.',
      updateOk: 'The subscriber contact was successfully updated.',
      updateError: 'An error occurred while updating the subscriber contact.',
      createError: 'An error occurred while creating the subscriber contact.',
      createOk: 'The subscriber contact was successfully created.',
    },
    allAnalysts: {
      loadError: 'An error occurred while loading analysts.',
    },
    updateAllAnalysts: {
      loadError: 'An error occurred while loading analysts.',
      updateError: 'An error occurred while updating the analysts.',
      updateOk: 'The analyst(s) were successfully updated.',
    },
    actionItems: {
      loadError: 'An error occurred while loading action items.',
    },
    rating: {
      loadError: 'An error occurred while loading CDFI rating.',
    },
    cdfiSubscribers: {
      loadError: "An error occurred while loading the CDFI's subscribers.",
    },
    subscribers: {
      downloadOk: 'Download finished successfully.',
      downloadError: 'An error occurred while downloading subscribers.',
      loadError: 'An error occurred while loading subscribers.',
      updateOk: 'The subscriber was successfully updated.',
      updateError: 'An error occurred while updating the subscriber.',
      createError: 'An error occurred while creating the subscriber.',
      createOk: 'The subscriber was successfully created.',
      deleteError: 'An error occurred while deleting the subscriber.',
      deleteOk: 'The subscriber was successfully deleted.',
    },
    subscriberActivities: {
      loadError: 'An error occurred while loading the recent activities.',
    },
    cdfiSubscriptionsDownload: {
      downloadError: 'An error occurred while downloading the document.',
      downloadOk: 'The document was successfully downloaded.',
    },
    cdfiOrgDetails: {
      loadError:
        "An error occurred while loading the CDFI's organization details.",
    },
    subscriberOrgDetails: {
      loadError:
        "An error occurred while loading the subscriber's organization details.",
    },
    subscriberSubscriptions: {
      loadError:
        "An error occurred while loading the subscriber's subscriptions.",
      createError: 'An error occurred while creating the subscription.',
      createOk: 'The subscription was successfully created.',
      updateError: 'An error occurred while updating the subscription.',
      updateOk: 'The subscription was successfully updated.',
      deleteError: 'An error occurred while deleting the subscription.',
      deleteOk: 'The subscription was successfully deleted.',
    },
    delegatedSubscriptions: {
      loadError:
        'An error occurred while loading the accesses granted by CDFIs.',
    },
    cdfiRatings: {
      loadError: 'An error occurred while loading the ratings.',
      updateError: 'An error occurred while updating the rating.',
      updateOk: 'The rating was successfully updated.',
      createError: 'An error occurred while adding a new rating.',
      createOk: 'The new rating was successfully added.',
      deleteOk: 'The rating was successfully deleted.',
      deleteError: 'An error occurred while deleting the rating data.',
    },
    cdfiSubscriptions: {
      loadError: 'An error occurred while loading the CDFI subscriptions.',
    },
    libraryError: {
      loadError: 'An error occurred while loading the library.',
    },
    impersonateUser: {
      impersonateUserError: 'An error occurred while impersonating the user.',
      unImpersonateUserError:
        'An error occurred while un-impersonating the user.',
    },
    customDataReport: {
      createOk: 'The custom data report was successfully created.',
      createError: 'An error occurred while creating the custom data report.',
      loadError: 'An error occurred while loading the custom data reports.',
      deleteError: 'An error occurred while deleting the custom data report.',
      deleteOk: 'The custom data report was successfully deleted.',
      updateOk: 'The custom data report was successfully updated.',
      updateError: 'An error occurred while updating the custom data report.',
      uploadOk: 'The custom data report was successfully uploaded.',
      uploadError: 'An error occurred while uploading the custom data report.',
      downloadOk: 'The custom data report was successfully downloaded.',
      downloadError:
        'An error occurred while downloading the custom data report.',
      sendToClientOk:
        'The custom data report was successfully sent to the client.',
      sendToClientError:
        'An error occurred while sending the custom data report to the client.',
    },
    supportHistory: {
      sendEmailOk: 'The email was successfully sent.',
      sendEmailError: 'An error occurred while sending the email.',
      loadError: 'An error occurred while loading the support history.',
    },
    supportRequestSubject: {
      createOk: 'The support request subject was successfully created.',
      createError:
        'An error occurred while creating the support request subject.',
      deleteError:
        'An error occurred while deleting the support request subject.',
      deleteOk: 'The support request subject was successfully deleted.',
      updateOk: 'The support request subject successfully updated.',
      updateError:
        'An error occurred while updating the support request subject.',
    },
    lendingType: {
      createOk: 'The lending type was successfully created.',
      createError: 'An error occurred while creating the lending type.',
      updateOk: 'The lending type successfully updated.',
      updateError: 'An error occurred while updating the lending type.',
    },
    targetBeneficiaries: {
      createOk: 'The target beneficiary was successfully created.',
      createError: 'An error occurred while creating the target beneficiary.',
      updateOk: 'The target beneficiary successfully updated.',
      updateError: 'An error occurred while updating the target beneficiary.',
    },
    areasServed: {
      createOk: 'The area served was successfully created.',
      createError: 'An error occurred while creating the area served.',
      updateOk: 'The area served successfully updated.',
      updateError: 'An error occurred while updating the area served.',
    },
    impactArea: {
      createOk: 'The impact area was successfully created.',
      createError: 'An error occurred while creating the impact area.',
      updateOk: 'The impact area successfully updated.',
      updateError: 'An error occurred while updating the impact area.',
    },
    subImpactArea: {
      createOk: 'The sub impact area was successfully created.',
      createError: 'An error occurred while creating the sub impact area.',
      updateOk: 'The sub impact area successfully updated.',
      updateError: 'An error occurred while updating the sub impact area.',
    },
    organizationType: {
      createOk: 'The organization type was successfully created.',
      createError: 'An error occurred while creating the organization type.',
      updateOk: 'The organization type successfully updated.',
      updateError: 'An error occurred while updating the organization type.',
    },
    multiMetric: {
      bindOk: 'Metrics have been bound',
      bindError:
        'An error occurred during binding the metric. Please, try again later',
    },
    documentTypes: {
      loadError: 'An error occurred while loading the document types.',
    },
    activeUsers: {
      loadError: 'An error occurred while loading the active users.',
    },
    notifications: {
      loadFailed: "Can't load notifications. Please, try again later.",
      loadError: 'An error occurred during loading notifications.',
      hideError: 'An error occurred during hiding notifications.',
      pollingError: 'An error occurred during notifications polling.',
    },
    notificationsConfig: {
      updateOk: `Notifications' configuration has been updated successfully.`,
      updateError: `An error occurred during updating notifications' configuration.`,
      loadError: `An error occurred during loading notifications' configuration.`,
    },
    access: {
      forbidden: 'Access forbidden.',
    },
    kpi: {
      loadFailed: 'An error occurred during loading stats.',
    },
    graphs: {
      loadError: 'An error occurred during loading graphs.',
      noData: 'No data fetched.',
      createOk: 'Graph was created successfully.',
      createError: 'An error occurred during creating graph.',
      updateOk: 'Graph was updated successfully.',
      updateError: 'An error occurred during updating graph.',
      deleteOk: 'Graph was deleted successfully.',
      deleteForCompanyOk: 'Graph was deleted for current company successfully.',
      deleteError: 'An error occurred during deleting graph.',
      equationsUpdateOk: "Graph's formulas have been updated successfully.",
      equationsUpdateError:
        "An error occurred during updating the graph's equations.",
      positionsUpdateOk: 'Graphs positions have been updated successfully.',
      positionsUpdateError:
        'An error occurred during updating the graphs positions.',
      templateLoadErr: 'An error occurred during loading the template',
      templateApplyError:
        'Something went wrong after template loading. Please fill the values manually.',
      metricsUnsafe:
        "Current chart contain metrics which currently are not available. They won't be shown during chart edit process",
    },
    directEntry: {
      loadError: 'An error occurred during loading required metrics.',
      saveOk: 'Values saved.',
      saveError:
        'An error occurred during saving data. Please, try again later.',
    },
    directEntryUpload: {
      uploadOk: 'File uploaded.',
      uploadError:
        'An error occurred during uploading file. Please, try again later.',
    },
    library: {
      createOk: 'Library was created successfully.',
      createError: 'An error occurred during creating library.',
      updateOk: 'Library was updated successfully.',
      updateError: 'An error occurred during updating library.',
      deleteOk: 'Library was deleted successfully.',
      deleteError: 'An error occurred during deleting library.',
      loadError: 'An error occurred during loading libraries.',
      loadDataError: 'An error occurred during loading library data.',
      documentMoveOk: 'Documents were moved successfully.',
      documentMoveError: 'An error occurred during moving documents.',
      documentUpdateOk: 'Document was updated successfully.',
      documentUpdateError: 'An error occurred during updating document.',
      documentDownloadOk: 'Documents were downloaded successfully.',
      documentDownloadError: 'An error occurred during downloading documents.',
      documentDeleteOk: 'Document deleted.',
      documentDeleteError:
        'An error occurred during deleting document. Please, try again later.',
      loadPcError: 'An error occurred during loading Reporting Entities.',
      loadDocTypesError: 'An error occurred during loading document types.',
      addDocTypeOk: 'Document type was added successfully.',
      addDocTypeError: 'An error occurred during adding document type.',
      updateDocTypeOk: 'Document type was updated successfully.',
      updateDocTypeError: 'An error occurred during updating document type.',
      createDocTypeOk: 'Document type was created successfully.',
      createDocTypeError: 'An error occurred during creating document type.',
      deleteDocTypeOk: 'Document type was deleted successfully.',
      deleteDocTypeError: 'An error occurred during deleting document type.',
      folderAddOk: 'Folder was added successfully.',
      folderAddError: 'An error occurred during adding folder.',
      folderCreateOk: 'Folder was created successfully.',
      folderCreateError: 'An error occurred during creating folder.',
      folderEditOk: 'Folder was updated successfully.',
      folderEditError: 'An error occurred during updating folder.',
      folderDeleteOk: 'Folder was deleted successfully.',
      folderDeleteError: 'An error occurred during deleting folder.',
      itemsDeleteOk: 'Items were deleted successfully.',
      itemsDeleteError: 'An error occurred during deleting items.',
      documentsPermissionsOk: 'Permissions were granted successfully.',
      documentsPermissionsError:
        'An error occurred during granting permissions.',
      affirmAsCurrentOk: 'You have successfully affirmed as current.',
      affirmAsCurrentError: 'There was an error affirming as current.',
      addNoteOk: 'The note was successfully added.',
      addNoteError: 'An error occurred while adding the note.',
      deleteNoteOk: 'The note was successfully deleted.',
      deleteNoteError: 'An error occurred while deleting the note.',
      updateDocApprovalStatusOk: 'Approval status successfully updated.',
      updateDocApprovalStatusError:
        'An error occurred while updating approval status',
    },
    ratingCertificate: {
      downloadOk: 'The document was successfully downloaded.',
      downloadError: 'No Aeris® Rating Certificate available for this CDFI.',
    },
    perfMaps: {
      reportsLoadingError: 'An error occurred during loading reports.',
      requestsLoadingError:
        'An error occurred during loading pending requests.',
      reportLoadingError: 'An error occurred during loading report.',
      noData: 'This report has no data.',
      historyLoadingError:
        'An error occurred during loading history of changes.',
      requestActionError:
        'An error occurred during performing an action on request.',
      inputSaveOk: 'Input data was saved successfully.',
      inputSaveError: 'An error occurred while saving input data.',
      renameMetricOk: `Metric ${
        params && params.currentName
      } has been successfully renamed to ${params && params.name}.`,
      renameMetricError: 'An error occurred during renaming metric.',
      exportError: 'An error occurred during exporting financials.',
    },
    login: {
      error: `Login failed. ${params}`,
    },
    tags: {
      createOk: 'Tag was created successfully.',
      createError: 'An error occurred during creating tag.',
      updateOk: 'Tag was updated successfully.',
      updateError: 'An error occurred during updating tag.',
      deleteOk: 'Tag was deleted successfully.',
      deleteError: 'An error occurred during deleting tag.',
      loadError: 'An error occurred during loading tags.',
      linkOk: 'Tag was linked successfully.',
      unlinkOk: 'Tag was unlinked successfully.',
      linkError: 'An error occurred during linking tag.',
      unlinkError: 'An error occurred during unlinking tag.',
      iconUploadOk: 'Icon was uploaded successfully',
      iconUploadError: 'An error occurred during uploading an icon.',
    },
    tagCategories: {
      createOk: 'New category was created successfully.',
      createError: 'An error occurred during creating new category.',
      updateOk: 'Category was updated successfully.',
      updateError: 'An error occurred during updating category.',
      deleteOk: 'Category was deleted successfully.',
      deleteError: 'An error occurred during deleting category.',
    },
    reportingEntities: {
      loadError: 'An error occurred during loading Reporting Entities.',
      loadPCsError: 'An error occurred during loading Reporting Entities.',
      noCompanies: 'Currently, you have no Reporting Entities available',
      createOk: 'The Reporting Entity was successfully created',
      createError: 'An error occurred during creation the Reporting Entity',
      oneLoadError: 'An error occurred during loading the Reporting Entity',
      updateError: 'An error occurred during updating the Reporting Entity',
      updateOk: 'The Reporting Entity was successfully updated',
      deleteOk: 'The Reporting Entity was successfully deleted',
      infoLoadError:
        'An error occurred during loading the Reporting Entity info',
      totalInvestmentIsInvalid: 'Value must not be greater than 100 billion',
    },
    clients: {
      loadError: 'An error occurred during loading Aeris Clients.',
      loadPCsError: 'An error occurred during loading Aeris Clients.',
      noCompanies: 'Currently, you have no Aeris Clients available',
      createOk: 'New Aeris Client was successfully created',
      createError: 'An error occurred during creation the Aeris Client',
      oneLoadError: 'An error occurred during loading the Aeris Client',
      updateError: 'An error occurred during updating the Aeris Client',
      updateOk: 'The Aeris Client was successfully updated',
      deleteOk: 'The Aeris Client was successfully deleted',
      infoLoadError: 'An error occurred during loading the Aeris Client info',
      totalInvestmentIsInvalid: 'Value must not be greater than 100 billion',
    },
    metrics: {
      loadError: 'An error occurred during loading metrics.',
      categoryLoadError: 'An error occurred during loading metric categories.',
      categoriesLoadError: 'An error occurred during loading metric categories',
      accountCodeIncorrect: 'Account code is incorrect.',
      saveOk: 'Data saved successfully.',
      saveError: 'An error occurred during saving data.',
      categoryDeleteOk: 'Metric category was deleted successfully.',
      categoryDeleteError: 'An error occurred during deleting metric category.',
      categoryCreateOk: 'New category was created successfully.',
      categoryCreateError: 'An error occurred during creating new category.',
      categoryUpdateOk: 'New category was updated successfully.',
      categoryUpdateError: 'An error occurred during updating new category.',
      noCategories: 'No metric categories defined. Please, define them first.',
      createError: 'An error occurred during creating metric.',
      updateError: 'An error occurred during updating metric.',
      deleteError: 'An error occurred during deleting metric.',
      deleteErrorBatch: 'An error occurred during deleting metrics',
      categoryEditEmptyFields: 'All fields are required',
      valueIsInvalid:
        'Value must not be empty and can only contain digits (0-9), minus sign (-) and single dot (.) to mark fractional numbers. Maximum length is 15 symbols.',
      createOk: 'The metric has been successfully created',
      updateOk: 'The metric has been successfully updated',
      deleteOk: 'The metric has been successfully deleted',
      deleteOkBatch: 'The metrics have been successfully deleted',
      assignOk: 'The metrics have been successfully assigned to company',
      assignError: 'An error occurred during assigning metrics',
      batchDeleteConfirm: 'Do you really want to delete selected metrics?',
      batchStopRequestingConfirm:
        'Do you really want to stop requesting selected metrics?',
      updateFrequencyBtnText: 'Edit Reporting Frequency',
      batchResumeRequesting: 'Resume requesting',
      updateFrequency: 'Update Reporting Frequency for selected metrics:',
      setFrequency: 'Set Reporting Frequency for selected metrics:',
    },
    metricValues: {
      downloadOk: 'Download finished successfully.',
      downloadError: 'An error occurred while downloading metric values.',
    },
    reportRequest: {
      loadSingleError: 'An error occurred while loading metric report request.',
      loadMultiError: 'An error occurred while loading metric report requests.',
      approveOk: 'Metrics report request was approved.',
      approveError:
        'An error occurred during approving metrics report request.',
      declineOk: 'Metrics report request was declined.',
      declineError:
        'An error occurred during declining metrics report request.',
      actionError:
        'An error occurred during performing action on metrics report request',
    },
    outputMaps: {
      loadError: 'An error occurred during loading output maps.',
      createOk: 'The output map had successfully created',
      createError: 'An error occurred during creation the output map',
      updateOk: 'The output map had successfully updated',
      updateError: 'An error occurred during updating the output map',
      deleteOk: 'The output map had successfully deleted',
      deleteError: 'An error occurred during deleting the output map',
      structureUpdateOk: 'The output map structure had successfully updated',
      structureUpdateError:
        'An error occurred during updating the output map structure',
      structureLoadError:
        'An error occurred during loading the output map structure',
      confirmCategoryDelete: 'Are you sure to delete this category?',
      confirmWithEmptyCategories:
        'Given structure contains categories without equations. Only non-empty categories will be saved. Continue?',
      cdfisUpdateOk: "Graph's companies list updated",
      cdfisUpdateError: 'An error occurred during updating the companies list',
      rootEquationsFound:
        'There are equations out of categories. Saving that structure is not allowed.',
    },
    reports: {
      loadError: 'An error occurred during loading report.',
      noData: 'No data was fetched.',
    },
    forecasts: {
      forecastsLoadError: 'An error occurred during loading forecasts.',
      forecastsDeleteOk: 'Forecast set was deleted successfully.',
      forecastsDeleteError: 'An error occurred during deleting forecast set.',
      forecastsCreateOk: 'Forecast set was created successfully.',
      forecastsCreateError:
        'An error occurred during creation of forecast set.',
      forecastsUpdateOk: 'Forecast set was updated successfully.',
      forecastsUpdateError: 'An error occurred during updating forecast set.',
      forecastDataLoadError:
        'An error occurred during loading forecast set data.',
      forecastDataAddOk: 'Forecast data was added successfully.',
      forecastDataAddError: 'An error occurred during adding forecast data.',
      periodsLoadError:
        'An error occurred during loading forecast set periods.',
      forecastDataUpdateOk: 'Forecast data was updated successfully.',
      forecastDataUpdateError:
        'An error occurred during updating forecast data.',
      beginningYearIsInvalid: 'Value must be less than or equal to Ending year',
      endingYearIsInvalid:
        'Value must be greater than or equal to Beginning year',
      beginningQuarterIsInvalid:
        'Value must be less than or equal to Ending quarter',
      endingQuarterIsInvalid:
        'Value must be greater than or equal to Beginning quarter',
      noItemsToSort: 'There are no items to sort',
      noDataItems:
        "This forecast doesn't contain any metric or equation and can not be displayed. Please edit the forecast contents and try again later.",
    },
    futurePeriods: {
      createOk: 'Future period was created successfully.',
      createError: 'An error occurred during the creation of future period.',
    },
    metricRequestHierarchies: {
      loadError: 'An error occurred during loading metric hierarchies.',
    },
    equations: {
      loadError: 'An error occurred during loading equations',
      createOk: 'The equation had successfully created',
      createError: 'An error occurred during creation the equation',
      updateOk: 'The equation had successfully updated',
      updateError: 'An error occurred during updating the equation',
      deleteOk: 'The equation had successfully deleted',
      deleteError: 'An error occurred during deleting the equation',
    },
    portfolios: {
      loadError: 'An error occurred during loading portfolios',
      oneLoadError: 'An error occurred during loading the portfolio',
      createOk: 'The Portfolio was successfully created',
      createError: 'An error occurred during creation the portfolio',
      updateOk: 'The Portfolio was successfully updated',
      updateError: 'An error occurred during updating the portfolio',
      deleteOk: 'The Portfolio was successfully deleted',
      deleteError: 'An error occurred during deleting the portfolio',
      noPortfolios: 'Currently, you have no portfolios available',
    },
    users: {
      loadError: 'An error occurred during loading users',
      userFieldsEmpty: 'Please fill all the required fields',
      updatePasswordOk: 'Password has been successfully updated',
      updatePasswordError: 'An error occurred during updating the password',
      submitUsername4PasswordResetOk:
        'Username has been successfully submitted',
      submitUsername4PasswordResetError:
        'An error occurred during submitting username',
      passwordResetOk: 'Password has been successfully reset',
      passwordResetError: 'An error occurred during resetting password',
      createOk: 'The user has been successfully created',
      updateOk: 'The user has been successfully updated',
      updateProfileOk: 'Your profile has been successfully updated',
      createError: 'An error occurred during creation the user',
      updateError: 'An error occurred during updating the user',
      updateProfileError: 'An error occurred trying to update your profile',
      deleteOk: 'Selected users have been successfully deleted',
      deleteError: 'An error occurred during deleting the user',
      confirmDeleteBatch: 'Do you really want to delete selected users?',
      deleteOkBatch: 'The users have been successfully deleted',
      stopRequestingConfirmBatch:
        'Do you really want to stop requesting selected metrics?',
      confirmEditSelfTitle: 'You are editing your own profile',
      confirmEditSelfText:
        'After updating your own user profile you probably will need to re-login',
    },
    subscriptions: {
      loadError: 'An error occurred during loading subscriptions',
      createOk: 'The subscription had successfully created',
      updateOk: 'The subscription had successfully updated',
      createError: 'An error occurred during creation the subscription',
      updateError: 'An error occurred during updating the subscription',
      deleteOk: 'The subscription had successfully deleted',
      deleteError: 'An error occurred during deleting the subscription',
    },
    mapper: {
      errorNoCompanies: 'You have no companies in your portfolios',
      errorNoDataInReporting: 'Selected reporting has no parsed data',
      errorNoReportings: 'You have no reportings for selected Reporting Entity',
      needConfig: 'Please, select company and report file',
      dropLabelFirst: 'You need to drop the Label cell first',
      droppedMetricIdNotEqual:
        'You should drop the Label cell for this metric first',
      mapSaveOk: 'Mappings successfully saved',
      mapSaveError: 'An error occurred during saving the mappings',
      hasLabelWithoutValue:
        'Mapped items has a label without value. Please map all label-value pairs',
      canNotFindLabel:
        "Can't find a label cell for this value. Please drop the label cell first",
      reportingLoadError: 'An error occurred during loading the reporting file',
    },
    settings: {
      loadError: 'An error occurred during loading settings.',
      updateOk: 'Settings were updated successfully.',
      updateError: 'An error occurred during updating settings.',
    },
    reportedData: {
      loadError: 'An error occurred during loading reported data.',
      exportOk: 'Reported data export file downloading will begin shortly',
      exportError: 'An error occurred during exporting reported data.',
      metricDeleted:
        'This metric was deleted. You can not perform actions on this cell.',
      yearFieldPlaceholder: 'Choose year',
      quarterFieldPlaceholder: 'Choose quarter',
      periodFormYearFieldTitle: 'Fiscal Year',
      periodFormYearFieldHelp: 'Select fiscal year of data',
      periodFormQuarterFieldTitle: 'Fiscal Quarter',
      periodFormQuarterFieldHelp: 'Select fiscal quarter of data',
      reportingTemplateError:
        'An error occurred during downloading reporting template.',
    },
    preview: {
      loadError: 'An error occurred during loading preview',
    },
    modal: {
      confirmClose: 'Do you want to close the window?',
      confirmEnteredDataLoss: 'All entered data will be lost.',
      confirmCompanyDelete: 'Do you want to delete the Aeris Client?',
      confirmCompanyDeleteDescr: 'All related data will be lost.',
      confirmUsersDelete: 'Do you want to delete these users?',
      confirmUsersDeleteDescr: 'All related data will be lost.',
      confirmSubscriptionDelete: 'Do you want to delete the subscription?',
      confirmSubscriptionDeleteDescr: 'All related data will be lost.',
    },
    dataInput: {
      confirmSavePeriodDataTitle: 'Are you sure?',
      confirmSavePeriodDataTextPC:
        'Once submitted, data changes must be approved by Requester. Confirm this submission',
      confirmSavePeriodDataTextFM: 'Please confirm data submission',
      notRequiredCell: 'Quarterly data is not required',
      changeApprovedCell: 'Data approved',
      defaultCell: 'Click to make change',
      dataRequiredCell: 'Click to enter data',
      incomingRequestCell:
        'There is an incoming data change request. Click to approve or decline',
      outgoingRequestCell:
        'There is an outgoing data change request. Click to change the value',
      confirmDeletePeriodTitle: 'Are you sure?',
      confirmDeletePeriodText:
        'After deleting all period data would be deleted',
      periodDeleteOk: 'Period have been deleted successfully',
      periodDeleteError: 'An error occurred during deleting the period',
      requestsLoadingError:
        'An error occurred during loading pending requests.',
    },
    fmCompanies: {
      loadError: 'An error occurred during loading FM companies.',
    },
    metricValueChangeRequests: {
      historyLoadingError:
        'An error occurred during loading history of changes.',
      requestActionError:
        'An error occurred during performing an action on request.',
    },
    dashboard: {
      dataLoadError: 'An error occurred during loading dashboard data.',
      graphUpdateOk: 'Graph was updated successfully.',
      graphUpdateError: 'An error occurred during updating graph.',
      reportedDataTableConfigLoadError:
        'An error occurred during loading All Reported Data configuration.',
      reportedDataTableConfigUpdateOk:
        'All Reported Data configuration was updated successfully.',
      reportedDataTableConfigUpdateError:
        'An error occurred during updating All Reported Data configuration.',
      noPortfolios: 'Currently no Portfolios. How about creating one?',
      noEntities: 'Currently no Reporting Entities. How about creating one?',
      noInvestments: 'Currently no Investments. How about creating one?',
    },
    termsOfUse: {
      loadError: 'An error occurred during loading Terms of Service',
      acceptError:
        'An error occurred during Terms of Service acceptance process',
      rejectError:
        'An error occurred during Terms of Service rejection process',
      downloadError:
        'An error occurred while downloading Terms of Service document',
    },
    privacyPolicy: {
      loadError: 'An error occurred during loading Privacy Policy',
      downloadError:
        'An error occurred while downloading Privacy Policy document',
    },
    misc: {
      fmContactsLoading: 'Please wait, contacts are being prepared...',
      fmContactsEmpty: 'Your Aeris Clients does not provide contact data',
    },
    countries: {
      dataLoadError: 'An error occurred during loading countries data.',
    },
    contactSupport: {
      requestError: 'An error occurred during creating the request',
    },
    investments: {
      createOk: 'The Investment was successfully created',
      createError: 'An error occurred during creation the Investment',
      updateOk: 'The Investment was successfully updated',
      updateError: 'An error occurred during updating the Investment',
      loadError: 'An error occurred during loading Investments',
      deleteOk: 'The Investment was successfully deleted',
      deleteError: 'An error occurred during deleting the Investment',
      totalInvestmentIsInvalid: 'Value must not be greater than 100 billion',
    },
    systemEmail: {
      createOk: 'The Custom email was successfully created',
      createError: 'An error occurred during creation the Custom email',
      deleteOk: 'The Custom email was successfully deleted',
      updateOk: 'The Custom email was successfully updated',
    },
    sentTestEmail: {
      createOk: 'Test email sent successfully',
      createError: 'An error occurred during the creation of the email',
    },
    sentCDFIEmail: {
      createOk: 'Email sent successfully',
      createError: 'An error occurred during the creation of the email',
    },
    categoryEmail: {
      createOk: 'The Category email was successfully created',
      updateOk: 'The Category email was successfully updated',
      createError: 'An error occurred during creation the Custom email',
      deleteOk: 'The Category email was successfully deleted',
      deleteError: 'Category is used in Custom Email',
    },
    recipientsList: {
      createOk: 'Successful loading of the document',
      createError:
        'Error while downloading document.' + ' Please select other options.',
    },
    taxJurisdiction: {
      createOk: 'Tax jurisdiction was created successfully.',
      createError: 'An error occurred during creating tax jurisdiction.',
      updateOk: 'Tax jurisdiction was updated successfully.',
      updateError: 'An error occurred during updating tax jurisdiction.',
      deleteOk: 'Tax jurisdiction was deleted successfully.',
      deleteError: 'An error occurred during deleting tax jurisdiction.',
    },
    peerGroups: {
      updateOk: 'Peer Groups were updated successfully.',
      updateError: 'An error occurred during updating Peer Groups.',
    },
    dataVarianceRecentActivities: {
      updateOk: 'Assignments and or status updates successfull.',
      updateError:
        'An error occurred while updating assignments and/or status.',
    },
    aerisExplorer: {
      createPeerGroupOk: 'Peer Group was created successfully.',
      createPortfolioSegmentOk: 'Portfolio Segment was created successfully.',
      createError: 'An error occurred while creating Peer Group or Portfolio',
      updatePeerGroupOk: 'Peer Group was updated successfully.',
      updatePortfolioSegmentOk: 'Portfolio Segment was updated successfully.',
      updateError: 'An error occurred while updating Peer Group or Portfolio',
      createComparisonOk: 'Comparison was created successfully.',
      createComparisonError:
        'An error occurred while creating Comparison.',
      updateComparisonOk: 'Comparison was updated successfully.',
      updateComparisonError: 'An error occured while updating Comparison.',
      deleteOk: 'Delete was succcessful.',
      deleteError: 'Failed to delete.',
      archiveOk: 'Archive succeeded.',
      archiveError: 'Failed to archive.',
      restoreOk: 'Restore succeeded.',
      restoreError: 'Failed to restore.',
      cloneError: 'Failed to clone.',
    },
    manageExplorerFilters: {
      createOk: 'Filter was successfully added.',
      deleteOk: 'Filter was successfully removed.',
      createError: 'Failed to add filter.',
      deleteError: 'Failed to remove filter.',
    },
  }[field][operation]);
