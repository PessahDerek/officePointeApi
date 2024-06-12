import {Controller} from "../../libs/types/project";
import UsersModel from "../../database/users.model";
import TasksModel from "../../database/tasks.model";


export const readAppData: Controller = async (req, res) => {
    try {
        const allUsers = await UsersModel.find({}).select("-password");
        const allTasks = await TasksModel.find({})
            .populate('assignees');
        res.status(200).json({
            users: allUsers.filter(u => u.role === 'user'),
            admins: allUsers.filter(f => f.role === 'admin'),
            tasks: allTasks
        });
    }catch (err){

    }
}

