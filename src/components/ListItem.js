import { deleteDoc, doc, serverTimestamp, setDoc } from "@firebase/firestore";
import React from "react";
import { MdCheck, MdClose, MdDelete, MdModeEdit } from "react-icons/md";
import { db } from "../firebase";
import ListItemDropdown from "./ListItemDropdown";

const onDoneButtonClicked = (props) => {
  setDoc(doc(db, "users", props.currentUser.uid, "tasks", props.task.id), {
    task: props.task.task,
    timestampCreated: props.task.timestampCreated,
    timestampDone: serverTimestamp(),
    isDone: true,
  });
};

const onUndoneButtonClicked = (props) => {
  setDoc(doc(db, "users", props.currentUser.uid, "tasks", props.task.id), {
    task: props.task.task,
    timestampCreated: props.task.timestampCreated,
    timestampDone: null,
    isDone: false,
  });
};

export const ListItem = (props) => {
  const deleteStorage = (props) => {
    deleteDoc(doc(db, "users", props.uid, "tasks", props.taskId));
  };

  return (
    <li className="pt-2" key={props.task.id}>
      <div className="flex justify-between ">
        <div className="flex space-x-1 self-center">
          <div>
            {!props.task.isDone ? (
              <button
                className="p-1 bg-green-100 text-green-600 rounded-md   hover:bg-green-600 hover:text-green-100  transition ease-out duration-500"
                onClick={() => onDoneButtonClicked(props)}
              >
                <MdCheck />
              </button>
            ) : (
              <button
                className="p-1 bg-red-100 text-red-400 rounded-md  hover:bg-red-600 hover:text-red-100  transition ease-out duration-500"
                onClick={() => onUndoneButtonClicked(props)}
              >
                <MdClose />
              </button>
            )}
          </div>
          <div>{props.task.task}</div>
        </div>
        <div>
          <ListItemDropdown
            uid={props.currentUser.uid}
            taskId={props.task.id}
          />
        </div>
      </div>
    </li>
  );
};

{
}
