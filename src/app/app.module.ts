import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadstudentdataComponent } from './adminfolders/uploadstudentdata/uploadstudentdata.component';
import { NavbarComponent } from './adminfolders/navbar/navbar.component';
import { UploadsubjectsComponent } from './adminfolders/uploadsubjects/uploadsubjects.component';
import { UploadelectivesComponent } from './adminfolders/uploadelectives/uploadelectives.component';
import { UploadmarksComponent } from './facultyfolders/uploadmarks/uploadmarks.component';
import { CoComponent } from './facultyfolders/co/co.component';
import { CodetailsComponent } from './facultyfolders/co/codetails/codetails.component';
import { CotargetComponent } from './adminfolders/cotarget/cotarget.component';
import { CoclassComponent } from './facultyfolders/co/coclass/coclass.component';
import { CopsoComponent } from './facultyfolders/co/copso/copso.component';
import { CoquesComponent } from './facultyfolders/co/coques/coques.component';
import { ReportComponent } from './adminfolders/report/report.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptor } from './token.interceptor'
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CreateuserComponent } from './adminfolders/createuser/createuser.component';
import { FacultynavbarComponent } from './facultyfolders/facultynavbar/facultynavbar.component';
import { ForgotPasswordsComponent } from './forgot-passwords/forgot-passwords.component';
import { LabsComponent } from './facultyfolders/labs/labs.component';
import { UploadassignmentComponent } from './facultyfolders/uploadassignment/uploadassignment.component';
import { CotarComponent } from './facultyfolders/co/cotar/cotar.component';
import { PostargetComponent } from './adminfolders/postarget/postarget.component';
import { StudentfoldersComponent } from './studentfolders/studentfolders.component';
import { IndirectattainmentComponent } from './facultyfolders/indirectattainment/indirectattainment.component';
import { FeedbackComponent } from './studentfolders/feedback/feedback.component';
import { ChangepasswordComponent } from './studentfolders/changepassword/changepassword.component';
@NgModule({
  declarations: [
    AppComponent,
    UploadstudentdataComponent,
    NavbarComponent,
    UploadsubjectsComponent,
    UploadelectivesComponent,
    UploadmarksComponent,
    CoComponent,
    CodetailsComponent,
    CotargetComponent,
    CoclassComponent,
    CopsoComponent,
    CoquesComponent,
    ReportComponent,
    LoginComponent,
    SignupComponent,
    CreateuserComponent,
    FacultynavbarComponent,
    ForgotPasswordsComponent,
    LabsComponent,
    UploadassignmentComponent,
    CotarComponent,
    PostargetComponent,
    StudentfoldersComponent,
    IndirectattainmentComponent,
    FeedbackComponent,
    ChangepasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:  [AuthService,AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
