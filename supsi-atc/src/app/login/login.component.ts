import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavbarComponent } from '../navbar/navbar.component';
import { SUPSIService } from '../supsi.service';
import { RestService } from '../rest.service';
import { ManagementUserComponent } from '../management-user/management-user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  endpoint: string ="http://localhost:8080/login";
  user : User;
  error : boolean;
  isAdmin : boolean;
  constructor(private http:HttpClient, private router: Router) { 
    this.user={
      'name' : '',
      'surname' : '',
      'username' : '',
      'password' : '',
      'role':''
    };
    this.error=false;
    
  }

  ngOnInit() {
    
  }
  login(){
    //devo fare la richiesta al middleware tramite un json se le utenze sono corrette 
    console.log(this.http.post<{token: string}>(this.endpoint,this.user).pipe(map(result => {
      localStorage.setItem('access_token', result.token);
      SUPSIService.update();
      RestService.update();
      ManagementUserComponent.update();
      this.router.navigate(['/students']);//se non lo metto non fuziona la prima volta
      this.router.navigate(['/students']);
    })).subscribe(
      ()=>{},
      (err)=>{//gestisco l'errore in modo da far comparire il popup in caso di credenziali sbagliate
        if(err!=null){
          this.error=true;
        }
      }
    ));
  }
  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

}
