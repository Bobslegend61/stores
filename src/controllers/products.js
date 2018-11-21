const Products = require('../models/Products');
const logger = require('../logger');
const { respond, validation } = require('../util/helper');

module.exports = (() => {

    const getAllProducts = (req, res) => {
        Products.find((err, products) => {
            if(err) {
                logger.log({ level: 'error', message: `Error getting all products (${ err })` });
                return respond(500, { statusCode: 500, message: 'Something went wrong', error: 'Internal server error' }, res);
            }

            if(!products) return respond(200, { statusCode: 200, data: {} }, res);

            respond(200, { statusCode: 200, data: products }, res);
        });
    };

    const postAProduct = (req, res) => {
        const { body } = req;
        if(!body.name && !body.brand && !body.inStock && !body.type) return respond(400, { statusCode: 400, message: 'Invalid Fields', error: 'Bad Request' }, res);
        
        let fields = [];
        for(let field in body) {
            let validators = [];
            if(field == 'inStock') {
                validators = [{
                    name: 'type',
                    value: 'number'
                }];
            }else {
                validators = [
                    {
                        name: 'emptiness',
                        value: ''
                    },
                    {
                        name: 'type',
                        value: 'string'
                    }
                ]
            }

            fields.push({
                validate: body[field],
                validators
            });
        }

        const validationErrors = validation(fields);

        if(validationErrors.length > 0) return respond(400, { error: 'Bad Request', message: 'Invalid Fields.', statusCode: 400 }, res);

        const newProduct = new Products(body);
        newProduct.save((err, product) => {
            if(err) {
                logger.log({ level: 'error', message: `Error saving new product (${ err })` });
                return respond(500, { statusCode: 500, message: 'Something went wrong', error: 'Internal server error' }, res);
            }

            respond(200, { statusCode: 200, data: product }, res);
        });
    };

    return {
        getAllProducts, 
        postAProduct
    };
})();