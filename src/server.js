const PORT = process.env.PORT || 8000
const express = require('express')
const server = express()
const cors = require('cors')
const {CLIENT_ORIGIN} = require('./config')

server.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

server.get('/api', (req, res) => {
    res
      .status(200)
      .send('Hello, world!')
})

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

module.exports = server