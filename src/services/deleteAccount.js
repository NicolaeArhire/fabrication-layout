import { getAuth } from "firebase/auth";

const deleteUserAccount = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    await user.delete();

    console.log("Account deleted successfully");
  } catch (error) {
    console.log(error.code, error.message);
  }
};

export default deleteUserAccount;
