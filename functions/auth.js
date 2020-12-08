
import db from '../database/models';
import { returnSuccess } from './utils';
import Boom from '@hapi/boom';
import Joi from '@hapi/joi';

const bcrypt = require('bcrypt')
const randomstring = require("randomstring");
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.required(),
            password: Joi.required()
        });
        
        let data = req.body;
        const { error, value } = schema.validate(data);

        if (error) {
            return next(Boom.badRequest(error.details.map(i => i.message).join(',')));
        }

        let user = await db.users.findOne({
            where: {
                email: value.email
            }
        })

        if (!user) {
            return next(Boom.badRequest("Email doesnt exist"));
        }

        if (!bcrypt.compareSync(value.password, user.password)) {
            return next(Boom.badRequest("Password Wrong"));
        }
       
        let token = jwt.sign({
                                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                                data: user.authKey
                            }, 'secret');
        return returnSuccess(res, { token });
    } catch (error) {
        return next(Boom.badImplementation(error));
    }
}

const register = async (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.required(),
            password: Joi.required(),
            fullName: Joi.required()
        });
    
        let data = req.body;
        const { error, value } = schema.validate(data);

        if (error) {
            return next(Boom.badRequest(error.details.map(i => i.message).join(',')));
        }

        let input = {
            email: value.email,
            password: bcrypt.hashSync(value.password, 10),
            fullName: value.fullName,
            authKey: randomstring.generate(),
            isActive: true,
        }

        const user = await db.users.create(input);
        return returnSuccess(res, user);
    } catch (error) {
        return next(Boom.badImplementation(error));   
    }
}

export { login, register }