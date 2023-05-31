import { getStorage, ref, listAll, deleteObject } from "firebase/storage";
import { auth } from "../../src/firebase";

const deleteUserFiles = async () => {
  if (auth.currentUser && auth.currentUser.uid) {
    const storage = getStorage();
    const storageRef = ref(storage, `users/${auth.currentUser.uid}`);

    try {
      const fileList = await listAll(storageRef);
      const deletePromises = fileList.items.map((item) => deleteObject(ref(storage, item.fullPath)));

      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error deleting files: ", error);
      throw error;
    }
  }
};

export default deleteUserFiles;
