const { number } = require("joi");
const mongoose=require("mongoose");

const postSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required :true
    },
    Age:{
        type:number,
        required :true
    },
    Role:{
        type:String,
        required :true
    }

});
module.exports=mongoose.model('Posts',postSchema)