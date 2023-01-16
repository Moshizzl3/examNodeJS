import NodeMailer from "nodemailer";

const user = {
  mail: process.env.EMAIL_ACCOUNT,
  password: process.env.EMAIL_PASSWORD,
};

const message = {
  text: "Follow this link to reset password, the link will expire in 5 mins: ",
};

let transporter = NodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: user.mail,
    pass: user.password,
  },
});

// send mail
export function sendMail(reciever, token) {
  return new Promise(async (resolve, reject) => {
    try {
      const mail = await transporter.sendMail({
        from: `"Reset password" <${user.mail}>`,
        to: `${reciever.mail}`,
        subject: `Hello ${reciever.name}`,
        text: `${message.text} http://localhost:5173/forgot-password/?Bearer=${token}`,
        html: `<b>${message.text} http://localhost:5173/forgot-password/?Bearer=${token}</b>`,
      });
      resolve(mail);
    } catch (err) {
      reject("Error code 1");
    }
  });
}
