const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
const path = require("path");
const mongoDB = require("./db");
mongoDB();

const dotenv = require("dotenv");

dotenv.config({
    path: "./config/config.env",
})

if(process.env.NODE_ENV!=="production"){
    require("dotenv").config({path: "./config/config.env"});
}


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.use(express.static(path.join(__dirname, "../build")));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname, "../build/index.html"));
});


app.listen(port, ()=>{
    console.log(`Server is listening to ${process.env.PORT}`);
})
