import express from "express";
import Mail from '../models/mail.js';
import User from '../models/user.js';

const router = express.Router();


//get all mails
export const getAllMails = async(req, res) => {
    try {
        const mails = await Mail.find();
        res.status(200).json({ data: mails, success: true });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


//get particular mail
export const getMail = async(req, res) => {
    try {
        // console.log(req);
        const id = req.mail;
        // console.log(req.mail);
        const mail = await Mail.findById(id);
        // console.log(req);
        res.status(200).json({ data: mail, success: true });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


//Send and receive mail
export const addMail = async(req, res) => {
    try {
        const { userId, status, senderId, receiverId, subject, message } = req.body;
        let newMail;
        console.log(receiverId);
        if (status == 'send') {
            newMail = new Mail({
                userId,
                senderId,
                receiverId,
                subject,
                message,
                sendStatus: true,
                status,
                deleteStatus: false,
                starredStatus: false
            });

            await newMail.save();

            //get receiver id
            const getReceiverId = await User.findOne({ email: receiverId });
            console.log(getReceiverId);

            const receiveMail = new Mail({
                userId: getReceiverId._id,
                senderId,
                receiverId,
                subject,
                message,
                status: 'recieve',
                deleteStatus: false,
                starredStatus: false
            });

            await receiveMail.save();

            res.status(200).json({ data: newMail, success: true });

        } else {
            res.status(400).json({ success: false, message: 'message not sent' })
        }

    } catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
}

//Update Mail Status
export const updateMailStatus = async(req, res) => {
    try {
        // console.log(req)
        const { mailId, starredStatus, deleteStatus } = req.body;

        const updateMail = await Mail.findByIdAndUpdate({ _id: mailId }, {
            $set: {
                starredStatus,
                deleteStatus
            }
        });
        // console.log(updateMail);
        res.status(200).json({ data: updateMail, success: true });

    } catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
}

//delete Mail which has deleteStatus is true
export const deleteAllMails = async(req, res) => {
    try {
        // console.log(req)
        const { isDelete, userId } = req.query;
        // console.log(isDelete, userId);
        if (isDelete) {
           const deleteMail = await Mail.deleteMany({
                userId,
                deleteStatus: true
            });
            console.log(deleteMail);
        }
        
        res.status(200).json({ success: true, message: 'Mails are deleted' })
    } catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
}


export default router;