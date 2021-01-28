const express = require('express');
const helmet = require('helmet')
const cors = require('cors');

// <---- Import routers here

const server = express();

// MIDDLEWARE //
server.use(helmet());
server.use(express.json());
server.use(cors());

// ROUTERS //


server.get('/', (req, res) => {
    res.status(200).json("API up");
})

// EXPORT //
module.exports = server;