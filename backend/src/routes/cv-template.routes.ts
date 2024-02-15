
import express from 'express'


import { authenticateUser } from '../middleware/auth-middleware';
import { createTemplate } from '../controller/cvTemplateController/create-cv-template';



const router = express.Router();

router.post('/create-template', authenticateUser, createTemplate)


export default router