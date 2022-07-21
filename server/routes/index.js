import * as dotenv from 'dotenv'
import express from 'express'
const app = express()
const port = process.env.PORT || 3000
const router = express.Router()

app.get('/', (req, res) => {
  console.log(process.env)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
export default router
