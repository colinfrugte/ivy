import React, { useRef, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ListItem } from "./ListItem";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore/lite";

export const Leelist = () => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const myDbCollection = "tasks";

  useEffect(() => {
    const q = query(collection(db, myDbCollection));
    console.log(q);
    const fetchTasks = async () => {
      const tasks = [];
      // const querySnapshot = await getDocs(q);

      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      // });
    };
    fetchTasks();
  }, []);

  return (
    <div className="m-5">
      <form>
        <div className="flex">
          <input
            className="relative block w-full px-3 py-2 border border-gray-300  text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm flex-auto"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-auto"
            type="submit"
            // onClick={addTask}
          >
            Create 😃
          </button>
        </div>
      </form>
      <div>
        <ul className="list-inside list-disc bg-rose-200 text-center">
          {tasks.map((task) => (
            <ListItem key={task.id} task={task} />
          ))}
        </ul>
      </div>
    </div>
  );
};
