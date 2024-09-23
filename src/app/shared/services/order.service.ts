import { PlaceOrderRequestDto } from './../interfaces/order/request/place-order-request-dto.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartRentedBook } from '../interfaces/rented-book/cart-rented-book.interface';
import { TokenStorageService } from './token-storage.service';
import { RentedBookRequestDto } from '../interfaces/rented-book/request/rented-book-request.interface';
import { RentedBookProfileResponseDto} from '../interfaces/rented-book/response/rented-book-response-dto.inteface';
import { GetUserOrdersRequestDto } from '../interfaces/rented-book/request/get-user-orders-request-dto.interface';

@Injectable({
	providedIn: 'root'
})
export class OrderService {

	constructor(
		private http: HttpClient,
		private tokenService: TokenStorageService) {

	}

	placeOrder(items: CartRentedBook[]): Observable<void> {

    const rentedBooks: RentedBookRequestDto[] = items.map(item => ({
      bookId: item.book.id, 
      booksCount: item.booksCount,
      takeTime: new Date() 
    }));

    const request: PlaceOrderRequestDto = {
      accessToken: this.tokenService.getAccessToken(),
      rentedBooks: rentedBooks
    };

		return this.http.post<void>('/api/Orders/placeOrder', request);
	}

	getUserRentedBooks(request: GetUserOrdersRequestDto): Observable<RentedBookProfileResponseDto[]> {
		return this.http.post<RentedBookProfileResponseDto[]>("/api/profile/getUserRents", request);
	}
}
