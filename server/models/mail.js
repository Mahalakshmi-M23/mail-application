import mongoose from "mongoose";

const mail = mongoose.Schema({
    userId: {
        type: String
    },
    senderId: {
        type: String,
        required: false
    },
    receiverId: {
        type: String,
        required: false
    },
    subject: {
        type: String,
        require: false
    },
    message: {
        type: String,
        require: false
    },
    sendStatus: {
        type: String,
        require: false
    },
    starredStatus: {
        type: Boolean,
        required: false
    },
    status: {
        type: String,
        require: true
    },
    deleteStatus: {
        type: Boolean
    },
}, {
    timeStamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

const Mail = mongoose.model('Mail', mail);

export default Mail;