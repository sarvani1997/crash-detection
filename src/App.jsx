import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const sendCrashMessage = async (position) => {
  await axios.post(`https://webapi.sweettree.org/send_crash_msg`, {
    latitude: position.latitude,
    longitude: position.longitude,
  });
};

function App() {
  const [speed, setSpeed] = useState(0);
  const [type, setType] = useState("stop");
  const [position, setPostion] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      setPostion(position.coords);
    });
  }, []);

  useEffect(() => {
    let id;
    if (type === "stop") {
      id = setInterval(() => {
        setSpeed((speed) =>
          speed > 0 ? Math.max(speed - Math.ceil(Math.random() * 5), 0) : 0
        );
      }, 400);
    }
    if (type === "start") {
      id = setInterval(() => {
        setSpeed((speed) =>
          speed < 50
            ? Math.max(speed + Math.ceil(Math.random() * 5), 0)
            : Math.floor(50 + (Math.random() * 10 - 5))
        );
      }, 400);
    }
    if (type === "crash") {
      setSpeed(0);
    }

    return () => {
      clearInterval(id);
    };
  }, [type]);

  const onStart = () => {
    setType("start");
  };

  const onStop = () => {
    setType("stop");
  };

  const onCrash = () => {
    if (!position) {
      return;
    }

    setType("crash");
    if (speed > 30) {
      sendCrashMessage(position);
    }
  };

  const buttonStyle = {
    margin: 5,
  };

  return (
    <main>
      <h1>Car crash detection</h1>
      <div>
        <b>Speed:</b> {speed} kmph
      </div>
      {position ? (
        <div style={{ margin: 20 }}>
          <b>Location:</b> {position.latitude.toFixed(2)},{" "}
          {position.longitude.toFixed(2)}
        </div>
      ) : (
        <div style={{ margin: 20 }}>Waiting for Location</div>
      )}
      <button style={buttonStyle} onClick={onStart}>
        Start
      </button>
      <button style={buttonStyle} onClick={onCrash}>
        Crash
      </button>
      <button style={buttonStyle} onClick={onStop}>
        Stop
      </button>
    </main>
  );
}

export default App;
