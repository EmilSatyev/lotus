const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
  },
});

const users = ["user1", "user2", "user3", "user4"];

let countdown = {
  hours: 0,
  minutes: 2,
  seconds: 10,
};

let secs =
  countdown.seconds + countdown.minutes * 60 + countdown.hours * 60 * 60;

const timeToObj = (secs) => {
  const hours = Math.floor(secs / (60 * 60));
  const divisor_for_minutes = secs % (60 * 60);
  const minutes = Math.floor(divisor_for_minutes / 60);

  const divisor_for_seconds = divisor_for_minutes % 60;
  const seconds = Math.ceil(divisor_for_seconds);

  return {
    hours,
    minutes,
    seconds,
  }
}
const timeToStr = (obj) => {
  return (
    obj.hours.toString().padStart(2, "0") +
    ":" +
    obj.minutes.toString().padStart(2, "0") +
    ":" +
    obj.seconds.toString().padStart(2, "0")
  );
};

setInterval(function () {
  if (!secs) {
    secs = 2 * 60;
  }
  secs--;
  io.emit("timer", {
    countdown: timeToStr(timeToObj(secs)),
  });
}, 1000);

io.on("connection", (socket) => {
  socket.on("join room", (username, room) => {
    if (room === "testRoomName" && users.includes(username)) {
      socket.join(room);
      io.to(room).emit("room-request", {
        countdown: timeToStr(timeToObj(secs)),
        username,
        status: "success",
        message: "Вы подключились",
      });
    } else {
      io.emit("room-request", {
        status: "error",
        message: "Доступа нет",
      });
    }
  });
});
