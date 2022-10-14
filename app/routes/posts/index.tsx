import { json } from "@remix-run/node";
import { Link, useLoaderData, Outlet } from "@remix-run/react";

import { getPosts } from "~/models/post.server";


type LoaderData = {
  // this is a handy way to say: "posts is whatever type getPosts resolves to"
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  });
};

export default function Posts() {
  const { posts } = useLoaderData() as unknown as LoaderData;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="my-6 mb-2 border-b-2 text-center text-3xl">
        My Posts
      </h1>
      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-4 md:col-span-1">
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={post.slug}
                  className="text-blue-600 underline"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <main className="col-span-4 md:col-span-3">
        </main>
      </div>
    </div>
  );
}
