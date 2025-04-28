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
        html: `<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
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
      padding-top: 40px;
    }
    #header {
      display: flex;
      justify-content: center;
      justify-items: center;
    }
    #main {
      padding: 20px;
    }
    h1 {
      margin: 20px;
      text-align: center;
    }
    #footer {
      text-align: left;
    }
  </style>
</head>

<body>
  <div id="header" class="blue">
    <div id="logo">
      <img src="" alt="Logo">
      <h2>Tutex</h2>
    </div>
  </div>

  <div id="main">
    <p>Your one-time OTP for registration on Tutex platform is:</p>
    <div id="otp">
      <h1>${message}</h1>
    </div>
    <p>Please go to the Tutex platform and enter the above OTP before the validity expires to complete your registration process.</p>
    <h3>OTP is valid for: <span id="time"></span></h3>
  </div>

  <div id="footer" class="blue">
    <img src="" alt="Company Logo">
    <h3>Real Solutions Pvt. Ltd.</h3>
  </div>

  <!-- Countdown Timer Script -->
  <script>
    // Set the timer for 10 minutes (600 seconds)
    let timeLeft = 120; 

    const timerElement = document.getElementById('time');

    function updateTimer() {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerElement.textContent = \`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}\`;
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(timerInterval);
        timerElement.textContent = "Expired";
      }
    }

    updateTimer(); // initial call
    const timerInterval = setInterval(updateTimer, 1000); // update every second
  </script>
</body>
</html>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Error sending email:", err);
        } else {
            console.log("Email sent successfully:", info.response);
        }
    });
};
