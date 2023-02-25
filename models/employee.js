const mongoose=require("mongoose");

const employeeSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required :true
    },
    Age:{
        type:Number,
        required :true
    },
    Role:{
        type:String,
        required :true
    }

});
module.exports=mongoose.model('Employees',employeeSchema)