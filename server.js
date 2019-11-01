const express = require('express')
const cors = require('cors')
const postRouter = require('./post/post-router')
const server = express()
server.use(express.json())
server.use(cors())

server.use('/api/post/', postRouter);

server.get('/', (req, res) => {
    res.send(`
        <h1>You found The Api</h1>
    `)
})

module.exports = server