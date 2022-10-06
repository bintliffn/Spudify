import { async } from "@firebase/util";
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
  const [data, setData] = useState({});
  const [dataError, setDataError] = useState(false);
  const userDoc = doc(db, "users", id);
  useEffect(async () => {
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return setData(data);
    } else {
      // docSnap.data() will be undefined in this case
      console.log(
        `Error: the user ${id} doesn't exist or has failed to load.\nPlease try again.`
      );
      setDataError(true);
    }
  }, [id]);

  //returns an object {} and boolean error state
  return { data, dataError };
}

export function useReadAllUsers() {
  const [users, setUsers] = useState([]);
  const [usersError, setUsersError] = useState(false);

  useEffect(async () => {
    const querySnapshot = await getDocs(usersCollectionRef);

    if (querySnapshot.exists()) {
      const dataArray = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

      setUsers(dataArray);
    } else {
      setUsersError(true);
      console("Error: Failed to retrieve all users.");
    }
  }, [usersCollectionRef]);

  //returns users array containing objects {} and boolean error state
  return { users, usersError };
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
