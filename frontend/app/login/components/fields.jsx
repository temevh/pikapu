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
        <LogInButton />
      </div>
    </div>
  );
};

export default Fields;
