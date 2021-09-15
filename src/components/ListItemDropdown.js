import { deleteDoc, doc } from "@firebase/firestore";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { MdDelete, MdModeEdit, MdMoreVert } from "react-icons/md";
import { db } from "../firebase";

export default function ListItemDropdown(props) {
  const deleteStorage = (props) => {
    deleteDoc(doc(db, "users", props.uid, "tasks", props.taskId));
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>
        <MdMoreVert
          className="text-violet-200 hover:text-violet-100"
          aria-hidden="true"
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 top-0 w-24 mb-2 mr-7 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              <button className="flex space-x-2 rounded-md items-center w-full px-2 py-2 text-sm">
                <div>
                  <MdModeEdit />
                </div>
                <div> Edit</div>
              </button>
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              <button
                className="flex space-x-2 rounded-md items-center w-full px-2 py-2 text-sm"
                onClick={() => deleteStorage(props)}
              >
                <div>
                  <MdDelete />
                </div>
                <div>Delete</div>
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}
