import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { OrderService } from './../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RentedBookProfileResponseDto} from '../../shared/interfaces/rented-book/response/rented-book-response-dto.inteface';
import { GetUserOrdersRequestDto } from '../../shared/interfaces/rented-book/request/get-user-orders-request-dto.interface';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NgIf,NgFor,RouterLink, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  
  rentedBooks: RentedBookProfileResponseDto[] = []

  constructor( 
    private orderService: OrderService,
    private tokenService: TokenStorageService) {

  }

  ngOnInit(): void {
    const token = this.tokenService.getAccessToken();
    const request: GetUserOrdersRequestDto = {
      AccessToken: token
    };
    this.orderService.getUserRentedBooks(request).subscribe(
      rentedBooks => {
        this.rentedBooks = rentedBooks;
      }
    );

  }


}
