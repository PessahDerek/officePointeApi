import express from "express";
import * as mongoose from "mongoose";
import cors from 'cors';
import dotenv from "dotenv";
import indexRoutes from "./routes/index.routes";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    credentials: false,
    exposedHeaders: ['message']
}))

app.use("/mock_api", indexRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server started at: ${process.env.PORT}`);
})

mongoose
    .connect(process.env.DB_URI)
    .then(result => {
        console.log("Database Connected");
    })
    .catch(err => {
        console.log("Error connecting to DB:\n", err);
    })




