import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";

const increment = createAction("counter/increment");
const tick = createAction("counter/tick");
const incrementByAmount = createAction<number, "counter/incrementByAmount">(
  "counter/incrementByAmount"
);

const startStop = createAction("counter/isRunning");

type TimerState = {
  seconds: number;
  minutes: number;
  hours: number;
  isRunning: boolean;
};

const initialState: TimerState = {
  seconds: 0,
  minutes: 10,
  hours: 0,
  isRunning: false,
};

const timerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state) => {
      if (state.seconds === 59) {
        if (state.minutes === 59) {
          state.hours++;
          state.minutes = 0;
          state.seconds = 0;
        } else {
          state.minutes++;
          state.seconds = 0;
        }
      } else {
        state.seconds++;
      }
    })
    .addCase(tick, (state) => {
      if (state.seconds > 0) {
        state.seconds--;
      } else if (state.minutes > 0) {
        state.seconds = 59;
        state.minutes--;
      } else if (state.hours > 0) {
        state.seconds = 59;
        state.minutes = 59;
        state.hours--;
      } else {
        state.isRunning = false;
      }
    })
    .addCase(incrementByAmount, (state, action: PayloadAction<number>) => {
      state.seconds += action.payload;
    })

    .addCase(startStop, (state) => {
      state.isRunning = !state.isRunning;
    });
});

export { increment, tick, incrementByAmount, timerReducer, startStop };
