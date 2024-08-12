const express = require("express");
let app = express();
let path = require("path");

let port = 3000;


app.use(express.static(path.join(__dirname, "/public")));   
app.set("view engine", "ejs");//view engine is basically responsible for making and rendering templates now this work is assigned to ejs in this step
app.set("views", path.join(__dirname, "/views"));

app.listen(port,(req,res) => {
    console.log(`listening on port${port}`);
});

app.get("/diceroll",(req,res)=>{
    let diceval = Math.floor(Math.random()*6)+1
    //render is used to send a file instead of a msg,obj 
    res.render("home.ejs",{diceval});//this is equivalent of using {diceval:diceval} as key-value pair of object can have same values in this case *only* so a single value 'diceval' is passed instead
});

app.get("/hello",(req,res)=>{
    res.send("hello world");
    // console.log(process.cwd());
});

app.get("/ig/:username",(req,res)=>{
    let {username} = req.params;
    let followers = ["ansh","om","karan"];
    res.render("insta",{username, followers});
    // console.log(process.cwd());
});

app.get("/inst/:username",(req,res)=>{
    let {username} = req.params;
    const instadata = require("./data.json"); 
    let data = instadata[username];
    if(data){
        res.render("instagram",{data});
    }
    else{
        res.render("errorig");
    }
});

 