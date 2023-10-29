import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";

export const AppRouter = () => {
  const authStatus = "authenticated";

  return (
    <Routes>
      {authStatus === "not-authenticated" ? (
        <Route element={<LoginPage />} path='/auth/*' />
      ) : (
        <>
          <Route element={<CalendarPage />} path='/*' />
        </>
      )}
      <Route path='/*' element={<Navigate to='/auth/login' />} />{" "}
    </Routes>
  );
};
