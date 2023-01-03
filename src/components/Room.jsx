import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Counter from "./Counter";
import { useParams } from "react-router-dom";

const socket = io("https://lotus-backend.onrender.com");

const Room = () => {
  const [accessObj, setAccessObj] = useState({ status: "loading" });
  const { room, userName } = useParams();

  useEffect(() => {
    socket.on("room-request", (data) => {
      setAccessObj(data);
    });
    socket.emit("join room", userName, room);
  }, []);

  if (accessObj.status === "loading") return <div>Загрузка</div>;
  if (accessObj.status === "error") return <div>{accessObj.message}</div>;

  return (
    <table>
      <tbody>
        <tr>
          <th>Ход</th>
          <th></th>
          <th></th>
          <th>
            <Counter start={accessObj.countdown} />
          </th>
          <th></th>
        </tr>
        <tr>
          <th>Параметры и требования</th>
          <th>Участник 1</th>
          <th>Участник 2</th>
          <th>Участник 3</th>
          <th>Участник 4</th>
        </tr>
        <tr>
          <th>Наличие комплекса мероприятий</th>
          <td>да</td>
          <td>нет</td>
          <td>нет</td>
          <td>нет</td>
        </tr>
        <tr>
          <th>Изготовление лота</th>
          <td>80</td>
          <td>90</td>
          <td>75</td>
          <td>120</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Room;
