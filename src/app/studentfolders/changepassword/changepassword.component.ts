import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
pass:FormGroup;change=false
  constructor(private http : HttpClient) {
    this.pass=new FormGroup({
      'mail':new FormControl(sessionStorage.getItem('mail')),
      'password':new FormControl('',Validators.required),
      'confirmpassword':new FormControl('',Validators.required),

    })
    
   }

   save(){
     if(this.pass.status!='VALID'){
       alert('INVALID DETAILS');window.location.reload()
     }
     else{
      this.http.post<any>('http://localhost:4000/changepassword',this.pass.value).subscribe(
        res=>{this.change=true},
        err=>{console.log(err)}
      )
     }
   }

  ngOnInit(): void {
  }

}
