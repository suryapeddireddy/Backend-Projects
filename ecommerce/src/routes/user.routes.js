import { Router } from 'express';
import {RegisterUser, LoginUser, LogoutUser, getUserbyId, getallUsers,changePassword, updateavatar,updateaccount} from '../controllers/user.controllers.js'
import upload from '../middlewares/multer.middlewares.js';
import verifyJWT from '../middlewares/auth.middlewares.js';
const router=Router();
const cpUpload = upload.fields([{ name: "avatar", maxCount: 1 }]); // No quotes around maxCount

router.route('/register').post(cpUpload,RegisterUser);
router.route('/login').post(LoginUser);
router.route('/').get(getallUsers);
router.route('/user/:id').get(getUserbyId);
router.route('/updateaccount').patch(verifyJWT,updateaccount);
router.route('/changepassword').patch(verifyJWT,changePassword);
router.route('/changeavatar').patch(verifyJWT,cpUpload,updateavatar);
router.route('/logout').post(verifyJWT, LogoutUser);

export default  router;