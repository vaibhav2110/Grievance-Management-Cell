import { Routes } from '@angular/router';
import { LandingComponent } from '../component/landing/landing.component';
import { GrievanceComponent } from '../component/grievance/grievance.component';
import { SignupComponent } from '../component/signup/signup.component';
import { InboxComponent } from '../component/inbox/inbox.component';
import { SentComponent } from '../component/sent/sent.component';
import { AdminloginComponent } from '../component/adminlogin/adminlogin.component';
import { AdminpanelComponent } from '../component/adminpanel/adminpanel.component';


export const routes: Routes = [
    { path: 'home', component: LandingComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'grievance', component: GrievanceComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'inbox', component: InboxComponent},
    { path: 'sent', component: SentComponent},
    { path: 'adminlogin', component: AdminloginComponent},
    { path: 'adminpanel', component: AdminpanelComponent}
    
];