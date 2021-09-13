import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
import React from "react";
import { MdCheck, MdClose } from "react-icons/md";
import { db } from "../firebase";

const onDoneButtonClicked = (props) => {
  setDoc(doc(db, "tasks", props.task.id), {
    task: props.task.task,
    timestampCreated: props.task.timestampCreated,
    timestampDone: serverTimestamp(),
    isDone: true,
  });
};

const onUndoneButtonClicked = (props) => {
  setDoc(doc(db, "tasks", props.task.id), {
    task: props.task.task,
    timestampCreated: props.task.timestampCreated,
    timestampDone: null,
    isDone: false,
  });
};

export const ListItem = (props) => {
  return (
    <li className="pt-2" key={props.task.id}>
      <div className="grid grid-rows-1 grid-flow-col">
        <div> {props.task.task}</div>
        <div className="text bold p-1 bg-green-100 text-green-600 rounded-lg  hover:bg-green-600 hover:text-green-100 grid justify-self-end transition ease-out duration-500">
          {!props.task.isDone ? (
            <button onClick={() => onDoneButtonClicked(props)}>
              <MdCheck />
            </button>
          ) : (
            <button onClick={() => onUndoneButtonClicked(props)}>
              <MdClose />
            </button>
          )}
        </div>
      </div>
    </li>
  );
};
