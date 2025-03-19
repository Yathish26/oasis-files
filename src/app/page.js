import Link from "next/link";

export const metadata = {
  title: "Oasis Files",
  description: "Articles of Oasis",
  icons: "/favicon.png",
};

export default async function Blogs() {
  const res = await fetch('https://api.hirearrive.in/api/blogs/popular?count=20', { cache: 'no-store' });
  const posts = await res.json();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Latest Blogs</h1>
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        {posts.map((post) => (
          <div key={post._id} className="border-b pb-4 mb-4 last:border-none">
            <h2 className="text-xl font-semibold text-blue-600">
              <Link className="hover:underline" href={`/${post._id}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-700 mt-1">{post.description.replace(/<[^>]+>/g, '').slice(0, 100)}...</p>
            {post.coverImage && (
              <img src={post.coverImage} alt={post.title} className="mt-2 w-full h-48 object-cover rounded" />
            )}
            <div className="flex items-center mt-3">
              <img src={post.profileImage} alt={post.name} className="w-8 h-8 rounded-full mr-2" />
              <span className="text-sm text-gray-600">By {post.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}