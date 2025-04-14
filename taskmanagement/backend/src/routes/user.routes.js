import {Register, Login, Logout, changePassword} from '../controllers/user.controllers.js';
import VerifyJWT from '../middlewares/auth.middlewares.js'
import { Router } from 'express';
const router=Router();

router.route('/register').post(Register);
router.route('/login').post(Login);
router.route('/logout').post(VerifyJWT,Logout);
router.route('/changepasswor').patch(VerifyJWT,changePassword);

export default router;