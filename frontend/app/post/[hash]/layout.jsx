"use client";
import { use } from "react";
import CreatePostPage from "./page";

export default function PostLayout({ params }) {
  return <CreatePostPage hash={params.hash} />;
}
