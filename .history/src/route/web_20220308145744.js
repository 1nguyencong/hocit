import express from "express";
import homeControllers from '../controllers/homeControllers'

let router = express.Router();


let initWebRouters = (app) => {
    router.get('/', homeControllers.getHomePage)
    router.get('/hoidanit', (req, res) => {
        return res.send(' nguyen van cong')
    }) 
    return app.use("/", router);
}

module.exports = initWebRouters;