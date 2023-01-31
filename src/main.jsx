import {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import CrashDetector from "./CrashDetector";
import HeartMonitoring from "./HeartMonitoring";
import "./index.css";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand color" href="/">
          Alerts
        </a>
        <ul className="nav justify-content-end">
        <li className="nav-item">
                <a
                  className="nav-link color"
                  aria-current="page"
                  href="/crash_detector"
                >
                  Crash Detector
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link color"
                  aria-current="page"
                  href="/heart_monitor"
                >
                  Heart Monitor
                </a>
              </li>
        </ul>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <StrictMode>
      <Navbar/>
      <Switch>
        <Route exact path='/crash_detector'>
          <CrashDetector />
        </Route>
        <Route exact path='/heart_monitor'>
          <HeartMonitoring />
        </Route>
      </Switch>
    </StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
  <App />
</Router>,
);
