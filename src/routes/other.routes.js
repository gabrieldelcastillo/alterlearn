import { Router } from "express";
//import { someProtectedRoute } from "../controllers/protected.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = Router();

// Ruta protegida
router.get('/protected-route', isAuthenticated); //, someProtectedRoute

export default router;
