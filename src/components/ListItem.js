import React from "react";
import { db, app } from "../firebase";

const onDoneButtonClicked = (event, id) => {
  db.collection("tasks").doc(id).update({
    timestampDone: app.firestore.FieldValue.serverTimestamp(),
  });
};

export const ListItem = (props) => {
  return (
    <li key={props.task.id}>
      {props.task.task}
      <button
        className="p-2"
        onClick={(event) => onDoneButtonClicked(event, props.task.id)}
      >
        ✔
      </button>
    </li>
  );
};
