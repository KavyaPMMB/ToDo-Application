const mongoose=require("mongoose");
const todoschema=mongoose.Schema({
   task:{type:String},
   date:{type:String},
   status:{type:String}





});

const todoo=mongoose.model("todoo",todoschema);
module.exports=todoo;