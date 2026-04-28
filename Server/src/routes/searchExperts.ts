import express from 'express'
import { auth } from '../middleware/auth.js';
import { searchExpertsController } from '../controllers/getExpert.js';


const getExpert = express.Router();

getExpert.post('/search-experts', auth, searchExpertsController);

export default getExpert;