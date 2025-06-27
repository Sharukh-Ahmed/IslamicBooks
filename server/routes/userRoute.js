import express from 'express'
import { isAuth, login, logout, register, testAuth } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/is-auth', authUser, isAuth)
userRouter.get('/test-auth', authUser, testAuth)
userRouter.get('/logout', authUser, logout)

export default userRouter;