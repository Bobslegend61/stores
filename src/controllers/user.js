const User = require('../models/Users');
const logger = require('../logger');
const { validation, respond, hashPassword } = require('../util/helper');

module.exports = (() => {
    const register = (req, res) => {

        if(!req.body || !req.body.username || !req.body.firstname || !req.body.lastname || !req.body.password || !req.body.confirmPassword) return respond(400, { error: 'Bad Request', message: 'Invalid Fields', statusCode: 400 }, res);

        const { body: { username, firstname, lastname, password, confirmPassword } } = req;
        
        let validationArray = [
            {
                validate: username,
                validators: [
                    {
                        name: 'emptiness',
                        value: ''
                    }, {
                        name: 'type',
                        value: 'string'
                    }
                ]
            },
            {
                validate: firstname,
                validators: [
                    {
                        name: 'emptiness',
                        value: ''
                    }, {
                        name: 'type',
                        value: 'string'
                    }
                ]
            },
            {
                validate: lastname,
                validators: [
                    {
                        name: 'emptiness',
                        value: ''
                    }, {
                        name: 'type',
                        value: 'string'
                    }
                ]
            },
            {
                validate: password,
                validators: [
                    {
                        name: 'emptiness',
                        value: ''
                    }, {
                        name: 'type',
                        value: 'string'
                    }
                ]
            },
            {
                validate: confirmPassword,
                validators: [
                    {
                        name: 'emptiness',
                        value: ''
                    }, {
                        name: 'type',
                        value: 'string'
                    }
                ]
            },
        ];

        const validationErrors = validation(validationArray);
        if(validationErrors.length > 0) return respond(400, { error: 'Bad Request', message: 'Invalid Fields.', statusCode: 400 }, res);

        if(password !== confirmPassword) return respond(400, { error: 'Bad Request', message: 'Password does not match', statusCode: 400 }, res);

        // hash password
        hashPassword(password, (err, hash) => {
            if(err) {
                logger.log({ level: 'error', message: err });
                return respond(500, { error: 'Internal server error', message: 'Something went wrong. Please try again', statusCode: 500 }, res);
            }

            const newUser = new User({
                username, firstname, lastname,
                password: hash
            });
            

            newUser.save((err, user) => {
                if(err || user) {
                    logger.log({ level: 'error', message: err });
                    return respond(500, { error: 'Internal server error', message: 'Something went wrong. Please try again', statusCode: 500 }, res);
                }

                respond(201, { message: 'Created', statusCode: 201 }, res);
            });
        });

    };

    return {
        register
    };
})();