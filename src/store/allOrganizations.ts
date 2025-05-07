import {TablePaginationConfig} from "antd/lib/table/interface";
import {apiProcessor} from "../tools";
import {action, decorate, observable} from "mobx";

const defaultConfig = {
  pagination: {
    current: 0,
    pageSize: 10,
  },
  allOrganizations: {},
  searchOrganizations: '',
  loading: false,
  sorter: {},
}

class AllOrganizationsStore {
  pagination: TablePaginationConfig  = defaultConfig.pagination;
  allOrganizations: any | undefined = defaultConfig.allOrganizations;
  searchOrganizations: any = defaultConfig.searchOrganizations;
  loading: any = defaultConfig.loading;
  sorter: {}  = defaultConfig.sorter;

  setAllOrganizations = (result: any): void => {
    this.allOrganizations = result;
  };

  setLoading = (value: boolean): void => {
    this.loading = value;
  }

  setPagination = (value: TablePaginationConfig): void => {
    this.pagination = {current: value.current !== undefined ?  value.current + 1 : value.current, pageSize: value.pageSize};
  };

  setSearchOrganizations = (value: any): void => {
    this.searchOrganizations = value;
  };
  
  setSorter = (data: {}): void => {
    this.sorter = data;
  };

  getAllOrganizations = async (pageNumber: number = 1, pageSize: number = 10, search: string = '', sorter: any = {field:'name',order:'ascend'}): Promise<any> => {
    this.setSorter(sorter);
    const order = sorter.order === "descend" ? 'DESC' : sorter.order === "ascend" ? "ASC" : "";
    const field = sorter.field === "name" ? 'name' :
      sorter.field === "address" ? 'address' :
      sorter.field === "city" ? "city" :
      sorter.field === "state" ? 'state' :
      sorter.field === "fiscalYearEnd" ? "company.fiscalYearEnd" :
      sorter.field === "shareFinancials" ? "share_financials_str" :
      sorter.field === "dateCreated" ? "company.dateCreated" :
      sorter.field === "dateUpdated" ? "company.dateUpdated" :
      sorter.field === "updatedBy" ? "company.updatedBy.firstName" :
      sorter.field === "createdBy" ? "company.createdBy.firstName" :
      sorter.field === "companyType" ? "company_type_str" :
      sorter.field === "rated" ? "rated" : 
      sorter.field === "reporting" ? "reporting" : 
      sorter.field === "active" ? "active" : "";

      const allOrganizationsResult = await apiProcessor.get('allOrganizations', {
        pageNumber,
        pageSize,
        search, 
        order,
        field
      });

      this.setAllOrganizations(allOrganizationsResult);
  };
}

decorate(AllOrganizationsStore, {
  pagination: observable,
  searchOrganizations: observable,
  loading: observable,
  sorter: observable,
  allOrganizations: observable,
  setPagination: action,
  getAllOrganizations: action,
  setSearchOrganizations: action,
  setLoading: action,
});

export const allOrganizationsStore = new AllOrganizationsStore();
