import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { BusinessHighlights } from '../components/home/BusinessHighlights';
import { SignatureServices } from '../components/home/SignatureServices';
import { FeaturedMenus } from '../components/home/FeaturedMenus';
import { RecommendedVenues } from '../components/home/RecommendedVenues';
import { ChefSection } from '../components/home/ChefSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { ServiceAreasSection } from '../components/home/ServiceAreasSection';
import { QuoteCtaSection } from '../components/home/QuoteCtaSection';

export const Home = () => {
  return (
    <div className="flex flex-col pb-6">
      <HeroSection />
      <BusinessHighlights />
      <SignatureServices />
      <FeaturedMenus />
      <RecommendedVenues />
      <ChefSection />
      <TestimonialsSection />
      <ServiceAreasSection />
      <QuoteCtaSection />
    </div>
  );
};

