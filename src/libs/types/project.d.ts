import express from "express";

declare interface AppRequest extends express.Request {
    auth?: {
        userId: string;
        role: 'user' | 'admin' | 'super';
    }
}
declare type Controller = (req: AppRequest, res: express.Response, next: express.NextFunction) => void;


export {
    Controller
}
