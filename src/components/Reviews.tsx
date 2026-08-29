import React, { useRef } from 'react';
import { REVIEWS } from '../data/iptvData';
import { GlassButton, RailHeader, SectionHeading } from './ui';
import { useLinkProps } from '../router';
import { PACKS_PATH } from '../routes';

const Stars: React.FC = () => (
  <span className="text-[15px] tracking-tight text-coral" aria-label="5 uit 5 sterren">
    ★★★★★
  </span>
);

const RING_VARIANTS = [
  'from-teal to-teal-deep',
  'from-sky to-sky-deep',
  'from-teal-deep to-sky-deep',
  'from-sky to-teal',
];

export const Reviews: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);
  const packsLink = useLinkProps(PACKS_PATH);

  return (
    <section id="reviews" className="band-teal grain relative overflow-hidden py-12 sm:py-20">
      <div className="blob -right-24 -top-10 h-80 w-80 bg-sky/25" aria-hidden="true" />
      <div className="blob -left-16 bottom-0 h-64 w-64 bg-white/20" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1320px] px-5 text-center">
        <SectionHeading
          light
          sub={
            <>
              Kwaliteit <strong className="font-bold text-white">HD/4K</strong>, directe activering
              en support <strong className="font-bold text-white">24/7</strong> — de{' '}
              <strong className="font-bold text-white">beste IPTV Nederland</strong> en{' '}
              <a {...packsLink} className="font-bold text-white underline">
                IPTV België
              </a>{' '}
              volgens onze klanten.
            </>
          }
        >
          Zij vertrouwen ons — <span className="text-white">KijkIPTV</span>
        </SectionHeading>

        <div className="mt-8">
          <GlassButton variant="invert" size="lg" {...packsLink} fullWidthOnMobile={false}>
            Bekijk onze aanbiedingen en prijzen
          </GlassButton>
        </div>
      </div>

      <div className="relative mt-10">
        <RailHeader
          light
          kicker="Geverifieerd"
          title="Wat klanten zeggen"
          onSeeAll={() =>
            railRef.current?.scrollTo({ left: railRef.current.scrollWidth, behavior: 'smooth' })
          }
          className="mx-auto max-w-[1320px]"
        />
        <div ref={railRef} className="rail gap-4 px-5">
          {REVIEWS.map((review, i) => (
            <figure
              key={review.id}
              className="glass-panel card-lift flex w-[260px] shrink-0 snap-start flex-col rounded-[22px] px-5 py-5 sm:w-[280px]"
            >
              <div className="flex items-center justify-between gap-2">
                <Stars />
                <span className="rounded-md bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white/85">
                  Geverifieerd
                </span>
              </div>
              <blockquote className="mt-3 flex-1 text-[14px] leading-relaxed text-white/90">
                &ldquo;{review.comment}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-2.5 text-[13px]">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[12px] font-extrabold text-white ${RING_VARIANTS[i % RING_VARIANTS.length]}`}
                  aria-hidden="true"
                >
                  {review.author.charAt(0)}
                </span>
                <span className="font-bold text-white">{review.author}</span>
                <span className="text-white/60">{review.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
