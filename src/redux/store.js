import { configureStore } from "@reduxjs/toolkit";
import { listReducer } from "./list";
import { timerReducer } from "./timer";

// const store = configureStore({
//   reducer: { timer: timerReducer },
//   // listReducer: { list: listReducer },
// });
const store = configureStore({
  reducer: { timer: timerReducer, list: listReducer },
});

export default store;
