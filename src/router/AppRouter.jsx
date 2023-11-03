import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  // const authStatus = "not-authenticated";
  useEffect(() => {
    checkAuthToken();
    console.log(status);
  }, []);
  if (status === "checking") {
    return (
      <div className='text-center m-auto'>
        <div className='spinner-border' role='status'>
          <span className='sr-only'>Loading...</span>
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
