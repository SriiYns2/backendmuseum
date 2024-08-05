const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address",
        ],
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.password = undefined;
    },
});

module.exports = mongoose.model("User", UserSchema);
