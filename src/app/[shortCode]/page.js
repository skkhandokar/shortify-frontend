'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'


export default function Redirect({ params }) {
  const { shortCode } = params;
  const router = useRouter()
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRedirectData = async () => {
      try {
        const res = await fetch(`https://skkhandokar22.pythonanywhere.com/api/check/${shortCode}/`);
        if (!res.ok) throw new Error('Shortcode not found');

        const data = await res.json();
        window.location.href = data.original_url;
      } catch (err) {
        setError(true);
      }
    };

    fetchRedirectData();
  }, [shortCode]);

  if (error) {
    return (
  
      router.push('/not-found')
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p>Please wait while we redirect you to the destination.</p>
      </div>
    </div>
  );
}
