import { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function useTasks() {
  const [data, setData] = useState({
    error: null,
    loading: true,
    tasks: [],
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "users", currentUser.uid, "tasks")),
      (snapshot) => {
        setData({
          error: null,
          loading: false,
          tasks: snapshot.docs.map((doc) => ({
            id: doc.id,
            task: doc.data().task,
            timestampCreated: doc.data().timestampCreated,
            timestampDone: doc.data().timestampDone,
            isDone: doc.data().isDone,
          })),
        });
      },
      (error) => {
        setData({
          error,
          loading: false,
          tasks: [],
        });
      },
      []
    );

    return unsubscribe;
  }, []);

  return data;
}
