import express from 'express';
import isAuthenticated from '../utils/isAuhtenticated.js';
import { addtask, delettask,updatetask,alltask } from '../controllers/task.controller.js';

 export const taskRouter = express.Router();
taskRouter.post('/addtask', isAuthenticated, addtask);
taskRouter.delete('/delete/:id', isAuthenticated, delettask);
taskRouter.put('/update/:id', isAuthenticated, updatetask);
taskRouter.get('/alltask', isAuthenticated, alltask);