import {Register,Login,Logout} from '../controllers/user.controllers.js';
import {Router} from 'express';
import upload from '../middlewares/multer.middlewares.js'
import VerifyJWT from '../middlewares/auth.middlewares.js'

const router=Router();

router.route('/register').post(upload.single('profile'),Register);
router.route('/login').post(Login);
router.route('/logout').post(VerifyJWT,Logout);
router.route('/check',(req,res)=>{
if(req.user)return res.status(200).json({message:"ok"});
return res.status(404).json({message:"failed"});
});
export default router;