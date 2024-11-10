
const mongoose = require("mongoose");

const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: [true, "Please enter Your user name "]
        },
        email: {
            type: String,
            required: true,
            default: 0
        },
        address: {
            type: String,
            required: true,
            default: 0
        },
        age: {
            type: String,
            required: true,
            default: 0
        },
        password: {
            type: String,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true // Corrected "Timestamp" to "timestamps"
    }

);

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
