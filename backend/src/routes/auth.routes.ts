
import express from 'express'
import 
{
    activateAccount,
    forgotPassword,
    loginToAccount,
    logoutUser,
    registerAccount,
    resetPassword
} from '../controller/authController';

import { authenticateUser } from '../middleware/auth-middleware';



const router = express.Router();

router.post('/registerAccount', registerAccount)
router.post('/loginToAccount', loginToAccount)
router.post('/activateAccount', activateAccount)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)
router.post('/logoutAccount', authenticateUser, logoutUser)


export default router