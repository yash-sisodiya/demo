import { AES } from "crypto-js";

export const encryptCredentials = (email, password) => {
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const encryptedemail = AES.encrypt(email, secretKey).toString();
  const encryptedPassword = AES.encrypt(password, secretKey).toString();

  localStorage.setItem(
    "user",
    JSON.stringify({ email: encryptedemail, password: encryptedPassword })
  );
};
