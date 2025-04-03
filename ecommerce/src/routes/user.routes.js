import { Router } from 'express';
import {RegisterUser, LoginUser, LogoutUser, getUserbyId, getallUsers,changePassword, updatecoverImage,updateaccount} from '../controllers/user.controllers.js'
import upload from '../middlewares/multer.middlewares.js';
const router=Router();
const cpUpload = upload.fields([{ name: "avatar", maxCount: 1 }]); // No quotes around maxCount

router.route('/register').post(cpUpload,RegisterUser);
router.route('/login').post(LoginUser);
router.route('/').get(getallUsers);
router.route('/user/:id').get(getUserbyId).patch(updateaccount);
router.route('/changepassword/:id').patch(changePassword);
router.route('/changecoverimage/:id').patch(cpUpload,updatecoverImage);
router.route('/logout').post(LogoutUser);

export default  router;