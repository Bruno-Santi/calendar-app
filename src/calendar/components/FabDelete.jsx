import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  const { deleteEvent, events } = useCalendarStore();

  const handleDelete = () => deleteEvent();

  return (
    <div hidden={!events.length}>
      <button className=' fab-danger' style={{ cursor: "pointer" }} onClick={handleDelete}>
        <i className='fas fa-trash-alt cross'></i>
      </button>
    </div>
  );
};
