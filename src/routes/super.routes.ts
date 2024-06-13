import express from "express";
import {createUser} from "../handlers/create/create.user";
import {deleteTask} from "../handlers/delete/delete.task";


const superRouter = express.Router();

superRouter
    .delete('/task/:task_id', deleteTask)

export default superRouter;

