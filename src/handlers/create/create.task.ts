import {Controller} from "../../libs/types/project";
import {respond} from "../../libs/methods/shared";
import TasksModel from "../../database/tasks.model";
import UsersModel from "../../database/users.model";


export const createTask: Controller = async (req, res) => {
    try{
        const { title, status, description, assignees } = req.body;
        if(assignees.length < 1)
            return respond(res, 'Please assign a user', 400)
        if(!title || !status || !description)
            return respond(res, "All fields are required!", 400)
        await TasksModel.create(req.body)
            .then(result => {
                respond(res, "Task created successfully!", 200)
            })
            .catch(err => {
                console.log(err)
                respond(res, "something went wrong! Check all fields and try again!", 400)
            })
    }catch (err){
        respond(res, "Please try again later!", 500)
    }
}

