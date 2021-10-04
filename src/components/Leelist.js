import React, { useEffect, useRef, useState } from "react";
import { useTasks } from "../service/service.Tasks";
import { DragList } from "./DragList";

import { v4 as uuidv4 } from "uuid";
import { arrayUnion, doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { changeListState } from "../redux/list";
import {
  MdCheck,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdClose,
  MdSend,
} from "react-icons/md";

export const Leelist = () => {
  const { error, loading, tasks } = useTasks();
  const [list, setList] = useState([]);
  const { currentUser, logout } = useAuth();
  const docRef = doc(db, "users", currentUser.uid);
  const newTaskRef = useRef(null);
  const [content, setContent] = useState("");
  const { listDoneState } = useSelector((state) => state.list);

  const dispatch = useDispatch();

  useEffect(() => {
    setList(tasks);
  }, [tasks]);

  const onButtonClick = () => {
    if (content !== "") {
      addTask();
    }
  };
  const onEnter = async (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      addTask();
    }
  };

  const addTask = async (e) => {
    const uid = uuidv4();
    setList([...tasks, { id: uid, content: content, done: false }]);

    setDoc(docRef, {
      tasks: arrayUnion(...tasks, {
        id: uid,
        content: content,
        done: false,
      }),
    });
    newTaskRef.current.value = "";
    setContent("");
  };

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const loadingScreen = (
    <div className="w-full">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-4 bg-green-200 rounded w-5/6"></div>
          <div className="h-4 bg-green-200 rounded w-3/4"></div>
          <div className="h-4 bg-green-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto p-2 ">
      <div className="p-2 bg-green-50 rounded-lg  text-green-700  divide-y divide-green-200 ">
        <div className="flex justify-end pr-6 pb-2">
          <button className="" onClick={() => dispatch(changeListState())}>
            {listDoneState ? <MdClose /> : <MdCheck />}
          </button>
        </div>
        <div>
          {loading ? (
            loadingScreen
          ) : (
            <DragList tasks={list} currentUser={currentUser} />
          )}
        </div>
      </div>
      <div className="flex">
        <input
          maxLength="100"
          ref={newTaskRef}
          type="text"
          name="task"
          placeholder="stelle dich deiner neuen Aufgabe 🧙‍♂️"
          onKeyPress={onEnter}
          onChange={handleChange}
          className="bg-white  ring ring-white focus:ring-green-200 p-2  outline-none my-3 w-full rounded-lg"
        />
        <button
          onClick={onButtonClick}
          className="bg-green-200 text-white border rounded-full px-4 m-2 active:bg-green-400"
        >
          <MdSend />
        </button>
      </div>
    </div>
  );
};
