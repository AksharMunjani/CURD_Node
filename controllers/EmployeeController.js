/* eslint-disable no-undef */
const Employee = require("../models/Employee");

// show the list of Employees
const index = async (req, res) => {
  const filter = req.query.filter;
  const sortBy = req.query.sortBy;
  const order = req.query.order;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const sortObj = {};
  sortObj[sortBy] = order === "asc" ? 1 : -1;

  try {
    let query = {};

    if (filter) {
      const caseInsensitiveFilter = new RegExp(filter, "i");
      query = {
        $or: [
          { name: { $regex: caseInsensitiveFilter } },
          { designation: { $regex: caseInsensitiveFilter } },
          { email: { $regex: caseInsensitiveFilter } },
          { phone: { $regex: caseInsensitiveFilter } },
        ],
      };
    }

    const count = await Employee.countDocuments(query);
    const totalPages = Math.ceil(count / limit);
    const employees = await Employee.find(query).sort(sortObj).skip(skip).limit(limit);
    const paginationData = { employees, page, limit, count, totalPages };
    res.status(200).json(paginationData);
    console.log("🚀 ~ index ~ paginationData:", paginationData)
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Show single employee
const show = async (req, res) => {
  let employeeID = req.params.id;
  try {
    const response = await Employee.findById(employeeID);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// add new employee
const store = async (req, res) => {
  try {
    let employee = new Employee({
      name: req.body.name,
      designation: req.body.designation,
      email: req.body.email,
      phone: req.body.phone,
      age: req.body.age,
    });
    await employee.save();
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//update an employee
const update = async (req, res) => {
  let employeeID = req.params.id;
  try {
    let updateData = {
      name: req.body.name,
      designation: req.body.designation,
      email: req.body.email,
      phone: req.body.phone,
      age: req.body.age,
    };
    await Employee.findByIdAndUpdate(employeeID, { $set: updateData });
    res.status(200).json(employeeID);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// delete an employee
const destroy = async (req, res) => {
  let employeeID = req.params.id;
  try {
    await Employee.findByIdAndDelete(employeeID);
    res.status(200).json({ employeeID });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { index, show, store, update, destroy };
