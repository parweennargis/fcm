const accountService = require('../service/account.service');
const validateAccounts = require('../validateRequest/accounts');

module.exports = {
    login: async (req, res) => {
        try {
            const { body } = req;
            // validate the login request body
            validateAccounts.login(body);
            const loggedIn = await accountService.login(body);
            return res.json({ data: loggedIn });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    saveDeviceToken: async (req, res) => {
        const { user: { userId }, body } = req;
        validateAccounts.saveDeviceToken(body);
        return await accountService.saveDeviceToken(body, userId);
    }
};
