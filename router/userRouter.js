const express = require('express')
const Router = express.Router()
const { tokenVerify } = require("../middleware/verifyToken");

// Import All Controller
const {userController} = require('../controller') // Akan otomatis mengambil file index.js nya
Router.post('/login',userController.login)
Router.get('/get-profile',tokenVerify,userController.getProfile)

module.exports = Router