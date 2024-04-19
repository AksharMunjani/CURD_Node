/* eslint-disable no-undef */
const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Employee Schema
const employeeSchema = new schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
