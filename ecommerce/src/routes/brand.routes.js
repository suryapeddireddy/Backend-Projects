import { AddBrand, DeleteBrand, GetBrandById } from '../controllers/brand.controllers.js'
import { Router } from 'express'
import VerifyJWT from '../middlewares/auth.middlewares.js'
import { verify } from 'jsonwebtoken';
import verifyJWT from '../middlewares/auth.middlewares.js';

const router=Router();
router.use(verifyJWT);
router.route('/create-brand').post(AddBrand);
router.route('/:id').delete(DeleteBrand).get(GetBrandById);

export default router;
