import { BookPreviewResponseDto } from "./book-preview-response-dto.interface";

export interface BooksResponseDto {
    totalCount: number;
    totalPages: number;
    books?: BookPreviewResponseDto[];
  }