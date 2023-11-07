import { createSlice } from "@reduxjs/toolkit";

// const tempEvent = {
//   _id: new Date().getTime(),
//   title: "Cumpleanios",
//   notes: "Ir al cumpleanios",
//   start: new Date(),
//   end: addHours(new Date(), 1),
//   bgColor: "#1d3557",
//   user: {
//     _id: "123",
//     name: "Bruno",
//   },
// };

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: { isLoadingEvents: true, events: [], activeEvent: null },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }

        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter((event) => event.id !== state.activeEvent.id);
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload }) => {
      state.isLoadingEvents = false;

      payload.forEach((event) => {
        const exist = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exist) {
          state.events.push(event);
        }
      });
    },
    onLogOutCalendar: (state) => {
      state.events = [];
      state.activeEvent = null;
      state.isLoadingEvents = true;
    },
  },
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogOutCalendar } =
  calendarSlice.actions;

export default calendarSlice.reducer;
