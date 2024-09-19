import { AuthorResponseDto } from "../../author/responses/author-response-dto.interface";
import { GenreResponseDto } from "../../genre/responses/genre-response-dto.interface";

export class BookEditInfo
{
    genres: GenreResponseDto[];
    authors: AuthorResponseDto[];
}
