import { auth } from "../../src/firebase";

const signOutUser = async () => {
  try {
    await auth.signOut();

    localStorage.removeItem("isUserLogged");
    localStorage.removeItem("loggedUserIDafterRefresh");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export default signOutUser;
