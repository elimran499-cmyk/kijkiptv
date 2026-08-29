import React, { useRef } from 'react';
import { APP_LOGOS } from '../data/iptvData';
import { RailHeader } from './ui';

export const AppCompat: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);

  return (
    <section id="apps" className="bg-white py-12 sm:py-20">
      <RailHeader
        asPageHeading
        kicker="Compatibiliteit"
        title="Werkt met je favoriete apps"
        count={APP_LOGOS.length}
        onSeeAll={() =>
          railRef.current?.scrollTo({ left: railRef.current.scrollWidth, behavior: 'smooth' })
        }
      />

      <div ref={railRef} className="rail gap-3 px-5">
        {APP_LOGOS.map((app) => (
          <div
            key={app.id}
            className="card-lift flex h-[84px] w-[136px] shrink-0 snap-start items-center justify-center rounded-2xl border border-teal/15 bg-white px-4 shadow-soft"
          >
            {app.logo ? (
              <img
                src={app.logo}
                alt={app.name}
                loading="lazy"
                decoding="async"
                className="max-h-[40px] w-auto max-w-full object-contain"
              />
            ) : (
              <span className="text-center text-[13px] font-extrabold" style={{ color: app.color }}>
                {app.name}
              </span>
            )}
          </div>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-3xl px-5 text-center text-[15px] leading-relaxed text-muted">
        Onze IPTV-dienst werkt op <strong className="font-bold">Smart TV&apos;s</strong> (Samsung,
        LG), <strong className="font-bold">Android TV</strong>,{' '}
        <strong className="font-bold">Fire Stick</strong>, MAG-boxen, smartphones, tablets en pc
        met VLC of <strong className="font-bold">Smarters Player</strong>.
      </p>
    </section>
  );
};
