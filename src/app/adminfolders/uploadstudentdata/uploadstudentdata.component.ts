import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-uploadstudentdata',
  templateUrl: './uploadstudentdata.component.html',
  styleUrls: ['./uploadstudentdata.component.css']
})
export class UploadstudentdataComponent implements OnInit {

  constructor(private http :HttpClient) { }
  title = 'reportgeneration';
  data=[];
  mapping:any;
  keys:any;
  objkey:any=[];
  savingMode='SAVE'
  saveMode=false
 
 
  save(){
    for(let c of this.mapping){
      c.name=c.name.toUpperCase();
      c.rollnumber=c.rollnumber.toString().toUpperCase();
      c.department=c.department.toUpperCase();
      c.course=c.course.toUpperCase();
      c.section=c.section.toUpperCase();
      c.subjects=[];
      c.marks={}
    }
    this.http.post<any>('http://localhost:4000/savefile',this.mapping).subscribe(
      res=>{this.savingMode='Saved';this.mapping=[];this.saveMode=false;this.keys=[]},
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
   if(this.keys.length!==8){alert("invalid format");window.location.reload()}
   this.keys[0]='rollnumber';
      this.mapping = this.data.map((e) => {
         let obj:any = {};
         this.keys.forEach((key:any, i:any) => {
           this.keys[0]='rollnumber'
           this.keys[1]='name'
           this.keys[2]='year'
           this.keys[3]='sem'
           this.keys[4]='course'
           this.keys[5]='department'
           this.keys[6]='section'
           this.keys[7]='yearofjoining'
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
