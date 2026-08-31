import React from 'react';
import { Play } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { TOTAL_VOD, VOD_TITLES, type VodTitle } from '../data/catalog';
import { RailHeader } from './ui';

/* 2024 releases get the "Nieuw" ribbon — a real streaming-app signal, not a
   decoration: it tells you which titles just landed. */
const NEW_IDS = new Set(['f1', 'f10', 'f13', 'f15']);

/** One poster — 2:3, app-tile behaviour: rounded, lifts and scales on
 *  hover/tap, a play affordance, a "Nieuw" ribbon on the newest handful. No
 *  caption line beyond the title, per the standing rule. */
/** Exported so the home page can reuse the same poster tile for its compact
 *  preview row, instead of re-implementing it. */
export const PosterTile: React.FC<{ title: VodTitle; className?: string }> = ({ title, className = '' }) => (
  <article
    className={`card-lift group relative aspect-[2/3] w-[128px] shrink-0 snap-start overflow-hidden rounded-[18px] bg-tint shadow-soft transition-transform duration-300 ease-out active:scale-[0.96] sm:w-[152px] ${className}`}
  >
    <img
      src={title.poster}
      alt={`${title.title} poster`}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.06]"
    />

    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
      style={{
        background:
          'linear-gradient(180deg, rgba(11,43,43,0) 0%, rgba(6,60,50,0.55) 45%, rgba(3,45,60,0.92) 100%)',
      }}
    />

    {NEW_IDS.has(title.id) && (
      <span className="absolute right-2 top-2 rounded-full bg-coral px-2 py-1 text-[9.5px] font-extrabold uppercase tracking-wide text-white shadow-card">
        Nieuw
      </span>
    )}

    <span
      className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-teal-deep opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      aria-hidden="true"
    >
      <Play className="ml-0.5 h-3.5 w-3.5" fill="currentColor" />
    </span>

    <div className="absolute inset-x-0 bottom-0 px-3 pb-3">
      <h4 className="truncate text-[12.5px] font-extrabold leading-tight text-white sm:text-[13.5px]">
        {title.title}
      </h4>
    </div>
  </article>
);

/* The two visible rows must never show the same title at once, so the
   catalogue is split in half rather than reused whole. Each row repeats only
   its own half, enough times that one animation period always exceeds the
   widest viewport — with 15 posters a single copy is ~2.5k px, which a wide
   monitor would outrun, showing a gap at the seam. */
const HALF = Math.ceil(VOD_TITLES.length / 2);
const ROW_A = VOD_TITLES.slice(0, HALF);
const ROW_B = VOD_TITLES.slice(HALF);

const TILE_TRACK_WIDTH = 168; // tile width + its horizontal margins, at sm
const MAX_VIEWPORT = 3600;
const SECONDS_PER_TILE = 7.5; // a calm drift, matching the channel strips

const repeatsFor = (length: number) =>
  Math.max(2, Math.ceil(MAX_VIEWPORT / (length * TILE_TRACK_WIDTH)) + 1);

const Row: React.FC<{ list: VodTitle[]; direction: 'left' | 'right' }> = ({ list, direction }) => {
  const copies = repeatsFor(list.length);

  return (
    <div className="marquee-viewport">
      <div
        className={`marquee-track marquee-track--${direction}-n`}
        style={
          {
            animationDuration: `${Math.round(list.length * SECONDS_PER_TILE)}s`,
            '--mq-dist': `${-100 / copies}%`,
          } as React.CSSProperties
        }
      >
        {Array.from({ length: copies }).flatMap((_, copy) =>
          list.map((title) => (
            <PosterTile key={`${title.id}-${copy}`} title={title} className="mx-2" />
          )),
        )}
      </div>
    </div>
  );
};

export const FilmsSeries: React.FC = () => {
  const reduceMotion = useReducedMotion();
  // "Alles bekijken" scrolls to the pricing section — the full catalogue only
  // unlocks once a pack is chosen.
  const goToPricing = () =>
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  

  return (
    <section id="films" className="scroll-mt-20 bg-white py-12 sm:py-20">
      <RailHeader
        asPageHeading
        kicker="On demand"
        title={`${TOTAL_VOD} films & series`}
        onSeeAll={goToPricing}
        className="mx-auto max-w-[1180px]"
      />

      {/* Full-bleed poster wall — the wrapper clips so the doubled track can
          never push the page into horizontal scroll. */}
      <div className="relative mt-10 space-y-4 overflow-x-hidden">
        {reduceMotion ? (
          <div className="rail flex gap-4 overflow-x-auto px-5 pb-2">
            {VOD_TITLES.map((title) => (
              <PosterTile key={title.id} title={title} />
            ))}
          </div>
        ) : (
          <>
            <Row list={ROW_A} direction="left" />
            <Row list={ROW_B} direction="right" />
          </>
        )}
      </div>

      <p className="mx-auto mt-10 max-w-2xl px-5 text-center text-[13px] text-muted">
        Bovenstaande is een kleine etalage — het volledige aanbod van {TOTAL_VOD} titels staat
        klaar zodra je activeert.
      </p>
    </section>
  );
};
