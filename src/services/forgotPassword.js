import { auth } from "../../src/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

export default forgotPassword;
