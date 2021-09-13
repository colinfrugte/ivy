import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdPause, MdPlayArrow, MdRefresh, MdSettings } from "react-icons/md";

import { tick, startStop, restartTimer, showModal } from "../redux/timer";

function pad(num) {
  num = num.toString();
  while (num.length < 2) num = "0" + num;
  return num;
}

export default function Pomodoro() {
  const dispatch = useDispatch();
  const { liveSeconds, liveMinutes, liveHours, isRunning } = useSelector(
    (state) => state.timer
  );
  useEffect(() => dispatch(restartTimer()), [dispatch]);

  useEffect(() => {
    const timer = isRunning && setInterval(() => dispatch(tick()), 1000);
    return () => clearInterval(timer);
  }, [liveSeconds, isRunning, dispatch]);

  let timer;
  if (liveHours > 0) {
    timer = (
      <div>
        {liveHours}:{pad(liveMinutes)}:{pad(liveSeconds)}
      </div>
    );
  } else {
    timer = (
      <div>
        {pad(liveMinutes)}:{pad(liveSeconds)}
      </div>
    );
  }

  return (
    <div className="bg-white border p-2 rounded-lg container mx-auto w-3/6 text-center text-green-400 ">
      <div className="text-6xl p-2 xs:text-3xl">{timer}</div>
      <div className="text-5xl space-x-2">
        <button
          className="transition hover:text-green-200 duration-300 ease-in-out "
          onClick={() => dispatch(restartTimer())}
        >
          <MdRefresh />
        </button>
        <button
          className="transition hover:text-green-200 duration-300 ease-in-out "
          onClick={() => dispatch(startStop())}
        >
          {!isRunning ? <MdPlayArrow /> : <MdPause />}
        </button>
        <button
          className="transition hover:text-green-200 duration-300 ease-in-out "
          onClick={() => dispatch(showModal())}
        >
          <MdSettings />
        </button>
      </div>
    </div>
  );
}
