import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var require: any;

const pdfMake=require("pdfmake/build/pdfmake");
const pdfFonts =require ("pdfmake/build/vfs_fonts");
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  classinfo:FormGroup
  roll:any=[];ques:any={};am:any={};exams:any=[];subjectfaculty:any=[]
 
  constructor(private http :HttpClient) { 
    this.classinfo=new FormGroup({
      yearofjoining:new FormControl('',Validators.required),
      year:new FormControl('',Validators.required),
      sem:new FormControl('',Validators.required),
      subjectcode:new FormControl('',Validators.required),
      subjectname:new FormControl('',Validators.required),
      department:new FormControl('',Validators.required),
    })
    
  }

  title = 'reportgeneration';fetched=false;
  savingMode='SAVE'
  saveMode=false;midone:any=[];midtwo:any=[];external:any=[];marktot:any=[];marktotal:any=[];codetails:any={}
 finaldata:any=[];marks:any=[];total:any=[];heads:any=[];finalmark:any={};midoneco:any=[];midtwoco:any=[];externalco:any=[]
 cotarget:any={};midgrade3:any={co1:0,co2:0,co3:0,co4:0,co5:0};midgrade2:any={co1:0,co2:0,co3:0,co4:0,co5:0};midgrade1:any={co1:0,co2:0,co3:0,co4:0,co5:0}
 midattempted:any={co1:0,co2:0,co3:0,co4:0,co5:0};cos:any=[];grades:any=['G3','G2','G1']; externalattempted:any={co1:0,co2:0,co3:0,co4:0,co5:0};
 externalgrade3:any={co1:0,co2:0,co3:0,co4:0,co5:0};externalgrade2:any={co1:0,co2:0,co3:0,co4:0,co5:0};externalgrade1:any={co1:0,co2:0,co3:0,co4:0,co5:0}
 ponum:any=[];postr:any=[];poarr:any=[];podmod:any={};pot:any={};
excos:any=[]
 @ViewChild('report')
 report!: ElementRef;
  
 downloadPDF()
  {
    const pdfTable = this.report.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download(this.classinfo.value.subjectcode +' - ' +this.classinfo.value.department +' - ' + this.classinfo.value.year + 'YEAR' + ' - ' +this.classinfo.value.sem + 'SEMESTER'+' - ' + this.classinfo.value.yearofjoining+  ' REPORT'); 
  }


 
 fetch(){
   this.classinfo.value.subjectcode=this.classinfo.value.subjectcode.toUpperCase()
   this.classinfo.value.subjectname=this.classinfo.value.subjectname.toUpperCase()
   this.http.post<any>('/api/fetchdata',this.classinfo.value).subscribe(
     res=>{if(res.message=='error'){alert('DATA IS INVALID');window.location.reload()}
     else{
      this.roll=res.rollnumbers;this.ques=res.ques;this.am=res.studentdata;this.codetails=res.codetails;this.subjectfaculty=res.subjectfaculty
      this.exams=res.exams;this.midoneco=res.midoneco;this.midtwoco=res.midtwoco;this.externalco=res.externalco;this.cotarget=res.cotarget
      this.postr=res.postr;this.ponum=res.ponum;this.poarr=res.posarr;this.pot=res.pot;this.excos.push(res.exco1,res.exco2,res.exco3,res.exco4,res.exco5)


     this.cos.push(...this.midoneco,...this.midtwoco) 


      for(let c of this.midoneco)
      {
        let k=this.am.mid1[c].filter((e:any)=>(e.t-e.as)!=0)
        this.midattempted[c]=k.length
        let w=this.am.mid1[c].filter((e:any)=>e.g=='3')
         this.midgrade3[c]=w.length;
         w=this.am.mid1[c].filter((e:any)=>e.g=='2')
         this.midgrade2[c]=w.length;
         w=this.am.mid1[c].filter((e:any)=>e.g=='1')
         this.midgrade1[c]=w.length;
      }
      for(let c of this.midtwoco)
      {
        let k=this.am.mid2[c].filter((e:any)=>(e.t)!=0)
        this.midattempted[c]=k.length;
        let w=this.am.mid2[c].filter((e:any)=>e.g=='3')
         this.midgrade3[c]=w.length;
         w=this.am.mid2[c].filter((e:any)=>e.g=='2')
         this.midgrade2[c]=w.length;
         w=this.am.mid2[c].filter((e:any)=>e.g=='1')
         this.midgrade1[c]=w.length;
      }
console.log(res)
      for(let c of this.externalco)
      {
        let k=this.am.external[c].filter((e:any)=>(e.t)!=0)
        this.externalattempted[c]=k.length
        let w=this.am.external[c].filter((e:any)=>e.g=='3')
         this.externalgrade3[c]=w.length;
         w=this.am.external[c].filter((e:any)=>e.g=='2')
         this.externalgrade2[c]=w.length;
         w=this.am.external[c].filter((e:any)=>e.g=='1')
         this.externalgrade1[c]=w.length;
      }
     
      for(let p of this.ponum){let mod:any=0
      for(let c of this.poarr[p]){
      
        mod=mod+((0.7*((this.externalgrade3[c]/this.externalattempted[c])*100))+(0.3*((this.midgrade3[c]/this.midattempted[c])*100)))
      }
      mod=mod/(this.poarr[p].length)
      this.podmod[p]=mod
      }
      this.fetched=true;
    }},
     err=>console.log(err)
    );
  }

  ngOnInit(): void {
  }


}
