import {Controller} from "../libs/types/project";
import {respond} from "../libs/methods/shared";
import jwt from 'jsonwebtoken';


export const accessMiddleware: Controller = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        if (!token) {
            return respond(res, "Login to proceed!", 401)
        }
        jwt.verify(token, process.env.SERVER_KEY, (err, decoded) => {
            if(err){
                return respond(res, "Your session is expired! Please login to proceed!", 401)
            }
            if(typeof decoded === 'string' || !decoded)
                return respond(res, "Permission denied!", 403)
            if(req.path.includes('admin') && decoded.role === 'user')
                return respond(res, "You are not allowed to complete this operation!", 403)
            if(req.path.includes('super') && decoded.role !== 'super')
                return respond(res, "You are not allowed to complete this operation!", 403)
            Object.assign(req, {auth: {...decoded, userId: decoded.userId.split('').reverse().join("")}})
            console.log('auth: ', decoded)
            next()
        })
    } catch (err) {
        respond(res, 'Sorry, something went wrong!', 401)
    }
}

