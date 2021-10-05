import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css']
})
export class LabsComponent implements OnInit {

  classinfo:FormGroup;

  constructor(private http :HttpClient) { 
let qn=new FormArray([])
    this.classinfo=new FormGroup({
      yearofjoining:new FormControl('',Validators.required),
      year:new FormControl('',Validators.required),
      sem:new FormControl('',Validators.required),
      department:new FormControl('',Validators.required),
      subjectcode:new FormControl('',Validators.required),
      section:new FormControl('',Validators.required),
      date:new FormControl(new Date(),Validators.required),
      questions:qn,
      ques:new FormControl('')
    })

  }

  title = 'reportgeneration';
  data=[{rollnumber:'',subjects:[{subjectfaculty:'',subjectname:''}]}];fetched=false;
  savingMode='SAVE'
  saveMode=false;
 
  save(){
    this.http.post<any>('http://localhost:4000/uploadlabmarks',this.classinfo.value).subscribe(
      res=>{if(res.message=='success'){this.savingMode='Saved';this.saveMode=false;}
          else{alert('Student data is not uploaded !');window.location.reload()}},
      err=>console.log(err)
     );
 }

 get controls() { 
  return (<FormArray>this.classinfo.get('questions')).controls;
}

 fetch(){
   this.classinfo.value.subjectcode=this.classinfo.value.subjectcode.toUpperCase();
   this.classinfo.value.section=this.classinfo.value.section.toUpperCase()
  this.http.post<any>('http://localhost:4000/fetchrollsection',this.classinfo.value).subscribe(
    res=>{if(res.length!=0){this.data=res;this.fetched=true;this.saveMode=true
     for(let c of this.data){
      (<FormArray>this.classinfo.get('questions')).push(new FormGroup({
        rollnumber:new FormControl(c.rollnumber),
        marks:new FormControl('')
      }))

    }
    }
        else{alert('Subjects are not uploaded !');window.location.reload()}},
    err=>console.log(err)
   );
 }
 
 

 ngOnInit() {

 }



}
