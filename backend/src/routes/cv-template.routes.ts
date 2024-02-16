
import express from 'express'


import { authenticateUser } from '../middleware/auth-middleware';
import { createTemplate } from '../controller/cvTemplateController/create-cv-template';
import { getTemplate } from '../controller/cvTemplateController/get-user-template';



const router = express.Router();

router.post('/create-template', authenticateUser, createTemplate)
router.get('/get-template', authenticateUser, getTemplate)


export default router