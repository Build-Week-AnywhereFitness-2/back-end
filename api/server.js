const express = require('express');
const helmet = require('helmet')
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


// <---- Import routers & custom middleware here
const restrictRoute = require('./middleware/restrictRoute');
const authRouter = require('./auth/router');
const classesRouter = require('./classes/router');
const usersRouter = require('./users/router');

const server = express();

// MIDDLEWARE //
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(morgan('dev'));
server.use(cookieParser());
server.use(restrictRoute());

// ROUTERS //
server.use('/api/auth', authRouter);
server.use('/api/classes', classesRouter);
server.use('/api/users', usersRouter);


server.get('/', (req, res) => {
    res.status(200).json("API up");
})

// EXPORT //
module.exports = server;