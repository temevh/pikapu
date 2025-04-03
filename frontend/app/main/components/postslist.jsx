"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts");
      setPosts(response.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Sijaisilmoitusten haku epäonnistui");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fi-FI", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" className="text-center py-4">
        {error}
      </Typography>
    );
  }

  return (
    <div className="mt-8">
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        className="text-gray-900"
      >
        Sijaisilmoitukset
      </Typography>
      <TableContainer
        component={Paper}
        elevation={0}
        className="border border-gray-200"
      >
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell className="font-semibold">Otsikko</TableCell>
              <TableCell className="font-semibold">Aine</TableCell>
              <TableCell className="font-semibold">Päivämäärä</TableCell>
              <TableCell className="font-semibold">Tila</TableCell>
              <TableCell className="font-semibold">Toiminnot</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id} className="hover:bg-gray-50">
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.subject}</TableCell>
                <TableCell>{formatDate(post.date)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      post.filled
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {post.filled ? "Täytetty" : "Avoin"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => router.push(`/post/${post.hash}/view`)}
                  >
                    Tarkista
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {posts.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-4 text-gray-500"
                >
                  Ei sijaisilmoituksia
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PostsList;
