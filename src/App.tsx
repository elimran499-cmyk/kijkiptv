import React, { useState } from 'react';
import { Intro } from './components/Intro';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryChips } from './components/CategoryChips';
import { IntroSeo } from './components/IntroSeo';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PageHeadingProvider, RouterProvider, useDocumentMeta, useRouter } from './router';
import { findRoute, PACKS_PATH, HomeIndex } from './routes';

const Page: React.FC = () => {
  const { path, navigate } = useRouter();
  const route = findRoute(path);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('plan-12m');

  useDocumentMeta({ title: route.title, description: route.description, path: route.path });

  /* "Kies pakket" from anywhere but the packs page should take you to the
     packs page to choose first — the user asked for exactly that. Once you're
     already on /pakketten the same handler opens the order modal. */
  const handleOpenOrderModal = (planId?: string) => {
    if (planId) setSelectedPlanId(planId);
    if (route.path !== PACKS_PATH) {
      navigate(PACKS_PATH);
      return;
    }
    setModalOpen(true);
  };

  const isHome = route.path === '/';

  return (
    <div className="min-h-screen font-sans">
      {/* Plays on a real page load, not on client-side route changes — the
          router never remounts this. */}
      <Intro />
      <Navbar onOpenOrderModal={handleOpenOrderModal} />

      <main className="pb-24 xl:pb-0">
        {isHome ? (
          <>
            <Hero onOpenOrderModal={handleOpenOrderModal} />
            <CategoryChips />
            <IntroSeo />
            <HomeIndex />
          </>
        ) : (
          /* On a section page that section's heading becomes the page's h1;
             on home the hero already owns it. */
          <PageHeadingProvider value>{route.render?.()}</PageHeadingProvider>
        )}
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
};

export default function App() {
  return (
    <RouterProvider>
      <Page />
    </RouterProvider>
  );
}
