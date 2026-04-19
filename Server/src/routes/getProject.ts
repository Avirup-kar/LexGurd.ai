import express from 'express'
import { auth } from '../middleware/auth.js';
import { getProject, getProjectHistory } from '../controllers/getProject.js';

const addprojectRouter = express.Router();

addprojectRouter.get('/history/getAllProject', auth, getProjectHistory);
addprojectRouter.get('/getProject', auth, getProject);

export default addprojectRouter;