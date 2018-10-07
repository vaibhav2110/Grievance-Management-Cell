import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { baseURL } from '../../shared/baseurl';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AuthInterceptor, UnauthorizedInterceptor } from './services/auth.interceptor';
import { AuthenticationService } from './services/authentication.service';
import { ProcessHTTPService } from './services/process-http.service';
import { GrievanceService } from './services/grievance.service';
import { AdminService } from './services/admin.service';

import { AppComponent } from './app.component';
import { LandingComponent } from './component/landing/landing.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './component/login/login.component';
import { GrievanceComponent } from './component/grievance/grievance.component';
import { SignupComponent } from './component/signup/signup.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { InboxComponent } from './component/inbox/inbox.component';
import { SentComponent } from './component/sent/sent.component';
import { AdminloginComponent } from './component/adminlogin/adminlogin.component';
import { AdminpanelComponent } from './component/adminpanel/adminpanel.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AdminnewusersComponent } from './component/adminnewusers/adminnewusers.component';
import { AdminallusersComponent } from './component/adminallusers/adminallusers.component';
import { AdmingrievancesComponent } from './component/admingrievances/admingrievances.component';
import { CheckComponent } from './component/check/check.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    GrievanceComponent,
    SignupComponent,
    InboxComponent,
    SentComponent,
    AdminloginComponent,
    AdminpanelComponent,
    DashboardComponent,
    AdminnewusersComponent,
    AdminallusersComponent,
    AdmingrievancesComponent,
    CheckComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  providers: [
      AuthenticationService,
      AdminService,
      ProcessHTTPService,
      GrievanceService,
      { provide: 'BaseURL', useValue: baseURL },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: UnauthorizedInterceptor,
        multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
