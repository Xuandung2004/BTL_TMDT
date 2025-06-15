import React from 'react';
import Header from '@/components/layout/Header';
import HeroBanner from '@/components/home/HeroBanner';
import Services from '@/components/home/Services';
import PromoBanners from '@/components/home/PromoBanners';
import PopularCategories from '@/components/home/PopularCategories';
import TrendingCollection from '@/components/home/TrendingCollection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import WeeklyBestSell from '@/components/home/WeeklyBestSell';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroBanner />
      <Services />
      <PromoBanners />
      <PopularCategories />
      <TrendingCollection />
      <FeaturedProducts />
      <WeeklyBestSell />
      <Footer />
    </main>
  );
}
