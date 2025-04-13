import { ViewCart, EmptyCart, UpdateQuantity } from '../controllers/cart.controllers.js'
import { Router } from 'express'

const router=Router();
router.route('/').get(ViewCart);
router.route('/empty').patch(EmptyCart);
router.route('/update').patch(UpdateQuantity);


export default router;