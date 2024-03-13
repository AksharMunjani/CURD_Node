/* eslint-disable no-undef */
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const employeeSchema = new schema(
  {
    name: { type: String },
    designation: { type: String },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String },
    age: { type: Number },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
