import {Controller} from "../../libs/types/project";
import {respond} from "../../libs/methods/shared";
import UsersModel from "../../database/users.model";


export const readAllUsers: Controller = async (req, res) => {
    try{
        const allUsers = await UsersModel.find({});
        res.json(allUsers);
    }catch(err){
        respond(res, "Something went wrong", 500);
    }
}

