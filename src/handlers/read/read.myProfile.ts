import {Controller} from "../../libs/types/project";
import {respond} from "../../libs/methods/shared";
import UsersModel from "../../database/users.model";


export const readMyProfile: Controller = async (req,res) => {
    try{
        const found = await UsersModel.findById(req.auth?.userId);
        console.log("da fuq: ", found)
        if(!found)
            return respond(res, "Sorry, we couldn't find your account!", 400)
        respond(res, "Yay!", 200, found)
    }catch (err){
        respond(res, "Sorry, something went wrong!")
    }
}

