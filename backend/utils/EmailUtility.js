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
      subject: "Tutex Email Verification",
      html: `
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <style>
            body {
              margin: 20px;
              border: 2px solid black;
              font-family: Georgia, 'Times New Roman', Times, serif;
            }
            .blue {
              background-color: #007BFF;
              color: white;
              padding: 20px;
            }
            h1 {
              text-align: center;
            }
            #main {
              padding: 20px;
            }
            #footer {
              text-align: left;
            }
          </style>
        </head>
        <body>
          <div class="blue">
            <h2 style="text-align: center;">Tutex</h2>
          </div>
    
          <div id="main">
            <p>Your one-time OTP for registration on the Tutex platform is:</p>
            <h1>${message}</h1>
            <p>Please go to the Tutex platform and enter the above OTP before it expires to complete your registration process.</p>
            <h3>OTP is valid for: 2 minutes</h3>
          </div>
    
          <div class="blue" id="footer">
            <h3>Real Solutions Pvt. Ltd.</h3>
          </div>
        </body>
        </html>
      `
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Error sending email:", err);
        } else {
            console.log("Email sent successfully:", info.response);
        }
    });
};
