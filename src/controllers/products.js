const Products = require('../models/Products');
const logger = require('../logger');
const { respond } = require('../util/helper');

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

    return {
        getAllProducts
    };
})();