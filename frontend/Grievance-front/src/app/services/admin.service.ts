import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { baseURL } from '../../../shared/baseurl';

import { Router } from '@angular/router';
import { ProcessHTTPService } from './process-http.service';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient, private router: Router, private processHttpService: ProcessHTTPService) { }

    
  getUsers(): Observable<any>{
      return this.http.get(baseURL+'api/users/alluser')
      .catch(error => {
          return this.processHttpService.handleError(error);
      });
  }

  getGrievances(): Observable<any>{
      return this.http.get(baseURL+'api/grievances/all')
      .catch(error => {
          return this.processHttpService.handleError(error);
      });
  }
    
  assignPassword(roll: any, password: any): Observable<any>{
      return this.http.post(baseURL+'api/users/assignpassword', {
          "roll": roll,
          "password": password
      })
      .catch(error => {
          return this.processHttpService.handleError(error);
      });
  }
    
  reply(grievance: any, response: any): Observable<any>{
      return this.http.post(baseURL+'api/grievances/reply/'+grievance._id, {
          "reply": response
      })
      .catch(error => {
          return this.processHttpService.handleError(error);
      });
  }
  
}
