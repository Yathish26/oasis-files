// src/app/sitemap.xml/route.js
export async function GET() {
    try {
      const response = await fetch('https://api.hirearrive.in/blog/sitemap.xml', {
        cache: 'no-store',
      });
  
      if (!response.ok) {
        return new Response('Failed to fetch sitemap', { status: 500 });
      }
  
      const xml = await response.text();
  
      return new Response(xml, {
        headers: {
          'Content-Type': 'application/xml',
        },
      });
    } catch (error) {
      return new Response('Error fetching sitemap', { status: 500 });
    }
  }
  