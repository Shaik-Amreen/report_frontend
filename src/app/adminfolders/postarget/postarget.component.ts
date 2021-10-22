import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-postarget',
  templateUrl: './postarget.component.html',
  styleUrls: ['./postarget.component.css']
})
export class PostargetComponent implements OnInit {

  
  
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
      c.subjectcode=c.subjectcode.toString().toUpperCase();
    }
    this.http.post<any>('/api/saveco',{data:this.mapping,name:'potarget'}).subscribe(
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
   if(this.keys.length!==16){alert("invalid format");window.location.reload()}
   this.keys[0]='subjectcode';
      this.mapping = this.data.map((e) => {
         let obj:any = {};
         this.keys.forEach((key:any, i:any) => {
           this.keys[0]='subjectcode'
           this.keys[1]='po1'
           this.keys[2]='po2'
           this.keys[3]='po3'
           this.keys[4]='po4'
           this.keys[5]='po5'
           this.keys[6]='po6'
           this.keys[7]='po7'
           this.keys[8]='po8'
           this.keys[9]='po9'
           this.keys[10]='po10'
           this.keys[11]='po11'
           this.keys[12]='po12'
           this.keys[13]='po13'
           this.keys[14]='po14'
           this.keys[15]='po15'
           
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
