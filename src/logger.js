const winston = require('winston');
const { name } = require('./config/config');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: name === 'production' ? [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ] : []
});

module.exports = logger;