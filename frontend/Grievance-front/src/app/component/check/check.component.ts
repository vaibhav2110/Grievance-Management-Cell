import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery'; 

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  @Input() show: Boolean;
  constructor() { }

  ngOnInit() {
      if(this.show){
          $(".trigger").toggleClass("drawn");
          this.show = false;
      }
  }

}
