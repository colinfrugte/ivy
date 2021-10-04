import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Settings from "./Settings";
import mainLogo from "../ivy.png";
import { useAuth } from "../contexts/AuthContext";

export const Navbar = () => {
  const { currentUser, logout } = useAuth();

  const onLogoutButton = () => {
    logout();
  };

  return (
    <div className="relative flex items-center justify-between h-16 p-3 bg-green-300 text-green-50 font-bold">
      {/* <Link className="px-3" to="/"> */}
      <div className="px-3 cursor-default select-none">Ivy</div>

      {/* </Link> */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        {currentUser ? (
          <div>
            {/* {currentUser && currentUser.email} */}
            <button
              className="px-3 font-bold ring rounded-lg ring-green-100 hover:bg-green-100 hover:text-green-300 transition ease-out duration-500"
              onClick={onLogoutButton}
            >
              logout
            </button>
          </div>
        ) : (
          <Link
            className="px-3 font-bold ring rounded-lg ring-green-100 hover:bg-green-100 hover:text-green-300 transition ease-out duration-500"
            to="/login"
          >
            login
          </Link>
        )}
      </div>
      <Settings />
    </div>
  );
};
