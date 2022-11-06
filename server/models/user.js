import mongoose from "mongoose";

const user = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    mobileNumber: { type: String }
}, {
    timeStamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

const User = mongoose.model('User', user);

export default User;