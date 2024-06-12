import {Controller} from "../../libs/types/project";
import {encryptString, respond} from "../../libs/methods/shared";
import UsersModel from "../../database/users.model";


export const updatePassword: Controller = async (req, res) => {
    try{
        const {oldPassword, newPassword, confirm} = req.body;
        if(!oldPassword || !newPassword || !confirm)
            return respond(res, "All fields are required", 400);
        if(newPassword !== confirm)
            return respond(res, "Passwords do not match", 400);
        if(oldPassword === newPassword)
            return respond(res, "You cannot use the old password", 400);
        await UsersModel.findByIdAndUpdate(req.auth?.userId, {
            $set: {password: encryptString(newPassword)}
        })
            .then(result => {
                respond(res, "Password updated successfully", 200)
            })
            .catch(err => {
                respond(res, "Failed to update the old password!", 400);
            })
    }catch(err){
        respond(res, "Sorry, something went wrong", 500)
    }
}

