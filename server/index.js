import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'; //ODM
import cors from 'cors';
import dotenv from 'dotenv'
import http from 'http';

import user from './routes/user.js';
import mail from './routes/mail.js';

dotenv.config({ path: '../.env' })
const app = express();

app.use(cors()); //configure the web API
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

app.use('/api/user', user);
app.use('/api/mail', mail);

const CONNECTION_URL = 'mongodb+srv://Mahalakshmi:mail-app@cluster0.vqvolmv.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.BACKEND_PORT || 4000;

const httpServer = http.createServer(app);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        httpServer.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))
    })
    .catch((error) => console.log(`${error} did not connect`));
