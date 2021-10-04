import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();

  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState({ email: false, password: false });

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  async function onSignInButtonClicked(e) {
    e.preventDefault();

    login(emailRef.current.value, passwordRef.current.value).then((message) => {
      setLoading(true);
      switch (message.code) {
        case "auth/invalid-email":
          setError({ email: true, password: false });
          break;
        case "auth/wrong-password":
          setError({ email: false, password: true });
          break;
        default:
          return;
      }
    });
    history.push("/");
    setLoading(false);
  }

  return (
    <div>
      <div className=" flex items-center justify-center  py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-4 mx-auto">
          <h2 className="block text-center">Sign in to your account</h2>
          <form>
            <input
              className={`${"appearance-none rounded-none relative block w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 border-opacity-50 text-gray-900 rounded-t-md focus:border-gray-400 focus:outline-none  focus:z-10 sm:text-sm"} ${
                !error.email ? "bg-white" : " bg-red-50"
              }`}
              placeholder="Email address"
              ref={emailRef}
              type="email"
            ></input>
            <input
              className={`${"appearance-none rounded-none relative block w-full px-3 py-2 border-2 border-gray-300 border-opacity-50 placeholder-gray-500 text-gray-900 focus:border-gray-400  rounded-b-md focus:outline-none   focus:z-10 sm:text-sm"} ${
                !error.password ? "bg-white" : "bg-red-50"
              }`}
              placeholder="Password"
              ref={passwordRef}
              type="password"
            ></input>
          </form>
          <button
            disabled={loading}
            className="bg-green-100 active:bg-green-300 p-2 rounded-md"
            onClick={onSignInButtonClicked}
          >
            Sign In
          </button>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
