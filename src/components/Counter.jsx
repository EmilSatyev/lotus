import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://lotus-backend.onrender.com");

const Counter = ({start}) => {
  const [countdown, setCountdown] = useState(start);

  const subscribeToTimer = () => {
    socket.on("timer", (data) => setCountdown(data.countdown));
  };

  useEffect(() => {
    subscribeToTimer();
  });

  return <div>{countdown}</div>;
};

export default Counter;
