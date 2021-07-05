const AccountController = require('../controllers/accounts.controller');

const accountsRoutes = (app, router) => {
    // login API of the user
    router.post('/login', AccountController.login);

    // get user device token
    router.get('/device-token', AccountController.saveDeviceToken);

    return router;
};

module.exports = accountsRoutes;
