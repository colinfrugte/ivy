import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export const Navbar = () => {
  const { currentUser, logout } = useAuth();

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
      <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <Link className="px-3" to="/donelist">
          Done
        </Link>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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
      </div>
    </div>
  );
};
