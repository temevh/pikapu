import { Button } from "@mui/material";

const FetchSubsButton = ({ fetchPressed }) => {
  return (
    <Button variant="contained" onClick={fetchPressed}>
      Hae sijaisia
    </Button>
  );
};

export default FetchSubsButton;
