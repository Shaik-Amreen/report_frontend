import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cotar',
  templateUrl: './cotar.component.html',
  styleUrls: ['./cotar.component.css']
})
export class CotarComponent implements OnInit {

  classinfo:FormGroup;
  coavg=['co1avg','co2avg','co3avg','co4avg','co5avg'];
  comax=['co1max','co2max','co3max','co4max','co5max'];
  constructor(private http :HttpClient) { 
    this.classinfo=new FormGroup({
      subjectcode:new FormControl('18CSE201',Validators.required),
      co1max:new FormControl('1',Validators.required),
      co2max:new FormControl('1',Validators.required),
      co3max:new FormControl('1',Validators.required),
      co4max:new FormControl('1',Validators.required),
      co5max:new FormControl('1',Validators.required),
      co1avg:new FormControl('1',Validators.required),
      co2avg:new FormControl('1',Validators.required),
      co3avg:new FormControl('1',Validators.required),
      co4avg:new FormControl('1',Validators.required),
      co5avg:new FormControl('1',Validators.required),

    })

  }

  title = 'reportgeneration';
  data=[{rollnumber:'',subjects:[{subjectfaculty:'',subjectname:''}]}];fetched=false;
  savingMode='SAVE'
  saveMode=false;
 
  save(){
    let l=[];l.push(this.classinfo.value)
    this.http.post<any>('http://localhost:4000/saveco',{data:l,name:'cotar'}).subscribe(
      res=>{this.savingMode='Saved';this.saveMode=false},
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
