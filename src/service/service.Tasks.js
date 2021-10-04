import { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const updateTasks = async (currentUser) => {
  onSnapshot(
    query(collection(db, "users", currentUser.uid, "tasks")),
    (snapshot) => {
      console.log(snapshot);
    },
    []
  );
};

function useTasks() {
  const [data, setData] = useState({
    error: null,
    loading: true,
    tasks: [],
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
      doc.get("tasks") != null
        ? setData({
            error: null,
            loading: false,
            tasks: doc.data().tasks,
          })
        : setData({
            error: null,
            loading: false,
            tasks: [],
          });

      return unsubscribe;
    });
  }, [currentUser.uid]);
  return data;
}

export { useTasks, updateTasks };
