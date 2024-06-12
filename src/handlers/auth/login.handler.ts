import {Controller} from "../../libs/types/project";
import {compareEncrypted, encryptString, generateToken, respond} from "../../libs/methods/shared";
import UsersModel from "../../database/users.model";


export const loginHandler: Controller = async (req, res) => {
    try {
        const {identifier, password} = req.body;
        if (!identifier || !password)
            return respond(res, "All fields are required", 400);
        await UsersModel.findOne({identifier: identifier})
            .select("+password")
            .then(user => {
                console.log(encryptString(password))
                if (!user)
                    return respond(res, "Wrong email or phone number!", 401);
                if(!compareEncrypted(password, user.password))
                    return respond(res, "Wrong email or phone number!", 401);
                respond(res, "Welcome back", 200, {
                    isAuthenticated: true,
                    token: generateToken(user._id.toString(), user.role),
                    role: user.role
                })
            })
            .catch(err => {
                throw new Error(err)
            })
    } catch (err) {
        console.log(err)
        respond(res, "Something went wrong, please try again!", 500)
    }
}

