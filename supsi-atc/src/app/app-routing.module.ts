import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule) },
  { path: 'departments', loadChildren: () => import('./departments/departments.module').then(m => m.DepartmentsModule) },
  { path: 'courses', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) },
  { path: 'modules', loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule) },
  { path: 'formations', loadChildren: () => import('./formation/formation.module').then(m => m.FormationModule)},
  { path: 'semesters', loadChildren: () => import('./semesters/semesters.module').then(m => m.SemestersModule) },
  { path: 'search', loadChildren: () => import('./queries/queries.module').then(m => m.QueriesModule) },
  { path: 'certifications', loadChildren: () => import('./certifications/certifications.module').then(m => m.CertificationsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }