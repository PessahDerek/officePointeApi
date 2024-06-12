import {Controller} from "../../libs/types/project";
import {respond} from "../../libs/methods/shared";
import TasksModel from "../../database/tasks.model";
import {response} from "express";


export const updateTask: Controller = async (req, res) => {
    const {status, task_id} = req.body;
    if(!['pending', 'failed', 'completed', 'overdue'].includes(status)) {
        return respond(res, "Invalid status, wonder where you got that from, hmm", 400);
    }
    await TasksModel.findByIdAndUpdate(task_id, {
        status: status
    })
        .then(result => {
            if(!result)
                return respond(res, "We couldn't find the task! Refresh and retry!", 400)
            respond(res, "Task was updated successfully", 200)
        })
        .catch(err => {
            respond(res, "Failed to update the task!", 500);
        })
}

