import {
  createAction,
  createReducer,
  PayloadAction
} from "@reduxjs/toolkit";

const increment = createAction("counter/increment");
const decrement = createAction("counter/decrement");
const incrementByAmount = createAction < number,
  'counter/incrementByAmount' > ("counter/incrementByAmount");
const decrementByAmount = createAction < number,
  "counter/decrementByAmount" > ("counter/decrementByAmount");
const startStop = createAction("counter/isRunning");

type TimerState = {
  seconds: number,
  minutes: number,
  hours: number,
  isRunning: boolean
}

const initialState: TimerState = {
  seconds: 0,
  minutes: 0,
  hours: 0,
  isRunning: false
}

const timerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state) => {
      state.isRunning = false;
      state.seconds++;
    })
    .addCase(decrement, (state) => {
      state.seconds--;
    })
    .addCase(incrementByAmount, (state, action: PayloadAction < number > ) => {
      state.seconds += action.payload;
    })
    .addCase(decrementByAmount, (state, action: PayloadAction < number > ) => {
      state.seconds -= action.payload;
    })
    .addCase(startStop, (state) => {
      state.isRunning = !state.isRunning;
    });
});

export {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
  timerReducer,
  startStop,
};