import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";

const showModal = createAction("list/showModal");

type listState = {
  modal: boolean;
};

const initialState: listState = {
  modal: false,
};

const listReducer = createReducer(initialState, (builder) => {
  builder.addCase(showModal, (state) => {
    state.modal = !state.modal;
  });
});

export { listReducer, showModal };
