import Link from "next/link";

export const metadata = {
  title: "Oasis Files",
  description: "Articles of Oasis",
  icons: "/favicon.png",
};

export default async function Home() {
  return (
    <div className="container flex flex-col mx-auto p-6">
      {/* Hero Section */}
      <div className="text-center py-10 bg-blue-600 text-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold">Welcome to Oasis Files</h1>
        <p className="mt-2 text-lg">Explore the Ex Files</p>
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        <Link href="/blogs">Click for the List of Blogs</Link>
      </button>

      {/* Blogs Section */}
    </div>
  );
}
