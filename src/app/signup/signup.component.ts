import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
   userExists=false;errmsg=''
  adminSignUpForm:FormGroup
  constructor(private http : HttpClient,private router : Router) {
    
    this.adminSignUpForm=new FormGroup({
      'name':new FormControl('',Validators.required),
      'mail':new FormControl('',Validators.required),
      'contact':new FormControl('',Validators.required),
      'designation':new FormControl('',Validators.required),
      'password':new FormControl('',Validators.required),
      'confirmpassword':new FormControl('',Validators.required),
      'role':new FormControl('admin',Validators.required),
    })
    
   
     
   
     
   }



    

  
  
 
  onAdminSubmit()
  {
    this.adminSignUpForm.removeControl('confirmpassword')
    this.http.post<any>('/api/signup',this.adminSignUpForm.value).subscribe(
      res=>{
        if(res.message=='success')
          {
            sessionStorage.setItem('mail', res.user);
            localStorage.setItem('token',res.token)
            this.router.navigate(['/AITS'])
          }
        else
        {
          this.userExists=true
        }
      },
      err=>console.log(err)
     );
  }

     ngOnInit(){
      
    }
  
   
  }


