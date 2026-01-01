import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './Service/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const router =inject(Router)
  const toastrService = inject(ToastrService)

  if(authService.isLoggedIn()){
    const cloneReq = req.clone({
      headers : req.headers.set('Authorization' , 'Bearer ' + authService.getToken())
    })
    return next(cloneReq).pipe(
      tap({
        error:(err :any)=>{
          if(err.status==401){// dont have a valid token
            authService.deleteToken()
            setTimeout(() => {
              toastrService.info('Please Login Again','Session Expried!')
            }, 1500);
            router.navigateByUrl('/signin')
          }
          else if(err.status==403){
            toastrService.error("Oops! It Seems Like you're not authorized to perform")
          }
        }
      })
    );
  }
  else
  return next(req);
};
