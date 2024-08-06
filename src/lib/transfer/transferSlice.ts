import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  from_warehouse_id: string;
  setWarehouse?: () => void;

  product: any;
  setProduct?: () => void;

}

const initialState: InitialState = {
  from_warehouse_id: "",
  product: [],
};
const transferSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setFromWarehouse: (state, action) => {
      state.from_warehouse_id = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export default transferSlice.reducer;
export const { setProduct, setFromWarehouse } = transferSlice.actions;
