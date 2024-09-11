const { Router } = require("express")
const UsersController = require('../controllers/UsersController.js')
const usersRoutes = Router()
const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
usersRoutes.put("/:user_id", usersController.update)

module.exports = usersRoutes