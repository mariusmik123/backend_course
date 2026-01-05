const e = require("cors");
const express = require("express");
const router = express.Router();
const data = {};

data.employees = require("../../public/data/employees.json");

router
  .route("/")
  .get((req, res) => {
    res.send(data.employees);
  })
  .post((req, res) => {
    let reqEmployee;
    try {
      reqEmployee = req.body;
    } catch (error) {
      throw new Error();
    }

    const regex = /^[A-Za-z]+$/;
    if (
      !regex.test(reqEmployee.firstname) ||
      !regex.test(reqEmployee.lastname)
    ) {
      return res.statusCode(400).json({ message: "invalid input" });
    }
    const newEmployee = {
      id: data.employees ? data.employees.length + 1 : 1,
      firstname: reqEmployee.firstname,
      lastname: reqEmployee.lastname,
    };
    data.employees.push(newEmployee);
    res.status(201).json(newEmployee);
  });

router
  .route("/:id")
  .get((req, res) => {
    const employee = data.employees.find(
      (emp) => emp.id === Number(req.params.id)
    );
    if (employee) res.json(employee);
    else res.status(400).send({ message: "invalid input" });
  })
  .put((req, res) => {
    const emp = data.employees.find((e) => e.id == Number(req.params.id));
    if (!emp) return res.status(404).json({ message: "user not found" });
    if (!req.body || !req.body.firstname || !req.body.lastname) {
      return res.status(400).json({ message: "invalid first- or lastname" });
    }

    data.employees[emp.id - 1] = {
      id: emp.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    };

    res.status(200).json([data.employees[emp.id], data.employees]);
  })
  .delete((req, res) => {
    const emp = data.employees.find((e) => e.id === Number(req.params.id));
    if (!emp) return res.status(404).json({ message: "user not found" });
    data.employees.splice(emp.id - 1, 1);
    let newID = 1;
    data.employees.forEach((e) => {
      e.id = newID;
      newID++;
    });
    res.status(200).json(data.employees);
  });

module.exports = router;
