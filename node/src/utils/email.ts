import nodemailnodemailer from "nodemailer";

const nodeMail = nodemailnodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.BASE_EMAIL,
    pass: process.env.BASE_EMAIL_PASS,
  },
});

// 获取随机6位数 【0~9a-zA_Z】
const generateCode = () => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
};

export {
  nodeMail,
  generateCode,
};

export {};
