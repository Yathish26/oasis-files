import Link from "next/link";

// Function to fetch post data
async function fetchPost(id) {
    const res = await fetch(`https://api.hirearrive.in/api/blogs/${id}`, {
        headers: {
            "x-code": "RedNote",
        },
        cache: 'no-store', // Ensures fresh data on every request
    });
    return res.json();
}

// Generate metadata dynamically for SEO
export async function generateMetadata({ params }) {
    const { id } = params;
    const post = await fetchPost(id);
    const imageUrl = post.coverImage || `https://picsum.photos/800/400?random=${id}`;

    return {
        title: post.title,
        description: post.description.slice(0, 100) + "...",
        openGraph: {
            title: post.title,
            description: post.description.slice(0, 100) + "...",
            type: "article",
            url: `https://oasisfiles.com/${id}`,
            images: [
                {
                    url: imageUrl,
                    width: 800,
                    height: 400,
                    alt: "Blog preview image",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            site: "@OasisFiles",
            title: post.title,
            description: post.description.slice(0, 100) + "...",
            images: [imageUrl],
        },
    };
}

export default async function BlogPost({ params }) {
    const { id } = params;
    const post = await fetchPost(id);

    if (!post) {
        return <div className="text-center mt-10">Post not found.</div>;
    }

    const imageUrl = post.coverImage || `https://picsum.photos/800/400?random=${id}`;
    const profileImage = post.userId?.profileImage || "/default-profile.png";
    const authorName = post.userId?.name || "Unknown Author";

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
                <img src={imageUrl} alt={post.title} className="w-full rounded-lg mb-4" />
                <h1 className="text-3xl font-bold text-blue-600 mb-4">{post.title}</h1>
                <div className="flex items-center mb-4">
                    <img src={profileImage} alt={authorName} className="w-10 h-10 rounded-full mr-2" />
                    <span className="text-gray-700">{authorName}</span>
                </div>
                <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: post.description || "" }} />
                <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
                    ← Back to Blogs
                </Link>
            </div>
        </div>
    );
}