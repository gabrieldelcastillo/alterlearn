import { Router } from "express";
import { signup } from "../controllers/registro.controller.js";
import { signin } from "../controllers/logeo.controller.js";
import { logout } from "../controllers/deslogeo.controller.js";

const router = Router();

router.post("/alterlearn/registrarse", signup);

router.post("/alterlearn/logearse", signin);

router.get("/alterlearn/deslogearse", logout);

export default router;