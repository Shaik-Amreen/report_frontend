const fs = require('fs');
const bcrypt = require("bcrypt");
const  verifyToken  = require('./verifyToken');
const JWTSECRET = 'harshapriyaamreenkousar'
const jwt = require("jsonwebtoken")
const encodeBuffer = buffer => buffer.toString('base64')
const encodeString = string => encodeBuffer(Buffer.from(string))
const encodeData = data => encodeString(JSON.stringify(data))
const encrypt = (data) => {
  if (Buffer.isBuffer(data)) return encodeBuffer(data)
  if (typeof data === 'string') return encodeString(data)
  return encodeData(data)
}


exports.savefile = verifyToken,(req,res,next) =>{
    
    req.body.sort((a,b)=>(a.rollnumber>b.rollnumber)?1:(b.rollnumber>a.rollnumber)?-1:0)
    // create a JSON object

let a=req.body[0]
// convert JSON object to string
let data = JSON.stringify(req.body);
// write JSON string to a file
fs.writeFile(`files/studentdata/ ${a.yearofjoining} - ${a.year} year - ${a.sem} sem - ${a.department}.json`, data, (err,docs) => {
    
    fs.readFile(`files/users.json`, 'utf8' , (err, docsa) => {
        if(err)
        {
            res.send({message:'user already exists'})
        }
        // convert JSON object to string
        else{
            data=JSON.parse(data);
            docsa=JSON.parse(docsa)
             
            const hashpassword = async (c)=>{
                passwordhashed= await bcrypt.hash(c.rollnumber,10);
                const token = jwt.sign({subject:c.rollnumber},JWTSECRET)
                tokenHashed=  encrypt(token)
                fs.readFile(`files/users.json`, 'utf8' , (err, docs) => {
                    if(err)
                    {
                        res.send({message:'user already exists'})
                    }
                    else{
                         docsa.push({mail:c.rollnumber,password:passwordhashed,year:a.year,department:a.department,sem:a.sem,yearofjoining:a.yearofjoining,token:tokenHashed})
                         docsa=JSON.stringify(docsa)
                            fs.writeFile(`files/users.json`,docsa, (es,ds) => {
                                   console.log(".")
                            })
                            docsa=JSON.parse(docsa)
                        }
                  })
               }

             for(let c of data){
                 let g=docsa.filter(e=>e.mail==c.rollnumber);
                 if(g.length==0){hashpassword(c)}
                 else{
                     for(let d of docsa)
                     {
                         if(c.rollnumber==d.mail)
                         {
                             d.year=c.year;d.sem=c.sem
                         }
                     }
                     docsa=JSON.stringify(docsa)
                     fs.writeFile(`files/users.json`,docsa, (es,ds) => {
                        console.log(".")
                 })
                 docsa=JSON.parse(docsa)
                 }
             }
res.send({message:'saved'})
              
        }
      })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
   
});
   }



   exports.saveco = verifyToken,(req,res,next) =>{

    fs.readFile(`files/${req.body.name}.json`, 'utf8' , (err, docs) => {
        // convert JSON object to string
        if (err || docs.length==0) {
            const data = JSON.stringify(req.body.data);
        // write JSON string to a file
            fs.writeFile(`files/${req.body.name}.json`, data, (err,docs) => {
                res.send({message:'saved'})
            });
        }
        else{
           docs=JSON.parse(docs)
            docs= docs.filter((elem) => !req.body.data.find(({ subjectcode }) => elem.subjectcode === subjectcode));
           docs.push(...req.body.data)
           docs=JSON.stringify(docs)
           fs.writeFile(`files/${req.body.name}.json`,docs, (err,docs) => {
            res.send({message:'saved'})
        })
        }
      })

   }

   exports.savecoques = verifyToken,(req,res,next) =>{

    fs.readFile(`files/${req.body.name}.json`, 'utf8' , (err, docs) => {
        // convert JSON object to string
        if (err) {
            const data = JSON.stringify(req.body.data);
        // write JSON string to a file
            fs.writeFile(`files/${req.body.name}.json`, data, (err,docs) => {
                res.send({message:'saved'})
            });
        }
        else{
           docs=JSON.parse(docs)
           docs= docs.filter((elem) => !req.body.data.find(({ subjectcode,examtype }) => elem.subjectcode == subjectcode && elem.examtype ==examtype));
           docs.push(...req.body.data)
           docs=JSON.stringify(docs)
           fs.writeFile(`files/${req.body.name}.json`,docs, (err,docs) => {
            res.send({message:'saved'})
        })
        }
      })

   }

   exports.saveassignment = verifyToken,(req,res,next) =>{

    fs.readFile(`files/assignquestion.json`, 'utf8' , (err, docs) => {
        console.log('eeeee',docs)
        // convert JSON object to string
        if (err || docs.length==0) {
            let assignment={};assignment[req.body.cos]=req.body.ques
            let a=[{subjectcode:req.body.subjectcode,examtype:assignment,assignment:assignment}]
            const data = JSON.stringify(a);
            console.log(data)
        // write JSON string to a filess
            fs.writeFile(`files/assignquestion.json`, data, (err,docs) => {
                res.send({message:'success'})
            });
        }
        else{
           docs=JSON.parse(docs)
           docs= docs.filter((elem) =>  
           elem.subjectcode == req.body.subjectcode && elem.assignment[req.body.cos]==undefined);
           let assignment={};assignment[req.body.cos]=req.body.ques
           docs.push({subjectcode:req.body.subjectcode,examtype:'assignment',assignment:assignment})
           docs=JSON.stringify(docs)
           fs.writeFile(`files/assignquestion.json`,docs, (err,docs) => {
            res.send({message:'success'})
        })
        }
      })

   }



exports.uploadsubjects = verifyToken,(req,res,next) =>{
console.log(req.body)
// create a JSON object
let a=req.body.name
fs.readFile(`files/studentdata/ ${a.yearofjoining} - ${a.year} year - ${a.sem} sem - ${a.department}.json`, 'utf8' , (err, docs) => {
    if (err) {
     res.send({message:'error'})
    }
    else{
     docs=JSON.parse(docs)
     docs=docs.filter((elem) => elem.section==a.section);
     console.log(docs)
     if(docs.length==0){res.send({message:'error'})}
     else{
    for(let c of docs){
        c["subjects"]=req.body.data;
        for(let k of req.body.data)
        {
            c["marks"][k.subjectcode]={}
        }
    }
    const subdata = JSON.stringify(docs);
// write JSON string to a file
fs.writeFile(`files/studentdata/ ${a.yearofjoining} - ${a.year} year - ${a.sem} sem - ${a.department}.json`, subdata, (error,subdocs) => {
    res.send({message:'success'})
});}
    }
  })

}


exports.uploadelectives = verifyToken,(req,res,next) =>{
    
    let a=req.body.name
    fs.readFile(`files/studentdata/ ${a.yearofjoining} - ${a.year} year - ${a.sem} sem - ${a.department}.json`, 'utf8' , (err, docs) => {
        if (err) {
         res.send({message:'error'})
        }
        else{
         docs=JSON.parse(docs)
         docs=docs.filter((elem) => elem.section==a.section);
         if(docs.length==0){res.send({message:'error'})}
         else{
            for(let i of req.body.data)
            {
                for(let c of docs){
                if(c.rollnumber==i.rollnumber)
                {
                    c.subjects.push({subjectname:i.subjectname,subjectcode:i.subjectcode})
                    c.marks[i.subjectcode]={}
                }
            }
        }
        const subdata = JSON.stringify(docs);
        console.log(subdata)
   // write JSON string to a file
    fs.writeFile(`files/studentdata/ ${a.yearofjoining} - ${a.year} year - ${a.sem} sem - ${a.department}.json`, subdata, (error,subdocs) => {
        res.send({message:'success'})
    });
         } }
      })
    
    }



    
exports.fetchroll = verifyToken,(req,res,next) =>{
    let a=req.body
    fs.readFile(`files/studentdata/ ${a.yearofjoining} - ${a.year} year - ${a.sem} sem - ${a.department}.json`, 'utf8' , (err, docs) => {
        if (err) {
         res.send({message:'error'})
        }
        else{let k=0;
         docs=JSON.parse(docs)
         for(let c of docs[0].subjects)
         {if(c.subjectcode==a.subjectcode)
         {k++}}
         if(k==0){res.send({message:'error'})}
         else{res.send(docs)}
        }
      })
    
    }



    exports.fetchrollsection = verifyToken,(req,res,next) =>{
        let a=req.body
        fs.readFile(`files/studentdata/ ${a.yearofjoining} - ${a.year} year - ${a.sem} sem - ${a.department}.json`, 'utf8' , (err, docs) => {
            if (err) {
             res.send({message:'error'})
            }
            else{let k=0;
             docs=JSON.parse(docs);
             docs=docs.filter((elem) => elem.section==a.section);
             if(docs.length==0){res.send({message:'error'})}
             else{   
             for(let c of docs[0].subjects)
             {if(c.subjectcode==a.subjectcode)
             {k++}}
             if(k==0){res.send({message:'error'})}
             else{
                 for(let c of docs){
                     c.subjects=c.subjects.filter(e=>e.subjectcode == a.subjectcode)
                 }
                 res.send(docs)
                }
            }
           }
          })
        
        }



    exports.uploadmarks = verifyToken,(req,res,next) =>{
    console.log(req.body)
        let a=req.body.name
        fs.readFile(`files/studentdata/ ${a.yearofjoining} - ${a.year} year - ${a.sem} sem - ${a.department}.json`, 'utf8' , (err, docs) => {
            if (err) {
             res.send({message:'error'})
            }
            else
             {docs=JSON.parse(docs)
                for(let i of req.body.data)
                {
                    for(let c of docs){
                    if(c.rollnumber==i.rollnumber)
                    {
                    
                        let code=a.subjectcode;
                       delete i['rollnumber'];                               
                      for(let k of c.subjects){
                          if(k.subjectcode==a.subjectcode){
                           if(a.examtype!='assignment'){c.marks[code][a.examtype]=i;}
                            else{
                                if(c.marks[code][a.examtype]==undefined)
                                {
                                    c.marks[code][a.examtype]={};
                                }
                                for(let k of Object.keys(i))
                                {
                                c.marks[code][a.examtype][k]=i[k]
                                }
                                }
                          }
                          
                      }
                    }
                }
            }
            const subdata = JSON.stringify(docs);
     // write JSON string to a file
        fs.writeFile(`files/studentdata/ ${a.yearofjoining} - ${a.year} year - ${a.sem} sem - ${a.department}.json`, subdata, (error,subdocs) => {
            res.send({message:'success'})
        });
            }
          })
        
        }


        exports.uploadlabmarks = verifyToken,(req,res,next) =>{
    
            let a=req.body;
            fs.readFile(`files/studentdata/ ${a.yearofjoining} - ${a.year} year - ${a.sem} sem - ${a.department}.json`, 'utf8' , (err, docs) => {
                if (err) {
                 res.send({message:'error'})
                }
                else
                 {docs=JSON.parse(docs)
                    for(let i of a.questions)
                    {
                        for(let c of docs){
                        if(c.rollnumber==i.rollnumber)
                        {
                            let code=a.subjectcode;
                                                       
                          for(let k of c.subjects){
                              if(k.subjectcode==a.subjectcode)
                              {
                                if(c.marks[code].labs==undefined)
                                {
                                    c.marks[code].labs=[];
                                    c.marks[code].labs.push({date:a.date,marks:i.marks,question:a.ques})
                                }
                                else
                                {
                                    c.marks[code].labs.push({date:a.date,marks:i.marks,question:a.ques})
                                }
                              }
                          }
                        }
                    }
                }
                const subdata = JSON.stringify(docs);
         //write JSON string to a file
            fs.writeFile(`files/studentdata/ ${a.yearofjoining} - ${a.year} year - ${a.sem} sem - ${a.department}.json`, subdata, (error,subdocs) => {
                res.send({message:'success'})
            });
                }
              })
            
            }
    








//    exports.fetchdata = verifyToken,(req,res,next) =>{

//     fs.readdirSync('files/studentdata').forEach(file => {
//       if(!file){res.send({message:'error'})}
//       else{
//         fs.readFile(`files/codetails.json`, 'utf8' , (err, data) => {
//             if (err || !data) {
//              res.send({message:'error'})
//             }
//            else{
              
//             fs.readFile(`files/coquestion.json`, 'utf8' , (err, ques) => {
//                 if (err || !ques) {

//                  res.send({message:'error'})
//                 }
//                else
//                {
                   
//                 ques=JSON.parse(ques)
//   fs.readFile(`files/studentdata/${file}`, 'utf8' , (err, docs) => {
//     if (err || !docs) {
//      res.send({message:'error'})
//     }
//     else
//     { 
//      docs=JSON.parse(docs);data=JSON.parse(data)
//      //got students with subject code
//      docs = docs.filter(el => {return el.subjects.find(element => {return element.subjectcode == req.body.subjectcode;});});
//     let marks = docs.map(c=>c.marks.filter(e=>e[req.body.subjectcode]))
//     for(let c=0;c<docs.length;c++){docs[c].marks=marks[c]}
//     ques=ques.filter(e=>e.subjectcode==req.body.subjectcode)
//     var studentdata=[]
//     for(let c of docs)
//     {
//         var codata=[],cotot=[],leftdata=[],coleftdata=[]
//         for(let k of ques)
//         {
//          let tempco=Object.keys(k),tempcoleft=[],x=c.marks[0][k.subjectcode],comarks={},cototal={},le=tempco[1];
//          left=k[le];comarks[left]=[];cototal[left]=[]
//             for(let j=2;j<tempco.length;j++)
//             {
//                  let temp=tempco[j],tempdata=k[temp].split(',');
//                  let m=0,quest=[],tempques=[],totalcount=0;
//                     for(let q of tempdata)
//                     {
//                         if(x[left][q]==undefined){res.send({message:'error'})}
//                         else{
//                         m=x[left][q]+m;if(q.includes('q')){totalcount=totalcount+10}else{totalcount=totalcount+1}
//                         let e={};e[q]=x[left][q];tempques.push(e)
//                         }
//                     }
//                     let n=[],f={},w={},r=[];r.push(m,totalcount);w[temp]=r;n.push(w);f[temp]=tempques;quest.push(f)
//                 comarks[left].push(...quest);
//                 cototal[left].push(...n);tempcoleft.push(temp);
//             }
//             codata.push(comarks);cotot.push(cototal);leftdata.push(left);let z={};z[left]=tempcoleft
//             coleftdata.push(z)
//         }
//         studentdata.push({rollnumber:c.rollnumber,department:c.department
//             ,subjectcode:req.body.subjectcode,subjectname:req.body.subjectname,
//             marks:codata,co:data,total:cotot,exams:leftdata,cos:coleftdata
//          })
//     }
//     if(studentdata.length==0){res.send({message:'error'})}else{
//   res.send(studentdata)}

//     }
//   })
//                }
//               })
//            }
//           })


//      }  });

//    })















exports.fetchdata=verifyToken,(req,res,next)=>
{
 
    fs.readFile(`files/codetails.json`, 'utf8' , (err, data) => {
        if (err || !data) {
         res.send({message:'error'})
        }
       else{
          
        fs.readFile(`files/coquestion.json`, 'utf8' , (err, question) => {
            if (err || !question) {

             res.send({message:'error'})
            }
           else
           {
            fs.readFile(`files/cotar.json`, 'utf8' , (errr, document) => {
                if (errr || document.length==0) {
                 return res.send({message:'error'})
                }
                else{
            document=JSON.parse(document)
            question=JSON.parse(question)
            let exams=[],midonecos=['co1','co2'],ques={}
            midtwocos=['co3','co4','co5'],externalcos=['co1','co2','co3','co4','co5'];
            for(let c of question){
            exams.push(c.examtype);
            (c.examtype=='mid1')?ques[c.examtype]={'co1':c.co1,'co2':c.co2}:
            (c.examtype=='mid2')?ques[c.examtype]={'co3':c.co3,'co4':c.co4,'co5':c.co5}:
            (c.examtype=='external')?ques[c.examtype]={'co1':c.co1,'co2':c.co2,'co3':c.co3,'co4':c.co4,'co5':c.co5}:null
            }
            exams.push('assignment')
            midonecos.map(e=>(ques.mid1[e]=ques.mid1[e].split(','),ques.mid1[e].push('t','g')))
            midtwocos.map(e=>(ques.mid2[e]=ques.mid2[e].split(','),ques.mid2[e].push('t','g')))
            externalcos.map(e=>(ques.external[e]=ques.external[e].split(','),ques.external[e].push('t','g')))
            roll=[];marks={};let a =req.body;
            fs.readFile(`files/studentdata/ ${a.yearofjoining} - ${a.year} year - ${a.sem} sem - ${a.department}.json`, 'utf8' , (err, docs) => {
                if (err) {
                 res.send({message:'error'})
                }
                else
                 {
                    docs=JSON.parse(docs);data=JSON.parse(data);
                    data=data.filter(e=>e.subjectcode==a.subjectcode)
                    //got students with subject code
                    docs = docs.filter(el => {return el.subjects.find(element => {return element.subjectcode == req.body.subjectcode;});});
                    let subfac=[];docs.map(e=>e.subjects.map(f=>subfac.push(f.subjectfaculty)))
                    subfac=[...new Set(subfac)];
                    
                    docs.map(e=>roll.push(e.rollnumber))
                    for(let d of exams)
                    {
                        let tempexam=[],cos={};
                        (d=='mid1')?tempexam=midonecos:(d=='mid2')?tempexam=midtwocos:(d=='external')?tempexam=externalcos:null
                        for(let e of tempexam)
                            {  let studentarr=[],totalmarkarr=[]
                               for(let c of docs)
                                {   
                                    let z={},total=0,totalmark=0,zf={}
                                    for(let f of ques[d][e])
                                    { 
                                        if(f!='t' && f!='g'){
                                        if(c.marks[a.subjectcode][d]==undefined){
                                           return res.send({message:'error'})
                                        }
                                        else
                                        {
                                        if(f.includes('o')){totalmark=totalmark+1;}
                                        else
                                        {
                                        totalmark=totalmark+10}
                                        z[f]=c.marks[a.subjectcode][d][f]
            
                                        total=total+z[f]
                                        }
                                        }
                                        if(f=='t')
                                        {         let te='';
                                            (e=='co1')?te='q1':(e=='co2')?te='q2':(e=='co3')?te='q3':(e=='co4')?te='q4':(e=='co5')?te='q5':null
                                                  z['as']=c.marks[a.subjectcode].assignment[te];
                                                  if(c.marks[a.subjectcode].assignment[te]==undefined)
                                                  {
                                                    return res.send({message:'error'})
                                                  }
                                                   document=document.filter(e=>e.subjectcode==a.subjectcode)
                                                   let avg=e+"avg",max=e+"max"
                                           if(ques[d][e].includes('o1') && d!='external'){totalmark=totalmark+5}else{totalmark=totalmark+10}
                                           total=total + c.marks[a.subjectcode].assignment[te]
                                           zf[f]=totalmark; z[f]=total;((total/totalmark)*100>=document[0][max])?z['g']='3':((total/totalmark)*100<document[0][max] && (total/totalmark)*100>=document[0][avg])?z['g']='2':((total/totalmark)*100<document[0][avg])?z['g']='1':null
                                           
                                        }
                                    }
                                   totalmarkarr.push(z);studentarr.push(z)//push student
                                }
                               cos[e]=studentarr //studentscompleted
                            } 
                    marks[d]=cos//push into marks
                    };
                    for(let w of midonecos){ques.mid1[w].splice(-2,0,'as')}for(let w of midtwocos){ques.mid2[w].splice(-2,0,'as')}
                      
        fs.readFile(`files/cotarget.json`, 'utf8' , (ertar,target) => {
            if (ertar || !target) {

             res.send({message:'error'})
            }
           else
           {
                    target=JSON.parse(target)
                     target=target.filter(e=>e.subjectcode==a.subjectcode)
                     if(target.length==0){res.send({message:'error'})}
                    else{
                        
                        


                        fs.readFile(`files/coclasses.json`, 'utf8' , (erclass,classes) => {
                            if (erclass || !classes) {
                
                             res.send({message:'error'})
                            }
                           else
                           {
                            classes=JSON.parse(classes)
                            classes=classes.filter(e=>e.subjectcode==a.subjectcode)
                            if(classes.length!=0){  
                            classes=classes[0]
                            fs.readFile(`files/copso.json`, 'utf8' , (erpso,pso) => {
                                if (erpso || !pso) {
                    
                                 res.send({message:'error'})
                                }
                               else
                               {
                                pso=JSON.parse(pso);totalclasses=0;
                                pso=pso.filter(e=>e.subjectcode==a.subjectcode);pso=pso[0];let poa=[],postr=[];
                            for(let r of externalcos)
                            {
                             pso[r]=pso[r].split(',');pso[r] = pso[r].map(i => 'po' + i);pso[r].map(i => (!poa.includes(i))?poa.push(i):null);
                             totalclasses=classes[r]+totalclasses
                            }
                            posarr={};poa.sort()
                            for(let h of poa){ postrength=0;let y=[]
                                for(let j of externalcos)
                                {
                                    if(pso[j].includes(h))
                                    {
                                     y.push(j)
                                     posarr[h]=y;
                                     postrength=postrength+classes[j]
                                    }
                                }
                               
                                let pl=(postrength/totalclasses)*100;pg='-'
                            if(pl>=40){pg='3'}if(pl>=30 && pl<40){pg='2'}if(pl<30 && pl>=10){pg='1'}
                                postr.push(pg)
                            }
                            fs.readFile(`files/potarget.json`, 'utf8' , (erpot,pot) => {
                                if (erpot || !pot) {
                    
                                 res.send({message:'error'})
                                }
                               else
                               {
                                pot=JSON.parse(pot)
                                pot=pot.filter(e=>e.subjectcode==a.subjectcode)
                                if(pot.length==0){res.send({message:'error'})}
                               else{
                    pot=pot[0]

                    fs.readFile(`files/studentfeedback.json`, 'utf8' , (erstu,stu) => {
                        if (erstu || !stu) {
            
                         res.send({message:'error'})
                        }
                       else
                       {
                        stu=JSON.parse(stu)
                        stu=stu.filter(e=>e.subjectcode==a.subjectcode)
                        if(stu.length==0){res.send({message:'error'})}
                       else{
                         let exco1={A:[],B:[],C:[],D:[],E:[]},exco2={A:[],B:[],C:[],D:[],E:[]},exco3={A:[],B:[],C:[],D:[],E:[]},exco4={A:[],B:[],C:[],D:[],E:[]},exco5={A:[],B:[],C:[],D:[],E:[]}
                         for(let e of stu){
                             exco1[e.q1].push(e.roll);
                             exco1[e.q2].push(e.roll);
                             exco2[e.q3].push(e.roll);
                             exco2[e.q4].push(e.roll);
                             exco3[e.q5].push(e.roll);
                             exco3[e.q6].push(e.roll);
                             exco4[e.q7].push(e.roll);
                             exco4[e.q8].push(e.roll);
                             exco5[e.q9].push(e.roll);
                             exco5[e.q10].push(e.roll);
                            }
                
                    res.send({studentdata:marks,rollnumbers:roll,exams:exams,
                     ques:ques,midoneco:midonecos,midtwoco:midtwocos,externalco:externalcos,
                    codetails:data[0],subjectfaculty:subfac,cotarget:target[0],ponum:poa,postr:postr,posarr:posarr,pot:pot,exco1:exco1,exco2:exco2,exco3:exco3,exco4:exco4,exco5:exco5})
                           
                         }

                       
                    }
                })


            }








                    }})
              
                    }})
                }
                else{
                    return res.send({message:'error'})
                }
                
                
                }})


                    }
                }
            })
        }
            
            })
         }
    })
       }
    })
}
    })
}




exports.savefeedback= verifyToken,(req,res,next) =>{

    fs.readFile(`files/feedback.json`, 'utf8' , (err, docs) => {
        // convert JSON object to string
        if (err || docs.length==0) {
            let a=[];a.push(req.body);
            const data = JSON.stringify(a);
        // write JSON string to a file
            fs.writeFile(`files/feedback.json`, data, (err,docsa) => {
                res.send({message:'saved'})
            });
        }
        else{
           docs=JSON.parse(docs)
            docs= docs.filter((elem) => req.body.subjectcode==elem.subjectcode);
           docs.push(...req.body)
           docs=JSON.stringify(docs)
           fs.writeFile(`files/feedback.json`,docs, (err,docs) => {
            res.send({message:'saved'})
        })
        }
      })

   }





   exports.savestudentfeedback= verifyToken,(req,res,next) =>{

    fs.readFile(`files/studentfeedback.json`, 'utf8' , (err, docs) => {
        // convert JSON object to string
        if (err || docs.length==0) {
            let a=[];a.push(req.body);
            const data = JSON.stringify(a);
        // write JSON string to a file
            fs.writeFile(`files/studentfeedback.json`, data, (err,docsa) => {
                res.send({message:'saved'})
            });
        }
        else{
           docs=JSON.parse(docs)
            docs= docs.filter((elem) => req.body.subjectcode==elem.subjectcode && elem.roll==req.body.roll);
           docs.push(...req.body)
           docs=JSON.stringify(docs)
           fs.writeFile(`files/studentfeedback.json`,docs, (err,docs) => {
            res.send({message:'saved'})
        })
        }
      })

   }


   exports.getsubjects= verifyToken,(req,res,next) =>{

    fs.readFile(`files/users.json`, 'utf8' , (err, docs) => {
        // convert JSON object to string
        if (err || docs.length==0) {
           return res.send({message:'error'})
        }
        else{
           docs=JSON.parse(docs)
            docs= docs.filter((elem) => req.body.mail==elem.mail);let a=docs[0];console.log(a,docs)
            fs.readFile(`files/studentdata/ ${a.yearofjoining} - ${a.year} year - ${a.sem} sem - ${a.department}.json`, 'utf8' , (err, docsa) => {
                // convert JSON object to string
                if (err || docsa.length==0) {
                   return res.send({message:'error'})     
                }
                else{
                   docsa=JSON.parse(docsa)
                   fs.readFile(`files/feedback.json`, 'utf8' , (errs, docsas) => {
                    // convert JSON object to string
                    if (err || docsa.length==0) {
                       return res.send({message:'error'})     
                    }
                    else{
                    docsas=JSON.parse(docsas)
                    docsa= docsa.filter((elem) => req.body.mail==elem.rollnumber);let subs=[];subques=[]

                    for(let c of docsa[0].subjects){
                        subs.push(c.subjectcode);
                        console.log(docsas)
                        let s=docsas.filter(e=>e.subjectcode==c.subjectcode)
                        subques.push(...s)
                    }

                    return res.send({subs:subs,subq:subques})
                }})
                }
              })
        }
      })

   }








