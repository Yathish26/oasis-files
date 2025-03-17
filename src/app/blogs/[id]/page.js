import Link from "next/link";

// Function to fetch post data
async function fetchPost(id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { cache: 'no-store' });
    return res.json();
}

// ✅ Destructure params properly in function arguments
export async function generateMetadata({ params }) {
    const { id } = await params; // ✅ Await params before using

    const post = await fetchPost(id);
    const imageUrl = `https://picsum.photos/800/400?random=${id}`;

    return {
        title: post.title,
        description: post.body.slice(0, 100) + "...",
        openGraph: {
            title: post.title,
            description: post.body.slice(0, 100) + "...",
            type: "article",
            url: `https://oasisfiles.com/blogs/${id}`, // Change to your actual domain
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
            site: "@OasisFiles", // Change to your actual Twitter handle
            title: post.title,
            description: post.body.slice(0, 100) + "...",
            images: [imageUrl],
        },
    };
}


// ✅ Destructure params properly in function arguments
export default async function BlogPost({ params }) {
    const { id } = params; // ✅ Extract id properly

    const post = await fetchPost(id);
    const imageUrl = `https://picsum.photos/800/400?random=${id}`;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl">
                <img src={imageUrl} alt="Blog preview" className="w-full rounded-lg mb-4" />
                <h1 className="text-3xl font-bold text-blue-600 mb-4">{post.title}</h1>
                <p className="text-gray-700 mt-2">{post.body}</p>
                <Link href="/blogs" className="text-blue-600 hover:underline mt-4 inline-block">
                    ← Back to Blogs
                </Link>
            </div>
        </div>
    );
}
