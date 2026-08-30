import React from 'react';
import SafetyBanner from '@/components/SafetyBanner';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FlashSaleSection from '@/components/FlashSaleSection';
import DeliveredGallery from '@/components/DeliveredGallery';
import MagazineSection from '@/components/MagazineSection';
import OpenChatBanner from '@/components/OpenChatBanner';
import InquiryForm from '@/components/InquiryForm';
import StickyMobileBottomBar from '@/components/StickyMobileBottomBar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-dark-bg font-sans selection:bg-brand-emerald selection:text-white antialiased">
      {/* Scam alert warning banner at the top */}
      <SafetyBanner />

      {/* Main sticky navigation header */}
      <Header />

      {/* Main page content sections */}
      <main className="flex-grow">
        <HeroSection />
        <FlashSaleSection />
        <DeliveredGallery />
        <MagazineSection />
        <OpenChatBanner />
        <InquiryForm />
      </main>

      {/* Bottom operational details & footer */}
      <Footer />

      {/* Sticky Bottom Bar for mobile devices */}
      <StickyMobileBottomBar />
    </div>
  );
}
