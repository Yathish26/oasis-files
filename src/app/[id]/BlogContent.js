export default function BlogContent({ post }) {
    const imageUrl = post.coverImage || `https://picsum.photos/800/400?random=${post.id}`;
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
            </div>
        </div>
    );
}
