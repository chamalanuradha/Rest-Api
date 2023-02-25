const express = require('express');
const Employees = require('../models/employee');
const router = express.Router();


/*app.get("/api/employee_id/:id", (req, res) => {
    const employee = employees.find((c) => c.id === parseInt(req.params.id));
    //If there is no valid customer ID, then display an error with the following message
    if (!employee) res.status(404).send("Ooops... Cant find identity what you are looking for!");
    res.send(employee);
});
app.get('/api/employee_name/:name', (req, res) => {
    const employeen = employees.find((d) => d.name.toLowerCase() === req.params.name.toLowerCase());
  
    if (!employeen) {
      res.status(404).send("Ooops... Cant find name what you are looking for!");
    } else {
      res.send(employeen);
    }
  });*/
//CREATE Request Handler
//CREATE New Employee Information
router.post("/api/add_employee", (req, res) => {

    let newEmployee =new Employees(req.body);

    newEmployee.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            sucess:"post Saved Successfully"
        });
    });
});
router.get('/',(req,res) =>{
    res.send('welcome to our REST API!');
});
router.get('/employees',(req,res) =>{
    Employees.find().exec((err,employees)=>{
        if(err){
            return res.status(400).json({
                error:err
            });   
        }
        return res.status(200).json({
            sucess:true,
            existingPosts:employees
        });
    });
});
//Update Request Handler
// Update Existing Employee Information
router.put("/post/update/:id", (req, res) => {
    Employees.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({sucess:"Update successfully"});
        }
     );
});
//Delete Request Handler
// Delete Employee Details
router.delete("/api/delete_employees/:id", (req, res) => {
    Employees.findByIdAndRemove(req.params.id).exec((err,deleteemployee)=>{
        if(err) return res.status(400).json({
            massege:"Delete unsuccessfull",err
        });
        return res.json({
            massege:"Delete Successful",deleteemployee
        });
    });
});
module.exports = router;