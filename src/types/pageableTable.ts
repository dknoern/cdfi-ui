export type PageableTable<T extends {}> = {
  content: T[];
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  number: number;
};
