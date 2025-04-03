import {getProducts , getProductbyId, addProduct, deleteProduct, updateProduct} from '../controllers/product.controllers.js'
import { Router } from 'express'
import multer from 'multer';
const upload=multer({dest:'public/uploads/'});
const router=Router();

const cpUpload=upload.fields([{name:'images', maxCount:4}]);
router.route('/').get(getProducts).post(cpUpload,addProduct);
router.route('/product/:id').get(getProductbyId).delete(deleteProduct).patch(cpUpload,updateProduct);