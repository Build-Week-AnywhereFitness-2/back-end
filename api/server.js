const express = require('express');
const helmet = require('helmet')
const cors = require('cors');

// <---- Import routers here
const authRouter = require('./auth/router');
const classesRouter = require('./classes/router');

const server = express();

// MIDDLEWARE //
server.use(helmet());
server.use(express.json());
server.use(cors());

// ROUTERS //
server.use('/api/auth', authRouter);
server.use('/api/classes', classesRouter);

server.get('/', (req, res) => {
    res.status(200).json("API up");
})

// EXPORT //
module.exports = server;