import express from 'express';
import { signuphandeler ,loginhandeler ,profile ,logout} from '../controllers/user.controller.js'
import isAuthenticated from '../utils/isAuhtenticated.js';


 const userRouter = express.Router()
 userRouter.post('/signup', signuphandeler)    
 userRouter.post('/login',loginhandeler)
 userRouter.get('/profile',isAuthenticated, profile)
 userRouter.get('/logout',isAuthenticated, logout)



 export default userRouter