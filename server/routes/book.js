import express from 'express'
const router = express.Router()

import getAudioBooks from '../controllers/book-controller.js'
import AudiBooksSchema from '../service/book-service.js'


router.get('/',getAudioBooks)

export default router
