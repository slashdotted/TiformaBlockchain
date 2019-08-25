import { Component, OnInit } from '@angular/core';

import *  as $ from 'jquery';
import { RestService } from '../../rest.service';
import { Student } from '../../ch.supsi';

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css']
})
export class MainSearchComponent implements OnInit {

  constructor(private restService : RestService) { }

  ngOnInit() {
    this.getType();
    this.getFilter();
  }

  type : String;
  filter: String;
  searchValue: string;

  found : any = [];


  getType(){
    this.type = (String)($("#Type").val());
  }

  getFilter(){
    this.filter = (String)($("#Filter").val());
  }

  getSearchValue(){
    this.searchValue = (String)($("#searchValue").val());
  }

  find(){
    this.getType();
    this.getFilter();
    this.getSearchValue();
    
    console.log("Type: "+this.type+".\nFilter: "+this.filter+".\nSearch Value: "+this.searchValue+".");

    switch(this.type){
      case "Studenti": {
        switch(this.filter){
          case "Name":{
            this.findStudentsByName();
            break;
          }
          case "Surname":{
            this.findStudentsBySurname();
            break;
          }
          case "SerialNumber":{
            this.findStudentsBySerialNumber();
            break;
          }
        }
        break;
      }
      case "Dipartimenti": {
        switch(this.filter){
          case "Name":{
            this.findDepartmentByName();
            break;
          }
        }
        break;
      }
      case "Corsi": {
        switch(this.filter){
          case "Name":{
            this.findCoursesByName();
            break;
          }
          case "CourseCode":{
            this.findCoursesByCourseCode();
            break;
          }
        }
        break;
      }
      case "Moduli": {
        switch(this.filter){
          case "Name":{
            this.findModulesByName();
            break;
          }
          case "ModuleCode":{
            this.findModulesByModuleCode();
            break;
          }
        }
        break;
      }
      case "Formazioni": {
        switch(this.filter){
          case "Name":{
            this.findStudyPlansByName();
            break;
          }
          case "StudyPlanContainsModule":{
            this.findStudyPlansByModuleCode();
            break;
          }
        }
        break;
      }
      case "Semestri": {
        switch(this.filter){
          case "Name":{
            this.findSemestersByName();
            break;
          }
          case "SemesterContainsModule":{
            this.findSemestersByModuleCode();
            break;
          }
        }
        break;
      }
      case "Certificazioni": {
        switch(this.filter){
          case "CertificationStudentName":{
            this.findCertificationsByStudentName();
            break;
          }
          case "CertificationStudentSurname":{
            this.findCertificationsByStudentSurname();
            break;
          }
          case "CertificationModule":{
            this.findCertificationsByModuleCode();
            break;
          }
        }
        break;
      }
    }
  }
  
  findStudentsByName(){
   this.restService.getStudentsByName(this.searchValue.toString()).subscribe(students => {
     this.found = students;
    });
  }

  findStudentsBySurname(){
    
   this.restService.getStudentsBySurname(this.searchValue.toString()).subscribe(students => {
    this.found = students;
    });
  }

  findStudentsBySerialNumber(){
    
   this.restService.getStudentsBySerialNumber(this.searchValue.toString()).subscribe(students => {
    this.found = students;
    });
  }

  findDepartmentByName(){
    
   this.restService.getDepartmentsByName(this.searchValue.toString()).subscribe(departments => {
    this.found = departments;
     

    });
  }

  findCoursesByName(){
    
   this.restService.getCoursesByName(this.searchValue.toString()).subscribe(courses => {
    this.found = courses;
    });
  }

  findCoursesByCourseCode(){ 
    this.restService.getCoursesByCourseCode(this.searchValue.toString()).subscribe(courses => {
    this.found= courses;
    });
  }

  findModulesByName(){
   
   this.restService.getModulesByName(this.searchValue.toString()).subscribe(modules => {
    this.found  = modules;
    });
  }

  findModulesByModuleCode(){
    
   this.restService.getModulesByModuleCode(this.searchValue.toString()).subscribe(modules => {
    this.found = modules;
    });
  }

  findStudyPlansByName(){
   
    this.restService.getStudyPlanByName(this.searchValue.toString()).subscribe(studyPlans => {
      this.found = studyPlans;
     });
  }

  findStudyPlansByModuleCode(){
  
    this.restService.getStudentModulesByModuleCode(this.searchValue.toString()).subscribe(studyPlans => {
      this.found = studyPlans;
      
     });
  }

  findSemestersByName(){
    
    this.restService.getSemestersByName(this.searchValue.toString()).subscribe(semesters => {
      this.found = semesters;
     });
  }

  findSemestersByModuleCode(){
    
    this.restService.getSemestersByModuleCode(this.searchValue.toString()).subscribe(semesters => {
      this.found = semesters;
       
 
     
     });
  }

  findCertificationsByStudentName(){
    
    this.restService.getCertificationByStudentName(this.searchValue.toString()).subscribe(certifications => {
      this.found = certifications;
     });
  }

  findCertificationsByStudentSurname(){
    
    this.restService.getCertificationByStudentSurname(this.searchValue.toString()).subscribe(certifications => {
      this.found = certifications;
     });
  }

  findCertificationsByModuleCode(){
    let allCertifications = [];
    this.restService.getAll('Certification').subscribe(certifications => {
      allCertifications = certifications;
      this.found = [];
 
      for(let i = 0; i<allCertifications.length; i++){

        this.restService.getObject('Module',allCertifications[i].module.toString().split('#')[1]).subscribe(module =>{
          if(module.moduleCode.toString().includes(this.searchValue.toString())){
            this.found.push(allCertifications[i]);
          }
        })
      }
     });
  }
}