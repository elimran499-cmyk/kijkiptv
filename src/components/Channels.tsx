import React from 'react';
import { Tv } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { SPORT_CHANNELS, TOTAL_CHANNELS, TV_CHANNELS, type NlChannel } from '../data/catalog';
import { RailHeader, SectionHeading } from './ui';

/** One logo tile — every mark sits on the same deep-teal plate now (every
 *  remaining logo measures well above the readability floor on dark), so the
 *  strip reads as a calm, deliberate card rail rather than a white/dark
 *  checkerboard. `compact` is the smaller, full-width variant used inside the
 *  hero's vertical panel — same plate, same border/shadow treatment. */
export const CHANNEL_TILE_BASE =
  'flex shrink-0 flex-col items-center justify-center gap-2 rounded-[22px] border border-teal/25 bg-[linear-gradient(155deg,#123f3c_0%,#0b2b2b_72%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_14px_30px_-16px_rgba(6,122,99,0.55)]';

export const ChannelTile: React.FC<{ channel: NlChannel; compact?: boolean }> = ({
  channel,
  compact,
}) => (
  <div
    className={
      compact
        ? `${CHANNEL_TILE_BASE} h-24 w-full rounded-2xl px-4 py-3`
        : `${CHANNEL_TILE_BASE} mx-2.5 h-[108px] w-[164px] px-5 py-3.5 sm:w-[188px]`
    }
  >
    <img
      src={channel.logo}
      alt={channel.name}
      loading="lazy"
      decoding="async"
      className={compact ? 'h-11 w-full object-contain' : 'h-14 w-full object-contain'}
    />
  </div>
);

/* One tile, including its horizontal margins, at the widest breakpoint the
   marquee runs at (sm:188px + mx-2.5 on both sides). Used to size how many
   times a strip's list must repeat so the track never runs dry on a wide
   viewport — see `repeatsFor` below. */
const TILE_TRACK_WIDTH = 208;
/** Comfortably wider than any real browser viewport (ultrawide included), so
    the loop never shows a gap at the seam. */
const MAX_VIEWPORT = 3600;
const SECONDS_PER_TILE = 7.5;

/** How many times a strip must repeat its list so the animated track always
 *  spans more than `MAX_VIEWPORT`, even with a short list. A fixed "duplicate
 *  once" (N=2) only holds up while the list itself is already wider than the
 *  viewport — with 6 sport tiles that's false past ~1100px, so this scales
 *  the repeat count to the list length instead of hardcoding it. */
const repeatsFor = (listLength: number): number => {
  const listWidth = listLength * TILE_TRACK_WIDTH;
  return Math.max(2, Math.ceil(MAX_VIEWPORT / listWidth) + 1);
};

/** One scrolling strip. Reduced motion swaps the marquee for a static,
 *  wrapped grid of the same tiles rather than trying to freeze a track mid
 *  animation. */
/** Exported so the home page can reuse the same marquee mechanism for a
 *  trimmed single-row channel preview, instead of re-implementing it. */
export const Strip: React.FC<{ list: NlChannel[]; direction: 'left' | 'right' }> = ({
  list,
  direction,
}) => {
  const reduceMotion = useReducedMotion();
  const copies = repeatsFor(list.length);
  const duration = `${Math.round(list.length * SECONDS_PER_TILE)}s`;
  const distance = `${-100 / copies}%`;

  if (reduceMotion) {
    return (
      <div className="mx-auto flex max-w-[1180px] flex-wrap justify-center gap-3 px-5">
        {list.map((channel) => (
          <ChannelTile key={channel.id} channel={channel} />
        ))}
      </div>
    );
  }

  return (
    <div className="marquee-viewport">
      <div
        className={`marquee-track marquee-track--${direction}-n`}
        style={
          {
            animationDuration: duration,
            '--mq-dist': distance,
          } as React.CSSProperties
        }
      >
        {Array.from({ length: copies }).flatMap((_, copy) =>
          list.map((channel) => <ChannelTile key={`${channel.id}-${copy}`} channel={channel} />),
        )}
      </div>
    </div>
  );
};

export const Channels: React.FC = () => {
  // Every strip's "Alles bekijken" points at the pricing page, since the full
  // catalogue only unlocks once a pack is chosen.
  const goToPricing = () =>
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });

  return (
  <section id="channels" className="band-teal grain relative overflow-hidden py-12 sm:py-20">
    <div className="blob -left-20 -top-16 h-72 w-72 bg-white/10" aria-hidden="true" />
    <div className="blob -right-16 bottom-0 h-80 w-80 bg-white/10" aria-hidden="true" />

    <div className="relative mx-auto max-w-[1180px] px-5">
      <span className="glass-panel mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full text-white">
        <Tv className="h-6 w-6" />
      </span>

      <SectionHeading light>{TOTAL_CHANNELS} zenders — Nederlandse zenders voorop</SectionHeading>
    </div>

    {/* Two clearly labelled rails — TV and sport — so it's obvious at a
        glance that both are included, rather than one undifferentiated wall
        of logos. Each scrolls on its own, opposite directions. Rail headers
        carry their own item count and a "see all" affordance, exactly like a
        streaming home screen shelf, rather than a centred caption. */}
    <div id="tv-zenders" className="relative mt-12 scroll-mt-24 overflow-x-hidden">
      <RailHeader
        light
        kicker="Live nu"
        title="TV-zenders"
        count={TV_CHANNELS.length}
        onSeeAll={goToPricing}
        className="mx-auto max-w-[1180px]"
      />
      <Strip list={TV_CHANNELS} direction="left" />
    </div>

    <div id="sport-zenders" className="relative mt-10 scroll-mt-24 overflow-x-hidden">
      <RailHeader
        light
        kicker="Live nu"
        title="Sportzenders"
        count={SPORT_CHANNELS.length}
        onSeeAll={goToPricing}
        className="mx-auto max-w-[1180px]"
      />
      <Strip list={SPORT_CHANNELS} direction="right" />
    </div>
  </section>
  );
};
