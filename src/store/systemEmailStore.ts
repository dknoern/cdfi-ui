import { observable, action, decorate } from 'mobx';
import {
  IDateSentRange,
  IEmailCategory,
  IEmailLogDetails,
  IEmailReminders,
  IEmailTemplate,
  IEmailTemplates,
  IEmailTrigger,
  ISenderEmail,
  ISystemEmailEdit,
} from "../types";
import { TablePaginationConfig } from 'antd/lib/table/interface';
import {apiProcessor, notifyUser} from "../tools";
import {uiStore} from "./uiStore";
import {uiText} from "../constants";
import {downloadFetchedFile} from "../tools/fileDownloadTools";
import moment from "moment";

const defaultConfig = {
  categories: [],
  category: null,
  systemEmails: [],
  recipientsGroup: [],
  reminders: [],
  trigger: [],
  systemEmail: null,
  isToggleCustomEmailModal: false,
  isEditCustomEmail: false,
  isDeleteSystemEmail: false,
  pagination: {
    current: 1,
    pageSize: 5,
  },
  emailTemplates: [],
  isEditForm: false,
  isEditCategoryForm: false,
  emailTemplate: null,
  ccEmailList: [],
  bccEmailList: [],
  sorter: {},
  senderEmails:[],
  generateRecipientsList: null,
  generateEligibleCDFIList: null,
  isViewEmailDetails: false,
  emailLog: [],
  paginationEmailLog: {
    current: 1,
    pageSize: 20,
  },
  emailLogFile: null,
  emailLogDetails: null,
  sorterEmailLog: {},
  loadingEmailLogFile: false,
  dateSentRange: {
    from: '1970-01-01',
    to: moment( ).format('YYYY-MM-DD')
  },
};

class SystemEmailStore {
  emailCategories: IEmailCategory[] = defaultConfig.categories;
  emailCategory: IEmailCategory | null | undefined = defaultConfig.category;
  systemEmails: any | undefined = defaultConfig.systemEmails;
  recipientsGroup: any[] = defaultConfig.recipientsGroup;
  reminders: IEmailReminders[] = defaultConfig.reminders;
  trigger: IEmailTrigger[] = defaultConfig.trigger;
  systemEmail: ISystemEmailEdit | null  = defaultConfig.systemEmail;
  isToggleCustomEmailModal: boolean  = defaultConfig.isToggleCustomEmailModal;
  isEditCustomEmail: boolean  = defaultConfig.isEditCustomEmail;
  isDeleteSystemEmail: boolean  = defaultConfig.isDeleteSystemEmail;
  pagination: TablePaginationConfig  = defaultConfig.pagination;
  paginationEmailLog: TablePaginationConfig  = defaultConfig.paginationEmailLog;
  emailTemplates: IEmailTemplates[]  = defaultConfig.emailTemplates;
  isEditForm: boolean  = defaultConfig.isEditForm;
  isEditCategoryForm: boolean  = defaultConfig.isEditCategoryForm;
  emailTemplate: IEmailTemplate | null  = defaultConfig.emailTemplate;
  ccEmailList: string[]  = defaultConfig.ccEmailList;
  bccEmailList: string[]  = defaultConfig.bccEmailList;
  sorter: {}  = defaultConfig.sorter;
  sorterEmailLog: {}  = defaultConfig.sorterEmailLog;
  senderEmails: ISenderEmail[]  = defaultConfig.senderEmails;
  generateRecipientsList: null  = defaultConfig.generateRecipientsList;
  generateEligibleCDFIList: null  = defaultConfig.generateEligibleCDFIList;
  isViewEmailDetails: boolean  = defaultConfig.isViewEmailDetails;
  emailLog: any = defaultConfig.emailLog;
  emailLogFile: any = defaultConfig.emailLogFile;
  emailLogDetails: IEmailLogDetails | null = defaultConfig.emailLogDetails;
  loadingEmailLogFile: boolean = defaultConfig.loadingEmailLogFile;
  dateSentRange: IDateSentRange = defaultConfig.dateSentRange;

  setDateSentRange = (data: IDateSentRange) => {
    this.dateSentRange = data;
  }

  setLoadingEmailLogFile = (value: boolean) => {
    this.loadingEmailLogFile = value;
  }

  setEmailLog = (data: any) => {
    this.emailLog = data;
  }

  setEmailLogDetails = (data: IEmailLogDetails) => {
    this.emailLogDetails = data;
  }

  setEmailLogFile = (data: any) => {
    this.emailLogFile = data;
  }

  setIsViewEmailDetails = (value: boolean) => {
    this.isViewEmailDetails = value;
  }

  setGenerateRecipientsList = (data: any) => {
    this.generateRecipientsList = data;
  }

  setGenerateEligibleCDFIList = (data: any) => {
    this.generateEligibleCDFIList = data;
  }

  setSenderEmails = (data: ISenderEmail[]) => {
    this.senderEmails = data;
  }

  setSorter = (data: {}): void => {
    this.sorter = data;
  };

  setSorterEmailLog = (data: {}): void => {
    this.sorterEmailLog = data;
  };

  setBccEmailList = (data: string[]): void => {
    this.bccEmailList = data;
  };

  setCcEmailList = (data: string[]): void => {
    this.ccEmailList = data;
  };

  setEmailTemplate = (data: IEmailTemplate | null): void => {
    this.emailTemplate = data;
  };

  setIsEditForm = (value: boolean): void => {
    this.isEditForm = value;
  };

  setIsEditCategoryForm = (value: boolean): void => {
    this.isEditCategoryForm = value;
  };

  setEmailTemplates = (data: IEmailTemplates[]): void => {
    this.emailTemplates = data;
  };

  setPagination = (value: TablePaginationConfig): void => {
    this.pagination = {current: value.current !== undefined ?  value.current + 1 : value.current, pageSize: value.pageSize};
  };

  setPaginationEmailLog = (value: TablePaginationConfig): void => {
    this.paginationEmailLog = {current: value.current !== undefined ?  value.current + 1 : value.current, pageSize: value.pageSize};
  };

  setIsDeleteSystemEmail = (value: boolean): void => {
    this.isDeleteSystemEmail = value;
  };

  setToggleCustomEmailModal = (value: boolean): void => {
    this.isToggleCustomEmailModal = value;
  };

  setIsEditCustomEmail = (value: boolean): void => {
    this.isEditCustomEmail = value;
  };

  setEmailCategory = (result: any): void => {
    this.emailCategories = result;
  };

  deleteCategory = (id: number): any => {
    if(this.emailCategories === null) {
      return
    }
    this.emailCategories = this.emailCategories.filter((item) => item.id !== id);
  };

  editCategory = (id: number): void => {
    if(this.emailCategories === null) {
      return
    }
    this.emailCategory = this.emailCategories.find((item) => item.id === id);
  };

  updateCategory = (item: any) => {
    this.emailCategory = item;
  }

  updateCategories = (data: any): void => {
    if(this.emailCategories === null) {
      return
    }
    this.emailCategories = this.emailCategories.map((item) => {
      if (item.id === data.id) {
        return Object.assign({}, item, data)
      }
        return item
      });
  }

  addEmailCategory = (data: IEmailCategory): void => {
    this.emailCategories = [...this.emailCategories ?? [], data]
  };

  setSystemEmails = (result: any): void => {
    this.systemEmails = result;
  };

  setSystemEmail = (result: any): void => {
    this.systemEmail = result;
  };


  setRecipientsGroup = (result: any): void => {
    this.recipientsGroup = result;
  };

  setReminders = (result: IEmailReminders[]): void => {
    this.reminders = result;
  };

  setTrigger = (result: IEmailTrigger[]): void => {
    this.trigger = result;
  };

  getRecipientsGroup = async (): Promise<void> => {
    this.setRecipientsGroup(await apiProcessor.get('recipientsGroup'));
  };

  getSystemEmails = async (pageNumber: number = 1, pageSize: number = 10, sorter: any = {}): Promise<any> => {
    this.setSorter(sorter);
    const order = sorter.order === "descend" ? 'desc' : sorter.order === "ascend" ? "asc" : undefined;
    const field = sorter.field === "emailCategoryId" ?
      'emailCategory.name' :
      sorter.field === "lastUpdated" ? "dateUpdated" :
        sorter.field === "subject" ? 'subject' :
          sorter.field === "lastUpdatedBy" ? "updatedBy" :
            sorter.field === "isEnabled" ? "enabled" : undefined;
    this.setSystemEmails(await apiProcessor.get('systemEmails',{
      pageNumber,
      pageSize,
      order,
      field
    }));
  };

  getEmailCategories = async (): Promise<void> => {
    this.setEmailCategory(await apiProcessor.get('emailCategories'));
  };

  getEmailReminders = async (): Promise<void> => {
    this.setReminders(await apiProcessor.get('emailReminders'));
  };

  getEmailTrigger = async (): Promise<void> => {
    this.setTrigger(await apiProcessor.get('emailTrigger'));
  };

  getSystemEmail = async (id: number): Promise<void> => {
    this.setSystemEmail(await apiProcessor.get('systemEmail', id));
  };

  getEmailTemplates = async (): Promise<void> => {
    this.setEmailTemplates(await apiProcessor.get('emailTemplates'));
  };

  getUpdateSystemEmail = async (data: any): Promise<any> => {
    await apiProcessor.put('systemEmailUpdate', data?.id, {
      ...data,
    }).then(()=> {
      notifyUser.ok(uiText('systemEmail', 'updateOk'));
    }).finally(() => {
      uiStore.endLoading('systemEmailUpdate');
    })
  };

  getDeleteSystemEmail = (id: number | undefined): Promise<void> => {
    const OPERATION = 'systemEmailDelete';
    uiStore.addLoading(OPERATION);
    return apiProcessor.delete(OPERATION, id).then(()=> {
      notifyUser.ok(uiText('systemEmail', 'deleteOk'));
    }).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  getDeleteEmailCategory = (id: number): Promise<void> => {
    const OPERATION = 'emailCategoriesDelete';

    return apiProcessor.delete(OPERATION, id).then(() => {
      notifyUser.ok(uiText('categoryEmail', 'deleteOk'));
      this.deleteCategory(id)
    }).catch((e) => {
      if(e.data.status === 500) {
        notifyUser.error(uiText('categoryEmail', 'deleteError'));
      }
    })
  };

  getEmailTemplate = async (id: number): Promise<void> => {
    this.setEmailTemplate(await apiProcessor.get('emailTemplate', id));
  };

  getSenderEmails = async (): Promise<void> => {
    this.setSenderEmails(await apiProcessor.get('senderEmails'));
  };

  getGenerateRecipientsList = async (data: any): Promise<void> => {
    this.setGenerateRecipientsList(await apiProcessor.post('generateRecipientsList', null, data)
      .then((response) => {
        notifyUser.ok(uiText('recipientsList', 'createOk'));
        downloadFetchedFile(response);
    }).catch((e) => {
        notifyUser.error(uiText('recipientsList', 'createError'));
      }));
  };

  getGenerateEligibleCDFIList = async (): Promise<void> => {
    this.setGenerateEligibleCDFIList(await apiProcessor.get('generateEligibleCDFIList')
      .then((response) => {
        notifyUser.ok(uiText('recipientsList', 'createOk'));
        downloadFetchedFile(response);
      }).catch((e) => {
        notifyUser.error(uiText('recipientsList', 'createError'));
      }));
  };

  getEmailLog = async (pageNumber: number = 1, pageSize: number = 10, sorter: any = {}, dateFrom: string, dateTo: string): Promise<any> => {
    this.setSorterEmailLog(sorter);
    const order = sorter.order === "descend" ? 'desc' : sorter.order === "ascend" ? "asc" : undefined;
    const field = sorter.field;
    this.setEmailLog(await apiProcessor.get('emailLog',{
      pageNumber,
      pageSize,
      order,
      field,
      dateFrom,
      dateTo
    }));
  };

  getEmailLogFile = async (name: string): Promise<void> => {
    this.setEmailLogFile(await apiProcessor.get('emailLogFile', {name})
      .then((response) => {
        notifyUser.ok(uiText('recipientsList', 'createOk'));
        downloadFetchedFile(response);
      }).catch((e) => {
        notifyUser.error(uiText('recipientsList', 'createError'));
      }));
  };


}

decorate(SystemEmailStore, {
  emailCategories: observable,
  emailCategory: observable,
  systemEmails: observable,
  systemEmail: observable,
  recipientsGroup: observable,
  reminders: observable,
  trigger: observable,
  isToggleCustomEmailModal: observable,
  isDeleteSystemEmail: observable,
  pagination: observable,
  paginationEmailLog: observable,
  emailTemplates: observable,
  isEditForm: observable,
  isEditCategoryForm: observable,
  emailTemplate: observable,
  ccEmailList: observable,
  bccEmailList: observable,
  sorter: observable,
  sorterEmailLog: observable,
  senderEmails: observable,
  generateRecipientsList: observable,
  generateEligibleCDFIList: observable,
  isViewEmailDetails: observable,
  emailLogFile: observable,
  emailLog: observable,
  emailLogDetails: observable,
  loadingEmailLogFile: observable,
  setEmailCategory: action,
  deleteCategory: action,
  editCategory: action,
  updateCategory: action,
  setSystemEmails: action,
  getRecipientsGroup: action,
  getSystemEmails: action,
  getEmailCategories: action,
  getEmailReminders: action,
  getEmailTrigger: action,
  setToggleCustomEmailModal: action,
  getSystemEmail: action,
  setSystemEmail: action,
  getUpdateSystemEmail: action,
  getDeleteSystemEmail: action,
  setPagination: action,
  setPaginationEmailLog: action,
  setEmailTemplates: action,
  getEmailTemplates: action,
  getDeleteEmailCategory: action,
  setIsEditForm: action,
  setIsEditCategoryForm: action,
  setEmailTemplate: action,
  getEmailTemplate: action,
  setCcEmailList: action,
  setBccEmailList: action,
  setSenderEmails: action,
  getSenderEmails: action,
  getGenerateRecipientsList: action,
  getGenerateEligibleCDFIList: action,
  setIsViewEmailDetails: action,
  setEmailLog: action,
  getEmailLog: action,
  getEmailLogFile: action,
  setEmailLogDetails: action,
  setLoadingEmailLogFile: action,
});

export const systemEmailStore = new SystemEmailStore();
