import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import CrashDetector from "./CrashDetector";
import HeartMonitoring from "./HeartMonitoring";
import "./index.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand color" href="/">
          Alerts
        </a>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link
              className="nav-link color"
              aria-current="page"
              to="/crash_detector"
            >
              Crash Detector
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link color"
              aria-current="page"
              to="/heart_monitor"
            >
              Heart Monitor
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <StrictMode>
      <Navbar />
      <Switch>
        <Route exact path="/crash_detector">
          <CrashDetector />
        </Route>
        <Route exact path="/heart_monitor">
          <HeartMonitoring />
        </Route>
      </Switch>
    </StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
