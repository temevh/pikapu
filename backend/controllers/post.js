import prisma from "../services/prismaClient.js";

export const createPost = async (req, res) => {
  const { title, content, subject, date, hash } = req.body;

  console.log("Received post data:", { title, content, subject, date, hash });

  if (!title || !subject || !date || !hash) {
    console.log("Missing required fields:", { title, subject, date, hash });
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // For now, we'll use a default teacher ID (1) since we don't have authentication yet
    const teacherId = 1;

    // Ensure the date is properly formatted
    const postDate = new Date(date);
    if (isNaN(postDate.getTime())) {
      console.log("Invalid date format:", date);
      return res.status(400).json({ message: "Invalid date format" });
    }

    console.log("Creating post with data:", {
      title,
      content,
      date: postDate,
      hash,
      teacherId,
    });

    const post = await prisma.post.create({
      data: {
        title,
        content,
        date: postDate,
        hash,
        teacherId,
      },
    });

    console.log("Post created successfully:", post);

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ message: "Post with this hash already exists" });
    }
    res.status(500).json({
      message: "Error creating post",
      error: error.message,
    });
  }
};

export const getPostByHash = async (req, res) => {
  const { hash } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { hash },
      include: {
        teacher: true,
        Substitute: true,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Error fetching post" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        teacher: true,
        Substitute: true,
      },
      orderBy: {
        date: "desc",
      },
    });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};
