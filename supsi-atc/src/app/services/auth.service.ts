import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private token:string) {
    token="";
   }
  isAuthenticated() : boolean {
    return true;
    if (this.token===""){
      return false;
    }else{
      //TODO:controllare validità del token
      return true;
    }
  }
}
