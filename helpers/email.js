const { createTransport } = require("nodemailer");

require('dotenv').config();

let transporter = createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: +process.env.EMAIL_PORT === 465 ? true : false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const info = await transporter.sendMail(params);
      resolve(info.messageId);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = sendEmail;