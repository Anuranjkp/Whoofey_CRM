const mongoose = require("mongoose");

const uri = "mongodb+srv://user:user@crm.wwpba.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(uri, (err)=>{
    if(err){
        console.log(err+"cannot connect to db")
    } else{
        console.log("database connected successfuly");
    }
})