import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  endpoint = 'http://localhost:8080/';
  queriesEndpoint = 'http://localhost:8080/queries/';
  static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization":"Bearer "+localStorage.getItem("access_token")
    })
  };
  /*private static header_object = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("access_token"));
  private static header_options={
    headers: RestService.header_object
  };*/
  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  static update(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization":"Bearer "+localStorage.getItem("access_token")
      })
    };
  }
  getAll(baseType): Observable<any> {
    return this.http.get(this.endpoint + baseType,RestService.httpOptions).pipe(
      map(this.extractData));
  }

  getStudentsByName(name): Observable<any>{
    return this.http.get(this.queriesEndpoint+'selectStudentByName?paramName='+name,RestService.httpOptions).pipe(
      map(this.extractData));
  }

  getStudentsBySurname(surname): Observable<any>{
    return this.http.get(this.queriesEndpoint+'selectStudentsBySurname?paramSurname='+surname,RestService.httpOptions).pipe(
      map(this.extractData));
  }
  getStudentsBySerialNumber(serialNumber):Observable<any>{
    return this.http.get(this.queriesEndpoint+'selectStudentsBySerialNumber?paramSerialNumber='+serialNumber,RestService.httpOptions).pipe(
      map(this.extractData));
  }

  getDepartmentsByName(name):Observable<any>{
    return this.http.get(this.queriesEndpoint+'selectDepartmentByName?paramName='+name,RestService.httpOptions).pipe(
      map(this.extractData));
  }

  createStudent(student): Observable<any>{
    return this.http.post(this.endpoint+"CreateStudent",student,RestService.httpOptions).pipe(map(this.extractData));
  }

  getCoursesByName(courseName) : Observable<any>{
    return this.http.get(this.queriesEndpoint+'selectCoursesByName?paramName='+courseName,RestService.httpOptions).pipe(
      map(this.extractData));
  }

  getCoursesByCourseCode(courseCode) : Observable<any>{
    return this.http.get(this.queriesEndpoint+'selectCoursesByCourseCode?paramCourseCode='+courseCode,RestService.httpOptions).pipe(
      map(this.extractData));
  }

  getModulesByName(moduleName) : Observable <any>{
    return this.http.get(this.queriesEndpoint+'selectModulesByName?paramName='+moduleName,RestService.httpOptions).pipe(
      map(this.extractData));
  }
  getModulesByModuleCode(moduleCode) : Observable <any>{
    return this.http.get(this.queriesEndpoint+'selectModulesByModuleCode?paramModuleCode='+moduleCode,RestService.httpOptions).pipe(
      map(this.extractData));
  }

  getStudyPlanByName(studyplanName) : Observable<any>{
    return this.http.get(this.queriesEndpoint+'selectStudyPlanByName?paramstudyplanName='+studyplanName,RestService.httpOptions).pipe(
      map(this.extractData));
  }

  getStudentModulesByModuleCode(studentModuleCode) : Observable<any>{
    return this.http.get(this.queriesEndpoint+'selectStudyPlanByModuleCode?paramModuleCode='+studentModuleCode,RestService.httpOptions).pipe(
      map(this.extractData));
  }

  getSemestersByName(semesterName) : Observable<any>{
    return this.http.get(this.queriesEndpoint+'selectSemestersByName?paramName='+semesterName,RestService.httpOptions).pipe(
      map(this.extractData));
  }

  getSemestersByModuleCode(semesterModuleCode) : Observable<any>{
    return this.http.get(this.queriesEndpoint+'selectSemestersByModuleCode?paramModuleCode='+semesterModuleCode,RestService.httpOptions).pipe(
      map(this.extractData));
  }
 getCertificationByStudentName(studentName){
  return this.http.get(this.queriesEndpoint+'selectCertificationByStudentName?paramStudentName='+studentName,RestService.httpOptions).pipe(
    map(this.extractData));
 }
 getCertificationByStudentSurname(studentSurname){
  return this.http.get(this.queriesEndpoint+'selectCertificationByStudentSurame?paramStudentSurname='+studentSurname,RestService.httpOptions).pipe(
    map(this.extractData));
 }

 getCertificationByStudentModuleCode(moduleCode){
  return this.http.get(this.queriesEndpoint+'selectCertificationByModuleCode?paramModuleCode='+moduleCode,RestService.httpOptions).pipe(
    map(this.extractData));
 }
  getObject(baseType, id): Observable<any> {
    return this.http.get(this.endpoint + baseType + '/' + id,RestService.httpOptions).pipe(
      map(this.extractData));
  }

  addObject(baseType, obj): Observable<any> {
    console.log(obj);
    return this.http.post<any>(this.endpoint + baseType, JSON.stringify(obj), RestService.httpOptions).pipe(
      catchError(this.handleError<any>('addObject'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  updateObject (baseType, id, object): Observable<any> {
    return this.http.put(this.endpoint + baseType + '/' + id, JSON.stringify(object), RestService.httpOptions).pipe(
      catchError(this.handleError<any>('updateObject'))
    );
  }
  
  deleteObject (baseType, id): Observable<any> {
    return this.http.delete<any>(this.endpoint + baseType + '/' + id, RestService.httpOptions).pipe(
      //tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }
}
