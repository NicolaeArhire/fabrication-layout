import { auth } from "../firebase";
import { getStorage, ref, list, getDownloadURL } from "firebase/storage";

const readUserFiles = async () => {
  const user = auth.currentUser;
  if (user) {
    const folderRef = ref(getStorage(), `users/${user.uid}`);
    const folderFiles = await list(folderRef);
    const files = folderFiles.items;

    if (files.length > 0) {
      const lastFile = files[files.length - 1];
      const downloadURL = await getDownloadURL(lastFile);
      return downloadURL;
    }
  }

  return null;
};

export default readUserFiles;
