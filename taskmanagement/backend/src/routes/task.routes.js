import  {CreateTask,DeleteTask,UpdateTask,GetTaskById,GetAllTasks,ToggleTask,GetPendingTasks,GetCompletedTasks,GetReminderTasks} from '../controllers/task.controllers.js'
import { Router } from 'express';
import VerifyJWT from '../middlewares/auth.middlewares.js';
const router=Router();
router.use(VerifyJWT);
router.route('/').post(CreateTask).get(GetAllTasks);
router.route('/pending').get(GetPendingTasks);
router.route('/completed').get(GetCompletedTasks);
router.route('/reminder').get(GetReminderTasks);
router.route('/:id').patch(UpdateTask).delete(DeleteTask).get(GetTaskById);
router.route('/:id/ToggleTask').patch(ToggleTask);

export default router;