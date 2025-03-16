export default async function Home() {
    // Fetch latest blogs
    const blogsRes = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", { cache: "no-store" });
    const blogs = await blogsRes.json();
  
    // Fetch latest news (For now, using same API, replace with actual news API)
    const newsRes = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5&_start=5", { cache: "no-store" });
    const news = await newsRes.json();
  
    return (
      <div className="container mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center py-10 bg-blue-600 text-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold">Welcome to Oasis Files</h1>
          <p className="mt-2 text-lg">Explore the latest Blogs & News</p>
        </div>
  
        {/* Blogs Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-blue-700">📖 Latest Blogs</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {blogs.map((blog) => (
              <li key={blog.id} className="bg-white shadow p-4 rounded-lg">
                <a href={`/blogs/${blog.id}`} className="text-lg font-semibold text-blue-500 hover:underline">
                  {blog.title}
                </a>
                <p className="text-gray-700">{blog.body.slice(0, 100)}...</p>
              </li>
            ))}
          </ul>
        </section>
  
        {/* News Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-green-700">📰 Latest News</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {news.map((article) => (
              <li key={article.id} className="bg-white shadow p-4 rounded-lg">
                <a href={`/news/${article.id}`} className="text-lg font-semibold text-green-500 hover:underline">
                  {article.title}
                </a>
                <p className="text-gray-700">{article.body.slice(0, 100)}...</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
  