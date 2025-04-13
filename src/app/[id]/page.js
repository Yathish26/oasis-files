import Link from "next/link";
import Image from "next/image";
import BlogContent from "./BlogContent";

// 🔧 Helper to extract the actual blog ID from the slug
function extractId(slug) {
  return slug.split('-').pop(); // Gets the last segment after the last "-"
}

// 🔄 Fetch blog post from API
async function fetchPost(id) {
  const res = await fetch(`https://api.hirearrive.in/api/blogs/${id}`, {
    headers: { "x-code": "RedNote" },
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
}

// 🧠 Dynamic SEO metadata
export async function generateMetadata({ params }) {
  const id = extractId(params.id); // ✅ use extracted ID here
  const post = await fetchPost(id);

  if (!post) {
    return {
      title: "Article Not Found",
      description: "This article does not exist.",
    };
  }

  const imageUrl = post.coverImage || `https://picsum.photos/800/400?random=${params.id}`;
  const cleanDescription = post.description.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 150) + "...";

  return {
    title: post.title,
    description: cleanDescription,
    openGraph: {
      title: post.title,
      description: cleanDescription,
      type: "article",
      url: `https://articles.hirearrive.in/${params.id}`,
      images: [{ url: imageUrl, width: 800, height: 400, alt: post.title }],
      updated_time: new Date().toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      site: "@Hire Arrive Articles",
      title: post.title,
      description: cleanDescription,
      images: [imageUrl],
    },
  };
}

// 🧾 Actual blog page
export default async function BlogPost({ params }) {
  const id = extractId(params.id); // ✅ use extracted ID here too
  const post = await fetchPost(id);

  if (!post) {
    return <div className="text-center mt-10">Post not found.</div>;
  }

  return <BlogContent post={post} />;
}
