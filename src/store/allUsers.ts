import {TablePaginationConfig} from "antd/lib/table/interface";
import {apiProcessor} from "../tools";
import {action, decorate, observable} from "mobx";

const defaultConfig = {
  pagination: {
    current: 0,
    pageSize: 10,
  },
  allUsers: {},
  searchUsers: '',
  loading: false,
  sorter: {},
}

class AllUsersStore {
  pagination: TablePaginationConfig  = defaultConfig.pagination;
  allUsers: any | undefined = defaultConfig.allUsers;
  searchUsers: any = defaultConfig.searchUsers;
  loading: any = defaultConfig.loading;
  sorter: {}  = defaultConfig.sorter;

  setAllUsers = (result: any): void => {
    this.allUsers = result;
  };

  setLoading = (value: boolean): void => {
    this.loading = value;
  }

  setPagination = (value: TablePaginationConfig): void => {
    this.pagination = {current: value.current !== undefined ?  value.current + 1 : value.current, pageSize: value.pageSize};
  };

  setSearchUsers = (value: any): void => {
    this.searchUsers = value;
  };
  
  setSorter = (data: {}): void => {
    this.sorter = data;
  };

  getAllUsers = async (pageNumber: number = 1, pageSize: number = 10, search: string = '', sorter: any = {field:'username',order:'ascend'}): Promise<any> => {
    this.setSorter(sorter);
    const order = sorter.order === "descend" ? 'desc' : sorter.order === "ascend" ? "asc" : "";
    const field = sorter.field === "firstName" ? 'firstName' :
      sorter.field === "lastName" ? 'lastName' :
      sorter.field === "username" ? "username" :
      sorter.field === "title" ? 'title' :
      sorter.field === "email" ? "email" :
      sorter.field === "companyName" ? "company.name" :
      sorter.field === "lastLoginDate" ? "lastLoginDate" :
      sorter.field === "dateCreated" ? "dateCreated" :
      sorter.field === "dateUpdated" ? "dateUpdated" :
      sorter.field === "updatedBy" ? "updatedBy.firstName" :
      sorter.field === "createdBy" ? "createdBy.firstName" :
      sorter.field === "companyType" ? "company.companyType" :
      sorter.field === "isActive" ? "enabled" : "";

      const allUsersResult = await apiProcessor.get('allUsers', {
        pageNumber,
        pageSize,
        search, 
        order,
        field
      });

      this.setAllUsers(allUsersResult);
  };
}

decorate(AllUsersStore, {
  pagination: observable,
  searchUsers: observable,
  loading: observable,
  sorter: observable,
  allUsers: observable,
  setPagination: action,
  getAllUsers: action,
  setSearchUsers: action,
  setLoading: action,
});

export const allUsersStore = new AllUsersStore();
