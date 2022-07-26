import express from 'express'
import userController from '../controllers/user-controller.js';

const router = express.Router()


import userSchema from '../service/user-service.js'


route.post('/auth', userController.auth);

route.post('/register', userController.register);

export default router
