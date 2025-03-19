import Link from "next/link";
import Image from "next/image";
import BlogContent from "./BlogContent";

// Function to fetch post data (Runs on Server)
async function fetchPost(id) {
    const res = await fetch(`https://api.hirearrive.in/api/blogs/${id}`, {
        headers: { "x-code": "RedNote" },
        next: { revalidate: 60 }, // Cache for 60 sec, improves speed
    });

    if (!res.ok) {
        return null; // Handle invalid posts
    }

    return res.json();
}

// Generate metadata dynamically for SEO
export async function generateMetadata({ params }) {
    const post = await fetchPost(params.id);
    if (!post) return { title: "Post Not Found", description: "This blog post does not exist." };

    const imageUrl = post.coverImage || `https://picsum.photos/800/400?random=${params.id}`;
    const cleanDescription = post.description.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 150) + "...";


    return {
        title: post.title,
        description: cleanDescription,
        openGraph: {
            title: post.title,
            description: cleanDescription,
            type: "article",
            url: `https://oasisfiles.com/${params.id}`,
            images: [{ url: imageUrl, width: 800, height: 400, alt: post.title }],
            updated_time: new Date().toISOString(),
        },
        twitter: {
            card: "summary_large_image",
            site: "@OasisFiles",
            title: post.title,
            description: cleanDescription,
            images: [imageUrl],
        },
    };
}

export default async function BlogPost({ params }) {
    const post = await fetchPost(params.id); 

    if (!post) {
        return <div className="text-center mt-10">Post not found.</div>; 
    }

    return <BlogContent post={post} />; 
}

