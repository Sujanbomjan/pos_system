import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal/modalSlice";
import salesReducer from "./sales/salesSlice";
import productReducer from "./product/product-slice";
import purchaseReducer from "./purchase/purchaseSlice";
import transferReducer from "./transfer/transferSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      modal: modalReducer,
      sales: salesReducer,
      product: productReducer,
      purchase: purchaseReducer,
      transfer: transferReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
