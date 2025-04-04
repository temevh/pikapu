import ViewPostPage from "./page";

export default function PostViewLayout({ params }) {
  return <ViewPostPage id={params.id} />;
}
