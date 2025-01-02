const express = require("express");
const cors = require("cors");
const { getAllEmployees, getEmployeeById } = require("./controllers/index");

const app = express();
const port = 3000;

app.use(cors());

//Exercise 1: Retrieve All Employees.
app.get("/employees", async (req, res) => {
  try {
    const result = await getAllEmployees();

    if (result.lenght === 0) {
      return res.status(404).json({ message: "Employees not found." });
    }

    return res.status(200).json({ employees: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 2: Retrieve Employee by ID.
app.get("/employees/details/:employeeId", async (req, res) => {
  try {
    const employeeId = parseInt(req.params.employeeId);
    const result = await getEmployeeById(employeeId);

    if (result === null) {
      return res.status(404).json({ message: "No employee found" });
    }

    return res.status(200).json({ employee: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = { app, port };
