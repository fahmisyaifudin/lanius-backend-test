import express from 'express';
import * as profileController from '../functions/profile';

const userRoute = express.Router(); 

userRoute.get('/', profileController.get);

export default userRoute;