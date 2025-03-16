import Link from "next/link";

export const metadata = {
  title: "Oasis Files",
  description: "Articles of Oasis",
  icons: "/favicon.ico",
};

export default async function Blogs() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=30', { cache: 'no-store' });
  const posts = await res.json();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Latest Blogs</h1>
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        {posts.map((post) => (
          <div key={post.id} className="border-b pb-4 mb-4 last:border-none">
            <h2 className="text-xl font-semibold text-blue-600">
              <Link className="hover:underline" href={`/blogs/${post.id}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-700 mt-1">{post.body.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
