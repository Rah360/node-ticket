import express, { json } from 'express';
import {assignUser, createTicket,getAnalytics} from "../controllers/ticketController.js"
import auth from '../middleware/auth.js';
const router = express.Router()

router.post("/",auth,createTicket)
router.post("/:ticketId/assign",auth,assignUser)
router.post("/analytics",auth,getAnalytics)

export default router