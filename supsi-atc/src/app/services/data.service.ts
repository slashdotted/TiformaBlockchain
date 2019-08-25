import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSource = new BehaviorSubject<boolean>(false);
  currentData = this.dataSource.asObservable();

  constructor() { }

  chanceDataValue(value:boolean){
    this.dataSource.next(value);
  }
}
