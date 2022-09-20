import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, doc, getDocs, serverTimestamp } from "firebase/firestore";
/**
 * Custom hook for fetching users from Firebase
 *
 */
const usersCollectionRef = collection(db, "users");

export function useRetrieveUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(usersCollectionRef);
      const dataArray = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setUsers(dataArray);
    };
    getUsers();
  }, [setUsers]);

  return users;
}
