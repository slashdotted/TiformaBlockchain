import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode'
import {Router} from '@angular/router'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  constructor(private router:Router) { 
    
  }

  ngOnInit() {
    
  }

  logout(){
    if(localStorage.getItem("access_token")!==null){
      localStorage.removeItem("access_token");
      this.router.navigate(['/login']);
    }
  }
  isAdmin(){
    if(localStorage.getItem("access_token")!==null){
      var decodedToken=jwt_decode(localStorage.getItem("access_token"));
      if(decodedToken.user.role==="Admin")
        return true;
      else return false;
    }else{
      return false;
    }
  }
  isLogged(){
    if(localStorage.getItem("access_token")!==null){
      return true;
    }else{
      return false;
    }
  }
}
