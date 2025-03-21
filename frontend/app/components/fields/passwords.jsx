import { useState } from "react";
import PasswordChecklist from "react-password-checklist";

const Passwords = ({
  passwordUpdated,
  passwordAgainUpdated,
  setIsPasswordValid,
}) => {
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  return (
    <form className="w-full">
      <div className="flex flex-row gap-4">
        <div className="w-full">
          <label className="text-black">Salasana:</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
              passwordUpdated(e.target.value);
            }}
            className="w-full p-2 border-2 border-black rounded mb-4 text-black"
          />
        </div>
        <div className="w-full">
          <label className="text-black">Salasana uudestaan:</label>
          <input
            type="password"
            onChange={(e) => {
              setPasswordAgain(e.target.value);
              passwordAgainUpdated(e.target.value);
            }}
            className="w-full p-2 border-2 border-black rounded mb-4 text-black"
          />
        </div>
      </div>
      <PasswordChecklist
        rules={["minLength", "specialChar", "number", "capital", "match"]}
        minLength={8}
        value={password}
        valueAgain={passwordAgain}
        onChange={setIsPasswordValid}
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
  );
};

export default Passwords;
