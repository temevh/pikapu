"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Paper, Typography, Button, Box, Divider, Chip } from "@mui/material";
import axios from "axios";

const ViewPostPage = ({ hash }) => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [hash]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/${hash}`
      );
      setPost(response.data);
    } catch (err) {
      console.error("Error fetching post:", err);
      setError("Sijaisilmoituksen haku epäonnistui");
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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Paper elevation={0} className="p-6 bg-white rounded-lg shadow-md">
            <Typography color="error" className="text-center">
              {error || "Sijaisilmoitusta ei löytynyt"}
            </Typography>
            <div className="mt-4 flex justify-center">
              <Button
                variant="contained"
                onClick={() => router.push("/main")}
                sx={{
                  backgroundColor: "#4CAF50",
                  "&:hover": {
                    backgroundColor: "#45a049",
                  },
                }}
              >
                Palaa etusivulle
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Paper elevation={0} className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-start mb-4">
            <Typography variant="h4" component="h1" className="text-gray-900">
              {post.title}
            </Typography>
            <Chip
              label={post.filled ? "Täytetty" : "Avoin"}
              color={post.filled ? "success" : "warning"}
              size="small"
            />
          </div>

          <Divider className="my-4" />

          <Box className="space-y-4">
            <div>
              <Typography variant="subtitle2" color="text.secondary">
                Aine
              </Typography>
              <Typography>{post.subject}</Typography>
            </div>

            <div>
              <Typography variant="subtitle2" color="text.secondary">
                Päivämäärä
              </Typography>
              <Typography>{formatDate(post.date)}</Typography>
            </div>

            <div>
              <Typography variant="subtitle2" color="text.secondary">
                Lisätiedot
              </Typography>
              <Typography className="whitespace-pre-wrap">
                {post.content || "Ei lisätietoja"}
              </Typography>
            </div>

            {post.Substitute && (
              <div>
                <Typography variant="subtitle2" color="text.secondary">
                  Sijainen
                </Typography>
                <Typography>
                  {post.Substitute.firstName} {post.Substitute.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.Substitute.email}
                </Typography>
              </div>
            )}
          </Box>

          <div className="mt-8 flex justify-end space-x-4">
            <Button variant="outlined" onClick={() => router.push("/main")}>
              Palaa etusivulle
            </Button>
            {!post.filled && (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4CAF50",
                  "&:hover": {
                    backgroundColor: "#45a049",
                  },
                }}
              >
                Ilmoittaudu sijaisena
              </Button>
            )}
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default ViewPostPage;
