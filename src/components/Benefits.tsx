import React, { useRef } from 'react';
import { ArrowRight, Flag, Lock, Star, Zap } from 'lucide-react';
import { BENEFITS } from '../data/iptvData';
import { GlassButton, RailHeader, TealPill, WhatsAppGlyph } from './ui';

const PILLS = [
  { label: 'Veilige betaling', icon: <Lock className="h-3.5 w-3.5" /> },
  { label: 'Activering 5–15 min', icon: <Zap className="h-3.5 w-3.5" /> },
  { label: 'HD/4K Kwaliteit', icon: <Star className="h-3.5 w-3.5" /> },
  { label: 'WhatsApp 24/7', icon: <WhatsAppGlyph className="h-3.5 w-3.5" /> },
  { label: 'Focus op Nederland', icon: <Flag className="h-3.5 w-3.5" /> },
];

export const Benefits: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);

  return (
    <section id="voordelen" className="bg-mist py-12 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-5">
        <div className="flex flex-wrap justify-center gap-3">
          {PILLS.map((pill) => (
            <TealPill key={pill.label} icon={pill.icon}>
              {pill.label}
            </TealPill>
          ))}
        </div>
      </div>

      {/* Rail — same shelf pattern as Channels/Films: heading + see-all on the
          right, cards that scroll rather than stack in a grid. */}
      <div className="mt-10">
        <RailHeader
          asPageHeading
          kicker="IPTV Nederland"
          title="Voordelen van de beste IPTV in Nederland"
          onSeeAll={() =>
            railRef.current?.scrollTo({ left: railRef.current.scrollWidth, behavior: 'smooth' })
          }
        />
        <div ref={railRef} className="rail gap-4 px-5">
          {BENEFITS.map((card, i) => (
            <article
              key={card.id}
              className={`card-lift relative w-[250px] shrink-0 snap-start overflow-hidden rounded-[24px] px-6 py-6 text-white shadow-card sm:w-[270px] ${
                i % 3 === 0 ? 'band-teal' : i % 3 === 1 ? 'bg-ink' : 'band-coral'
              }`}
            >
              <h3 className="flex items-start gap-2.5 text-[16px] font-extrabold leading-snug">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-[13px]"
                >
                  <Star className="h-3.5 w-3.5" fill="currentColor" />
                </span>
                {card.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/85">{card.body}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-3xl px-5 text-center">
        <p className="text-[14px] leading-relaxed text-muted">
          Met ons{' '}
          <a href="#pricing" className="font-bold text-teal-deep underline">
            IPTV Abonnement
          </a>{' '}
          speciaal voor <strong className="font-bold text-ink">IPTV Nederland</strong>, geniet je
          van <strong className="font-bold text-ink">premium IPTV</strong> dat{' '}
          <strong className="font-bold text-ink">stabiel en onbeperkt</strong> is: kwaliteit in{' '}
          <strong className="font-bold text-ink">HD/4K</strong>, enorme VOD-collectie, live sport en{' '}
          <strong className="font-bold text-ink">24/7</strong> ondersteuning. Compatibel met Smart
          TV, Android, iOS, Box &amp; PC — zonder verplichtingen.
        </p>
      </div>

      <div className="mt-8 text-center">
        <GlassButton variant="primary" size="lg" href="#pricing" fullWidthOnMobile={false}>
          <ArrowRight className="h-4 w-4" />
          Vandaag beginnen — bekijk tarieven
        </GlassButton>
      </div>
    </section>
  );
};
