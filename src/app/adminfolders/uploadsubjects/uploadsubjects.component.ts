import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-uploadsubjects',
  templateUrl: './uploadsubjects.component.html',
  styleUrls: ['./uploadsubjects.component.css']
})
export class UploadsubjectsComponent implements OnInit {

  classinfo:FormGroup

  constructor(private http :HttpClient) { 
    this.classinfo=new FormGroup({
      yearofjoining:new FormControl('',Validators.required),
      year:new FormControl('',Validators.required),
      sem:new FormControl('',Validators.required),
      department:new FormControl('',Validators.required),
      section:new FormControl('',Validators.required)
    })
  }

  title = 'reportgeneration';
  data=[];
  mapping:any;
  keys:any;
  objkey:any=[];
  savingMode='SAVE'
  saveMode=false
 
 
  save(){
    for(let c of this.mapping){
      c.subjectname=c.subjectname.toUpperCase();
      c.subjectcode=c.subjectcode.toString().toUpperCase();
      c.subjectfaculty=c.subjectfaculty.toUpperCase()
    }
    this.classinfo.value.section=this.classinfo.value.section.toUpperCase()
    this.http.post<any>('/api/uploadsubjects',{data:this.mapping,name:this.classinfo.value}).subscribe(
      res=>{if(res.message=='success'){this.savingMode='Saved';this.mapping=[];this.saveMode=false;this.keys=[]}
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
   if(this.keys.length!==3){alert("invalid format");window.location.reload()}
   this.keys[0]='subjectcode';
      this.mapping = this.data.map((e) => {
         let obj:any = {};
         this.keys.forEach((key:any, i:any) => {
           this.keys[0]='subjectcode'
           this.keys[1]='subjectname'
           this.keys[2]='subjectfaculty'
           obj[key] = e[i];
         });
       return obj;
     }); 
     this.keys.forEach((value:any,key:any) => {
       this.objkey[key] = value
       });
       this.saveMode=true
    };
  }
  ngOnInit(): void {
  }

}
