const { register } = require('../controllers/user');
module.exports = (router) => {
    router.route('/register')
        .post(register);

    return router;
};