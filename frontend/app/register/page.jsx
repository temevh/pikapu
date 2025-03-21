"use client";
import { useState } from "react";
import {
  EmailField,
  PasswordField,
  NameField,
  PhoneNumberField,
} from "../components/fields";
import { LogInButton } from "../components/buttons";
import axios from "axios";

const loginPage = () => {
  const [email, setEmail] = useState("tiina@email.com");
  const [password, setPassword] = useState("testi123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const passwordUpdated = (pass) => {
    setPassword(pass);
  };

  const emailUpdated = (name) => {
    setEmail(name);
  };

  const firstNameUpdated = (name) => {
    setFirstName(name);
  };

  const lastNameUpdated = (name) => {
    setLastName(name);
  };

  const phoneNumberUpdated = (number) => {
    setPhoneNumber(number);
  };

  const logInPressed = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
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
        <p className="text-3xl pb-6 text-black">Luo uusi käyttäjä</p>
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col justify-center gap-4 w-full mb-8">
            <NameField
              firstNameUpdated={firstNameUpdated}
              lastNameUpdated={lastNameUpdated}
            />
            <PhoneNumberField phoneNumberUpdated={phoneNumberUpdated} />
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
