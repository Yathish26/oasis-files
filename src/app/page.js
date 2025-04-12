import Link from "next/link";

export const metadata = {
  title: "Popular Articles",
  description: "Stories Near You and more",
  icons: "/hirearrive.svg",
};

export default async function Blogs() {
  const res = await fetch('https://api.hirearrive.in/api/blogs/popular?count=20', { cache: 'no-store' });
  const posts = await res.json();

  if (!posts || posts.length === 0) {
    return <div className="p-6 text-center text-gray-500">No articles found.</div>;
  }

  const [topArticle, ...otherArticles] = posts;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">Top Articles</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Left - Featured Article */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={topArticle.coverImage}
            alt={topArticle.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">
              <Link href={`/${topArticle._id}`} className="hover:underline">
                {topArticle.title}
              </Link>
            </h2>
            <p className="text-gray-700 text-sm mb-4">
              {topArticle.description.replace(/<[^>]+>/g, '').slice(0, 150)}...
            </p>
            <div className="flex items-center mt-4">
              <img src={topArticle.profileImage} alt={topArticle.name} className="w-8 h-8 rounded-full mr-2" />
              <span className="text-sm text-gray-600">By {topArticle.name}</span>
            </div>
          </div>
        </div>

        {/* Right - Other Articles List */}
        <div className="bg-white rounded-xl shadow-lg p-4 space-y-4">
          <h3 className="text-xl font-semibold text-blue-700 border-b pb-2">More Articles</h3>
          {otherArticles.slice(0, 5).map((post) => (
            <div key={post._id} className="flex items-start space-x-3">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <Link href={`/${post._id}`} className="font-semibold text-gray-800 hover:text-blue-600 text-sm line-clamp-2">
                  {post.title}
                </Link>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {post.description.replace(/<[^>]+>/g, '').slice(0, 60)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full List Below */}
      <div className="mt-12 max-w-6xl w-full">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">All Articles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {otherArticles.map((post) => (
            <div key={post._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              {post.coverImage && (
                <img src={post.coverImage} alt={post.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-600">
                  <Link href={`/${post._id}`} className="hover:underline">{post.title}</Link>
                </h3>
                <p className="text-gray-700 text-sm mt-1">
                  {post.description.replace(/<[^>]+>/g, '').slice(0, 100)}...
                </p>
                <div className="flex items-center mt-3">
                  <img src={post.profileImage} alt={post.name} className="w-6 h-6 rounded-full mr-2" />
                  <span className="text-xs text-gray-600">By {post.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
