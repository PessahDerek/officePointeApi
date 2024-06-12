import {Controller} from "../../libs/types/project";
import {respond} from "../../libs/methods/shared";
import UsersModel from "../../database/users.model";


export const deleteUser: Controller = async (req, res) => {
    try{
        const {user_id} = req.params;
        console.log("params: ",req.params)
        if(!user_id)
            return respond(res, "Bad Request", 400);
        await UsersModel.findByIdAndDelete(user_id)
            .then(user => {
                respond(res, `${user?.firstName} has been deleted`, 200);
            })
            .catch(err => {
                respond(res, "Failed to delete user! Check all fields and try again!", 500)
            })
    } catch (err){
        respond(res, "Sorry, something went wrong!", 500)
    }
}


