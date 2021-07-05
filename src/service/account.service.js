const _ = require('lodash');

const User = require('../models/user.model');
const CustomError = require('../utils/error');
const { createToken } = require('../utils/common');
const userRepository = require('../repository/user.repository');
const PushNotification = require('../utils/fcm-push');

module.exports = {
    login: async (data) => {
        const { email, password } = data;
        const user = await userRepository.findOne({ email });
        if (!user) throw new CustomError(404, 'Invalid Email or Password');

        if (user.password !== User.HashPassword(password)) throw new CustomError(400, 'Email/Password is incorrect');

        return { token: createToken({ userId: user.id, email: user.email, role: user.role_type }), user: { userId: user.id, email: user.email } };
    },
    saveDeviceToken: async (data, userId) => {
        try {
            const user = await userRepository.findOne({ _id: userId });
            if (!user) throw new CustomError(404, 'Invalid Request');

            await userRepository.updateOne({ _id: userId }, { $addToSet: { device_token: data.device_token } });

            // send push to the device for the demo purpose
            const push = new PushNotification(TEST_PUSH_CHECK);

            const pushSendData = {
                id: 12,
                name: 'test',
                age: 25
            }

            // send notification
            await push.send(pushSendData, [data.device_token]).catch(e => console.log('error while sending push', e));
            return true;
        } catch (ex) {
            console.warn(ex.message);
            return false;
        }
    }
}
