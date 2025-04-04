import {Register, Login, Logout, changePassword} from '../controllers/user.controllers.js';

import { Router } from 'express';
const router=Router();

router.route('/register').post(Register);
router.route('/login').post(Login);
router.route('/logout').post(Logout);
router.route('/changepasswor').patch(changePassword);

export default router;