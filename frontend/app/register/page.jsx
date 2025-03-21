"use client";
import { useState } from "react";
import {
  EmailField,
  Passwords,
  NameField,
  PhoneNumberField,
} from "../components/fields";
import RegisterButton from "../components/buttons/RegisterButton";
import axios from "axios";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const isFormValid =
    email &&
    firstName &&
    lastName &&
    phoneNumber &&
    password &&
    passwordAgain &&
    isPasswordValid;

  const registerPressed = async () => {
    if (!isFormValid) return; // Prevent sending if the form is invalid

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          email,
          password,
          firstName,
          lastName,
          phoneNumber,
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
              firstNameUpdated={setFirstName}
              lastNameUpdated={setLastName}
            />
            <div className="flex flex-row gap-4 w-full">
              <PhoneNumberField phoneNumberUpdated={setPhoneNumber} />
              <EmailField emailUpdated={setEmail} />
            </div>
            <Passwords
              passwordUpdated={setPassword}
              passwordAgainUpdated={setPasswordAgain}
              setIsPasswordValid={setIsPasswordValid}
            />
          </div>
          <RegisterButton
            registerPressed={registerPressed}
            disabled={!isFormValid}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
