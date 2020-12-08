
import db from '../database/models';
import { returnSuccess } from './utils';
import Boom from '@hapi/boom';

const get = async (req, res, next) => {
    try {
        let user = await db.users.findOne({
            where: {
                authKey: req.authKey
            }
        });
        return returnSuccess(res, user);
    } catch (error) {
        return next(Boom.badImplementation(error));
    }
}

export { get }