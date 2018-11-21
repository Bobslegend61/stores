const { register, login, editUser, deleteUser } = require('../controllers/user');
module.exports = (router) => {
    router.route('/users')
        .post(register);

    router.route('/users/:id')
        .put(editUser)
        .delete(deleteUser);

    router.route('/login')
        .post(login);

    return router;
};