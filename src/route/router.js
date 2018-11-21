const { register, login, editUser, deleteUser } = require('../controllers/user');
const { getAllProducts, postAProduct, editAProduct } = require('../controllers/products');
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
        .post(postAProduct);

    router.route('/products/:id')
        .put(editAProduct)
        .delete();

    return router;
};