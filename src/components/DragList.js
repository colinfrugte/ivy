import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAuth } from "../contexts/AuthContext";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdDelete } from "react-icons/md";
import { arrayRemove, doc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";

export const DragList = (props) => {
  const [tasks, setList] = useState([]);
  const { currentUser, logout } = useAuth();
  const docRef = doc(db, "users", currentUser.uid);
  const { listDoneState } = useSelector((state) => state.list);

  useEffect(() => {
    setList(props.tasks);
  }, [props.tasks]);

  const endOfDrag = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    const toBeMoved = tasks[source.index];
    const newOrder = [...tasks];
    newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, toBeMoved);

    updateDoc(doc(db, "users", currentUser.uid), {
      tasks: newOrder,
    });

    setList(newOrder);
  };

  const checkMark = (e, task) => {
    const toBeChanged = tasks.filter((t) => t === task)[0];
    const rest = tasks.filter((t) => t !== task);
    toBeChanged.done = !toBeChanged.done;

    updateDoc(docRef, {
      tasks: [...rest, toBeChanged],
    });
  };

  const deleteTask = (task) => {
    const filtered = tasks.filter((t) => t.id !== task.id);
    setList(filtered);
    updateDoc(docRef, {
      tasks: arrayRemove(task),
    });
  };

  return (
    <div className="mx-auto">
      <DragDropContext onDragEnd={endOfDrag}>
        <Droppable droppableId={"Checklist"}>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks
                .filter((task) => task.done === listDoneState)
                .map((task, index) => (
                  <Draggable draggableId={task.id} index={index} key={task.id}>
                    {(provided, snapshot) => (
                      <div
                        className="flex items-center mt-3 w-full justify-between pr-6"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div className="flex">
                          <div onClick={(e) => checkMark(e, task)}>
                            {task.done ? (
                              <MdCheckBox />
                            ) : (
                              <MdCheckBoxOutlineBlank />
                            )}
                          </div>

                          {task.content}
                        </div>
                        <div onClick={() => deleteTask(task)}>
                          <MdDelete />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
