const nodemailer = require('nodemailer');

const sendEmail = async options => {
  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Password Reset</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #e9e9e9;
      border-radius: 4px;
      background-color: #f9f9f9;
    }

    h1 {
      color: #333;
      text-align: center;
    }

    p {
      margin-bottom: 20px;
    }

    .btn {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 4px;
    }

    .btn:hover {
      background-color: #0056b3;
    }

    .footer {
      margin-top: 20px;
      text-align: center;
    }

    .footer p {
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Password Reset</h1>
    <p>Hello,</p>
    <p>We received a request to reset your password. To proceed with the password reset, please click the button below:</p>
    <p><a class="btn" href="${options.url}">Reset Password</a></p>
    <p>If you did not initiate this password reset request, you can safely ignore this email.</p>
    <div class="footer">
      <p>Thank you!</p>
    </div>
  </div>
</body>
</html>`;

  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'finesseflavor@gmail.com',
    to: options.email,
    subject: options.subject,
    html
  };

  // 3) Actually send the email
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.error('Error sending email:', err);
    } else {
      console.log('Email sent successfully!');
      console.log('Response:', info);
    }
  });
};

module.exports = sendEmail;
