import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";
import "../styles.css";
export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  // const authStatus = "not-authenticated";
  useEffect(() => {
    checkAuthToken();
  }, []);
  if (status === "checking") {
    return (
      <div className='spinner-container'>
        <div className='spinner' style={{ margin: "0", position: "relative", inset: 0 }}>
          <div className='spinner-border spin' role='status'></div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {status === "non-authenticated" ? (
        <>
          <Route element={<LoginPage />} path='/auth/*' />
          <Route path='/*' element={<Navigate to='/auth/login' />} />{" "}
        </>
      ) : (
        <>
          <Route element={<CalendarPage />} path='/' />
          <Route path='/*' element={<Navigate to='/' />} />{" "}
        </>
      )}
    </Routes>
  );
};
