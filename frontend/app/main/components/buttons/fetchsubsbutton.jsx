import { Button } from "@mui/material";

const FetchSubsButton = ({ fetchPressed, isLoading }) => {
  return (
    <Button variant="contained" onClick={fetchPressed} disabled={isLoading}>
      {isLoading ? "Haetaan..." : "Hae sijaisia"}
    </Button>
  );
};

export default FetchSubsButton;
