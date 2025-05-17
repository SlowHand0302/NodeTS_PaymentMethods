import express from 'express';
import AuthController from '../controllers/auth.controller';
const routers = express.Router();

routers.post('/signUp', AuthController.signUp);

routers.post('/signIn', AuthController.signIn);

routers.post('/signIn/google', AuthController.signInWithGoogle);

routers.post('/signOut', AuthController.signOut);

routers.post('/resetPassword', AuthController.resetPassword);

routers.post('/verifyOTP', AuthController.verifyOTP);

export default routers;
