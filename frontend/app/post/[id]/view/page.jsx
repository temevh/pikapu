"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Divider,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const ViewPostPage = ({ id }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fi-FI", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!post) {
    return (
      <Box p={3}>
        <Typography>Post not found</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/")}
        sx={{ mb: 2 }}
      >
        Takaisin
      </Button>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4">{post.title}</Typography>
          <Chip
            icon={
              post.filled ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />
            }
            label={post.filled ? "Täytetty" : "Avoin"}
            color={post.filled ? "success" : "warning"}
          />
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle1" color="text.secondary">
            Aine: {post.subject.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Päivämäärä: {formatDate(post.date)}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Opettaja: {post.teacher.User.name}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {post.content && (
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Lisätiedot
            </Typography>
            <Typography>{post.content}</Typography>
          </Box>
        )}

        {post.primarySubstitute && (
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Pääsijainen
            </Typography>
            <Typography>{post.primarySubstitute.User.name}</Typography>
          </Box>
        )}

        {post.secondarySubstitutes && post.secondarySubstitutes.length > 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Varasijaiset
            </Typography>
            {post.secondarySubstitutes.map((sub) => (
              <Typography key={sub.id}>{sub.User.name}</Typography>
            ))}
          </Box>
        )}

        {!post.filled && (
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push(`/post/${post.id}/signup`)}
            >
              Ilmoittaudu sijaisena
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ViewPostPage;
