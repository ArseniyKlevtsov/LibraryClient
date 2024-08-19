export interface AuthorResponseDto {
    id?: string;
    name?: string;
    surname?: string;
    birthDate: Date;
    country?: string;
    bookIds?: string[];
  }