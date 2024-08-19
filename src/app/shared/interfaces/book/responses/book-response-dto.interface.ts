export interface BookResponseDto {
    id?: string;
    isbn?: string;
    name?: string;
    description?: string;
    bookImageId?: string;
    inventoryId?: string;
    authorId: string;
    genreIds?: string[];
    rentedBookIds?: string[];
  }