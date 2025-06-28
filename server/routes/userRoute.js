import express from 'express'
import { isAuth, login, logout, register, debugCookies } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/is-auth', authUser, isAuth)
userRouter.get('/debug-cookies', debugCookies)
userRouter.post('/logout', logout)

export default userRouter;