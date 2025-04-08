import { CreateCategory,DeleteCategory,GetCategoryById } from "../controllers/categories.controllers.js";
import { Router } from "express";
import verifyJWT from '../middlewares/auth.middlewares.js'
const router=Router();
router.use(verifyJWT);
router.route('/create-category').post(CreateCategory);
router.route('/:id').delete(DeleteCategory).get(GetCategoryById);

export default router;