import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const sendCrashMessage = async (position) => {
  await axios.post(`https://webapi.sweettree.org/send_crash_msg`, {
    latitude: position.latitude,
    longitude: position.longitude,
  });
};

function CrashDetector() {
  const [speed, setSpeed] = useState(0);
  const [type, setType] = useState("stop");
  const [position, setPostion] = useState();
  const [startDisable, setStartDisable] = useState(false);
  const [crashDisable, setCrashDisable] = useState(false);
  const [stopDisable, setStopDisable] = useState(false);

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

    if (type === "stop") {
      setCrashDisable(true);
      setStopDisable(true);
      setStartDisable(false);
    }

    if (type === "crash") {
      setSpeed(0);
      setCrashDisable(true);
      setStopDisable(true);
      setStartDisable(true);
    }

    if (type === "start") {
      setStartDisable(true);
      setCrashDisable(false);
      setStopDisable(false);
    }

    return () => {
      clearInterval(id);
    };
  }, [type]);

  console.log("type--------->", type);

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
      <button disabled={startDisable} style={buttonStyle} onClick={onStart}>
        Start
      </button>
      <button disabled={crashDisable} style={buttonStyle} onClick={onCrash}>
        Crash
      </button>
      <button disabled={stopDisable} style={buttonStyle} onClick={onStop}>
        Stop
      </button>
    </main>
  );
}

export default CrashDetector;
