import {getProducts , getProductbyId, addProduct, deleteProduct, updateProduct} from '../controllers/product.controllers.js'
import { Router } from 'express'
import upload from '../middlewares/multer.middlewares.js';
import verifyJWT from '../middlewares/auth.middlewares.js';
const router=Router();

const cpUpload=upload.fields([{name:'images', maxCount:4}]);
router.use(verifyJWT);
router.route('/').get(getProducts).post(cpUpload,addProduct);
router.route('/product/:id').get(getProductbyId).delete(deleteProduct).patch(cpUpload,updateProduct);

export default router;