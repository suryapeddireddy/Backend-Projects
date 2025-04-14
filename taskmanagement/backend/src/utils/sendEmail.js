import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (userEmail, message) => {
  try {
    await transporter.sendMail({
      from: `<${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "Task Reminder",
      text: message,
    });

    console.log(`✅ Email sent to ${userEmail}`);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }
};

export  {transporter, sendEmail};
