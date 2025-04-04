import {CreateTask,DeleteTask,UpdateTask,GetTaskById,GetallTasks,ToggleTask,GetpendingTasks,GetcompletedTasks,GetReminderTasks} from '../controllers/task.controllers.js';
import { Router } from 'express';
import VerifyJWT from '../middlewares/auth.middlewares.js';
const router=Router();
router.use(VerifyJWT);
router.route('/').post(CreateTask).get(GetallTasks);
router.route('/pending').get(GetpendingTasks);
router.route('/completed').get(GetcompletedTasks);
router.route('/reminder').get(GetReminderTasks);
router.route('/:id').patch(UpdateTask).delete(DeleteTask).get(GetTaskById);
router.route('/:id/ToggleTask').patch(ToggleTask);

export default router;