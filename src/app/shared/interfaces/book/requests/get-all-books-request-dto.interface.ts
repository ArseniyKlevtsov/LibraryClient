export interface GetAllBooksRequestDto {
    page: number;
    pageSize: number;
    bookNameSortAsc?: boolean;
    isbnSortAsc?: boolean;
    bookNameFilter?: string;
    isbnSortFilter?: boolean;
    authorId?: string;
    genreId?: string;
    rentOrderId?: string;
  }