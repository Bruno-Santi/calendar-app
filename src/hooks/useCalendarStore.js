import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onLoadEvents,
} from "../store/calendar/calendarSlice";
import { calendarApi } from "../api/index";
import { convertEventsDate } from "../helpers/convertEventsDate";
import Swal from "sweetalert2";
export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const setActiveEvent = (calendarEvent) => dispatch(onSetActiveEvent(calendarEvent));
  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        await calendarApi.put("/events/" + calendarEvent.id, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      } else {
        const { data } = await calendarApi.post("/events", calendarEvent);

        dispatch(onAddNewEvent({ ...calendarEvent, id: data.savedEvent.id, user }));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };
  const startDeletingEvent = async (id, title) => {
    try {
      await calendarApi.delete("/events/" + id);
      dispatch(onDeleteEvent());
      Swal.fire(`Evento ${title} eliminado con exito!`, "", "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsDate(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      throw new Error("Error al cargar eventos");
    }
  };
  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
