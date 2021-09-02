import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdKeyboardArrowUp, MdPause, MdPlayArrow } from "react-icons/md";

import { increment, tick, startStop } from "../redux/timer";

function pad(num) {
  num = num.toString();
  while (num.length < 2) num = "0" + num;
  return num;
}

function MyTimer() {
  const dispatch = useDispatch();
  const { seconds, minutes, hours, isRunning } = useSelector(
    (state) => state.timer
  );

  useEffect(() => {
    const timer = isRunning && setInterval(() => dispatch(tick()), 1000);
    return () => clearInterval(timer);
  }, [seconds, isRunning, dispatch]);

  let timer;
  if (hours > 0) {
    timer = (
      <div>
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </div>
    );
  } else {
    timer = (
      <div>
        {pad(minutes)}:{pad(seconds)}
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>{timer}</div>

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
