import nodemailer from "nodemailer";
import { SETTINGS } from "../settings/settings";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  auth: {
    user: SETTINGS.EMAIL,
    pass: SETTINGS.EMAIL_PASS,
  },
});
const createRegistrationMessage = (email: string, code: string) => {
  const message = {
    from: `"Envgenij" <${SETTINGS.EMAIL}>`,
    to: email,
    subject: "Hello from Nodemailer",
    html: `<h1>Thank for your registration</h1> <p>To finish registration please follow the link below: <a href='https://somesite.com/confirm-email?code=${code}'>complete registration</a></p>`,
  };
  return message;
};

export const emailAdapter = {
  async sendEmail(email: string, code: string) {
    await transporter.sendMail(createRegistrationMessage(email, code));
  },
};
