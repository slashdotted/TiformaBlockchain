import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContainerComponent } from './container/container.component';
import { LoadingModule } from './loading/loading.module';

import { UploadModule } from './upload/upload.module';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { MyInterceptor } from './interceptor/error-interceptor';
import { ErrorComponent } from './error/error.component';
import { ListCertificationStudentComponent } from './list-certification-student/list-certification-student.component';
import { ManagementUserComponent } from './management-user/management-user.component';

export function tokenGetter(){
  return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent, 
    ContainerComponent, LoginComponent, RegisterComponent, ErrorComponent, ListCertificationStudentComponent, ManagementUserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    LoadingModule,
    UploadModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [AuthGuard,
  {
    provide: HTTP_INTERCEPTORS, 
    useClass: MyInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
