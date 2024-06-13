import {Router} from "express";
import commonRoutes from "./common.routes";
import superRoutes from "./super.routes";
import adminRoutes from "./admin.routes";


const indexRoutes = Router();

indexRoutes
    .use(commonRoutes)
    .use("/admin", adminRoutes)
    .use("/super", superRoutes)

export default indexRoutes;

