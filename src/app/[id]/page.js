import Link from "next/link";
import Image from "next/image";
import BlogContent from "./BlogContent";

// 🔧 Extract the actual blog ID from the slug (e.g., "blog-title-123abc")
function extractId(slug) {
  return slug.split("-").pop();
}

// 🔄 Fetch blog post by ID
async function fetchPost(id) {
  const res = await fetch(`https://api.hirearrive.in/api/blogs/${id}`, {
    headers: { "x-code": "RedNote" },
    next: { revalidate: 60 }, // Optional: Revalidate every 60 seconds
  });

  if (!res.ok) return null;
  return res.json();
}

// 🧠 Dynamic SEO metadata
export async function generateMetadata(props) {
  const id = extractId(props.params.id);
  const post = await fetchPost(id);

  if (!post) {
    return {
      title: "Article Not Found",
      description: "This article does not exist.",
    };
  }

  const defaultImage = "https://articles.hirearrive.in/default-cover.jpg";
  const imageUrl = post.coverImage || defaultImage;
  const cleanDescription =
    post.description?.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 150) + "...";

  return {
    title: post.title,
    description: cleanDescription,
    openGraph: {
      title: post.title,
      description: cleanDescription,
      type: "article",
      url: `https://articles.hirearrive.in/${props.params.id}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 400,
          alt: post.title,
        },
      ],
      updated_time: new Date().toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      site: "@HireArrive",
      title: post.title,
      description: cleanDescription,
      images: [imageUrl],
    },
  };
}

// 🧾 Actual blog post page
export default async function BlogPost(props) {
  const id = extractId(props.params.id);
  const post = await fetchPost(id);

  if (!post) {
    return <div className="text-center mt-10 text-xl">Post not found.</div>;
  }

  return <BlogContent post={post} />;
}
