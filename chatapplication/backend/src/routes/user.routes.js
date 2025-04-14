import {Register,Login,Logout} from '../controllers/user.controllers.js';
import {Router} from 'express';
import upload from '../middlewares/multer.middlewares.js'
import VerifyJWT from '../middlewares/auth.middlewares.js'
import { verify } from 'jsonwebtoken';
const router=Router();
router.route(upload.single('profile'),'/register').post(Register);
router.route('/login').post(Login);
router.route(VerifyJWT,'/logout').post(Logout);

export default router;