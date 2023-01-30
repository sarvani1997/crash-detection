import React from "react";
import ReactDOM from "react-dom/client";
import CrashDetector from "./CrashDetector";
import HeartMonitoring from "./HeartMonitoring";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CrashDetector />
  </React.StrictMode>
);
