import { sendMail } from "./send-email";
import { generateEmailVerificationToken } from "./token-verification";

export const sendVerificationEmail = async (email: string) => {
  try {
    const verificationToken = await generateEmailVerificationToken(email);

    const htmlTemplate = `<p>click <a href=${
      process?.env?.CLIENT_URL +
      `/auth/verify-token?token=${verificationToken?.token}`
    }> here</a> to verify your email</p> `;

    sendMail(email, htmlTemplate);
    return verificationToken;
  } catch (error) {
    return null;
  }
};
