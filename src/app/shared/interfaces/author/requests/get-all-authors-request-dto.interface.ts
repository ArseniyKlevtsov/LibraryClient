export interface GetAllAuthorsRequestDto {
    page: number;
    pageSize: number;
    nameSortAsc?: boolean;
    surnameSortAsc?: boolean;
    birthDateSortAsc?: boolean;
    countrySortAsc?: boolean;
    nameFilter?: string;
    surnameFilter?: string;
    birthDateFilter?: Date;
    countryFilter?: string;
    bookId?: string;
  }