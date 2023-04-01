import express from 'express'
import homeController from '../controllers/homeController'
import userController from '../controllers/userController'

let router = express.Router();

let initWebRoutes = (app) => {

    router.get("/", homeController.getHomePage)
    router.get("/about", homeController.aboutPage)
    router.get("/crud", homeController.getCrud)
    router.post("/post-crud", homeController.postCRUD)
    router.get("/get-crud", homeController.displayGetCRUD)
    router.get("/edit-crud", homeController.editCRUD)
    router.post("/put-crud", homeController.putCRUD)
    router.get("/delete-crud", homeController.deleteCRUD)
    router.post("/api/login", userController.handleLogin)
    return app.use("/", router);
}

module.exports = initWebRoutes