import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { baseURL } from '../../../shared/baseurl';

import { Router } from '@angular/router';
import { ProcessHTTPService } from './process-http.service';

@Injectable()
export class GrievanceService {

  constructor(private http: HttpClient, private router: Router, private processHttpService: ProcessHTTPService) { }
    
  getGrievance(): Observable<any>{
      return this.http.get(baseURL+'api/grievances')
      .catch(error => {
          return this.processHttpService.handleError(error);
      });
  } 
    
  postGrievance(grievance: any): Observable<any>{
      return this.http.post(baseURL + 'api/grievances', {"subject": grievance.subject, "message": grievance.message, "branch": grievance.branch})
      .catch(error => {
          return this.processHttpService.handleError(error);
      });
  }

}
