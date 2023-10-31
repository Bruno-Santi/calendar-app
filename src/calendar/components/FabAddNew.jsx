import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {
  const { toggleModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();
  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 1),
      bgColor: "#1d3557",
      user: {
        _id: "123",
        name: "Bruno",
      },
    });
    toggleModal();
  };

  return (
    <div>
      <button className='fab ' style={{ cursor: "pointer" }} onClick={handleClickNew}>
        <i className='fas fa-plus cross'></i>
      </button>
    </div>
  );
};
