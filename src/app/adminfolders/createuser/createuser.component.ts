import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  userSignUpForm : FormGroup
  errorMsg='';msg=false

  constructor(private http : HttpClient,private router : Router) { }

  ngOnInit(): void {
    this.signUpForm();
  }

  private signUpForm(){
    this.userSignUpForm=new FormGroup({
      'name':new FormControl('',Validators.required),
      'mail':new FormControl('',Validators.required),
      'contact':new FormControl('',Validators.required),
      'designation':new FormControl('',Validators.required),
      'role':new FormControl('',Validators.required),
      'password':new FormControl('',Validators.required),
      'confirmpassword':new FormControl('',Validators.required)
    })

  }


  onSubmitUserForm(){
    this.userSignUpForm.removeControl('confirmpassword')
    this.http.post<any>('/api/signup',this.userSignUpForm.value).subscribe(
      res=>{console.log(res);if(res.message=='success'){this.msg=true}
            else{this.errorMsg=res.message}},
      err=>this.errorMsg='User already exists'
     ); 
  }

}
