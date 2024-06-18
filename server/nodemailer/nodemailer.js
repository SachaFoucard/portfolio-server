const nodemailer = require('nodemailer');
const router = require('express').Router();
const Client = require('../Models/client');
require('dotenv').config();

router.get('/test', async (req, res) => {
return res.status(201).json({ message: 'test route worked' });
}

router.post('/send', async (req, res) => {
    const { from, text } = req.body;

    try {
        // Check if the user has already sent a mail
        let user = await Client.findOne({ mail: from });
        if (user) {
            console.log(user.mail);
            return res.status(403).json({ message: 'Email already sent' });
        }

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587, // 587 -> TLS & 465 -> SSL
            auth: {
                user: process.env.MAILADRESS, // email address of your Google account
                pass: process.env.MAILPASS, // password of your Google account
            },
        });

        let mail = {
            from: from,
            to: process.env.MAILADRESS,
            subject: 'You received a message from '+ from ,
            text: 'message : ' + text,
            inReplyTo: 'no-reply',
        };

        if (text && from) {
            await transporter.sendMail(mail);
            // Update the user's mailSent status
            if (!user) {
                user = new Client({ mail: from, text: text });
            } else {
                user.mailSent = true;
            }
            await user.save();

            res.status(200).json({ message: 'Email sent successfully' });
        } else {
            res.status(401).json({ message: 'Please fill in all the fields' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
});

module.exports = router;
