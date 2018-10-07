import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { AdminService } from '../../services/admin.service' 
@Component({
  selector: 'app-adminnewusers',
  templateUrl: './adminnewusers.component.html',
  styleUrls: ['./adminnewusers.component.css']
})
export class AdminnewusersComponent implements OnInit {
  @Input() users: any;
  password: any;
  title: any = '';
  error: any;
  success: Boolean = false;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
      this.users = this.users.filter((user)=>{
          return !user.password;
      });
  }
    
  clicked(user: any){
      console.log('clicked');
      $('.modal').css({display:'block'});
      this.title = user.name
  }
  close(){
      $('.modal').css({display:'none'});
  }
  submit(user: any){
      this.adminService.assignPassword(user.roll, this.password)
      .subscribe(res=>{
          if(res.error){
              this.error = res.error;
          }
          else if(res.success){
              console.log(res);
              this.success = true;
          }
      });
      console.log(user);
      console.log(this.password);
      this.password = '';
      $('.modal').css({display:'none'});
  }

}
