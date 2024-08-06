import { createSlice } from "@reduxjs/toolkit";
import React from "react";

interface InitialState {
  modalBody: React.ReactNode;
  isModalOpen: boolean;
  closeHandler?: () => void;
}

const initialState: InitialState = {
  isModalOpen: false,
  modalBody: null,
  closeHandler: undefined,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = !state.isModalOpen;
      state.modalBody = action.payload.content;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
