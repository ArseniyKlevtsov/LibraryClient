import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, retry, throwError, timer } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { MaterialService } from '../services/material.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if(error.status === 401) {
        return authService.handleAuthError(error)
      }
      
      else {
        MaterialService.toast('Sorry, an error has occurred. :(');
        return throwError(() => error);
      }
    })        
  )
};
