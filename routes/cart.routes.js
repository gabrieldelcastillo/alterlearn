import { Router } from "express";
import { //agregar el middleware de usuario registrado, debe existir una session activa para poder ocupar el carro
  guardarCarro, // Guarda la compra actual para mantener el carro persistente
  comprarRecurso, // Una vez comprado, se descarga automáticamente el PDF
  eliminarRecurso, // Elimina un recurso del carro de compras
  guardarRecurso // Agrega un recurso al carro de compras
} from "../controllers/cart.controller.js";

const router = Router();

// Rutas para el carro de compras
router.post("/cart/guardar", guardarCarro);
router.post("/cart/comprar", comprarRecurso);
router.delete("/cart/eliminar", eliminarRecurso);
router.post("/cart/guardar-recurso", guardarRecurso);

export default router;