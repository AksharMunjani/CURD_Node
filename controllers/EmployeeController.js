const Employee = require("../models/Employee");

// show the list of Employees
const index = async (req, res, next) => {
  try {
    const response = await Employee.find();
    res.json({ response });
  } catch (error) {
    res.json({ message: "An error Occured!" });
  }
};

// Show single employee
const show = async (req, res, next) => {
  let employeeID = req.body.employeeID;
  try {
    const response = await Employee.findById(employeeID);
    res.json({ response });
  } catch (error) {
    res.json({ message: "An error Occured!" });
  }
};

// add new employee
const store = async (req, res, next) => {
  try {
    let employee = new Employee({
      name: req.body.name,
      designation: req.body.designation,
      email: req.body.email,
      phone: req.body.phone,
      age: req.body.age,
    });
    await employee.save();
    res.json({ message: "Employee Added successfully!" });
  } catch (error) {
    res.json({ message: "An error Occured!" });
  }
};

//update an employee
const update = async (req, res, next) => {
  let employeeID = req.body.employeeID;
  try {
    let updateData = {
      name: req.body.name,
      designation: req.body.designation,
      email: req.body.email,
      phone: req.body.phone,
      age: req.body.age,
    };
    await Employee.findByIdAndUpdate(employeeID, { $set: updateData });
    res.json({ message: "Employee Updated successfully!" });
  } catch (error) {
    res.json({ message: "An error Occured!" });
  }
};

// delete an employee
const destroy = async (req, res, next) => {
  let employeeID = req.body.employeeID;
  try {
    await Employee.findByIdAndDelete(employeeID);
    res.json({ message: "Employee Deleted successfully!" });
  } catch (error) {
    res.json({ message: "An error Occured!" });
  }
};

module.exports = { index, show, store, update, destroy };
