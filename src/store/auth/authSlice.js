import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "checking",
  user: {},
  errorMessage: undefined,
  errorRegisterMessage: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      (state.status = "checking"), (state.user = {}), (state.errorMessage = undefined);
    },
    onLogin: (state, { payload }) => {
      (state.status = "authenticated"), (state.user = payload), (state.errorMessage = undefined);
    },
    onLogOut: (state, { payload }) => {
      state.status = "non-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    onLogOutRegister: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = undefined;
      state.errorRegisterMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
      state.errorRegisterMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogOut, clearErrorMessage, onLogOutRegister } = authSlice.actions;

export default authSlice.reducer;
