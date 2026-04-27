import express from 'express'
import { auth } from '../middleware/auth.js';
import Translate from '../controllers/translate.js';

const getTranslatedtext = express.Router();


getTranslatedtext.post('/translate-clause', auth, Translate);

export default getTranslatedtext;