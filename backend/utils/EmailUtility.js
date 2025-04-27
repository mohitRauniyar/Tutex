import { configDotenv } from "dotenv";
import nodemailer from "nodemailer";

configDotenv();

export const sendEmail = (email, message) => {
    console.log(email);
    
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        // secure: false, 
        auth: {
            user: process.env.SYSTEM_EMAIL,
            pass: process.env.SYSTEM_EMAIL_PASSCODE, // Use an App Password
        },
        tls: {
            rejectUnauthorized: false, // Avoid TLS issues
        },
    });

    const mailOptions = {
        from: process.env.SYSTEM_EMAIL,
        to: email,
        subject: "Tutex email verification",
        html: `<p>Your <b>verification code: ${message}</b>. Don't share it with anyone!</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Error sending email:", err);
        } else {
            console.log("Email sent successfully:", info.response);
        }
    });
};
