"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { fi } from "date-fns/locale";

const CreatePostPage = ({ id }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState(null);

  const subjects = [
    { id: 1, name: "Matematiikka" },
    { id: 2, name: "Fysiikka" },
    { id: 3, name: "Biologia" },
    { id: 4, name: "Kemia" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          subjectId: parseInt(subjectId),
          content,
          date,
          teacherId: 1, // TODO: Replace with actual teacher ID from auth
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Luo sijaisilmoitus
      </Typography>

      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              label="Otsikko"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Box>

          <Box mb={3}>
            <TextField
              select
              label="Aine"
              fullWidth
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              required
            >
              {subjects.map((subject) => (
                <MenuItem key={subject.id} value={subject.id}>
                  {subject.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box mb={3}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={fi}
            >
              <DateTimePicker
                label="Päivämäärä ja aika"
                value={date}
                onChange={(newDate) => setDate(newDate)}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Box>

          <Box mb={3}>
            <TextField
              label="Lisätiedot"
              fullWidth
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Box>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={() => router.push("/")}>
              Peruuta
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Luo ilmoitus
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default CreatePostPage;
