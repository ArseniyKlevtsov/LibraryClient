import { GetAllAuthorsRequestDto } from '../interfaces/author/requests/get-all-authors-request-dto.interface';
import { AuthorsResponseDto } from '../interfaces/author/responses/authors-response-dto.interface';
import { AuthorResponseDto } from '../interfaces/author/responses/author-response-dto.interface';
import { AuthorRequestDto } from '../interfaces/author/requests/author-request-dto.interface';

import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getById(id: string): Observable<AuthorResponseDto> {
    return this.http.get<AuthorResponseDto>('/api/authors/'+ id); 
  }

  getAll(request: GetAllAuthorsRequestDto): Observable<AuthorsResponseDto> {
    return this.http.post<AuthorsResponseDto>('/api/authors/getAll', request);
  }

  deleteById(id: string): Observable<void> {
    return this.http.delete<void>('/api/authors/'+ id);
  }

  add(request: AuthorRequestDto): Observable<void> {
    return this.http.post<void>('/api/authors/', request);
  }

  update(id: string, request: AuthorRequestDto): Observable<void> {
    return this.http.put<void>('/api/authors/' + id, request);
  }
}
