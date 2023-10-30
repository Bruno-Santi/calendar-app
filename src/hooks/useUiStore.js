import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";
export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isDateModalOpen } = useSelector((state) => state.ui);

  const toggleModal = () => (isDateModalOpen ? dispatch(onCloseDateModal()) : dispatch(onOpenDateModal()));
  return {
    isDateModalOpen,
    toggleModal,
  };
};
