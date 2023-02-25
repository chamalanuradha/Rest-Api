const express=require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


const employeeRoutes = require('./routes/employee');
app.use(bodyParser.json());
app.use(employeeRoutes);
//const employees =[{"id":1,"name":"Kasun","Age":25,"Role":"javaDeveloper"},{"id":2,"name":"Nadun","Age":25,"Role":"webDeveloper"},{"id":3,"name":"Kaveen","Age":25,"Role":"full-stack Developer"},{"id":4,"name":"Kalana","Age":25,"Role":"MARNDeveloper"}];

//Set up default mongoose connection
const DB_URL = 'mongodb+srv://chamal1:chamal1@cluster0.vxrhskq.mongodb.net/Employee?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);
mongoose.connect(DB_URL)
.then(()=>{
    console.log("DB Connected")
})
.catch((err)=>
{console.log("DB not Conneted",err)
})
const port = 8000;
app.listen(port, () => {console.log(`Listening on port ${port}..`);
});

