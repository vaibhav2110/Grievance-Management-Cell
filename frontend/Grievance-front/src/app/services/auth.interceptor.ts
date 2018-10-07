import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    authReq: any;
  constructor(private inj: Injector) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.inj.get(AuthenticationService);
    // Get the auth header from the service.
    console.log(JSON.parse(localStorage.getItem('JWT')));
    let token = JSON.parse(localStorage.getItem('JWT'));
    if(token){
        const authToken = token.token;
        this.authReq = req.clone({headers: req.headers.set('Authorization', authToken)});    
    }
    else{
        
        this.authReq = req.clone({headers: req.headers.set('Authorization', 'null')});
    }
      console.log(this.authReq);
    // console.log("Interceptor: " + authToken);
    // Clone the request to add the new header.
        
    
        // Pass on the cloned request instead of the original request.
    return next.handle(this.authReq);
  }
}

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private inj: Injector) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.inj.get(AuthenticationService);
    const authToken = authService.getToken();
    
    return next
      .handle(req)
      .do((event: HttpEvent<any>) => {
        // do nothing            
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 && authToken) {
            console.log("Unauthorized Interceptor: ", err);
          }
        }
      });
  }
}
