import { useSelector } from "react-redux";
import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected, events } = useCalendarStore();
  const { user } = useSelector((state) => state.auth);
  const { activeEvent } = useSelector((state) => state.calendar);
  const handleDelete = () => startDeletingEvent(activeEvent.id, activeEvent.title);

  return (
    <div>
      <button
        className=' fab-danger'
        style={{
          display: !hasEventSelected || !events.length ? "none" : "" || user.uid !== activeEvent.user.uid ? "none" : "",
        }}
        onClick={handleDelete}
      >
        <i className='fas fa-trash-alt cross'></i>
      </button>
    </div>
  );
};
