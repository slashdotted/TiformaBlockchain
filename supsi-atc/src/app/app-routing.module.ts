import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guards/auth-guard.service';
import {RegisterComponent} from './register/register.component'
import {ErrorComponent} from './error/error.component'

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent, canActivate:[AuthGuard]},
  
  { path: 'students', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule) , canActivate:[AuthGuard]},
  { path: 'departments', loadChildren: () => import('./departments/departments.module').then(m => m.DepartmentsModule), canActivate:[AuthGuard] },
  { path: 'courses', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule), canActivate:[AuthGuard] },
  { path: 'modules', loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule), canActivate:[AuthGuard] },
  { path: 'formations', loadChildren: () => import('./formation/formation.module').then(m => m.FormationModule), canActivate:[AuthGuard]},
  { path: 'semesters', loadChildren: () => import('./semesters/semesters.module').then(m => m.SemestersModule) , canActivate:[AuthGuard]},
  { path: 'search', loadChildren: () => import('./queries/queries.module').then(m => m.QueriesModule) , canActivate:[AuthGuard]},
  { path: 'certifications', loadChildren: () => import('./certifications/certifications.module').then(m => m.CertificationsModule), canActivate:[AuthGuard]},
  { path:'**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }