import express, { json } from 'express';
import {createUser} from "../controllers/userController.js"
const router = express.Router()

router.post("",createUser)

export default router