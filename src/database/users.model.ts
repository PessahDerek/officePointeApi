import {model, Schema} from "mongoose";


const UsersModel = new Schema({
    identifier: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true, select: false},
    role: {type: String, required: true, default: "User"},
    __v: {type: Number, select: false},
})


export default model('Users', UsersModel);
