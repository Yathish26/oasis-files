// app/layout.js or app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "HireArrive Articles",
  description: "Explore news, blogs, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3430954316376664"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="antialiased bg-gray-100 text-gray-900">
        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
