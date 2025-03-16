import Link from "next/link";

export async function generateMetadata({ params }) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`, { cache: 'no-store' });
    const post = await res.json();

    return {
        title: post.title,
        description: post.body.slice(0, 100) + "...",
    };
}

export default async function BlogPost({ params }) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`, { cache: 'no-store' });
    const post = await res.json();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">{post.title}</h1>
                <p className="text-gray-700 mt-2">{post.body}</p>
                <Link href="/blogs" className="text-blue-600 hover:underline mt-4 inline-block">← Back to Blogs</Link>
            </div>
        </div>
    );
}
