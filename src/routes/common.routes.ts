import {Router} from "express";
import {loginHandler} from "../handlers/auth/login.handler";
import {readAppData} from "../handlers/read/read.appData";
import {accessMiddleware} from "../middleware/access.middleware";
import {readMyProfile} from "../handlers/read/read.myProfile";
import {updatePassword} from "../handlers/update/update.password";
import {updateProfile} from "../handlers/update/update.profile";


const commonRoutes = Router();

commonRoutes
    .post('/login', loginHandler)
    .use(accessMiddleware)
    .get('/app-data', readAppData)
    .get("/my-profile", readMyProfile)
    .post('/update-password', updatePassword)
    .post("/update-profile", updateProfile)
    // .post('/logout', )

export default commonRoutes;

