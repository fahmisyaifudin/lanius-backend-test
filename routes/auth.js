import express from 'express';
import * as authController from '../functions/auth';

const authRoute = express.Router(); 

authRoute.post('/login', authController.login);
authRoute.post('/register', authController.register);

export default authRoute;