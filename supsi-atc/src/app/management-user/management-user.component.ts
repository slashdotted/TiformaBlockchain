import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-management-user',
  templateUrl: './management-user.component.html',
  styleUrls: ['./management-user.component.css']
})
export class ManagementUserComponent implements OnInit {

  private endpoint="http://localhost:8080/";
  private static header_object = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("access_token"));
  private static header_options={
    headers: ManagementUserComponent.header_object
  };
  private users;

  constructor(private http: HttpClient) {
    this.http.get(this.endpoint+"users",ManagementUserComponent.header_options).subscribe((data)=>{
      this.users=data;
    });
   }

  ngOnInit() {


  }
  deleteUser(user){
    this.http.get(this.endpoint+"users/delete/"+user,ManagementUserComponent.header_options).subscribe((data)=>{
      window.location.reload();
    },(err)=>{
      console.log(err);
    });
  }
  static update() {
    ManagementUserComponent.header_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token"));
    ManagementUserComponent.header_options = {
      headers: ManagementUserComponent.header_object
    }
  }
}
