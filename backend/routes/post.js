import express from "express";
import { createPost, getPostByHash } from "../controllers/post.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/:hash", getPostByHash);

export default router;
