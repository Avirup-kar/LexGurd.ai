import express from 'express';
import { auth } from '../middleware/auth.js';
import { upload } from '../middleware/multer.js';
import { addproject, createEmail } from '../controllers/addProject.js';

const addprojectRouter = express.Router();

addprojectRouter.post('/addProject', upload.single('image'), auth, addproject);
addprojectRouter.post('/createEmail', auth, createEmail)

export default addprojectRouter;