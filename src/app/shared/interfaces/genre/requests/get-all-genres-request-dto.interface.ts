export interface GetAllGenresRequestDto {
    page: number;
    pageSize: number;
    nameSortAsc?: boolean;
    nameFilter?: string;
    bookId?: string;
  }