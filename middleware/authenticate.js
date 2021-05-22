const jwt=require('jsonwebtoken')
const User= require("../model/schema")
const Authenticate= async(req,res,next)=>{
 console.log("authentication pageYYYY")
try{ 
const token= req.cookies.jwtoken ;
if(!token){return res.send("TOKEN NOT FOUND")};
console.log("ABHAYA KUMAR SAHOO:-", token);
 
const verifyToken= jwt.verify(token, process.env.SECRET_KEY); 
console.log("VERIFICATION:-",verifyToken)

const rootUser= await User.findOne({_id:verifyToken._id,"tokens.token":token})
if(!rootUser){throw new Error('User Not Found')}
req.token=token;
req.rootUser=rootUser;
req.userID=rootUser._id;
next()
}catch(err){
  res.status(401).send('Unauthorized:Hello Bhai No token provided')
  console.log("ERROR STARTED:-",err) 
}
} 
module.exports= Authenticate

// const jwt= require('jsonwebtoken')
// const mongoose=require('mongoose')
// const User= require('../model/schema')
// const Authenticate=async()=> {
// try{
// const token= req.cookies.jwtoken;
// const verifyToken= jwt.verify(token, process.env.SECRET_KEY)
// const rootUser= await User.findOne({_id: verifyToken,_id, "tokens.token": token})
// if(!rootUser){ throw new Error('User Not Found')}

// req.token=token
// req.rootUser=rootUser
// req.userID= rootUser._id;
// next();


// }catch(err){
//   console.log(err);
//   res.status(401).send("Unauthorized: No token provided")

// }

// }

// module.exports =Authenticate
