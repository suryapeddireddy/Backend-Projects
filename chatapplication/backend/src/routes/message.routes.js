import { Router } from "express";
import VerifyJWT from "../middlewares/auth.middlewares.js";
import {getUsersForSidebar, GetMessages,SendMessages} from '../controllers/message.controllers.js'
import upload from '../middlewares/multer.middlewares.js'
const router=Router();
const cpUpload=upload.fields([{name:'image',maxCount:20}]);
router.use(VerifyJWT);
router.route('/').get(getUsersForSidebar);
router.route('/:id').get(GetMessages).post(cpUpload,SendMessages);
export default router;