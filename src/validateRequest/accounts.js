const validate = require('../utils/validate');

module.exports = {
    'login': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                email: { type: 'string', format: 'email', maxLength: 50 },
                password: { type: 'string', minLength: 8, maxLength: 20 },
            },
            required: ['email', 'password']
        })
    },
    'saveDeviceToken': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                device_token: { type: 'string' },
            },
            required: ['device_token']
        })
    }
}
