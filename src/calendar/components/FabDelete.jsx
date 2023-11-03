import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected, events } = useCalendarStore();

  const handleDelete = () => startDeletingEvent();

  return (
    <div>
      <button
        className=' fab-danger'
        style={{ display: !hasEventSelected || !events.length ? "none" : "" }}
        onClick={handleDelete}
      >
        <i className='fas fa-trash-alt cross'></i>
      </button>
    </div>
  );
};
