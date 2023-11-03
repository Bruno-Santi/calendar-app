import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogOut, onLogOutRegister, onLogin } from "../store/auth/authSlice";
import Swal from "sweetalert2";
export const useAuthStore = () => {
  const { state, status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogOut("Usuario/Contraseña incorrecta"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 4000);
    }
  };
  const startRegister = async ({ name, email, password, password2 }) => {
    if (password !== password2) {
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 4000);
      return dispatch(onLogOutRegister("Las contraseña deben ser iguales"));
    }
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post("/auth/register", { name, email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogOutRegister(error.response.data.msg));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 4000);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogOut());

    try {
      const { data } = await calendarApi.get("/auth/renew");
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogOut());
    }
  };
  const startLogOut = () => {
    localStorage.clear();
    dispatch(onLogOut());
  };
  return {
    state,
    user,
    errorMessage,
    startLogin,
    startRegister,
    checkAuthToken,
    status,
    startLogOut,
  };
};
