import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { CalendarApp } from "./CalendarApp.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <CalendarApp />
    </React.StrictMode>
  </BrowserRouter>
);
