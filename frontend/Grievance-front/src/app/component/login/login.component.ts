import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errMess: any;
  loading: boolean = false;
  user_error: boolean = false;
  password_error: boolean = false;
    
  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService, private router: Router) {
      this.loginForm = this.formBuilder.group({
          roll: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  ngOnInit() {
      console.log(this.auth.isLoggedIn());
      this.auth.loadUserCredentials();
      if(this.auth.isLoggedIn()){
          console.log(this.auth.isLoggedIn());
          this.router.navigate(['grievance']);
      }
  }
    
  onSubmit(){
      this.loading = true;
      this.user_error = false;
      this.password_error = false;
      console.log(this.loginForm.value);
      this.auth.UserlogIn(this.loginForm.value)
      .subscribe((res)=> {
          console.log(res);
          if(res.success){
              this.router.navigate(['grievance']);
              this.loading = false;
          }
          else{
              this.loading = false;
              console.log(res);
          }
      }, err => {
          this.loading = false;
          this.errMess = err.error;
          if(err.error === 'Incorrect password'){
              this.user_error = false;
              this.password_error = true;
          }else{
              this.user_error = true;
              this.password_error = false;
          }
          console.log(err);
      });
  }
    
  signup(){
      this.router.navigate(['signup']);
  }

}
