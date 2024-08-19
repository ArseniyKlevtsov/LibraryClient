import { GenreResponseDto } from "./genre-response-dto.interface";

export interface GenresResponseDto {
    totalCount: number;
    totalPages: number;
    genres?: GenreResponseDto[];
  }