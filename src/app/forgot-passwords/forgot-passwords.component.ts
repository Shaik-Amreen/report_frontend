import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-passwords',
  templateUrl: './forgot-passwords.component.html',
  styleUrls: ['./forgot-passwords.component.css']
})
export class ForgotPasswordsComponent implements OnInit {
  password='';confirm=''
  constructor(private router : Router,private http:HttpClient) { 
    if(localStorage.getItem('mail')===null){
      this.router.navigate(['/login'])
    }
    
  }

  ngOnInit(): void {
  }

  onsubmit(f:NgForm){
    this.http.post<any>('/resetpassword',{'mail':localStorage.getItem('mail'),'password':f.value.password}).subscribe(
      res=>{if(res.message=='success'){this.router.navigate(['/login'])}},
      err=>console.log(err)
    )
  }

}
