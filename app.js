const express = require("express");
const app = express();
const usersRouter = require("./routes/usersRouter");
const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8080;
app.listen(port,"0.0.0.0",(err)=>{
    if(err){
        throw new Error
        
    }
    console.log("server started")
})

app.use("/",usersRouter);

