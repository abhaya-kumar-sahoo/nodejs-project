const mongoose=require("mongoose")
const db= process.env.URL
mongoose.connect(db, {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}, (err) => { 
  if (!err) { 
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }  
});  