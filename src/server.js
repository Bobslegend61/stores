const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const winston = require('winston');

const logger = require('./logger');
const { PORT, name } = require('./config/config');

const app = express();
const router = express.Router();


app.use(require('./route/router')(router));
if(name !== 'production') {
    app.use(cors());
    app.use(morgan('dev'));
    logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));


const initializeServer = () => {
    app.listen(PORT, () => logger.log({ level: 'info', message: `App listening on port ${ PORT } and running in ${ name } mode.` }));
};

module.exports = {
    initializeServer
};

