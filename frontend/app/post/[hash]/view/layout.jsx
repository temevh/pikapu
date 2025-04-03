import ViewPostPage from "./page";

export default function PostViewLayout({ params }) {
  return <ViewPostPage hash={params.hash} />;
}
