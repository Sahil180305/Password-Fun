const express =require("express");
const app = express();
require('dotenv').config()
const passwordStore=require("./Models/password.js");
app.listen(8080,()=>{
    console.log("app is listen at port 8080")
})
console.log(process.env.MONO_URL);



app.get('/',async(req,res)=>{
    console.dir(passwordStore);
    let passwordArray=await passwordStore.find({});
    console.log(passwordArray);
    res.json(passwordArray);
})


app.post('/',(req,res)=>{

})

app.delete('/',(req,res)=>{
    
})