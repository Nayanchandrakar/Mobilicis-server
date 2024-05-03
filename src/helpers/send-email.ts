import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendMail = async (email: string, html: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailDetails = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "veify you email address",
      html,
    };

    transporter.sendMail(mailDetails, (error, data) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log(`Email sent successfully: ${data}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
