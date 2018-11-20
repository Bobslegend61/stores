const bcrypt = require('bcryptjs');
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

helper.validation = (validationArray) => {
    let validationErrors = [];

    validationArray.forEach(({ validate, validators }) => {
        validators.forEach(({ name, value }) => {
            switch(name) {
                case 'emptiness':
                    if(!validate || validate.trim() === value) validationErrors.push({ name, message: 'Field cannot be empty' });
                break;
                case 'type':
                    if(typeof(validate) !== value) validationErrors.push({ name, message: `Expecting a ${ value } but got ${ typeof(validate) } instead` });
                break;
            }
        });
    });

    return validationErrors;
};

helper.hashPassword = (password, callback) => {
    bcrypt.hash(password, 8, callback);
};

helper.comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, callback);
};

module.exports = helper;