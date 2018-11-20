const { register, login } = require('../controllers/user');
module.exports = (router) => {
    router.route('/register')
        .post(register);

    router.route('/login')
        .post(login);

    return router;
};