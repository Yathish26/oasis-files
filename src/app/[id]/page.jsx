import BlogContent from "./BlogContent";

function extractId(slug) {
  const parts = slug.split("-");
  return parts.length ? parts[parts.length - 1] : slug;
}


async function fetchPost(id) {
  const res = await fetch(`https://api.hirearrive.in/api/blogs/${id}`, {
    headers: { "x-code": "RedNote" },
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const id = extractId(awaitedParams.id);
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
      url: `https://articles.hirearrive.in/${awaitedParams.id}`,
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

export default async function BlogPost({ params }) {
  const awaitedParams = await params;
  const id = extractId(awaitedParams.id);
  const post = await fetchPost(id);

  if (!post) {
    return <div className="text-center mt-10 text-xl">Post not found.</div>;
  }

  return <BlogContent post={post} />;
}
