import express from 'express'
import {newUser, loginUser} from '../controllers/userControllers.js'

const router = express.Router();

router.post('/addUser',newUser);
router.post('/login',loginUser);


export default router;