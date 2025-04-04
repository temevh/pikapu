"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Sijaisilmoitukset
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Aine</TableCell>
              <TableCell>Opettaja</TableCell>
              <TableCell>Päivämäärä</TableCell>
              <TableCell>Tila</TableCell>
              <TableCell>Toiminnot</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.subject.name}</TableCell>
                <TableCell>
                  {post.teacher.User[0]?.firstName}{" "}
                  {post.teacher.User[0]?.lastName}
                </TableCell>
                <TableCell>{formatDate(post.date)}</TableCell>
                <TableCell>
                  <Chip
                    icon={
                      post.filled ? (
                        <CheckCircleIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )
                    }
                    label={post.filled ? "Täytetty" : "Avoin"}
                    color={post.filled ? "success" : "warning"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => router.push(`/post/${post.id}/view`)}
                  >
                    Tarkista
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PostsList;
