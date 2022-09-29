import { useState, useEffect } from "react";
import { db } from "@root/firebase-config";
import { collection, doc, getDocs, serverTimestamp } from "firebase/firestore";

const usersCollectionRef = collection(db, "users");

/**
 * Custom hook for fetching users from Firebase
 *
 */
export function useRetrieveUsers() {
  const [users, setUsers] = useState(null);
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
