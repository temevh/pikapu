"use client";
import { EmailField, PasswordField } from "@/app/components/fields";
import { LogInButton } from "../../components/buttons/index";
import { useState } from "react";
import Link from "next/link";

const Fields = () => {
  const [password, setPassword] = useState("");
  const [username, setEmail] = useState("");

  const passwordUpdated = (pass) => {
    setPassword(pass);
  };

  const emailUpdated = (name) => {
    setEmail(name);
  };

  return (
    <div className="custom-content-div">
      <p className="text-4xl pb-6">Log in</p>
      <p className="text-xl pb-10 text-gray-400">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-blue-700 hover:cursor-pointer underline"
        >
          Sign up
        </Link>
      </p>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center w-96">
          <div className="flex flex-col justify-center gap-4 w-full mb-8">
            <EmailField emailUpdated={emailUpdated} />
            <PasswordField passwordUpdated={passwordUpdated} />
          </div>
          <LogInButton />
        </div>
      </div>
      <div className="flex flex-row items-center w-full mt-10">
        <hr className="flex-grow border-gray-300" />
        <p className="text-gray-400 mx-4">Or log in with</p>
        <hr className="flex-grow border-gray-300" />
      </div>
    </div>
  );
};

export default Fields;
