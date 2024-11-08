import { Router } from "express";
import {signup, signin, logout} from "../controllers/auth.controllers.js";

const router = Router();

router.post("/auth/registrarse", signup);

router.post("/auth/logearse", signin);

router.get("/auth/deslogearse", logout);

export default router;