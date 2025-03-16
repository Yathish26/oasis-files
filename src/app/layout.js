import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-100 text-gray-900">
        {/* Navbar */}
        <header className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-2xl font-bold">Oasis Files Articles</h1>
        </header>

        {/* Page Content */}
        <main className="container mx-auto p-6">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center p-4 mt-6">
          © {new Date().getFullYear()} Oasis Files. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
