import React, { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const { signup } = useAuth();

  const onSignUpButtonClicked = () => {
    if (
      emailRef.current?.value &&
      passwordRef.current?.value &&
      passwordConfirmRef.current?.value
    ) {
      signup(
        emailRef.current.value,
        passwordRef.current.value,
        passwordConfirmRef.current.value
      );
    } else {
    }
  };

  return (
    <div className=" flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 mx-auto">
        <h2 className="block text-center">Sign in to your account</h2>
        <div>
          <form>
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              ref={emailRef}
              type="email"
            ></input>
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              ref={passwordRef}
              type="password"
            ></input>
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password Confirm"
              ref={passwordConfirmRef}
              type="password"
            ></input>
          </form>
        </div>
        <button
          className="bg-blue-100 hover:bg-blue-300 p-2 rounded-md"
          onClick={onSignUpButtonClicked}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
