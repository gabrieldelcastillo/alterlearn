import { Router } from "express";
import {signup, signin, logout} from "../controllers/auth.controllers.js";

const router = Router();

router.post("/auth/signup", signup);

router.post("/auth/signin", signin);
router.get("/auth/logout", logout);

export default router;