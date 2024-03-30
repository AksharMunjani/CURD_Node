/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();

const EmployeeController = require("../controllers/EmployeeController");

router.get("/", EmployeeController.index);
router.get("/show/:id", EmployeeController.show);
router.post("/store", EmployeeController.store);
router.put("/update/:id", EmployeeController.update);
router.delete("/destroy/:id", EmployeeController.destroy);

module.exports = router;
