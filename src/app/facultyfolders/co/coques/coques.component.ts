import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-coques',
  templateUrl: './coques.component.html',
  styleUrls: ['./coques.component.css']
})
export class CoquesComponent implements OnInit {

   
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
    this.http.post<any>('/api/savecoques',{data:this.mapping,name:'coquestion'}).subscribe(
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
      console.log(this.keys)
   if(this.keys.length<4){alert("invalid format");window.location.reload()}
   this.keys[0]='subjectcode';
      this.mapping = this.data.map((e) => {
         let obj:any = {};
         this.keys.forEach((key:any, i:any) => {
           this.keys[0]='subjectcode'
           this.keys[1]='examtype'
          if(key=='examtype'){
            if(e[i]=='mid1')
            {
              this.keys[2]='co1'
           this.keys[3]='co2'
            }
            if(e[i]=='mid2')
            {
              this.keys[2]='co3'
           this.keys[3]='co4'
           this.keys[4]='co5'
            }
            if(e[i]=='external')
            {
              this.keys[2]='co1'
              this.keys[3]='co2'
              this.keys[4]='co3'
              this.keys[5]='co4'
              this.keys[6]='co5'
            }
          }
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
