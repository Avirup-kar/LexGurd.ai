import express from 'express';
import { auth } from '../middleware/auth.js';
import multer from 'multer';
import { upload } from '../middleware/multer.js';
import { addproject } from '../controllers/addProject.js';

const addprojectRouter = express.Router();

addprojectRouter.post('/addProject', upload.single('image'), auth, addproject);

export default addprojectRouter;