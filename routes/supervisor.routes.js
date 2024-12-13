import { Router } from "express";
import { 
  Acceder, // Ruta para que el supervisor acceda a la plataforma de supervisión
  otorgarPermisos, // Ruta para otorgar permisos de administrador a un usuario
  denegarPermisos, // Ruta para denegar los permisos de administrador a un usuario
  obtenerUsuarios // Ruta para obtener la lista de usuarios con la opción de buscarlos por nombre
} from "../controllers/supervisor.controller.js";

const router = Router();

router.post("/alterlearn/acceder", Acceder);
router.patch("/alterlearn/otorgarPermisos", otorgarPermisos);
router.patch("/alterlearn/denegarPermisos", denegarPermisos);
router.get("/alterlearn/obtenerUsuarios", obtenerUsuarios);

export default router;