import express from "express";
import bodyParser from "body-parser";
import viewEng from "./config/viewEng";
import initWebRouters from "./route/web";
import connectDb from "./config/connectDB";
import cors from "cors";
require('dotenv').config();

let app = express();
app.use(cors({origin: true}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEng(app);
initWebRouters(app);

connectDb();

let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log(" backend nodejs " + port)
})