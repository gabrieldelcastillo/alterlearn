import {Router} from "express"
import {getEmployes, updateEmployes, createEmployes, deleteEmployes, getEmploye } from "../controllers/employes.controller.js"

const router = Router()

router.get('/employers', getEmployes)
router.get('/employers/:id', getEmploye)
router.post('/employers', createEmployes)
router.patch('/employers/:id', updateEmployes) //con put altera todo con patch solo un dato
router.delete('/employers/:id', deleteEmployes)

export default router