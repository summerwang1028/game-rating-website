const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@ds239587.mlab.com:39587/game-rate');
require('./models');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games');
const commentsRouter = require('./routes/comments');

app.use('/users', usersRouter);
app.use('/games', gamesRouter);
app.use('/comments', commentsRouter);


module.exports = app;
