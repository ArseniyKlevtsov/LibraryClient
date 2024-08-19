import { GetAllGenresRequestDto } from '../interfaces/genre/requests/get-all-genres-request-dto.interface';
import { GenresResponseDto } from '../interfaces/genre/responses/genres-response-dto.interface';
import { GenreResponseDto } from '../interfaces/genre/responses/genre-response-dto.interface';

import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenreRequestDto } from '../interfaces/genre/requests/genre-request-dto.interface';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  getById(id: string): Observable<GenreResponseDto> {
    return this.http.get<GenreResponseDto>('/api/genres/'+ id);
  }

  getAll(request: GetAllGenresRequestDto): Observable<GenresResponseDto> {
    return this.http.post<GenresResponseDto>('/api/genres/getAll', request);
  }

  deleteById(id: string): Observable<void> {
    return this.http.delete<void>('/api/genres/'+ id);
  }

  add(request: GenreRequestDto): Observable<void> {
    return this.http.post<void>('/api/genres/', request);
  }

  update(id: string, request: GenreRequestDto): Observable<void> {
    return this.http.put<void>('/api/genres/' + id, request);
  }
}
