import React from "react";

import { MdSettings } from "react-icons/md";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { showModal } from "../redux/list";
import { useAuth } from "../contexts/AuthContext";
import { useDispatch } from "react-redux";
import Settings from "./Settings";

export const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const dispatch = useDispatch();

  const onLogoutButton = () => {
    logout();
  };

  return (
    <div className="relative flex items-center justify-between h-16 p-3 bg-gray-100">
      <div className="">
        <Link className="px-3" to="/">
          Home
        </Link>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <Link className="px-3" to="/donelist">
          Done
        </Link>
        {currentUser ? (
          <div>
            {currentUser && currentUser.email}
            <button className="px-3" onClick={onLogoutButton}>
              logout
            </button>
          </div>
        ) : (
          <Link className="px-3" to="/login">
            login
          </Link>
        )}
        <button onClick={() => dispatch(showModal())}>
          <MdSettings />
        </button>
      </div>
      <Settings />
    </div>
  );
};
