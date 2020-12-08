import { returnSuccess, returnError } from '../functions/utils';
import db from '../database/models';
import Boom from '@hapi/boom';
const jwt = require('jsonwebtoken');

const VerifyToken = fn => async (req, res, next) => {
    let authHeader = req.headers.authorization;
    let token;
    
    if(!authHeader) {
        return next(Boom.unauthorized('No auth header provided'));
    }

    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7, authHeader.length);
    } else {
        return next(Boom.unauthorized('Unauthorized access, no token provided'));
    }

    if (!token) {
        return next(Boom.unauthorized('Unauthorized access, no token provided'));
    }

    try{
        const decodedToken = jwt.verify(token, 'secret')
        req.authKey = decodedToken.data
        return Promise.resolve(fn(req, res, next));
    }catch(error){
        console.log(error);
        return next(Boom.unauthorized('Auth is invalid'));
    }
};

export { VerifyToken };

