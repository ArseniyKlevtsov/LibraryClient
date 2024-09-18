import { BookRequestDto } from '../interfaces/book/requests/book-request-dto.interface';
import { GetAllBooksRequestDto } from '../interfaces/book/requests/get-all-books-request-dto.interface';
import { BookResponseDto } from '../interfaces/book/responses/book-response-dto.interface';
import { BooksResponseDto } from '../interfaces/book/responses/books-response-dto.interface';

import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getById(id: string): Observable<BookResponseDto> {
    return this.http.get<BookResponseDto>('/api/books/'+ id);
  }

  getAll(request: GetAllBooksRequestDto): Observable<BooksResponseDto> {
    return this.http.post<BooksResponseDto>('/api/books/getAll', request);
  }

  deleteById(id: string): Observable<void> {
    return this.http.delete<void>('/api/books/'+ id);
  }

  add(request: BookRequestDto): Observable<void> {
    return this.http.post<void>('/api/books/', request);
  }

  update(id: string, request: BookRequestDto): Observable<void> {
    return this.http.put<void>('/api/books/' + id, request);
  }
}
