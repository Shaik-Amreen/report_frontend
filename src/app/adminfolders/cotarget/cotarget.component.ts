import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cotarget',
  templateUrl: './cotarget.component.html',
  styleUrls: ['./cotarget.component.css']
})
export class CotargetComponent implements OnInit {

  
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
    this.http.post<any>('/api/saveco',{data:this.mapping,name:'cotarget'}).subscribe(
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
   if(this.keys.length!==6){alert("invalid format");window.location.reload()}
   this.keys[0]='subjectcode';
      this.mapping = this.data.map((e) => {
         let obj:any = {};
         this.keys.forEach((key:any, i:any) => {
           this.keys[0]='subjectcode'
           this.keys[1]='co1'
           this.keys[2]='co2'
           this.keys[3]='co3'
           this.keys[4]='co4'
           this.keys[5]='co5'
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
