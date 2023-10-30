import { CalendarEventBox, CalendarModal, NavBar } from "../index";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar } from "react-big-calendar";
import { addHours } from "date-fns";
import { localizer, getMessagesES } from "../../helpers";
import { useState } from "react";
import { useUiStore } from "../../hooks";

export const CalendarPage = () => {
  const { toggleModal } = useUiStore();
  const [lastView, setlastView] = useState(localStorage.getItem("lastView") || "month");
  const events = [
    {
      title: "Cumpleanios",
      notes: "Ir al cumpleanios",
      start: new Date(),
      end: addHours(new Date(), 1),
      bgColor: "#1d3557",
      user: {
        _id: "123",
        name: "Bruno",
      },
    },
  ];
  const vista = window.localStorage.getItem("views");
  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
    toggleModal();
  };
  const onSelect = (event) => {
    console.log({ doubleClick: event });
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
      position: "relative",
      margin: "auto",
      opacity: "0.8",
      borderRadius: "0.25em",
      marginTop: "5px",
      height: "",
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
    </>
  );
};
