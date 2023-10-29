import { startOfWeek, parse, format, getDay } from "date-fns";
import esES from "date-fns/locale/es";
import { dateFnsLocalizer } from "react-big-calendar";

// import enUS from "date-fns/locale/en-US";

const locales = {
  es: esES,
  //   "en-US": "enUS",
};
export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const calendarLocalizer = () => {};
