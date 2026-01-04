const express = require("express");
const app = express();
const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }));
app.listen(8080,'localhost',(err)=>{
    if(err){
        throw new Error
        
    }
    console.log("server started")
})


const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
    id:crypto.randomUUID()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
    id:crypto.randomUUID()
  }
];

app.get("/",(req,res)=>{
    res.render("index",{messages:messages})
})
app.get("/new",(req,res)=>{
    res.render("form",{title:"Message Form"});
})
app.get("/details/:id",(req,res)=>{
    const id=req.params.id;
    let obj=messages.find(message=> message.id ==id);
    if(obj){
         res.render("details",{message:obj})
    } else{
        res.status(404).end("404 not found")
    }
   

})
app.post("/new",(req,res)=>{
    let userResp = req.body.name;
    let textResp = req.body.text;
    messages.push({text:textResp,user:userResp,added:new Date(),id:crypto.randomUUID()});
    res.redirect("/");
})
