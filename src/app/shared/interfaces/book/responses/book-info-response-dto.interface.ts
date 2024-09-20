import { AuthorResponseDto } from "../../author/responses/author-response-dto.interface";
import { GenreResponseDto } from "../../genre/responses/genre-response-dto.interface";

export interface BookInfoResponseDto {
    id: string; 
    isbn?: string; 
    name?: string; 
    description?: string; 
    author?: AuthorResponseDto; 
    image?: string; 
    availableCount?: number; 
    totalCount?: number; 
    genres?: GenreResponseDto[]; 
}