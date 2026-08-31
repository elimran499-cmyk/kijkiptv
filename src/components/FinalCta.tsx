import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CONTACT } from '../data/iptvData';
import { GlassButton, WhatsAppGlyph } from './ui';

export const FinalCta: React.FC = () => {

  return (
  <section id="final-cta" className="band-teal grain relative overflow-hidden py-12 sm:py-20">
    <div className="blob -left-20 -top-20 h-80 w-80 bg-sky/25" aria-hidden="true" />
    <div className="blob -right-16 bottom-0 h-72 w-72 bg-white/20" aria-hidden="true" />

    <div className="relative mx-auto max-w-[1180px] px-5 text-center">
      <h2 className="text-[clamp(1.75rem,5vw,2.625rem)] font-extrabold leading-tight text-white">
        Krijg toegang tot <span className="text-white">KijkIPTV</span>
        <br />
        in HD / 4K kwaliteit vanaf vandaag
      </h2>

      <p className="mt-6 text-[15px] font-bold text-white/90">
        WhatsApp support &amp; directe activering:
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
        <GlassButton variant="primary" size="lg" href="#pricing">
          <span aria-hidden="true">⚡</span> Bekijk prijzen <ArrowRight className="h-4 w-4" />
        </GlassButton>
        <GlassButton
          variant="whatsapp"
          size="lg"
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppGlyph className="h-4 w-4" /> WhatsApp contact <ArrowRight className="h-4 w-4" />
        </GlassButton>
      </div>
    </div>
  </section>
  );
};
