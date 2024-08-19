import { RegisterRequestDto } from '../interfaces/auth/requests/register-request-dto.interface';
import { RefreshRequestDto } from '../interfaces/auth/requests/refresh-request-dto.interface';
import { LoginRequestDto } from '../interfaces/auth/requests/login-request-dto.interface';
import { TokenResponse } from '../interfaces/auth/responses/token-response.interface';

import { TokenStorageService } from './token-storage.service';

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private router: Router) {

  }

  login(user: LoginRequestDto): Observable<TokenResponse> {
    return this.http.post<TokenResponse>( // Измените тип ответа на TokenResponse
      '/api/auth/login',
      user
    ).pipe(
      tap(tokenResponse => {
        this.tokenStorage.saveTokens(tokenResponse);
      })
    );
  }

  register(request: RegisterRequestDto): Observable<void> {
    return this.http.post<void>('/api/auth/register', request);
  }

  logout(): void {
    this.tokenStorage.signOut();
  }

  isLoggedIn(): boolean {
    return !!this.tokenStorage.getAccessToken();
  }

  getAuthToken(): string {
    return this.tokenStorage.getAccessToken();
  }

  refresh(request: RefreshRequestDto): Observable<TokenResponse> {
    return this.http.post('/api/auth/refresh', request) as Observable<TokenResponse>;
  }

  handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      let tokenResponse = this.tokenStorage.getTokens();
      if (tokenResponse.accessToken !== null && tokenResponse.refreshToken !== null) {
        this.refresh({
          expiredAccessToken: tokenResponse.accessToken,
          refreshToken: tokenResponse.refreshToken
        }).subscribe(newTokens => {
          this.tokenStorage.saveTokens(newTokens);
        });
      }
      else {
        this.router.navigate(['/login'], {
          queryParams: {
            sessionFailed: true
          }
        });
      }
    }

    return throwError(() => error);
  }

  isAdmin(): boolean {
    return this.tokenStorage.getAdminStatus();
  }

}
