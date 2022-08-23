import express from "express";
import homeController from "../controllers/homeController";
// 35. import controller moi
import userController from "../controllers/userController";
let router = express.Router();
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    // get crud
    router.get('/get-crud', homeController.DisplayGetCRUD);
    // edit crud
    router.get('/edit-crud', homeController.getEditCRUD);
    //update crud
    router.post('/put-crud', homeController.putCRUD);
    // delete CRUD
    router.get('/delete-crud', homeController.deleteCRUD);

    // 35.Tao cac router su dung API voi React
    router.post('/api/login', userController.handleLogin)

    return app.use("/", router);
}
module.exports = initWebRoutes;