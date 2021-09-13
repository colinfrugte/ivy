import { collection, getDocs, query } from "@firebase/firestore";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { db } from "../firebase";

const showModal = createAction("list/showModal");

type listState = {
  modal: boolean;
  tasks: [];
};

const initialState: listState = {
  modal: false,
  tasks: [],
};

const listReducer = createReducer(initialState, (builder) => {
  builder.addCase(showModal, (state) => {
    // state.modal = !state.modal;
  });
});

export { listReducer };
