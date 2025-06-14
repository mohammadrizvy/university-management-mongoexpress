import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', 
    auth: {
      user: 'a-21117@mangrove.edu.bd',
      pass: 'elck mcbo nrlm zhik',
    },
  });

  await transporter.sendMail({
    from: 'a-21117@mangrove.edu.bd',
    to,
    subject: 'Reset your password withing 10 min',
    text: '', // plain‑text body
    html,
  });
};
