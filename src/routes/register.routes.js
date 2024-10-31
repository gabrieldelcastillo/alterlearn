import {Router} from "express"
import {saveUser} from "../controllers/register.controller.js"
import {validateEmailMiddleware} from "../middleware/validateEmail.middleware.js"

const router = Router();

router.post('/alterlearn/registro', validateEmailMiddleware, saveUser);

export default router;