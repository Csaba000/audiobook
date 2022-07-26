import express from 'express'
import User from '../controllers/user-controller.js';

const router = express.Router()


import userController from '../controllers/user-controller.js'
import userSchema from '../service/user-service.js'


route.post('/auth', User.auth);

route.post('/register', User.register);

export default router
