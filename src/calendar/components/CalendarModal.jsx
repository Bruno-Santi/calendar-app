import { addHours, differenceInSeconds } from "date-fns";
import { useMemo, useState } from "react";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useUiStore } from "../../hooks";
registerLocale("es", es);
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "fixed",
  },
};
Modal.setAppElement("#root");
export const CalendarModal = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { isDateModalOpen, toggleModal } = useUiStore();
  const [formValues, setFormValues] = useState({
    title: "Bruno",
    notes: "Santimaria",
    start: new Date(),
    end: addHours(new Date(), 2),
  });
  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValues.title.length > 0 ? "" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  const onFormChange = (e) => setFormValues({ ...formValues, [e.target.name]: e.target.value });

  const onDateChange = (e, changing) => setFormValues({ ...formValues, [changing]: e });

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Fechas Incorrectas ", "Revisar fechas ingresadas", "error");
      return;
    }
    if (formValues.title.length <= 0) {
      return;
    }
    toggleModal();
  };
  return (
    <>
      <Modal
        className='modal'
        overlayClassName='modal-fondo'
        closeTimeoutMS={200}
        style={customStyles}
        isOpen={isDateModalOpen}
        onRequestClose={toggleModal}
        contentLabel='Example Modal'
      >
        <h1> Nuevo evento </h1>
        <hr />
        <form className='container' onSubmit={onSubmit}>
          <div className='form-group mb-2'>
            <label>Fecha y hora inicio</label>
            <DatePicker
              selected={formValues.start}
              dateFormat='Pp'
              className='form-control'
              name='start'
              onChange={(e) => onDateChange(e, "start")}
              locale='es'
              showTimeSelect
              timeCaption='Hora'
            />
          </div>

          <div className='form-group mb-2'>
            <label>Fecha y hora fin</label>
            <DatePicker
              minDate={formValues.start}
              selected={formValues.end}
              dateFormat='Pp'
              className='form-control'
              name='start'
              onChange={(e) => onDateChange(e, "end")}
              locale='es'
              showTimeSelect
              timeCaption='Hora'
            />
          </div>

          <hr />
          <div className='form-group mb-2'>
            <label>Titulo y notas</label>
            <input
              type='text'
              className={`form-control ${titleClass}`}
              placeholder='Título del evento'
              name='title'
              onChange={onFormChange}
              value={formValues.title}
              autoComplete='off'
            />
            <small id='emailHelp' className='form-text text-muted'>
              Una descripción corta
            </small>
          </div>

          <div className='form-group mb-2'>
            <textarea
              type='text'
              value={formValues.notes}
              onChange={onFormChange}
              className='form-control'
              placeholder='Notas'
              rows='5'
              name='notes'
            ></textarea>
            <small id='emailHelp' className='form-text text-muted'>
              Información adicional
            </small>
          </div>

          <button type='submit' className='btn btn-outline-primary btn-block'>
            <i className='far fa-save'></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </>
  );
};
