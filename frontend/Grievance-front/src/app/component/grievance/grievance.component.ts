import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { GrievanceService } from '../../services/grievance.service';
import { AuthenticationService } from '../../services/authentication.service';
import {Router} from "@angular/router";
import * as $ from 'jquery'; 

@Component({
  selector: 'app-grievance',
  templateUrl: './grievance.component.html',
  styleUrls: ['./grievance.component.css']
})
export class GrievanceComponent implements OnInit {

  grievanceForm: FormGroup;
  errMess: any;
  grievances: any;
  loading: Boolean = false;
  success: Boolean = false;
  responses: any;
    
  constructor(private formBuilder: FormBuilder, private grievance: GrievanceService, private router: Router, private auth: AuthenticationService) { 
      this.grievanceForm = this.formBuilder.group({
          subject: ['', Validators.required],
          message: ['', Validators.required],
          branch: ['', Validators.required]
      });
  }

  ngOnInit() {
      this.grievance.getGrievance()
      .subscribe(res=> {
          
          this.grievances = res;
          this.responses = this.grievances.filter((grievance)=>{
              console.log(grievance.response.length);
              return grievance.response.length>0
          });
          console.log(this.responses);
          console.log(this.grievances);
      }, err=>{
          this.errMess = err;
          console.log('You have been logged out');
          this.router.navigate(['home']);
          
      })
  }
    
  onSubmit(){
      this.loading = true;
      console.log(this.grievanceForm.value);
      this.grievance.postGrievance(this.grievanceForm.value)
      .subscribe((res)=> {
          this.loading = false;
          console.log(res);
          if(res.success){
              $(".success").css({display: 'block'});
              this.success = true;
              setTimeout(()=>{
                $(".trigger").toggleClass("drawn");
                  setTimeout(()=>{
                      $(".trigger").removeClass("drawn");
                      setTimeout(()=>{
                          $(".success").css({display: 'none'});
                      },2000)
                  }, 2000)
              }, 10);
              console.log('Successful submission');
              this.grievanceForm.reset();
              this.grievance.getGrievance()
              .subscribe(res=> {

                  this.grievances = res;
                  this.responses = this.grievances.filter((grievance)=>{
                      console.log(grievance.response.length);
                      return grievance.response.length>0
                  });
                  console.log(this.responses);
                  console.log(this.grievances);
              }, err=>{
                  this.errMess = err;
                  console.log('You have been logged out');
                  this.router.navigate(['home']);

              });
          }
          else{
              console.log(res);
          }
      }, err => {
          this.loading = false;
          this.errMess = err;
          console.log(err);
      });
  }
    
  logout(){
      this.auth.logOut();
      this.router.navigate(['home']);
  }
    
  openSent(event){
      event.stopPropagation();
      this.router.navigate(['sent']);
  }
  openInbox(event){
      event.stopPropagation();
      this.router.navigate(['inbox']);
  }

}
