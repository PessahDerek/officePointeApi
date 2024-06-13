import {Controller} from "../../libs/types/project";
import UsersModel from "../../database/users.model";
import TasksModel from "../../database/tasks.model";


export const readAppData: Controller = async (req, res) => {
    try {
        const allUsers = await UsersModel.find({}).select("-password");
        const allTasks = await TasksModel.find({}).populate('assignees')
            .populate('assignees');
        res.status(200).json({
            users: req.auth?.role === 'user' ? [] : allUsers.filter(u => u.role === 'user'),
            admins: req.auth?.role === 'user' ? [] : allUsers.filter(f => f.role === 'admin'),
            tasks: req.auth?.role === 'user' ? allTasks.filter(f => f.assignees.find(a => a._id === req.auth?.userId)) : allTasks
        });
    } catch (err) {

    }
}

