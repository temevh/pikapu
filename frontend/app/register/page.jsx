"use client";
import { useState } from "react";
import {
  EmailField,
  PasswordField,
  NameField,
  PhoneNumberField,
} from "../components/fields";
import RegisterButton from "../components/buttons/RegisterButton";
import axios from "axios";
import PasswordChecklist from "react-password-checklist";

const registerPage = () => {
  const [email, setEmail] = useState("tiina@email.com");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
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

  const registerPressed = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
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
            <form className="w-full">
              <div className="flex flex-row gap-4">
                <div>
                  <label className="text-black">Salasana:</label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border-2 rounded mb-4 text-black"
                  />
                </div>
                <div>
                  <label className="text-black">Salasana uudestaan:</label>
                  <input
                    type="password"
                    onChange={(e) => setPasswordAgain(e.target.value)}
                    className="w-full p-2 border-2 rounded mb-4 text-black"
                  />
                </div>
              </div>
              <PasswordChecklist
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "capital",
                  "match",
                ]}
                minLength={8}
                value={password}
                valueAgain={passwordAgain}
                onChange={(isValid) => {}}
                messages={{
                  minLength: "Salasanan tulee olla vähintään 8 merkkiä pitkä.",
                  specialChar: "Salasanassa tulee olla erikoismerkki.",
                  number: "Salasanassa tulee olla numero.",
                  capital: "Salasanassa tulee olla iso kirjain.",
                  match: "Salasanat täsmäävät.",
                }}
                style={{
                  color: "black",
                  fontSize: "14px",
                  margin: "0",
                  padding: "0",
                }}
              />
            </form>
          </div>
          <RegisterButton registerPressed={registerPressed} />
        </div>
      </div>
    </div>
  );
};

export default registerPage;
