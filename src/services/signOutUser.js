import { auth } from "../../src/firebase";

const signOutUser = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export default signOutUser;
