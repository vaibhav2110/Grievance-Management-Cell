import { Component, OnInit } from '@angular/core';
import { GrievanceService } from '../../services/grievance.service';
import {Router} from "@angular/router";
import { AuthenticationService } from '../../services/authentication.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  errMess: any;
  grievances: any;
  constructor(private grievance: GrievanceService, private router: Router, private auth: AuthenticationService, private _location: Location) { }

  ngOnInit() {
      this.grievance.getGrievance()
      .subscribe(res=> {
          
          this.grievances = res.reverse();
          console.log(this.grievances);
      }, err=>{
          this.errMess = err;
          console.log('You have been logged out');
          //this.router.navigate(['home']);
          
      });
  }
    
  logout(){
      this.auth.logOut();
      this.router.navigate(['home']);
  }
    
  backClicked() {
        this._location.back();
  }
  openInbox(){
      this.router.navigate(['inbox']);
  }

}
