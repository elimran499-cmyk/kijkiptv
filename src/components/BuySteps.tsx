import React from 'react';
import { BUY_STEPS } from '../data/iptvData';
import { SectionHeading } from './ui';

export const BuySteps: React.FC = () => (
  <section id="stappen" className="bg-mist py-12 sm:py-20">
    <div className="mx-auto max-w-[1180px] px-5">
      <SectionHeading
        sub={
          <>
            Kies je <strong className="font-bold text-ink">IPTV Abonnement</strong> voor{' '}
            <strong className="font-bold text-ink">IPTV Nederland</strong>, betaal veilig en begin
            direct met kijken.
          </>
        }
      >
        IPTV Abonnement — kopen, activeren en kijken in 3 stappen
      </SectionHeading>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {BUY_STEPS.map((step) => (
          <article
            key={step.id}
            className="card-lift rounded-[24px] bg-white px-6 py-8 text-center shadow-soft"
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal to-teal-deep text-lg font-extrabold text-white shadow-soft">
              {step.number}
            </span>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              <strong className="font-bold text-ink">{step.title}</strong>
              <br />
              {step.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
