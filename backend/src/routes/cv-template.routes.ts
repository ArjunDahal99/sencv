
import express from 'express'


import { authenticateUser } from '../middleware/auth-middleware';
import { createTemplate } from '../controller/cvTemplateController/create-cv-template';
import { getTemplate, getTemplateByID } from '../controller/cvTemplateController/get-user-template';
import { deleteTemplate } from '../controller/cvTemplateController/delete-cv-template';



const router = express.Router();

router.post('/create-template', authenticateUser, createTemplate)
router.get('/get-template', authenticateUser, getTemplate)
router.post('/get-one-template', authenticateUser, getTemplateByID)
router.delete('/delete-template/:templateId', authenticateUser, deleteTemplate)



export default router