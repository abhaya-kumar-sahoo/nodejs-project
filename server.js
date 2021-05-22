const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv')
const cookiesParser=require("cookie-parser")
const app=express();
const port=process.env.PORT || 4000
dotenv.config({path:'./config.env'})
///////STRINGIFY TO JSON FOR DATA VISUALIZATION/////
app.use(express.json())
app.use(cookiesParser());  
/////DATABASE CONNECTION//////////////
require('./db/connetion')

///////////////MIDDLEWIRE////////////////
app.use(require('./router/auth'))

// app.get("/about",(req,res)=>{
//   res.send("About")
// })

app.get('/signin',(req,res)=>{
  res.cookie("ABHAYA", "barsa")
  res.send("Soignin")
  
})
////////////PORT declaration//////////
app.listen(port,()=>{
  console.log(`Server Started On Port ${port}`)
})