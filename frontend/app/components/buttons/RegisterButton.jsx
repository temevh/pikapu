import React from "react";

const RegisterButton = ({ registerPressed, disabled }) => {
  return (
    <button
      onClick={registerPressed}
      disabled={disabled}
      className={`w-full py-2 rounded-lg ${
        disabled
          ? "cursor-not-allowed"
          : "hover:bg-purpleaccent bg-purpleaccent hover:cursor-pointer"
      }`}
    >
      Rekisteröidy
    </button>
  );
};

export default RegisterButton;
