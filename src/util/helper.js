const logger = require('../logger');
const helper = {};

helper.respond = (status = 200, responseData, res) => {
    if(typeof(status) !== 'number' || typeof(responseData) !== 'object') {
        logger.log({ level: 'error', message: 'Unknown data type' });
        return res.status(502).json({ error: 'Bad Gateway', message: 'Unknown data type' });
    }else {
        return res.status(status).json(responseData);
    }
};

module.exports = logger;