const { register, login } = require('../controllers/user');
module.exports = (router) => {
    router.route('/users')
        .post(register);

    router.route('/login')
        .post(login);

    return router;
};