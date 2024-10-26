
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String, // Missing type definition for name
            required: [true, "Please enter product name"]
        },
        email: {
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

const User = mongoose.model("User", UserSchema);
module.exports = User;



