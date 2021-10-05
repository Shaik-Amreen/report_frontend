const jwt=require('jsonwebtoken')

const JWTSECRET = 'harshapriyaamreenkousar'

function verifyToken(req,res,next){
    
    console.log('hellllooooooooooooooo')
    if(!req.headers.authorization){
        return res.status(401).send("Unauthorized request")
    }
   let token = Buffer.from(req.headers.authorization.split(' ')[1], 'base64').toString()
   console.log(token)
    if(token == null)
    {
        return res.send({status:"Unauthorized request"})
    }
    else{
    let payload = jwt.verify(token, JWTSECRET)
    console.log(payload)
    if(!payload)
    {
        return res.send({status:"Unauthorized request"})
    }
else{
    res.json({status:'success'});
   
    }


}
   
}

module.exports=verifyToken