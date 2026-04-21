import express from 'express'
import { auth } from '../middleware/auth.js';
import { getProject, getProjectHistory } from '../controllers/getProject.js';

const getProjectRouter = express.Router();

getProjectRouter.get('/history/getAllProject', auth, getProjectHistory);
getProjectRouter.get('/getProject/:projectId', auth, getProject);

export default getProjectRouter;