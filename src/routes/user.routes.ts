import express from 'express';
import AuthController from '../controllers/auth.controller';
import UserController from '../controllers/user.controller';
const routers = express.Router();

// middleware for multi-session authentication
// routers.use(AuthController.verifyAuth);

// middleware for single-session authtication
// routers.use(AuthController.verifyAuthSingle)

routers.get('/read', UserController.getAllUser);

export default routers;
