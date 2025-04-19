import {Register,Login,Logout, UploadAvatar} from '../controllers/user.controllers.js';
import {Router} from 'express';
import VerifyJWT from '../middlewares/auth.middlewares.js'
import upload from '../middlewares/multer.middlewares.js'
const router=Router();

router.route('/signup').post(Register);
router.route('/login').post(Login);
router.route('/logout').post(VerifyJWT,Logout);
router.route('/upload').post(upload.single('profile'),VerifyJWT,UploadAvatar);
export default router;