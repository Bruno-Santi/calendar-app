import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
  _id: new Date().getTime(),
  title: "Cumpleanios",
  notes: "Ir al cumpleanios",
  start: new Date(),
  end: addHours(new Date(), 1),
  bgColor: "#1d3557",
  user: {
    _id: "123",
    name: "Bruno",
  },
};
const initialState = {
  events: [tempEvent],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
  },
});

export const { onSetActiveEvent, onAddNewEvent } = calendarSlice.actions;

export default calendarSlice.reducer;
