import { inject } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  
  if (authService.isLoggedIn()) {
    const authToken = authService.getAuthToken();
    const newReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken),
    });
    return next(newReq);
  }
  return next(req)
};


