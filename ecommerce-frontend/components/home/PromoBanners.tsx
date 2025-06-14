'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Banner } from '@/types';

const PromoBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('/api/banners');
        const result = await response.json();
        
        if (result.success) {
          setBanners(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to fetch banners');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  if (banners.length === 0) {
    return <div className="container mx-auto px-4 py-8">No banners available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Large Banner */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden">
          <Link href={banners[0].link}>
            <div className="aspect-[4/5] relative">
              <img
                src={banners[0].image}
                alt={banners[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6 z-10">
                <p className="text-sm uppercase tracking-wider mb-2">{banners[0].subtitle}</p>
                <h2 className="text-2xl font-bold mb-4 max-w-[200px]">{banners[0].title}</h2>
                <button className="flex items-center text-sm font-medium">
                  {banners[0].buttonText}
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </Link>
        </div>

        {/* Right Column with Two Small Banners */}
        <div className="flex flex-col gap-4">
          {banners.slice(1).map((banner) => (
            <div key={banner.id} className="relative bg-gray-100 rounded-lg overflow-hidden">
              <Link href={banner.link}>
                <div className="aspect-[16/9] relative">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6 z-10">
                    <p className="text-sm uppercase tracking-wider mb-2">{banner.subtitle}</p>
                    <h2 className="text-2xl font-bold mb-4">{banner.title}</h2>
                    <button className="flex items-center text-sm font-medium">
                      {banner.buttonText}
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoBanners; 