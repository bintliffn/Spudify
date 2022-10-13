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
import { useEffect, useState } from "react";

const usersCollectionRef = collection(db, "users");

//id is a string
async function createUser(id, userObject) {
  const userDoc = doc(db, "users", id);
  //   await addDoc(usersCollectionRef, userObject); <--- this will use a random document Id
  await setDoc(userDoc, {
    userObject,
  });
}

//id is a string
export function useReadUser(id) {
  const [data, setData] = useState(null);
  const [dataError, setDataError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const userDoc = doc(db, "users", id);

      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Success");
        setData(data);
      } else {
        // docSnap.data() will be undefined in this case
        console.log(
          `Error: the user ${id} doesn't exist or has failed to load.\nPlease try again.`
        );
        setDataError(true);
      }
    }
    // loading();
    fetchData();
  }, [id]);

  //returns an object {} and boolean error state
  return { data, dataError };
}

export function useReadAllUsers() {
  const [data, setData] = useState([null]);
  const [dataError, setDataError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // doc.data() is never undefined for query doc snapshots via FIREBASE DOCS
      const querySnapshot = await getDocs(usersCollectionRef);
      const dataArray = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

      if (dataArray[0] != null) {
        setData(dataArray);
        console.log("Success");
      } else {
        setDataError(true);
        console.log("Error: Failed to retrieve all users.");
      }
    }
    fetchData();
  }, []);

  //returns users array containing objects {} and boolean error state
  return { data, dataError };
}

//id is a string
async function updateUser(id, updatedUserObject) {
  const userDoc = doc(db, "users", id);
  await updateDoc(userDoc, updatedUserObject);
}

async function deleteUser(id) {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
}

export { createUser, updateUser, deleteUser };
