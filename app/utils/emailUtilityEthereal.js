import nodemailer from "nodemailer";
import { EMAIL_AUTH_PASS, EMAIL_AUTH_USER, EMAIL_HOST, EMAIL_PORT, EMAIL_SECURITY } from "../config/config.js";


const SendEmail = async (EmailTo, EmailSubject, EmailText) => {
  try {

    // Parse EMAIL_SECURITY from string to boolean
    const isSecure = EMAIL_SECURITY === 'true';

    // Create the Nodemailer transporter with your fixed Ethereal credentials
    let transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: parseInt(EMAIL_PORT, 10), // Ensure port is parsed as a number
      secure: isSecure, // Use parsed boolean and it true for 465, false for other ports
      auth: {
        user: EMAIL_AUTH_USER, // Your fixed Ethereal username
        pass: EMAIL_AUTH_PASS, // Your fixed Ethereal password
      },
    });

    // Set up email data
    let mailOptions = {
      from: '"Test Sender" <test@ethereal.email>', // sender address
      to: EmailTo, // receiver's email (pass it dynamically)
      subject: EmailSubject, // Subject line
      text: EmailText, // plain text body
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    // Preview the email in the browser by following the link below
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error('Error occurred while sending email:', error);
    throw new Error('Email delivery failed.');
  }
}

export default SendEmail;
