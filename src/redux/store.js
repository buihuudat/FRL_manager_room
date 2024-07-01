import { configureStore } from "@reduxjs/toolkit";
import userSlider from "./slices/userSlice";
import appSlice from "./slices/appSlice";
import modalSlice from "./slices/modalSlice";

export const store = configureStore({
  reducer: { user: userSlider, app: appSlice, modal: modalSlice },
});
