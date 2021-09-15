import React, { useEffect, useState } from "react";
import { ListItem } from "./ListItem";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { MdAdd, MdRepeat } from "react-icons/md";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import useTasks from "../service/useTasks";

export const Leelist = () => {
  const { error, loading, tasks } = useTasks();
  const [input, setInput] = useState("");
  const { currentUser, logout } = useAuth();
  const [taskState, setTaskState] = useState(false);

  const addTask = (input, currentUser) => {
    if (input) {
      setInput("");
      addDoc(collection(db, "users", currentUser.uid, "tasks"), {
        task: input,
        timestampCreated: serverTimestamp(),
        timestampDone: null,
        isDone: false,
      });
    }
  };

  return (
    <div className="mx-auto">
      <div>
        <div className="flex justify-end text-2xl p-2">
          <button
            onClick={() => setTaskState(!taskState)}
            className="bg-green-500 active:bg-green-700 p-2 rounded-lg "
          >
            <MdRepeat />
          </button>
        </div>
      </div>
      <div className="bg-green-50 p-2 rounded shadow text-green-700 ">
        {loading ? (
          <div>loading...</div>
        ) : (
          <ul className="divide-y divide-green-700 divide-opacity-10 px-3 pb-2 space-y-2 list-inside text-lg">
            {tasks
              .filter((task) => task.isDone === taskState)
              .sort((a, b) => a.timestampCreated - b.timestampCreated)
              .map((task) => (
                <ListItem key={task.id} task={task} currentUser={currentUser} />
              ))}
          </ul>
        )}
      </div>
      <div className="px-6 pt-3 flex flex-row pb-3 space-x-2">
        <input
          className="pl-3 container placeholder-green-500 placeholder-opacity-50  border rounded p-1 focus:outline-none focus:ring-2 ring-green-400"
          placeholder="what's next..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask(input, currentUser)}
        />
        <button
          className=" bg-green-100 text-green-600 font-bold  rounded-lg  hover:bg-green-600 hover:text-green-100 transition ease-out duration-500"
          type="submit"
          onClick={() => addTask(input, currentUser)}
        >
          <MdAdd />
        </button>
      </div>
    </div>
  );
};
