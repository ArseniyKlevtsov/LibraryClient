import { AuthorResponseDto } from "./author-response-dto.interface";

export interface AuthorsResponseDto {
    totalCount: number;
    totalPages: number;
    authors?: AuthorResponseDto[];
  }