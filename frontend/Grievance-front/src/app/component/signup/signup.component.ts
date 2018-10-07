import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import {Router} from "@angular/router";
import * as $ from 'jquery'; 


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    
  signinForm: FormGroup;
  errMess: any;
  loading: boolean = false;
  success: boolean = false;
  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService, private router: Router) {
      this.signinForm = this.formBuilder.group({
          name: ['', Validators.required],
          email: ['', Validators.required],
          phone: ['', Validators.required],
          roll: ['', Validators.required]
      });
  }

  ngOnInit() {
  }
    
  onSubmit(){
      this.loading = true;
      console.log(this.signinForm.value);
      this.auth.signIn(this.signinForm.value)
      .subscribe((res)=> {
          this.loading = false;
          this.success = true;
          console.log(res);
          if(res.success){
              $(".success").css({display: 'block'});
              setTimeout(()=>{
                $(".trigger").toggleClass("drawn");
                  setTimeout(()=>{
                      $(".trigger").removeClass("drawn");
                      setTimeout(()=>{
                          $(".success").css({display: 'none'});
                      },2000)
                  }, 2000)
              }, 10);
              console.log('Successful registration');
              this.signinForm.reset();
          }
          else{
              console.log(res);
          }
      }, err => {
          this.loading = false;
          this.errMess = err.error;
          console.log(err);
      });
  }

}
