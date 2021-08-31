import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { DoneList } from "./DoneList";
import { Leelist } from "./Leelist";
import Login from "./Login";
import Pomodoro from "./Pomodoro";

export const Home = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      {<Pomodoro />}
      {currentUser ? <Leelist /> : <Login />}
    </div>
  );
};
