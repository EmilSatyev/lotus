import React from "react";
import { Route, Routes } from "react-router-dom";
import Room from "./components/Room";

function App() {
  return (
    <Routes>
      <Route path=":room/:userName" element={<Room />}></Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;
