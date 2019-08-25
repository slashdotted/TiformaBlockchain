import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  static message:string="URL inesistente";

  constructor() { 
    
  }

  ngOnInit() {
  }
  get message(){
    return ErrorComponent.message;
  }

}
