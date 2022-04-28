import express from "express";
import homeControllers from '../controllers/homeControllers';
import userControllers from '../controllers/userControllers'

let router = express.Router();


let initWebRouters = (app) => {
    router.get('/', homeControllers.getHomePage)
    router.get('/hoidanit', (req, res) => {
        return res.send(' nguyen van cong')
    }) 
    router.get('/crud', homeControllers.getCRUD)
    router.post('/post-crud', homeControllers.postCRUD)
    router.get('/get-crud', homeControllers.displayGetCRUD);
    router.get('/edit-crud', homeControllers.getEditCRUD);  
    router.post('/put-crud', homeControllers.putCRUD);
    router.get('/delete-crud', homeControllers.deleteCRUD);

    router.post('/api/login', userControllers.handleLogin);
    router.get('/api/get-all-users', userControllers.handleGetAllUsers);
    
    router.post('/api/create-new-user', userControllers.handleCreateNewUser);
    router.put('/api/edit-user', userControllers.handleEditUser);
    router.delete('/api/delete-user', userControllers.handleDeleteUser);

    return app.use("/", router);
}

module.exports = initWebRouters;