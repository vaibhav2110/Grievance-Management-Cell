import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { AdminService } from '../../services/admin.service' 

@Component({
  selector: 'app-admingrievances',
  templateUrl: './admingrievances.component.html',
  styleUrls: ['./admingrievances.component.css']
})
export class AdmingrievancesComponent implements OnInit {
  @Input() grievances: any;
  selectedGrievance: any;
  response: any;
  error: any;
  success: any;
  title: any;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }
  clicked(grievance: any){
      $('.modal').css({display:'block'});
      this.title = grievance.user.name;
      this.selectedGrievance = grievance;
  }
  close(){
      $('.modal').css({display:'none'});
      this.selectedGrievance = null;
  }
  submit(grievance: any){
      this.adminService.reply(this.selectedGrievance, this.response)
      .subscribe(res=>{
          if(res.error){
              this.error = res.error;
          }
          else if(res.success){
              console.log(res);
              this.success = true;
          }
      });
      console.log(this.selectedGrievance);
      console.log(this.response);
      this.response = '';
      this.selectedGrievance = null;
      $('.modal').css({display:'none'});
  }

}
