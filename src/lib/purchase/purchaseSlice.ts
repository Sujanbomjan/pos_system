import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  warehouse_id: string;
  setWarehouse?: () => void;

  product: any;
  setProduct?: () => void;

  taxData: any;
  setTax?: () => void;
}

const initialState: InitialState = {
  warehouse_id: "",
  product: [],

  taxData: {},
};

const purchaseSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setWarehouse: (state, action) => {
      state.warehouse_id = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setTax: (state, action) => {
      state.taxData = action.payload;
    },
  },
});

export default purchaseSlice.reducer;
export const { setProduct, setTax, setWarehouse } = purchaseSlice.actions;
