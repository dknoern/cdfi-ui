export type Nullable<T> = T | null | undefined;

export type IdObj = Nullable<any>; // used for API tools
export type APIURIname = string;
export type APIURI = string;

export type DeepPartial<T> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;
