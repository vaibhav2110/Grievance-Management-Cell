import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
    
  loginForm: FormGroup;
  errMess: any;
  loading: boolean = false;
  user_error: boolean = false;
  password_error: boolean = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService, private router: Router) {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  ngOnInit() {
  }
    
  onSubmit(){
      this.loading = true;
      this.user_error = false;
      this.password_error = false;
      console.log(this.loginForm.value);
      this.auth.adminlogIn(this.loginForm.value)
      .subscribe((res)=> {
          console.log(res);
          if(res.success){
              this.loading = false;
              this.router.navigate(['adminpanel']);
              
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

}
