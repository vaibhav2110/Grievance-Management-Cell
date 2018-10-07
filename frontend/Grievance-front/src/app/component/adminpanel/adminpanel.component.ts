import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AdminService } from '../../services/admin.service';
import {Router} from "@angular/router";
import * as $ from 'jquery'; 
@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
  menuItems: any[];
  users: any;
  grievances: any;
  collapsed = true;
  page: String = 'dashboard';
  
  constructor(private router: Router, private auth: AuthenticationService, private admin: AdminService) { }

  ngOnInit() {
      
      $('.notClicked').click(function()
        {
            $(this).addClass('active').siblings().removeClass('active');
        });
      
      this.admin.getUsers()
      .subscribe((users)=>{
          this.users = users;
          console.log(this.users);
      });
      this.admin.getGrievances()
      .subscribe((grievances)=>{
          this.grievances = grievances;
          console.log(this.grievances);
      })
  }
  setPage(page: any){
      this.page = page;
  }
    
  toggleCollapsed(): void {
      
        if(this.collapsed){
           $(".sidebar").parent().css({position:'relative'});
           $(".sidebar").css({top: 0, right: 260+'px', position:'absolute', display:'block'}); 
           this.collapsed = !this.collapsed;
           $(".navbar-fixed").css({position:'relative', right: 260+'px'});
        }
          else{
          $(".sidebar").css({top: 0, right: 0, position:'absolute', display:'none'});
          this.collapsed = !this.collapsed;
          $(".navbar-fixed").css({position:'relative', right: 0+'px'});

      }
    
  }
    
  logout(){
      this.auth.logOut();
      this.router.navigate(['home']);
  }
}
