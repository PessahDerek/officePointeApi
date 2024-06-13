import {Controller} from "../../libs/types/project";
import {respond} from "../../libs/methods/shared";
import TasksModel from "../../database/tasks.model";


export const deleteTask: Controller = async (req, res) => {
    try{
        const {task_id} = req.params;
        if(!task_id)
            return respond(res, "No ID found, please refresh and try again", 400);
        await TasksModel.findByIdAndDelete(task_id)
            .then(result => {
                if(!result)
                    return respond(res, "We could not find this task, please refresh and try again!", 400)
                respond(res, "Task was deleted successfully", 200)
            })
            .catch(err => {
                respond(res, "Failed to delete task! Please refresh and try again!", 500);
            })
    }catch(err){
        console.log(err)
        respond(res, "Sorry, something went wrong! Please try again later");
    }
}

