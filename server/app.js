require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()

const port = process.env.SERVER_PORT

// const router = express.Router()

// router.get('/', function(req, res) {
//   res.json({ message: 'YAY' })
// })

// app.use('/', router)

app.use(express.static(path.join(__dirname, '../dist')))

app.listen(port)

console.log('Magic happens on port ' + port)
