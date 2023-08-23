const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "vladimirdegtyarev@meta.ua",
    pass: META_PASSWORD,
  },
  logger: true,
  // Вікдлючаємо перевірку сертифікату. У продакшені прибрати
  tls: {
    rejectUnauthorized: false,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (email) => {
  try {
    await transport.sendMail(email);
    console.log("Email send success");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendEmail;
