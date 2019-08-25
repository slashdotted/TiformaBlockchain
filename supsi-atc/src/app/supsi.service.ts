import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SUPSIService {

  // Endpoint di base per tutti i link, generato da Hyperledger
  private endpoint = 'http://localhost:8080/';
  private static header_object = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("access_token"));
  private static header_options={
    headers: SUPSIService.header_object
  };

  constructor(private http: HttpClient) { }

  // Ritorna tutti gli elementi, esempio http://localhost:3000/api/Student
  getElements(type: String) {    
    return this.http.get(this.endpoint + type,SUPSIService.header_options);
  }

  // Ritorna un singolo elemento selezionato dall'ID, esempio http://localhost:3000/api/Student/5
  getElement(type: String, id) {
    console.log(this.endpoint + type + '/' + id);
    return this.http.get(this.endpoint + type + '/' + id,SUPSIService.header_options);
  }

  // Aggiorna un singolo elemento selezionato dall'ID passandoli un oggetto JSON, esempio http://localhost:3000/api/Student/5
  updateElement(type: String, id, elementData) {
    return this.http.put(this.endpoint + type + '/' + id, elementData,SUPSIService.header_options);
  }

  // Elimina un singolo elemento selezionato dall'ID, esempio http://localhost:3000/api/Student/5
  deleteElement(type: String, id) {
    return this.http.delete(this.endpoint + type + '/' + id,SUPSIService.header_options);
  }

  // Esegue le transazioni custom create passandoli un elemento JSON, esempio http://localhost:3000/api/CreateStudent
  operationToElement(type: String, elementData) {
    const formData = new FormData();
    formData.append('file', elementData);
    let typo=type.split('/')[1];
    if(typo==="Upload")    return this.http.post(this.endpoint + type,formData,SUPSIService.header_options);
    return this.http.post(this.endpoint + type,elementData,SUPSIService.header_options);
  }

  static update(){
    SUPSIService.header_object = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("access_token"));
    SUPSIService.header_options={
      headers: SUPSIService.header_object
    };
  }
}
