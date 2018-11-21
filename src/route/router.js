const { register, login, editUser, deleteUser } = require('../controllers/user');
const { getAllProducts } = require('../controllers/products');
module.exports = (router) => {
    router.route('/users')
        .post(register);

    router.route('/users/:id')
        .put(editUser)
        .delete(deleteUser);

    router.route('/login')
        .post(login);

    router.route('/products')
        .get(getAllProducts)
        .post();

    router.route('/products/:id')
        .put()
        .delete();

    return router;
};