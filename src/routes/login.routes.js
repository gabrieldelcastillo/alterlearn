import {Router} from "express"
import {loginUser} from "../controllers/login.controller.js"

const router = Router();

router.post('/alterlearn/login', loginUser);

export default router;
