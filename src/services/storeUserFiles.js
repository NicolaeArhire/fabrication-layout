import { auth } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storeUserFiles = (selectedFile, onFileUpload) => {
  const user = auth.currentUser;
  if (user && selectedFile) {
    const storage = getStorage();
    const storageRef = ref(storage, `users/${user.uid}/${selectedFile.name}`);
    uploadBytes(storageRef, selectedFile)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          onFileUpload(downloadURL);
        });
        console.log("File uploaded!");
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
      });
  } else {
    console.log("No file selected!");
  }
};

export default storeUserFiles;
