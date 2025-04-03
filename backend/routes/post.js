import express from "express";
import { createPost, getPostByHash, getAllPosts } from "../controllers/post.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/create", createPost);
router.get("/:hash", getPostByHash);

export default router;
