import express from "express";

let router = express.Router();


let initWebRouters = (app) => {
    router.get('/', (req, res) => {
        return res.send('hello world')
    })
    router.get('./hoidanit', (req, res) => {
        return res.send(' nguyen van cong')
    }) 
    return app.use("/", router);
}

module.exports = initWebRouters;