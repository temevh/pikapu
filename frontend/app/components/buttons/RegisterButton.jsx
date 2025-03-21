import React from "react";

const RegisterButton = ({ registerPressed, disabled }) => {
  return (
    <button
      onClick={registerPressed}
      disabled={disabled}
      className={`w-full custom-button py-2 rounded-lg ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "hover:bg-black hover:cursor-pointer"
      }`}
    >
      Rekisteröidy
    </button>
  );
};

export default RegisterButton;
