import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "dallin.ruecker7@ethereal.email",
    pass: "D4d7MPNsrHWbb282kp",
  },
});

export const SendEmail = async (name: string, email: string, token: string) => {
  const info = await transporter.sendMail({
    from: "krishna@krishna.com",
    to: email,
    subject: "forgot password",
    // text: "Hello world?",
    html: `
    hey,${name},
    click here
    <a href="http;//localhost:3000/update-password=${token}">click here to update</a>
    `,
  });
};
