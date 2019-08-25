import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import {Router} from '@angular/router';
import { ErrorComponent } from "../error/error.component";

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private router : Router) { }
  //function which will be called for all http calls
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    console.log("sono dentro l'interceptor");
    return next.handle(request).pipe(
        tap(() => { }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status == 401) {
                    console.log("error 401 rillevato");
                    ErrorComponent.message="Errore di autenticazione: non hai le credenziali";
                    this.router.navigate(['/error']);     
                }
            }
        }));

    }
}