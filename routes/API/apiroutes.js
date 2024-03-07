const express = require("express");
const router = express.Router();
const path = require("path");
const APIFunctions = require("../../controllers/employeeController");

router
  .route("/")
  .get(APIFunctions.getAllEmployees)
  .post(APIFunctions.addNewEmployee)
  .put(APIFunctions.updateEmployee)
  .delete(APIFunctions.deleteEmployee);

router.route("/:id").get(APIFunctions.getSingleEmployee);
module.exports = router;
