'use client';

import React, { useState, useEffect } from 'react';
import SafetyBanner from '@/components/SafetyBanner';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FlashSaleSection from '@/components/FlashSaleSection';
import DeliveredGallery from '@/components/DeliveredGallery';
import TestimonialsSection, { testimonials } from '@/components/TestimonialsSection';
import MagazineSection from '@/components/MagazineSection';
import ShipmentTimeline from '@/components/ShipmentTimeline';
import OpenChatBanner from '@/components/OpenChatBanner';
import InquiryForm from '@/components/InquiryForm';
import StickyMobileBottomBar from '@/components/StickyMobileBottomBar';
import Footer from '@/components/Footer';

export default function Home() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null);
  const [remainingTestimonials, setRemainingTestimonials] = useState<any[]>(testimonials);

  useEffect(() => {
    // Pick 1 random testimonial
    const randomIdx = Math.floor(Math.random() * testimonials.length);
    const chosen = testimonials[randomIdx];
    setSelectedTestimonial(chosen);

    // Filter out the selected testimonial to prevent repeat display at the bottom
    const remaining = testimonials.filter(t => t.id !== chosen.id);
    setRemainingTestimonials(remaining);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#090A0C] text-[#F4F4F2] font-sans selection:bg-[#10B981] selection:text-black antialiased">
      {/* Scam alert warning banner at the top */}
      <SafetyBanner />

      {/* Main sticky navigation header */}
      <Header />

      {/* Main page content sections */}
      <main className="flex-grow">
        <HeroSection selectedTestimonial={selectedTestimonial} />
        <FlashSaleSection />
        <ShipmentTimeline />
        <MagazineSection />
        <InquiryForm />
        <DeliveredGallery />
        <TestimonialsSection testimonialsData={remainingTestimonials} />
        <OpenChatBanner />
      </main>

      {/* Bottom operational details & footer */}
      <Footer />

      {/* Sticky Bottom Bar for mobile devices */}
      <StickyMobileBottomBar />
    </div>
  );
}
