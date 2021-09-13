import { createAction, createReducer } from "@reduxjs/toolkit";

// const increment = createAction("counter/increment");

const incrementSecond = createAction("counter/incrementSecond");
const decrementSecond = createAction("counter/decrementSecond");
const incrementMinute = createAction("counter/incrementMinute");
const decrementMinute = createAction("counter/decrementMinute");
const incrementHours = createAction("counter/incrementHours");
const decrementHours = createAction("counter/decrementHours");
const tick = createAction("counter/tick");
const startStop = createAction("counter/isRunning");
const restartTimer = createAction("counter/restartTimer");
const showModal = createAction("counter/showModal");

type TimerState = {
  initSeconds: number;
  initMinutes: number;
  initHours: number;
  liveSeconds: number;
  liveMinutes: number;
  liveHours: number;
  isRunning: boolean;
  modal: boolean;
};

const initialState: TimerState = {
  initSeconds: 0,
  initMinutes: 10,
  initHours: 0,
  liveSeconds: 0,
  liveMinutes: 0,
  liveHours: 0,
  isRunning: false,
  modal: false,
};

const timerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(tick, (state) => {
      if (state.liveSeconds > 0) {
        state.liveSeconds--;
      } else if (state.liveMinutes > 0) {
        state.liveSeconds = 59;
        state.liveMinutes--;
      } else if (state.liveHours > 0) {
        state.liveSeconds = 59;
        state.liveMinutes = 59;
        state.liveHours--;
      } else {
        state.isRunning = false;
      }
    })
    .addCase(startStop, (state) => {
      state.isRunning = !state.isRunning;
    })
    .addCase(incrementSecond, (state) => {
      if (state.initSeconds < 59) {
        state.initSeconds++;
      } else {
        state.initSeconds = 0;
      }
    })
    .addCase(decrementSecond, (state) => {
      if (state.initSeconds === 0) {
        state.initSeconds = 59;
      } else {
        state.initSeconds--;
      }
    })
    .addCase(incrementMinute, (state) => {
      if (state.initMinutes < 59) {
        state.initMinutes++;
      } else {
        state.initMinutes = 0;
      }
    })
    .addCase(decrementMinute, (state) => {
      if (state.initMinutes === 0) {
        state.initMinutes = 59;
      } else {
        state.initMinutes--;
      }
    })
    .addCase(incrementHours, (state) => {
      state.initHours++;
    })
    .addCase(decrementHours, (state) => {
      if (state.initHours !== 0) {
        state.initHours--;
      }
    })
    .addCase(restartTimer, (state) => {
      state.isRunning = false;
      state.liveSeconds = state.initSeconds;
      state.liveMinutes = state.initMinutes;
      state.liveHours = state.initHours;
    })
    .addCase(showModal, (state) => {
      state.modal = !state.modal;
    });
});

export {
  decrementMinute,
  incrementMinute,
  incrementSecond,
  decrementSecond,
  incrementHours,
  decrementHours,
  tick,
  timerReducer,
  startStop,
  restartTimer,
  showModal,
};
