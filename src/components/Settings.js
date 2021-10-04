import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementHours,
  decrementMinute,
  decrementSecond,
  incrementHours,
  incrementMinute,
  incrementSecond,
  restartTimer,
  showModal,
} from "../redux/timer";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export default function Settings() {
  const { modal } = useSelector((state) => state.timer);

  const { initHours, initMinutes, initSeconds } = useSelector(
    (state) => state.timer
  );
  const dispatch = useDispatch();

  function onOkClick() {
    dispatch(showModal());
    dispatch(restartTimer());
  }

  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => dispatch(showModal())}
      >
        <div className="flex justify-center pt-72 px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {/* Gruppe der Buttons */}

            <div className="p-3 bg-gray-100 rounded-lg transform shadow-xl">
              <div className="divide-y divide-fuchsia-300">
                <div className="text-left pl-3 pt-2 text-gray-600 ">
                  set timer
                </div>
                <div className="flex flex-row">
                  {/* Stunden abschnitt */}
                  <div className="p-2 w-16 text-gray-700 text-lg">
                    h
                    <div className="flex flex-col space-y-2">
                      <button
                        type="button"
                        className="transition text-white duration-400 ease-in-out bg-green-200 hover:bg-green-300 px-2 py-1 rounded shadow self-center"
                        onClick={() => dispatch(incrementHours())}
                      >
                        <MdKeyboardArrowUp />
                      </button>

                      <label className="p-0 text-black">{initHours}</label>
                      <button
                        type="button"
                        className="transition text-white duration-400 ease-in-out bg-green-200 hover:bg-green-300 px-2 py-1 rounded shadow self-center"
                        onClick={() => dispatch(decrementHours())}
                      >
                        <MdKeyboardArrowDown />
                      </button>
                    </div>
                  </div>
                  {/* Minuten abschnitt */}
                  <div className="p-2 w-16 text-gray-700 text-lg">
                    m
                    <div className="flex flex-col space-y-2">
                      <button
                        type="button"
                        className="transition text-white duration-400 ease-in-out bg-green-200 hover:bg-green-300 px-2 py-1 rounded shadow self-center"
                        onClick={() => dispatch(incrementMinute())}
                      >
                        <MdKeyboardArrowUp />
                      </button>
                      <label className="p-0">{initMinutes}</label>
                      <button
                        type="button"
                        className="transition text-white duration-400 ease-in-out bg-green-200 hover:bg-green-300 px-2 py-1 rounded shadow self-center"
                        onClick={() => dispatch(decrementMinute())}
                      >
                        <MdKeyboardArrowDown />
                      </button>
                    </div>
                  </div>
                  {/* sekunden abschnitt */}
                  <div className="p-2 w-16 text-gray-700 text-lg">
                    s
                    <div className="flex flex-col space-y-2">
                      <button
                        type="button"
                        className="transition text-white duration-400 ease-in-out bg-green-200 hover:bg-green-300 px-2 py-1 rounded shadow self-center"
                        onClick={() => dispatch(incrementSecond())}
                      >
                        <MdKeyboardArrowUp />
                      </button>

                      <label>{initSeconds}</label>
                      <button
                        type="button"
                        className="transition text-white duration-400 ease-in-out bg-green-200 hover:bg-green-300 px-2 py-1 rounded shadow self-center"
                        onClick={() => dispatch(decrementSecond())}
                      >
                        <MdKeyboardArrowDown />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => onOkClick()}
                  ref={cancelButtonRef}
                >
                  OK
                </button>

                {/* <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"></div> */}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
