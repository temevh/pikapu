import express from "express";
import { getsubs } from "../controllers/substitutes.js";

const router = express.Router();

router.post("/getsubs", getsubs);

export default router;
