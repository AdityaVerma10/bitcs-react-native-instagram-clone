import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";
export const insertUserDetails = async ({ ...details }) => {
  console.log(details);
  try {
    const docRef = await addDoc(collection(db, "users"), details);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const insertPost = async ({ ...details }) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), details);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

export const getUserDetailsById = async (id) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    let userDetails = {};
    querySnapshot.forEach((doc) => {
      userDetails = { ...userDetails, ...doc.data() };
    });

    return userDetails;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

export const getPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));

    let posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ docId: doc.id, ...doc.data() });
    });

    for (let i = 0; i < posts.length; i++) {
      const userDetails = await getUserDetailsById(posts[i].userId);
      posts[i] = { ...posts[i], userDetails };
    }

    console.log(posts);

    return posts;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

export const getPostsByUserId = async (id) => {
  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("userId", "==", id));
    const querySnapshot = await getDocs(q);
    let posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ ...doc.data() });
    });
    console.log(posts);
    return posts;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

export const updateLikesByDocId = async (updatedLikes) => {
  const postRef = doc(db, "posts", updatedLikes.docId);
  try {
    await updateDoc(postRef, {
      likes: updatedLikes.likes,
    });
  } catch (error) {
    console.error(error.message);
    return false;
  }

  return true;
};

export const updateUserDetails = async (userId, Details) => {
  try {
    const q = query(collection(db, "users"), where("id", "==", userId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const userRef = doc(db, "users", document.id);
      await updateDoc(userRef, {
        ...Details,
      });
    });
  } catch (error) {
    console.warn(error.message);
    return false;
  }

  return true;
};
