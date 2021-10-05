import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-indirectattainment',
  templateUrl: './indirectattainment.component.html',
  styleUrls: ['./indirectattainment.component.css']
})
export class IndirectattainmentComponent implements OnInit {

  classinfo:FormGroup;

  constructor(private http :HttpClient) { 

    this.classinfo=new FormGroup({
  
      subjectcode:new FormControl('',Validators.required),
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

  }

  ques:any=['q1','q2','q3','q4','q5','q6','q7','q8','q9','q10']

  title = 'reportgeneration';
  data=[{rollnumber:'',subjects:[{subjectfaculty:'',subjectname:''}]}];fetched=false;
  savingMode='SAVE'
  saveMode=false;
 
  save(){
    this.http.post<any>('http://localhost:4000/feedback',this.classinfo.value).subscribe(
      res=>{if(res.message=='saved'){this.savingMode='Saved';this.saveMode=false;}
          else{alert('Student data is not uploaded !');window.location.reload()}},
      err=>console.log(err)
     );
 }


 
 
 
 

 ngOnInit() {

 }



}
