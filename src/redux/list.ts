import { createAction, createReducer } from "@reduxjs/toolkit";

const showModal = createAction("list/showModal");
const changeListState = createAction("list/listDoneState");

type listState = {
  modal: boolean;
  listDoneState: boolean;
  tasks: [];
};

const initialState: listState = {
  modal: false,
  tasks: [],
  listDoneState: false,
};

const listReducer = createReducer(initialState, (builder) => {
  builder.addCase(showModal, (state) => {
    // state.modal = !state.modal;
  });
  builder.addCase(changeListState, (state) => {
    state.listDoneState = !state.listDoneState;
  });
});

export { listReducer, changeListState };
