import {Controller} from "../../libs/types/project";
import {encryptString, respond} from "../../libs/methods/shared";
import UsersModel from "../../database/users.model";


export const createUser: Controller = async (req, res) => {
    try {
        const {firstName, lastName, identifier, role } = req.body;
        if (!firstName || !lastName || !identifier || !role || !['super','admin','user'].includes(role)) {
            return respond(res, "All fields are required", 400);
        }
        const query = [...Object.keys(req.body).filter(f => f!=='role').map(key => ({[key]: req.body[key]}))]
        const found = await UsersModel.findOne({$or: query});
        if(found)
            return respond(res, "User already exists!", 400)
        await UsersModel.create({
            ...req.body,
            password: encryptString('1234')
        })
            .then(() => {
                respond(res, "User created successfully!", 200)
            })
            .catch(err => {
                respond(res, "Failed to create user! Check all fields and try again!", 500)
            })
    } catch (err) {
        console.log(err)
        respond(res, "Sorry something went wrong!", 500)
    }
}

