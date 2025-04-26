import {
  Register,
  Login,
  Logout,
  UploadAvatar,
} from "../controllers/user.controllers.js";
import { Router } from "express";
import VerifyJWT from "../middlewares/auth.middlewares.js";
import upload from "../middlewares/multer.middlewares.js";
const router = Router();
router.route("/isauth").get(VerifyJWT, (req, res) => {
  return res.status(200).json({user:req.user});
});
router.route("/signup").post(Register);
router.route("/login").post(Login);
router.route("/logout").post(VerifyJWT, Logout);
router.route("/upload").post(upload.single("profile"), VerifyJWT, UploadAvatar);
export default router;
