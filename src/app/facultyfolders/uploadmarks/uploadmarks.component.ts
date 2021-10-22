import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-uploadmarks',
  templateUrl: './uploadmarks.component.html',
  styleUrls: ['./uploadmarks.component.css']
})
export class UploadmarksComponent implements OnInit {

  
  classinfo:FormGroup;

  constructor(private http :HttpClient) { 
    this.classinfo=new FormGroup({
      yearofjoining:new FormControl('',Validators.required),
      year:new FormControl('',Validators.required),
      sem:new FormControl('',Validators.required),
      department:new FormControl('',Validators.required),
      examtype:new FormControl(''),
      subjectcode:new FormControl('',Validators.required),
      assignum:new FormControl(1),
    })

  }

  title = 'reportgeneration';
  data=[{rollnumber:''}];fetched=false;
  mapping:any;
  keys:any
  objkey:any=[];
  savingMode='SAVE'
  saveMode=false;
 finaldata:any=[]
  save(){
   this.classinfo.value.subjectcode=this.classinfo.value.subjectcode.toUpperCase()
    this.http.post<any>('/api/uploadmarks',{name:this.classinfo.value,data:this.mapping}).subscribe(
      res=>{if(res.message=='success'){this.savingMode='Saved';this.saveMode=false;}
          else{alert('Student data is not uploaded !');window.location.reload()}},
      err=>console.log(err)
     );
 }


 onfilesubmit(evt: any) {
  const reader: FileReader = new FileReader();
  reader.readAsBinaryString(evt.target.files[0]);

  reader.onload = (x: any) => {
    const bstr: string = x.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
    this.keys= this.data.shift(); 
    console.log(this.keys.length)

 if(this.keys.length!==2 && this.classinfo.value.examtype=='assignment'){alert("invalid format");window.location.reload()}
 if(this.keys.length!==14 && (this.classinfo.value.examtype=='mid1' ||this.classinfo.value.examtype=='mid2') ){alert("invalid format");window.location.reload()}
 if(this.keys.length!==21 && this.classinfo.value.examtype=='external'){alert("invalid format");window.location.reload()}
 
 this.keys[0]='rollnumber';
 this.mapping = this.data.map((e:any) => {
    let obj:any = {};
    this.keys.forEach((key:any, i:any) => {
      this.keys[0]='rollnumber'
      if(this.classinfo.value.examtype=='assignment'){
        console.log(this.classinfo.value.assignum)
        this.keys[1]=`q${this.classinfo.value.assignum}`
      }
      if(this.classinfo.value.examtype=='mid1' || this.classinfo.value.examtype=='mid2')
      {this.keys[1]='o1';this.keys[2]='o2';this.keys[3]='o3';this.keys[4]='o4';this.keys[5]='o5';
        this.keys[6]='q1';this.keys[7]='q2';this.keys[8]='q3';this.keys[9]='q4';this.keys[10]='q5';this.keys[11]='q6';this.keys[12]='q7';
        this.keys[13]='q8';this.keys[14]=''}
      if(this.classinfo.value.examtype=='external'){
        this.keys[1]='o1';this.keys[2]='o2';this.keys[3]='o3';this.keys[4]='o4';this.keys[5]='o5';
        this.keys[6]='o6';this.keys[7]='o7';this.keys[8]='o8';
        this.keys[9]='o9';this.keys[10]='o10',
        this.keys[11]='q1';this.keys[12]='q2';this.keys[13]='q3';this.keys[14]='q4';this.keys[15]='q5';this.keys[16]='q6';
        this.keys[17]='q7';this.keys[18]='q8';
        this.keys[19]='q9';this.keys[20]='q10'}
      obj[key] = e[i];
    });
  return obj;
}); 
this.keys.forEach((value:any,key:any) => {
  this.objkey[key] = value
  });
  this.saveMode=true
  console.log(this.mapping)
  };
}


 fetch(){
 this.classinfo.value.subjectcode=this.classinfo.value.subjectcode.toString().toUpperCase()
  this.http.post<any>('/api/fetchroll',this.classinfo.value).subscribe(
    res=>{if(res.message!='error'){this.data=res;this.fetched=true;
    }
        else{alert('Subjects are not uploaded !');}},
    err=>console.log(err)
   );
 }
 
 

 ngOnInit() {

 }


}
