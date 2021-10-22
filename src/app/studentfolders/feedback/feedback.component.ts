import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  allsubs:any=[];allsubques:any=[];classinfo:FormGroup;feedsub:any='';savedfeed=false
  ques:any=['q1','q2','q3','q4','q5','q6','q7','q8','q9','q10'];sel:any=''
  constructor(private http:HttpClient,private router : Router) { 
    if(sessionStorage.getItem('role')!='student'){this.router.navigate(['/'])}
    this.classinfo=new FormGroup({
  
      subjectcode:new FormControl(''),
      roll:new FormControl(''),
      remarks:new FormControl('',Validators.required),
      q1:new FormControl('',Validators.required),
      q2:new FormControl('',Validators.required),
      q3:new FormControl('',Validators.required),
      q4:new FormControl('',Validators.required),
      q5:new FormControl('',Validators.required),
      q6:new FormControl('',Validators.required),
      q7:new FormControl('',Validators.required),
      q8:new FormControl('',Validators.required),
      q9:new FormControl('',Validators.required),
      q10:new FormControl('',Validators.required),
    })

    this.http.post<any>('/api/getsubjects',{mail:sessionStorage.getItem('mail')}).subscribe(
    res=>{this.allsubs=res.subs;this.allsubques=res.subq;console.log(res)},
    err=>{console.log(err)}
) }

save(){
  this.classinfo.value.roll=sessionStorage.getItem('mail')
  this.classinfo.value.subjectcode=this.feedsub;
  this.http.post<any>('/api/studentfeedback',this.classinfo.value).subscribe(
    res=>{this.savedfeed=true},
    err=>{console.log(err)}
  )
}

  ngOnInit(): void {
  }

}
