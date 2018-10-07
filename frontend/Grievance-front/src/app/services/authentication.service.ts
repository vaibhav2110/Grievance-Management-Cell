import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { baseURL } from '../../../shared/baseurl';

import { Router } from '@angular/router';
import { ProcessHTTPService } from './process-http.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

interface AuthResponse {
    status: string,
    success: string,
    token: string
};

interface AuthResponse2 {
    error: string,
    success: string,
    token: string
};

interface JWTResponse {
    status: string,
    success: string,
    user: any
};

@Injectable()
export class AuthenticationService {

  tokenKey: string = 'JWT';
  isAuthenticated: Boolean = false;
  authToken: string = undefined;
    
  constructor(private http: HttpClient, private router: Router, private processHttpService: ProcessHTTPService) { }

  checkJWTtoken() {
    this.http.get<JWTResponse>(baseURL + 'api/users/checkJWTToken')
    .subscribe(res => {
        console.log("JWT token Valid: ", res);
    },
    err => {
        console.log("JWT Token invalid: ", err);
        this.destroyUserCredentials();
    })
  }
    
  UserlogIn(user: any): Observable<any> {
      return this.http.post<AuthResponse>(baseURL + 'api/users/login', {"roll": user.roll, "password": user.password})
      .map(res => {
          console.log(res);
          this.storeUserCredentials({roll: user.roll, token: res.token});
          return {'success': true, 'roll': user.roll};
      })
      .catch(error => {
          return this.processHttpService.handleError(error);
      });
  }
    
  adminlogIn(user: any): Observable<any> {
      return this.http.post<AuthResponse2>(baseURL + 'api/users/adminLogin', {"username": user.username, "password": user.password})
      .map(res => {
          console.log(res);
          this.storeUserCredentials({username: user.username, token: res.token});
          return {'success': true, 'username': user.username};
      })
      .catch(error => {
          return this.processHttpService.handleError(error);
      });
  }
    
  storeUserCredentials(credentials: any) {
      console.log("storeUserCredentials ", credentials );
      localStorage.setItem(this.tokenKey,JSON.stringify(credentials));
      this.useCredentials(credentials);
  }

  useCredentials(credentials: any) {
      this.isAuthenticated = true;
      this.authToken = credentials.token;
  }
    
  destroyUserCredentials() {
      this.authToken = undefined;
      this.isAuthenticated = false;
      localStorage.removeItem(this.tokenKey);
  }
    
  logOut() {
      this.destroyUserCredentials();
  }
    
  isLoggedIn(): Boolean {
      return this.isAuthenticated;
  }
    
  getToken(): string {
      return this.authToken;
  }
    
  signIn(user: any){
      return this.http.post(baseURL + 'api/users/create',user)
      .catch(error=> {return this.processHttpService.handleError(error);});
      
  }
    
  loadUserCredentials() {
      let credentials = JSON.parse(localStorage.getItem(this.tokenKey));
      console.log("loadUserCredentials", credentials);
      if( credentials && credentials.roll != undefined){
          this.useCredentials(credentials);
          //if(this.authToken)
              //this.checkJWTtoken();
      }
  }
  
    
  
}
