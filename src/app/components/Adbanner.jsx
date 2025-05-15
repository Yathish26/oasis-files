// app/components/AdBanner.js
'use client' // Important for any client-side code
import { useEffect } from 'react';

export default function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-3430954316376664"  // Your AdSense publisher ID
      data-ad-slot="1526919875"            // Replace with your actual ad slot ID
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
