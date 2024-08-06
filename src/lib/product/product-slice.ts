import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  categoryId: string;
  setCategoryId?: () => void;
}

const initialState: InitialState = {
  categoryId: "",
};

const productSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { setCategoryId } = productSlice.actions;
