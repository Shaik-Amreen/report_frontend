const express = require("express");
const app = express();
const cors = require("cors");
const file=require('./routers/filerouter')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))
app.use('/',file)
app.listen(4000,()=>console.log("server listened"))