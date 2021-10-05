const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const JWTSECRET = 'harshapriyaamreenkousar'
const nodemailer = require('nodemailer');
const fs = require('fs');


const encodeBuffer = buffer => buffer.toString('base64')
const encodeString = string => encodeBuffer(Buffer.from(string))
const encodeData = data => encodeString(JSON.stringify(data))
const encrypt = (data) => {
  if (Buffer.isBuffer(data)) return encodeBuffer(data)
  if (typeof data === 'string') return encodeString(data)
  return encodeData(data)
}






function verifyToken(req,res,next){
    console.log('hellooo.....')
    if(!req.headers.authorization){
        return res.status(401).send("Unauthorized request")
    }
   let token = Buffer.from(req.headers.authorization.split(' ')[1], 'base64').toString()
    if(token == null)
    {
        return res.send({status:"Unauthorized request"})
    }
    else{
    let payload = jwt.verify(token, JWTSECRET)
    if(!payload)
    {
        return res.send({status:"Unauthorized request"})
    }
else{
    res.json({status:'success'});
    next();
    }


}
}













// admin signup

exports.createAdminUsers = (req,res) =>{
    const hashpassword = async (password)=>{
    passwordhashed= await bcrypt.hash(password,10);
    req.body.password=passwordhashed;
    const token = jwt.sign({subject:req.body.mail},JWTSECRET)
    tokenHashed=  encrypt(token)
   
    fs.readFile(`files/users.json`, 'utf8' , (err, docs) => {
        if(err)
        {
            res.send({message:'user already exists'})
        }
        // convert JSON object to string
        else if ( docs.length==0) {
            req.body.token=tokenHashed
            let a=[];a.push(req.body)
            const data = JSON.stringify(a);
        // write JSON string to a file
            fs.writeFile(`files/users.json`, data, (error,dos) => {
                res.send({message:'success',user:data.mail,token:tokenHashed})
            });
        }
        else{
            docs=JSON.parse(docs)
            let data= docs.filter((elem) => req.body.mail==elem.mail);
            if(data.length==0){
                req.body.token=tokenHashed
              docs.push(req.body)
              docs=JSON.stringify(docs)
           fs.writeFile(`files/users.json`,docs, (es,ds) => {
            res.send({message:'success',user:req.body.mail,token:tokenHashed})
           })
            }
            else
            {
                res.send({message:'user already exists'})
            }
        }
      })
   }
    
    hashpassword(req.body.password)
}


//login

exports.findoneUsers = async (req,res) =>{
    const {mail,password} = req.body
    fs.readFile(`files/users.json`, 'utf8' , async (err, docs) => {
        if(err || !docs)
        {
            res.send({status:'error',error:'Invalid mail'})
        }
        else{
            docs=JSON.parse(docs)
            let data= docs.filter((elem) => req.body.mail==elem.mail);
            if(data.length==0)
            {
                res.send({status:'error',error:'Invalid mail'})
            } 
            else
            {   
                await bcrypt.compare(password, data[0].password, (err, result) => {
                    if(result)
                    { 
                        const token = jwt.sign({subject:req.body.mail},JWTSECRET)
                        tokenHashed=  encrypt(token)
                      if(data[0].role=='admin')
                      {
                        res.status(200).send({'token':tokenHashed,'admindata':data[0].mail,'status':'ok',role:'admin'})
                      }
                      else if(data[0].role=='faculty')
                      {
                        res.status(200).send({'token':tokenHashed,'admindata':data[0].mail,'status':'ok',role:'admin'})
                      }
                      else
                      {
                        res.status(200).send({'token':tokenHashed,'admindata':data[0].mail,'status':'ok',role:'student'})
                      }
                    }
                    else
                    {
                        res.send({status:'error',error:'Invalid mail'})
                    }
                })
            }
        }
      })
}






  




//update password  


exports.updateoneUsers = (verifyToken,(req,res) =>{
    const hashpassword = async (password)=>
    {
        passwordhashed= await bcrypt.hash(password,10);
        fs.readFile(`files/users.json`, 'utf8' , (err, docs) => {
            if(err)
            {
                res.send({message:'error'})
            }
            // convert JSON object to string
            else{
                
                docs=JSON.parse(docs)
              
                for(let s of docs){
                    if(s.mail==req.body.mail){
                        s.password=passwordhashed
                    }
                }
               docs=JSON.stringify(docs)
                fs.writeFile(`files/users.json`, docs, (error,document) => {
                    res.send({message:'saved'})
                });
            }
          })
    }
    hashpassword(req.body.password)
})




exports.checkRole=(req,res)=>{

    fs.readFile(`files/users.json`, 'utf8' , (err, docs) => {
        if(err)
        {
            res.send({message:'error'})
        }
        // convert JSON object to string
        else if ( docs.length==0) {
         res.send({message:'admin'})
        }
        else{
            docs=JSON.parse(docs)
            if(docs[0].role=='admin'){res.send({message:'error'})}
            else{res.send({message:'admin'})}
        }
      })
}



exports.forgotpassword=(req,res)=>{
    console.log(req.body)
    fs.readFile(`files/users.json`, 'utf8' , async (err, docs) => {
         if(err || !docs)
        {
            res.send({status:'error',error:'error'})
        }
        else{
            docs=JSON.parse(docs)
            let data= docs.filter((elem) => req.body.mail==elem.mail);
            if(data.length==0)
            {
                res.send({status:'error',error:'error'})
            } 
            else
            {
               

            let mailTransporter =  nodemailer.createTransport({ 
                service: 'gmail',
                auth: 
                {
                    user: 'aitsreportgeneration@gmail.com',
                    pass: 'aits123456'
                },
                secure:false
            });


                var digits = '0123456789';
                var OTP = '';
                for (let i = 0; i < 6; i++ ) {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }

            let mailDetails =
            {
                from:'aitsreportgeneration@gmail.com',
                to: 'amreenshaik40@gmail.com',
                subject: 'AITS . OTP TO RESET PASSWORD ',
                html: `<p>Hey ! ${OTP} is the OTP . </p>`,
            };
            console.log(mailDetails)
            mailTransporter.sendMail(mailDetails, function(err, data) {
                if(err)
                {
                    console.log(err)
                   res.send({'error':'Connection is poor'})
                } 
                else
                {
                    console.log(data)
                    console.log(req.hostname)
                   res.send({'otp':OTP})
                }
           }) 
       }    


        
        // else{
        //    res.send({'error':'error'})
        // }
     }
     })

}