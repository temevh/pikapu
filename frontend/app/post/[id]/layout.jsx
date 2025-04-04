import CreatePostPage from "./page";
import ViewPostPage from "./view/page";

export default function PostLayout({ params, children }) {
  // If we're in the view subdirectory, render the view page
  if (params.id === "view") {
    return <ViewPostPage id={params.id} />;
  }
  // Otherwise render the create post page
  return <CreatePostPage id={params.id} />;
}
