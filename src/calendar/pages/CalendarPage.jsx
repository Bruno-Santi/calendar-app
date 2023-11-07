import { CalendarEventBox, CalendarModal, NavBar } from "../index";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar } from "react-big-calendar";

import { localizer, getMessagesES } from "../../helpers";
import { useEffect, useState } from "react";
import { useUiStore, useCalendarStore } from "../../hooks";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";
import { useSelector } from "react-redux";

export const CalendarPage = () => {
  const { toggleModal } = useUiStore();
  const [lastView, setlastView] = useState(localStorage.getItem("lastView") || "month");
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { isLoadingEvents } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    startLoadingEvents();
  }, []);

  const vista = window.localStorage.getItem("views");

  const onDoubleClick = () => toggleModal();

  const onSelect = (event) => {
    setActiveEvent(event);
  };
  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    setlastView(event);
  };
  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log(event.user.id);
    const style = {
      backgroundColor: user.uid !== event.user.id ? "#1d3557" : "#e5e5e5",
      color: user.uid !== event.user.id ? "white" : "#1d3557",
      inset: 0,
      height: "100%",
      position: "relative",
      margin: "auto",
      opacity: "0.8",
      borderRadius: "0.25em",
      marginTop: "3px",
    };

    return {
      style,
    };
  };
  return (
    <>
      <NavBar />
      <CalendarModal />
      {isLoadingEvents && (
        <div className='spinner-container-calendar'>
          <div className='spinner' style={{ margin: "0", position: "relative", inset: 0 }}>
            <div className='spinner-border spin' role='status'></div>
          </div>
        </div>
      )}
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor='start'
        endAccessor='end'
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
