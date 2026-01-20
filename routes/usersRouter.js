const {Router} = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();



usersRouter.get("/",usersController.messagesGet);
usersRouter.get("/new",usersController.messageFormGet)
usersRouter.get("/details/:id",usersController.messageDetailsGet)
usersRouter.post("/new",usersController.messagePost);

module.exports = usersRouter;