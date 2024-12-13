import { Router } from "express";
import {esAdmin} from "../middleware/admin.middleware.js"  //un middleware que bede esfar como un metodo antes del resto de rutas por ejemplo "alterlearn/algo", esAdmin, guardarRercurso);
import {obtenerRecurso, // para ver la lista de recursos, y validar los archivos
        obtenerUsuarios, //buscarlo por nombre para ajustarlos        
        borrarUsuario, //borrar usuario de la basde de datos mysql
        borrarRecurso, //tiene desplegada una lista de recursos existentes
        buscarRecursosPorTipo
     } from "../controllers/admin.controller.js";

const router = Router();

router.get("/alterlearn/buscarRecursosPorTipo", esAdmin, buscarRecursosPorTipo)
router.get("/alterlearn/obtenerUsuarios", esAdmin, obtenerUsuarios);
router.get("/alterlearn/obtenerRecurso", esAdmin, obtenerRecurso);
router.delete("/alterlearn/borrarUsuario", esAdmin, borrarUsuario);
router.delete("/alterlearn/borrarRecurso", esAdmin, borrarRecurso);

export default router;