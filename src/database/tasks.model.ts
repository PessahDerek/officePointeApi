import mongoose, {Schema} from "mongoose";
import UsersModel from "./users.model";


const tasksModel = new Schema({
    title: String,
    description: String,
    assignees: {type: [mongoose.Types.ObjectId], ref: UsersModel},
    status: String
})

export default mongoose.model('Tasks', tasksModel);

