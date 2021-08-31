import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const onUndoneButtonClicked = (event, id) => {
  db.collection("tasks").doc(id).update({
    timestampDone: null,
  });
};

export function DoneList() {
  const [tasks, setTasks] = useState([]);

  // useEffect(() => {
  //   db.collection("tasks")
  //     .where("timestampDone", "!=", null)
  //     .onSnapshot((snapshot) => {
  //       setTasks(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           task: doc.data().task,
  //         }))
  //       );
  //     });
  // }, []);

  return (
    <ul>
      {tasks.map((task) => (
        <div>
          {task.task}
          <button
            className="p-2"
            onClick={(event) => onUndoneButtonClicked(event, task.id)}
          >
            ❌
          </button>
        </div>
      ))}
    </ul>
  );
}
