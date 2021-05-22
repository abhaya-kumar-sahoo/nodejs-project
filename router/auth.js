const express=require('express');
const bcrypt= require('bcrypt')
const jwt=require('jsonwebtoken')
const router=express.Router();
require('../db/connetion')
const User= require("../model/schema")
const authenticate =require('../middleware/authenticate');

router.get('/',(req,res)=>{
  res.send("abhaya home page")
})

router.get('/register',(req,res)=>{
  res.send('Abhaya')
})
//////////////////user signup or Registration ////////////////////
router.post('/register', async(req,res)=>{
  const {name,email,phone,work,password,cpassword}=req.body
  if(!name || !email|| !phone|| !work|| !password|| !cpassword){
    return res.status(422).json({error:"please fill al required field"})
  }
 
 try{
 
  const userExist= await User.findOne({email:email});
 
  if(userExist){
   return res.status(422).json({error:"Email already Exist"})
 }else if(password != cpassword){
 const databse=new User({name,email,phone,work,password,cpassword})
 return res.json({error:"Password is not matching"})
 }else{
   const databse=new User({name,email,phone,work,password,cpassword})
   
   await databse.save();
   res.status(201).json({message:"Registerd Successfully"})
 }
 //..............................................alternative of givenne two........
 // const userRegister= await databse.save();
 // if(userRegister){
 //   return res.status(422).json({error:"Email already Exist"})
 // }else{
 //   res.status(500).json({err:"Faild to store data in database"})
 // }
 
 
 }catch(err){
   console.log(err)
 }
 })


 ////////////////////LOGIN ROUTE///////////////////////

router.post('/signin',async(req,res)=>{
  try{
const {email,password}= req.body;
if(!email || !password){
  return res.status(400).json({error:"Please fill  the data"})
}
const userLogin= await User.findOne({email:email});

if(userLogin){
  const isMatch= await bcrypt.compare(password,userLogin.password);
  const token = await userLogin.generateAuthToken();
console.log(token)
res.cookie("jwtoken", token,{
  expires:new Date(Date.now()+ 25892000000),
  httpOnly:true

})
 
  if(!isMatch){
    res.status(400).json({error:"Login Error"})
  }else{
    res.json({message:"Successfully Login"})
  } 
}else{
  res.status(400).json({error:"Login Error"})
}
  }catch(err){
    console.log(err)
  }

});

router.get('/about',authenticate,(req,res)=>{
  console.log("Authentication Successful")
  res.send(req.rootUser)

})

router.get('/getdata',authenticate,(req,res)=>{
  console.log("Conatct Authentication Successful")
  res.send(req.rootUser)

})


router.post('/contact',authenticate,async(req,res)=>{
 try{
   const {name,email,phone,message}=req.body;
if(!name || !email || !phone || !message){
  console.log("Error in contact Page")
  return res.json({error:"Please Fill the contact Form"})
}
const userContact=await User.findOne({_id: req.userID})
if(userContact){
  const userMessage=await userContact.addMessage(name,email,phone,message);await userContact.save();
  res.status(201).json({message:"User Contact Successful"})
}

 }catch(error){
   console.log(error)
 }


})
router.get('/logout',(req,res)=>{
  res.clearCookie('jwtoken',{path:"/"})
  console.log("Logout Successful")
  res.status(200).send("Logout Page")

})
 


module.exports= router;
// res.send(req.rootUser)