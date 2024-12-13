import { Router } from "express";
import { registrarse, 
         logearse, 
         deslogearse, 
         publicarRecuros, //El usuario publica un recurso, Estaran todos los campos a ser rellenados
         cambiarNombre, //El backend recibe como parametro un nuevo nombre, para ajustarlo
         cambiarContra, //El backend recibe como parametro una nueva contraseña, para ajustarlo
         borrarCuenta
        } from "../controllers/user.controller.js";
import {isAuthenticated} from "../middleware/user.middleware.js"       

const router = Router();



router.post("/alterlearn/registrarse", registrarse);
router.post("/alterlearn/logearse", logearse);
router.get("/alterlearn/deslogearse", deslogearse);

router.delete("/alterlearn/borrarCuenta", isAuthenticated, borrarCuenta)
router.patch("/alterlearn/cambiarNombre", isAuthenticated, cambiarNombre);
router.patch("/alterlearn/cambiarContra", isAuthenticated, cambiarContra);
router.post("/alterlearn/publicarRecurso", isAuthenticated, publicarRecuros);

export default router;