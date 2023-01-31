import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const sendMsg = async (position) => {
  await axios.post(`https://webapi.sweettree.org/send_heartfail_msg`, {
    latitude: position.latitude,
    longitude: position.longitude,
  });
};
function HeartMonitoring() {
  const [heartRate, setHeartRate] = useState(70);
  const [type, setType] = useState("neutral");
  const [position, setPostion] = useState();
  const [msgSent, setMsgSent] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      setPostion(position.coords);
    });
  }, []);

  useEffect(() => {
    if (heartRate === 145) {
      console.log("high Heart rate");
      setMsgSent(true);
      if (!position) {
        return;
      }
      sendMsg(position);
    }
    if (heartRate === 45) {
      console.log("low Heart rate");
      setMsgSent(true);
      if (!position) {
        return;
      }
      sendMsg(position);
    }
    let id;
    if (type === "neutral") {
      id = setInterval(() => {
        setHeartRate((heartRate) =>
          heartRate > 75
            ? Math.min(heartRate - Math.ceil(Math.random() * 1), 70)
            : Math.max(heartRate + Math.ceil(Math.random() * 1), 75)
        );
      }, 400);
    }
    if (type === "pause") {
      id = setInterval(() => {
        setHeartRate((heartRate) => {
          if ((heartRate + 1) % 2 === 0) {
            return heartRate + 5;
          } else {
            return heartRate - 5;
          }
        });
      }, 400);
    }
    if (type === "increase") {
      id = setInterval(() => {
        setHeartRate((heartRate) =>
          Math.min(heartRate + Math.ceil(Math.random() * 5), 145)
        );
      }, 400);
    }

    if (type === "decrease") {
      id = setInterval(() => {
        setHeartRate((heartRate) =>
          Math.max(heartRate - Math.ceil(Math.random() * 5), 45)
        );
      }, 400);
    }

    return () => {
      clearInterval(id);
    };
  }, [type, heartRate]);

  const onIncrease = () => {
    setType("increase");
  };

  const onPause = () => {
    setType("pause");
  };

  const onDecrease = () => {
    setType("decrease");
  };

  const buttonStyle = {
    margin: 5,
  };

  return (
    <main>
      <h1>Heart Failure detection</h1>
      {position ? (
        <div style={{ margin: 20 }}>
          <b>Location:</b> {position.latitude.toFixed(2)},{" "}
          {position.longitude.toFixed(2)}
        </div>
      ) : (
        <div style={{ margin: 20 }}>Waiting for Location</div>
      )}
      {msgSent ? (
        <h3>Health Emergency --- Message Sent</h3>
      ) : (
        <div>
          <div>
            <b>Heart Rate:</b> {heartRate} bpm
          </div>

          <button style={buttonStyle} onClick={onDecrease}>
            Decrease
          </button>
          <button style={buttonStyle} onClick={onIncrease}>
            Increase
          </button>
          <button style={buttonStyle} onClick={onPause}>
            Pause
          </button>
        </div>
      )}
    </main>
  );
}

export default HeartMonitoring;
