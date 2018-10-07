import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-adminallusers',
  templateUrl: './adminallusers.component.html',
  styleUrls: ['./adminallusers.component.css']
})
export class AdminallusersComponent implements OnInit {
    
  @Input() users: any;
  constructor() { }

  ngOnInit() {
  }

}
