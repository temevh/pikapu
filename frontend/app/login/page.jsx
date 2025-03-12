"use client";
import { useState } from "react";
import Link from "next/link";
import { EmailField, PasswordField } from "../components/fields";
import { LogInButton } from "../components/buttons";
import axios from "axios";

const loginPage = () => {
  const [email, setEmail] = useState("tiina@email.com");
  const [password, setPassword] = useState("testi123");

  const passwordUpdated = (pass) => {
    setPassword(pass);
  };

  const emailUpdated = (name) => {
    setEmail(name);
  };

  const logInPressed = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="custom-content-div flex flex-col justify-center items-center p-12">
        <p className="text-3xl pb-6 text-black">Kirjaudu sisään</p>
        <p className="text-xl pb-10 text-gray-400">
          Tai{" "}
          <Link
            href="/register"
            className="text-blue-700 hover:cursor-pointer underline"
          >
            luo käyttäjä
          </Link>
        </p>
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col justify-center gap-4 w-full mb-8">
            <EmailField emailUpdated={emailUpdated} />
            <PasswordField passwordUpdated={passwordUpdated} />
          </div>
          <LogInButton logInPressed={logInPressed} />
        </div>
      </div>
    </div>
  );
};

export default loginPage;
