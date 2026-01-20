const db = require("../db/queries");
const {body,validationResult,matchedData} =require("express-validator");



const alphaErr = "must only contain letters.";
const lengthErrUser = "must be between 3 and 30 characters.";
const lengthErrMsg="must be no more than 80 characters"

const validateUser =[
    body("username").trim()
    .isAlpha().withMessage(`Username Error: ${alphaErr}`)
    .isLength({min:3,max:30}).withMessage(`Username error : ${lengthErrUser}`),
    body("message").trim()
    .isAlpha().withMessage(`Message error: ${alphaErr}`)
    .isLength({max:80}).withMessage(`Message error : ${lengthErrMsg}`)
]



async function messagesGet(req,res){
    const result = await db.getAllMessages();
    res.render("index",{messages:result});
}
async function messageFormGet  (req,res){
    res.render("form",{title:"Message Form"});
}
async function messageDetailsGet  (req,res){
    const id=req.params.id;
    let obj= await db.getMessageDetails(id);
    console.log(`obj in controller ${obj}`);
    if(obj){
         res.render("details",{message:obj})
    } else{
        res.status(404).end("404 not found")
    }
   

}
const messagePost= [
    validateUser,
async function createMessage (req,res){

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).render("form",{
            title: "Something",
            errors:errors.array(),
            message:req.body
        })
    }
    const{username,message} = matchedData(req);
    await db.postMessage(username,message);

    res.redirect("/");
}
]
module.exports={
    messageFormGet,
    messagesGet,
    messageDetailsGet,
    messagePost
}