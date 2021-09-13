import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Leelist } from "./Leelist";
import Login from "./Login";
import Pomodoro from "./Pomodoro";

export const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <div>
        {currentUser ? (
          <div className="space-y-2 max-w-3xl mx-auto md:max-w-xl">
            <div className="pb-2">
              <Pomodoro />
            </div>
            <div>
              <Leelist />
            </div>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};
