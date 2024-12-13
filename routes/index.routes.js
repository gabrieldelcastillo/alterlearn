import { Router } from "express";
import { obtenerRecursoPorFecha, 
         obtenerRecursoPorMateria, 
         obtenerRecursoPorCarrera, 
         obtenerRecursoPorProfesor, 
         obtenerRecursoPorTipo, 
         obtenerRecursoPorNombreAsignatura 
       } from "../controllers/index.controller.js";

const router = Router();

// Rutas para filtrar los recursos
router.get("/index/fecha", obtenerRecursoPorFecha);
router.get("/index/materia", obtenerRecursoPorMateria);
router.get("/index/carrera", obtenerRecursoPorCarrera);
router.get("/index/profesor", obtenerRecursoPorProfesor);
router.get("/index/tipo", obtenerRecursoPorTipo);
router.get("/index/nombre_asignatura", obtenerRecursoPorNombreAsignatura);

export default router;
