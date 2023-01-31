import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function HeartMonitoring() {
  const [heartRate, setHeartRate] = useState(70);
  const [type, setType] = useState("neutral");
  const [msgSent, setMsgSent] = useState(false)

  const sendMsg = async () => {
    await axios.post(`https://webapi.sweettree.org/send_heartfail_msg`, {});
  };

  useEffect(() => {
    if (heartRate === 145) {
      console.log("high Heart rate");
      setMsgSent(true)
      sendMsg();
    }
    if (heartRate === 45) {
      console.log("low Heart rate");
      setMsgSent(true)
      sendMsg();
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
      {msgSent ? 
      <h3>Heart Failure --- Message Sent</h3> :
      <div>
        <div>
        <b>Heart Rate:</b> {heartRate} bpm
      </div>

      <button style={buttonStyle} onClick={onPause}>
        Pause
      </button>
      <button style={buttonStyle} onClick={onIncrease}>
        Increase
      </button>

      <button style={buttonStyle} onClick={onDecrease}>
        Decrease
      </button>
      </div> 
      }
     
    </main>
  );
}

export default HeartMonitoring;
