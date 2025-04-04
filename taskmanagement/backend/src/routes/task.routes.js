import {CreateTask,DeleteTask,UpdateTask,GetTaskById,GetallTasks,ToggleTask,GetpendingTasks,GetcompletedTasks} from '../controllers/task.controllers.js';
import { Router } from 'express';
const router=Router();
router.route('/').post(CreateTask).get(GetallTasks);
router.route('/pending').get(GetpendingTasks);
router.route('/completed').get(GetcompletedTasks);
router.route('/:id').patch(UpdateTask).delete(DeleteTask).get(GetTaskById);
router.route('/:id/ToggleTask').patch(ToggleTask);

export default router;