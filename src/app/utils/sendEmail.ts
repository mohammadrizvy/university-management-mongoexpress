import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async () => {
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === "production", // true for 465, false for other ports
    auth: {
      user: 'a-21117@mangrove.edu.bd',
      pass: 'elck mcbo nrlm zhik',
    },
  });

  await transporter.sendMail({
    from: 'a-21117@mangrove.edu.bd',
    to: 'mohammadrizvy55@gmail.com',
    subject: 'Request for password changing !',
    text: 'Hello world? fuck of mitch', // plain‑text body
    html: '<b>Hello world?</b>', // HTML body
  });
};
