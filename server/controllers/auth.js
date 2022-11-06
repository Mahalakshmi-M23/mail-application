import { query } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'Bup3hiyOBEZyNmjk-6H-EnFtOoPDMeH2PujdxErh_LvnQSChOt63UBDojI388Kau';


export const auth = (req, res, next) => {
    try {
        let token = req.header('Authorization');
        // console.log('auth--------------------------------------',req)
        // console.log(typeof(token));
        if (!token) {
            return res.status(400).json({ message: 'No authentication token.' });
        }
        token = JSON.parse(token);
        const verified = jwt.verify(token, JWT_SECRET);

        if (!verified) {
            return res.status(400).json({ message: 'Authentication failed.' });
        }

        req.user = verified.id;
        req.mail = req.query._id;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }

}