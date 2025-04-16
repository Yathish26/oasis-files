import { formatDistanceToNow } from 'date-fns';

export default function BlogContent({ post }) {
    const imageUrl = post.coverImage;
    const profileImage = post.userId?.profileImage || "/default-profile.png";
    const authorName = post.userId?.name || "Unknown Author";
    const createdAt = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
                <h1 className="text-4xl font-bold text-black mb-4">{post.title}</h1>
                <div className="flex items-center mb-4">
                    <img src={profileImage} alt={authorName} className="w-10 h-10 rounded-full mr-2" />
                    <div>
                        <p className="text-gray-700 font-semibold">{authorName}</p>
                        <div className="flex items-center">
                            <p className="text-purple-600 font-semibold text-sm mr-2">{post.category}</p>
                            <p className="text-gray-500 text-sm">{createdAt}</p>
                        </div>
                    </div>
                </div>
                {post.coverImage && <img src={imageUrl} alt={post.title} className="w-full rounded-lg mb-4" />}

                <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: post.description || "" }} />
            </div>
        </div>
    );
}

