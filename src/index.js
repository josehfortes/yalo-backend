require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

const postController = require('./controller/post.controller')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/post', postController)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
