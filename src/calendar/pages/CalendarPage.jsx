import { CalendarEventBox, CalendarModal, NavBar } from "../index";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar } from "react-big-calendar";

import { localizer, getMessagesES } from "../../helpers";
import { useState } from "react";
import { useUiStore, useCalendarStore } from "../../hooks";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";

export const CalendarPage = () => {
  const { toggleModal } = useUiStore();
  const [lastView, setlastView] = useState(localStorage.getItem("lastView") || "month");
  const { events, setActiveEvent } = useCalendarStore();

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
    const style = {
      backgroundColor: "#1d3557",
      color: "white",
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
