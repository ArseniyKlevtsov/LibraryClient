import { RentedBookRequestDto } from "../../rented-book/request/rented-book-request.interface";

export interface PlaceOrderRequestDto {
    accessToken?: string; 
    rentedBooks?: RentedBookRequestDto[];
}