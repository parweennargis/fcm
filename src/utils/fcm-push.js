const _ = require('lodash');
const util = require('util');
const FCM = require('fcm-node');
const fcm = new FCM(process.env.FCM_SERVER_KEY);

/**
 * @class
 * Send push notification on application
 */
module.exports = class PushNotification {
    /**
     * Constructor
     * @param {string} string eventKey
     */
    constructor(eventKey) {
        this._eventKey = eventKey;
    }

    /**
     * Send push notification using FCM.
     * @param {Object} msgBody
     * @param {array} deviceTokens
     */
    async send(msgBody, deviceTokens) {
        // check is deviceTokens are array
        // eslint-disable-next-line no-unused-expressions
        _.isArray(deviceTokens) ? null : deviceTokens = [deviceTokens];

        const message = {
            registration_ids: deviceTokens,
            data: msgBody,
            collapse_key: this._eventKey,
            notification: {
                title: 'Dharmik',
                body: 'Dharmik'
            },
            priority: 'high',
            content_available: true,
            TTL: 0
        };

        // send notification make promisify
        const sendNotification = util.promisify(fcm.send.bind(fcm));

        // send notification
        try {
            await sendNotification(message);
        } catch (e) {
            console.log('Error while sending notification', e);
        }

        return true;
    }
};
