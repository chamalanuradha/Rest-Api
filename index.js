const express=require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const employees =[{"id":1,"name":"Kasun","Age":25,"Role":"javaDeveloper"},{"id":2,"name":"Nadun","Age":25,"Role":"webDeveloper"},{"id":3,"name":"Kaveen","Age":25,"Role":"full-stack Developer"},{"id":4,"name":"Kalana","Age":25,"Role":"MARNDeveloper"}];


app.get('/',(req,res) =>{
    res.send('welcome to our REST API!');
});
app.get('/api/employees',(req,res) =>{
    res.send(employees);
});
app.get("/api/employee_id/:id", (req, res) => {
    const employee = employees.find((c) => c.id === parseInt(req.params.id));
    //If there is no valid customer ID, then display an error with the following message
    if (!employee) res.status(404).send("Ooops... Cant find id what you are looking for!");
    res.send(employee);
});
app.get('/api/employee_name/:name', (req, res) => {
    const employeen = employees.find((d) => d.name.toLowerCase() === req.params.name.toLowerCase());
  
    if (!employeen) {
      res.status(404).send("Ooops... Cant find name what you are looking for!");
    } else {
      res.send(employeen);
    }
  });
//CREATE Request Handler
//CREATE New Employee Information
app.post("/api/add_employee", (req, res) => {
    const { error } = validateEmployee(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    //Increment the customer id
    const employee= {
        id: employees.length + 1,
        name: req.body.name,
        Age : req.body.Age,
        Role: req.body.Role
    };
    employees.push(employee);
    res.send(employee);
});
//Update Request Handler
// Update Existing Employee Information
app.put("/api/Update_employees/:id", (req, res) => {
    const employee = employees.find((c) => c.id === parseInt(req.params.id));
    if (!employee) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');

    const { error } = validateEmployee(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    employee.name = req.body.name;
    employee.Age = req.body.Age;
    employee.Role = req.body.Role;
    res.send(employee);
});
//Delete Request Handler
// Delete Employee Details
app.delete("/api/delete_employees/:id", (req, res) => {
    const employee = employees.find((c) => c.id === parseInt(req.params.id));
    if (!employee) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');

    const index = employees.indexOf(employee);
    employees.splice(index, 1);
    res.send(employee);
});

//Validate Information

function validateEmployee(employee) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        Age: Joi.number().max(25).required(),
        Role:Joi.string(),
    });
    return schema.validate(employee);
}

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

