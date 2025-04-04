"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubjectDropdown } from "../../main/components";
import { DateTimePicker } from "../../main/components";
import { Button, TextField, Box, Typography, Paper } from "@mui/material";
import axios from "axios";

const CreatePostPage = ({ hash }) => {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState("Valitse aine");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts/create",
        {
          title,
          content,
          subject: selectedSubject,
          date: selectedDate,
          hash: hash,
        }
      );

      if (response.data.success) {
        router.push("/main");
      }
    } catch (err) {
      console.error(err);
      setError("Ilmoituksen luominen epäonnistui. Yritä uudelleen.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Paper elevation={0} className="p-6 bg-white rounded-lg shadow-md">
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            className="text-gray-900"
          >
            Luo uusi sijaisilmoitus
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box className="space-y-6">
              <TextField
                fullWidth
                label="Otsikko"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                variant="outlined"
              />

              <SubjectDropdown
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
              />

              <DateTimePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />

              <TextField
                fullWidth
                label="Lisätiedot"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                multiline
                rows={4}
                variant="outlined"
              />

              {error && (
                <Typography color="error" className="text-sm">
                  {error}
                </Typography>
              )}

              <div className="flex justify-end space-x-4">
                <Button
                  variant="outlined"
                  onClick={() => router.push("/main")}
                  disabled={isLoading}
                >
                  Peruuta
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    backgroundColor: "#4CAF50",
                    "&:hover": {
                      backgroundColor: "#45a049",
                    },
                  }}
                >
                  {isLoading ? "Luodaan..." : "Luo ilmoitus"}
                </Button>
              </div>
            </Box>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default CreatePostPage;
