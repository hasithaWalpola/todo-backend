const router = require('express').Router();

//Controllers
const authController = require('../controller/auth.controller')
const userController = require('../controller/user.controller')
const todoController = require('../controller/todo.controller')

//Middleware
const isAuth = require('../middleware/isAuth')

//Auth routes
router.post('/login', authController.login)

//User routes
router.get('/users', isAuth, userController.getAllUsers)
router.post('/register', userController.create)

//Todo routes
router.post('/todo', isAuth, todoController.create)
router.get('/todo/:id', isAuth, todoController.getAllTodosByUser)


module.exports = router