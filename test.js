const nodemailer = require('nodemailer');
require('dotenv').config();
console.log(process.env.EMAIL_PASS)

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'madisen.nikolaus@ethereal.email',
//         pass: 'WRz1CMEA87xAhFdVYK'
//     }
// });

transporter.verify((error, success) => {
    if (error) {
        console.log('Error connecting to email service:', error);
    } else {
        console.log('Email service is ready to take messages');
    }
});
