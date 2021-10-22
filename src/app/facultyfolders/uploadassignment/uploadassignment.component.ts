import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-uploadassignment',
  templateUrl: './uploadassignment.component.html',
  styleUrls: ['./uploadassignment.component.css']
})
export class UploadassignmentComponent implements OnInit {

 
  classinfo:FormGroup;

  constructor(private http :HttpClient) { 
    this.classinfo=new FormGroup({
      yearofjoining:new FormControl('',Validators.required),
      year:new FormControl('',Validators.required),
      sem:new FormControl('',Validators.required),
      department:new FormControl('',Validators.required),
      subjectcode:new FormControl('',Validators.required),
      section:new FormControl('',Validators.required),
      date:new FormControl(new Date(),Validators.required),
      ques:new FormControl(''),
      cos:new FormControl('')
    })

  }

  title = 'reportgeneration';
  data=[{rollnumber:'',subjects:[{subjectfaculty:'',subjectname:''}]}];fetched=false;
  savingMode='SAVE'
  saveMode=false;
 
  save(){
    this.http.post<any>('/api/uploadassignment',this.classinfo.value).subscribe(
      res=>{if(res.message=='success'){this.savingMode='Saved';this.saveMode=false;}
          else{alert('Student data is not uploaded !');window.location.reload()}},
      err=>console.log(err)
     );
 }



 fetch(){
   this.classinfo.value.subjectcode=this.classinfo.value.subjectcode.toUpperCase();
   this.classinfo.value.section=this.classinfo.value.section.toUpperCase()
  this.http.post<any>('/api/fetchrollsection',this.classinfo.value).subscribe(
    res=>{if(res.length!=0){this.data=res;this.fetched=true;this.saveMode=true
    }
        else{alert('Subjects are not uploaded !');window.location.reload()}},
    err=>console.log(err)
   );
 }
 
 

 ngOnInit() {

 }


}
