import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SubjectDropdown = ({ selectedSubject, setSelectedSubject }) => {
  const subjects = ["Matikka", "Historia", "Biologia", "Kemia"];
  const [value, setValue] = useState("Valitse aine");

  const handleChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Valitse aine</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSubject}
          label="Aine"
          onChange={handleChange}
        >
          {subjects.map((subject) => {
            return <MenuItem value={subject}>{subject}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default SubjectDropdown;
