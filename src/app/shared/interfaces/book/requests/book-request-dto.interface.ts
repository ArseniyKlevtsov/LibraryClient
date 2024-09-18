export interface BookRequestDto {
  isbn?: string;
  name?: string;
  description?: string;
  bookImageId?: string,
  inventoryId?: string,
  authorId?: string;
  genreIds?: string[];
}