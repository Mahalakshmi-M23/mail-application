import express from 'express';
import { getAllMails, getMail, addMail, updateMailStatus, deleteAllMails } from '../controllers/mail.js';
import { auth } from '../controllers/auth.js';

const router = express.Router();

router.get('/getAllMails', auth, getAllMails);
router.get('/getMail', auth, getMail);
router.post('/add', addMail);
router.put('/update', updateMailStatus);
router.delete('/delete', deleteAllMails);

export default router;