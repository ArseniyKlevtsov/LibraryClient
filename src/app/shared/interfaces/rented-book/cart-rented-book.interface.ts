import { BookPreviewResponseDto } from "../book/responses/book-preview-response-dto.interface"

export interface CartRentedBook {
    booksCount: number,
    book: BookPreviewResponseDto
}