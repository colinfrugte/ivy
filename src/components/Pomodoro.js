import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdKeyboardArrowUp, MdPause, MdPlayArrow } from "react-icons/md";

import {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
  startStop,
} from "../redux/timer";

function MyTimer() {
  const { seconds, isRunning } = useSelector((state) => state.timer);
  const dispatch = useDispatch();

  useEffect(() => {
    isRunning && seconds > 0 && setTimeout(() => dispatch(decrement()), 1000);
  }, [seconds, isRunning]);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>
        <div>{seconds}</div>
      </div>

      <div style={{ fontSize: "40px" }}>
        <button onClick={() => dispatch(increment())}>
          <MdKeyboardArrowUp />
        </button>
        <button onClick={() => dispatch(startStop())}>
          {!isRunning ? <MdPlayArrow /> : <MdPause />}
        </button>
      </div>
    </div>
  );
}

export default function Pomodoro() {
  return (
    <div>
      <MyTimer />
    </div>
  );
}
