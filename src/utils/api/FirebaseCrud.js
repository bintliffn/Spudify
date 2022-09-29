import { db } from "@root/firebase-config";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";

const usersCollectionRef = collection(db, "users");

async function createUser(id, userObject) {
  const userDoc = doc(db, "users", id);
  //   await addDoc(usersCollectionRef, userObject); <--- this will use a random document Id
  await setDoc(userDoc, {
    userObject,
  });
}

async function readUser(id) {
  const userDoc = doc(db, "users", id);
  const docSnap = await getDoc(userDoc);

  if (docSnap.exists()) {
    console.log(docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

async function readUsers() {
  const querySnapshot = await getDocs(usersCollectionRef);
  const dataArray = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  return dataArray;
}

async function updateUser(id, updatedUserObject) {
  const userDoc = doc(db, "users", id);
  await updateDoc(userDoc, updatedUserObject);
}

async function deleteUser(id) {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
}

export { createUser, readUser, readUsers, updateUser, deleteUser };
