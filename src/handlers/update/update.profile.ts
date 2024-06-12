import {Controller} from "../../libs/types/project";
import {respond} from "../../libs/methods/shared";
import UsersModel from "../../database/users.model";


export const updateProfile: Controller = async (req, res) => {
    try{
        await UsersModel.findByIdAndUpdate(req.auth?.userId, {
            ...req.body
        })
            .then(result => {
                respond(res, "Profile updated successfully.", 200)
            })
            .catch(err => {
                respond(res, 'Failed to update profile!', 400);
            })
    }catch(err){
        respond(res, "Sorry, something went wrong!", 500)
    }
}

