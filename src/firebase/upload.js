import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const uriToBlob = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

export const uploadImage = async (uri) => {
  try {
    const blob = await uriToBlob(uri);
    const storage = getStorage();
    const storageRef = ref(storage, "posts/" + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              reject(
                new Error("User doesn't have permission to access the object")
              );
              break;
            case "storage/canceled":
              reject(new Error("User canceled the upload"));
              break;
            case "storage/unknown":
              reject(
                new Error(
                  "Unknown error occurred, inspect error.serverResponse"
                )
              );
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              resolve(downloadURL);
            })
            .catch(reject);
        }
      );
    });
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw error;
  }
};
