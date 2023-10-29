import { NavBar } from "../index";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar } from "react-big-calendar";
import { addHours } from "date-fns";
import { localizer, getMessagesES } from "../../helpers";

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

const eventStyleGetter = (event, start, end, isSelected) => {
  console.log(event, start, end, isSelected);

  const style = {
    backgroundColor: "#1d3557",

    inset: 0,
    position: "relative",
    margin: "auto",
    opacity: "0.8",
    borderRadius: "0.25em",
    marginTop: "5px",
  };

  return {
    style,
  };
};
export const CalendarPage = () => {
  return (
    <>
      <NavBar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
      />
    </>
  );
};
