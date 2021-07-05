const mongoose = require('mongoose');
const { createHash } = require('../utils/common');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'First Name is required']
    },
    last_name: {
        type: String
    },
    email: {
        type: Schema.Types.String,
        required: [true, 'email is required'],
        unique: [true, 'email already exists']
    },
    password: {
        type: Schema.Types.String,
        required: [true, 'password is required']
    },
    device_token: {
        type: [Schema.Types.String]
    }
}, { timestamps: true });

userSchema.statics.HashPassword = function (password) {
    return createHash(password);
}

module.exports = mongoose.model('User', userSchema);
