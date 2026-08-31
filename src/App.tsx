import React, { useState } from 'react';
import { Intro } from './components/Intro';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryChips } from './components/CategoryChips';
import { IntroSeo } from './components/IntroSeo';
import { Channels } from './components/Channels';
import { FilmsSeries } from './components/FilmsSeries';
import { Pricing } from './components/Pricing';
import { AppCompat } from './components/AppCompat';
import { Benefits } from './components/Benefits';
import { BuySteps } from './components/BuySteps';
import { HowItWorks } from './components/HowItWorks';
import { Comparison } from './components/Comparison';
import { Football } from './components/Football';
import { Reviews } from './components/Reviews';
import { FAQ } from './components/FAQ';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('plan-12m');

  const handleOpenOrderModal = (planId?: string) => {
    if (planId) setSelectedPlanId(planId);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen font-sans">
      <Intro />
      <Navbar onOpenOrderModal={handleOpenOrderModal} />

      <main className="pb-24 xl:pb-0">
        <Hero onOpenOrderModal={handleOpenOrderModal} />
        <CategoryChips />
        <IntroSeo />
        <Channels />
        <FilmsSeries />
        <Pricing onOpenOrderModal={handleOpenOrderModal} />
        <AppCompat />
        <Benefits />
        <BuySteps />
        <HowItWorks />
        <Comparison />
        <Football />
        <Reviews />
        <FAQ />
        <FinalCta />
      </main>

      <Footer />
      <FloatingWhatsApp />

      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPlanId={selectedPlanId}
      />
    </div>
  );
}
