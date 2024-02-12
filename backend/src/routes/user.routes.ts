
import express from 'express'


import { authenticateUser } from '../middleware/auth-middleware';
import { getUserData } from '../controller/userController/get-user-data';



const router = express.Router();

router.get('/getUserData', authenticateUser, getUserData)



export default router