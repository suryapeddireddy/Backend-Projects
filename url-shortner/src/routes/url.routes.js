import { Router } from "express";
import { generatenewshorturl ,redirecturl,getanalytics} from "../controllers/url.controllers.js";
const router=Router();

router.route('/').post(generatenewshorturl);
router.route('/:shortId').get(redirecturl).get(getanalytics);
export default router;