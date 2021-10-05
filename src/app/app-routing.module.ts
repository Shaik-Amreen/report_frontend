import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoComponent } from './facultyfolders/co/co.component';
import { CoclassComponent } from './facultyfolders/co/coclass/coclass.component';
import { CodetailsComponent } from './facultyfolders/co/codetails/codetails.component';
import { CopsoComponent } from './facultyfolders/co/copso/copso.component';
import { CoquesComponent } from './facultyfolders/co/coques/coques.component';
import { CotargetComponent } from './adminfolders/cotarget/cotarget.component';
import { NavbarComponent } from './adminfolders/navbar/navbar.component';
import { ReportComponent } from './adminfolders/report/report.component';
import { UploadelectivesComponent } from './adminfolders/uploadelectives/uploadelectives.component';
import { UploadmarksComponent } from './facultyfolders/uploadmarks/uploadmarks.component';
import { UploadstudentdataComponent } from './adminfolders/uploadstudentdata/uploadstudentdata.component';
import { UploadsubjectsComponent } from './adminfolders/uploadsubjects/uploadsubjects.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FacultynavbarComponent } from './facultyfolders/facultynavbar/facultynavbar.component';
import { CreateuserComponent } from './adminfolders/createuser/createuser.component';
import { ForgotPasswordsComponent } from './forgot-passwords/forgot-passwords.component';
import { LabsComponent } from './facultyfolders/labs/labs.component';
import { UploadassignmentComponent } from './facultyfolders/uploadassignment/uploadassignment.component';
import { CotarComponent } from './facultyfolders/co/cotar/cotar.component';
import { PostargetComponent } from './adminfolders/postarget/postarget.component';
import { StudentfoldersComponent } from './studentfolders/studentfolders.component';
import { IndirectattainmentComponent } from './facultyfolders/indirectattainment/indirectattainment.component';
import { FeedbackComponent } from './studentfolders/feedback/feedback.component';
import { ChangepasswordComponent } from './studentfolders/changepassword/changepassword.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'/AITS',pathMatch:'full'},
  {path:'AITS',component:LoginComponent,pathMatch:'full'},
  {path:'signup',component:SignupComponent},
  {path:'forgotpassword',component:ForgotPasswordsComponent},
  {path:'admin',component:NavbarComponent,canActivate:[AuthGuard],children:[
    {path:'',component:UploadstudentdataComponent},
    {path:'commonsubjects',component:UploadsubjectsComponent},
    {path:'reports',component:ReportComponent},
    {path:'cotarget',component:CotargetComponent},
    {path:'electives',component:UploadelectivesComponent},
    {path:'createuser',component:CreateuserComponent},
    {path:'postarget',component:PostargetComponent}
  ]},
  {path:'faculty',component:FacultynavbarComponent,canActivate:[AuthGuard],children:[
    {path:'reports',component:ReportComponent},
    {path:'assignments',component:UploadassignmentComponent},
    {path:'',component:UploadmarksComponent},
    {path:'feedback',component:IndirectattainmentComponent},
    {path:'labs',component:LabsComponent},
    {path:'co',component:CoComponent,children:[
      {path:'',component:CodetailsComponent},
      {path:'target',component:CotarComponent},
      {path:'classes',component:CoclassComponent},
      {path:'pso',component:CopsoComponent},
      {path:'coques',component:CoquesComponent}
    ]}
  ]},
  {path:'student',component:StudentfoldersComponent,canActivate:[AuthGuard],children:[
    {path:'',component:FeedbackComponent},
    {path:'changepassword',component:ChangepasswordComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor() {
  }

 ngOnInit(): void {
 }









 }
