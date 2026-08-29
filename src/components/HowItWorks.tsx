import React from 'react';
import { HOW_IMAGE, HOW_IT_WORKS } from '../data/iptvData';
import { Check, GlassButton, SectionHeading } from './ui';
import { useLinkProps } from '../router';
import { PACKS_PATH } from '../routes';

export const HowItWorks: React.FC = () => {
  const packsLink = useLinkProps(PACKS_PATH);
  const faqLink = useLinkProps('/faq');

  return (
  <section id="how" className="band-teal grain relative overflow-hidden py-12 sm:py-20">
    {/* Photo, blended low so it reads as texture behind the colour field rather
        than a dark photographic backdrop. */}
    <div
      className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
      style={{ backgroundImage: `url('${HOW_IMAGE}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      aria-hidden="true"
    />
    <div className="blob -right-16 top-10 h-72 w-72 bg-sky/25" aria-hidden="true" />
    <div className="blob -left-20 bottom-0 h-80 w-80 bg-white/15" aria-hidden="true" />

    <div className="relative mx-auto max-w-[1180px] px-5">
      <SectionHeading
        light
        sub={
          <>
            Met <strong className="font-bold text-white">IPTV Abonnement</strong>, geniet van de{' '}
            <strong className="font-bold text-white">beste IPTV in Nederland</strong>: snelle
            installatie, HD/4K kwaliteit, onbeperkte VOD en 24/7 support.
          </>
        }
      >
        Hoe werkt IPTV Abonnement — eenvoudig, snel en onbeperkt
      </SectionHeading>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {HOW_IT_WORKS.map((step) => (
          <article
            key={step.id}
            className="glass-panel card-lift rounded-[24px] px-6 py-7"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-lg font-extrabold text-white">
              {step.number}
            </span>
            <h3 className="mt-5 text-lg font-extrabold text-white">{step.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-white/80">{step.body}</p>
            <ul className="mt-4 space-y-2">
              {step.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5 text-[13.5px] text-white/85">
                  <Check className="text-white" />
                  {bullet}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
        <GlassButton variant="invert" size="lg" {...packsLink}>
          <span aria-hidden="true">⚡</span> Bekijk prijzen
        </GlassButton>
        <GlassButton variant="ghost-light" size="lg" {...faqLink}>
          <span aria-hidden="true">❓</span> FAQ
        </GlassButton>
      </div>
    </div>
  </section>
  );
};
