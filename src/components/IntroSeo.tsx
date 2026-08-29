import React, { useState } from 'react';

/**
 * The long-form SEO paragraph that used to sit inside the hero. Moved here so
 * the phone fold stays to a headline, one line and two buttons — this is
 * where it gets a readable treatment instead of fighting white-on-photo
 * contrast. Copy is unchanged, word for word.
 *
 * On phone this ~70-word paragraph still ran to 8–10 short centred lines
 * directly under the hero — a wall of text as the third thing a visitor
 * scrolls to. Left-aligned at a comfortable measure and clamped to three
 * lines behind a "Lees meer" disclosure, it reads as a lead-in instead;
 * from `sm` up there is room to show it in full, centred, as before.
 */
export const IntroSeo: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-mist pb-14 pt-2 sm:pb-16">
      <div className="mx-auto max-w-[760px] px-5 text-left sm:text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-deep">
          IPTV Nederland
        </p>
        <div className="relative mt-3">
          <p
            className={`text-[14.5px] leading-7 text-muted sm:text-[15px] sm:leading-8 sm:line-clamp-none ${
              expanded ? '' : 'line-clamp-3'
            }`}
          >
            Ontdek het ultieme <strong className="font-bold text-ink">IPTV Abonnement</strong> voor{' '}
            <strong className="font-bold text-ink">IPTV Nederland</strong>: duizenden zenders, films,
            series en live sport — allemaal in{' '}
            <strong className="font-bold text-ink">HD/4K kwaliteit</strong>. Inclusief VOD, replay en
            EPG. Eenvoudig te installeren op Smart TV, Android, iOS, Fire Stick, Box &amp; PC. Met onze{' '}
            <strong className="font-bold text-ink">premium IPTV</strong> geniet je van stabiele,
            buffervrije streaming en persoonlijke support 7 dagen per week. De{' '}
            <strong className="font-bold text-ink">beste IPTV in Nederland</strong> — zonder
            verplichtingen.
          </p>
          {!expanded && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-mist to-transparent sm:hidden"
            />
          )}
        </div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-2 text-[13px] font-bold text-teal-deep underline underline-offset-2 sm:hidden"
        >
          {expanded ? 'Lees minder' : 'Lees meer'}
        </button>
      </div>
    </section>
  );
};
