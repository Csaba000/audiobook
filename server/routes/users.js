import express from 'express'

const router = express.Router()


import userController from '../controllers/user-controller.js'
import userSchema from '../service/user-service.js'


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

export default router
