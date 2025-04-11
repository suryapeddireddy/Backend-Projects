import { Router } from "express";
import { generatenewshorturl } from "../controllers/url.controllers.js";
const router=Router();

router.route('/').get(generatenewshorturl);
export default router;