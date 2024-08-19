import { BookResponseDto } from "./book-response-dto.interface";

export interface BooksResponseDto {
    totalCount: number;
    totalPages: number;
    books?: BookResponseDto[];
  }