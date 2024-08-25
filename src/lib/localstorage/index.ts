import crypto from "crypto-js";
import { ALGORITHM, SECRET_KEY } from "../constant/env";

// function encryptToken(token: string) {
//   try {
//     const iv = crypto.randomBytes(16);
//     const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
//     let encrypted = cipher.update(token, "utf-8", "hex");
//     encrypted += cipher.final("hex");
//   } catch (error) {
//     return "";
//   }
// }

// function decryptToken(encryptedToken: string) {
//   try {
//     const [iv, encrypted] = encryptedToken.split(":");
//     const decipher = crypto.createDecipheriv(
//       ALGORITHM,
//       SECRET_KEY,
//       Buffer.from(iv, "hex"),
//     );
//     let decrypted = decipher.update(encrypted, "hex", "utf8");
//     decrypted += decipher.final("utf8");
//     return decrypted;
//   } catch (error) {
//     return "";
//   }
// }
function encryptToken(token: string): string {
  return crypto.AES.encrypt(token, SECRET_KEY).toString();
}

function decryptToken(encryptedToken: string): string {
  const bytes = crypto.AES.decrypt(encryptedToken, SECRET_KEY);
  return bytes.toString(crypto.enc.Utf8);
}

function setItem(key: string, token: string): boolean {
  try {
    const encryptedToken = encryptToken(token);
    localStorage.setItem(key, encryptedToken);
    return true;
  } catch (error) {
    console.error("Error setting item:", error);
    return false;
  }
}

function getItem(key: string): string {
  try {
    const encryptedToken = localStorage.getItem(key);
    if (encryptedToken) {
      return decryptToken(encryptedToken);
    }
    return "";
  } catch (error) {
    console.error("Error getting item:", error);
    return "";
  }
}

function delItem(key: string) {
  localStorage.removeItem(key);
}

export { decryptToken, delItem, encryptToken, getItem, setItem };
