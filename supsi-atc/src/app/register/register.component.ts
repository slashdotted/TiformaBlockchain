import { Component, OnInit } from '@angular/core';
import { User } from '../login/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  endpoint: string ="http://localhost:8080/register";
  user : User;

  roles=["Studente","Professore","Admin"];

  private header_object = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("access_token"));
  private header_options={
    headers: this.header_object
  };

  constructor(private http:HttpClient) { 
    this.user={
      'name' : '',
      'surname' : '',
      'username' : '',
      'password' : '',
      'role': ''
    }
  }
  ngOnInit() {
  }

  register(){
    //devo fare richiesta di registrazione
    console.log(this.user);
    console.log(this.http.post(this.endpoint,this.user,this.header_options).subscribe());
    
  }
}
