import { Router } from "express";
import { registrarse, logearse, deslogearse } from "../controllers/user.controller.js";

const router = Router();

router.post("/alterlearn/registrarse", registrarse);
router.post("/alterlearn/logearse", logearse);
router.get("/alterlearn/deslogearse", deslogearse);

 /*
// GET all Employees
router.get("/employees", getEmployees);
// GET An Employee
router.get("/employees/:id", getEmployee);
// DELETE An Employee
router.delete("/employees/:id", deleteEmployee);
// INSERT An Employee
router.post("/employees", createEmployee);
router.patch("/employees/:id", updateEmployee);
*/
export default router;