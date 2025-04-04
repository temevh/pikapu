import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const CreatePostButton = () => {
  const router = useRouter();

  const handleCreatePost = () => {
    // Generate a random hash
    const hash = Math.random().toString(36).substring(2, 15);
    // Navigate to the new post page
    router.push(`/post/${hash}`, { scroll: false });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleCreatePost}
      sx={{
        backgroundColor: "#4CAF50",
        "&:hover": {
          backgroundColor: "#45a049",
        },
      }}
    >
      Luo uusi sijaisilmoitus
    </Button>
  );
};

export default CreatePostButton;
