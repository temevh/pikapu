import { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";

const SubjectDropdown = ({ selectedSubject, setSelectedSubject }) => {
  const subjects = ["Matikka", "Historia", "Biologia"];
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("Valitse aine");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (subject) => {
    if (subject) {
      setValue(subject);
      setSelectedSubject(subject);
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick}>{selectedSubject}</Button>
      <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose(null)}>
        {subjects.map((subject) => (
          <MenuItem key={subject} onClick={() => handleClose(subject)}>
            {subject}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SubjectDropdown;
