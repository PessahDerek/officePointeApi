import express from "express";
import {readAllUsers} from "../handlers/read/read.allUsers";
import {readAppData} from "../handlers/read/read.appData";
import {accessMiddleware} from "../middleware/access.middleware";
import {createUser} from "../handlers/create/create.user";
import {deleteUser} from "../handlers/delete/delete.user";
import {createTask} from "../handlers/create/create.task";
import {updateTask} from "../handlers/update/update.task";


const adminRoutes = express.Router();

adminRoutes
    .get('/all-users', readAllUsers)
    .get('/admin-data', readAppData)
    .post('/create-user', createUser)
    .post('/create-task', createTask)
    .post('/update-task', updateTask)
    .delete('/user/:user_id', deleteUser)



export default adminRoutes;