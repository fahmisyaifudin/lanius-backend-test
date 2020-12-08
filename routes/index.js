import Boom from '@hapi/boom';
import { VerifyToken } from "../middleware/verifyTokenMiddleware";
import authRoute from './auth';
import userRoute from './user'

const mountRoutes = (app) => {
    app.use('/api/auth', authRoute);
    app.use('/api/profile', VerifyToken(userRoute));
    app.get('*', (req, res, next) => next(Boom.notFound('Route does not exist')));
};

export default mountRoutes;