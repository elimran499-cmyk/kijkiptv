import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';
import { CONTACT } from '../data/iptvData';
import { NL_CHANNELS, type NlChannel } from '../data/catalog';
import { GlassButton, WhatsAppGlyph } from './ui';
import { ChannelTile } from './Channels';

interface HeroProps {
  onOpenOrderModal: (planId?: string) => void;
}

/* ── Trust row — three short chips, one line, never wraps into a block. ── */
const TRUST_CHIPS: Array<{ icon: React.ReactNode; label: string }> = [
  { icon: <ShieldCheck className="h-3.5 w-3.5" />, label: 'Veilige betaling' },
  { icon: <Zap className="h-3.5 w-3.5" />, label: '5–15 min actief' },
  { icon: <WhatsAppGlyph className="h-3.5 w-3.5" />, label: 'WhatsApp 24/7' },
];

/* ── "Now playing" device panel — a TV-shaped frame instead of a loose grid
   of drifting tiles, so the channel preview reads as a product shot rather
   than decoration. Two columns of full-size tiles (legible logos), pulled
   round-robin from the catalogue so TV and sport both show up in both
   columns, drifting at their own calm, opposite speed. Same `ChannelTile`
   the Channels section uses — the dark plate on a saturated screen is the
   one contrast step the whole thing depends on. ── */
const COLUMN_COUNT = 2;
const PANEL_CHANNELS = NL_CHANNELS.slice(0, 20);
const PANEL_COLUMNS: NlChannel[][] = Array.from({ length: COLUMN_COUNT }, (_, col) =>
  PANEL_CHANNELS.filter((_, i) => i % COLUMN_COUNT === col),
);
const COLUMN_SECONDS = [52, 44];
const COLUMN_DIRECTION: Array<'up' | 'down'> = ['up', 'down'];

const PanelColumn: React.FC<{ tiles: NlChannel[]; direction: 'up' | 'down'; seconds: number }> = ({
  tiles,
  direction,
  seconds,
}) => (
  <div className="vmarquee-viewport rounded-[18px]">
    <div
      className={`vmarquee-track vmarquee-track--${direction}`}
      style={{ animationDuration: `${seconds}s` }}
    >
      {[...tiles, ...tiles].map((channel, i) => (
        <div className="pb-2.5" key={`${channel.id}-${i}`}>
          <ChannelTile channel={channel} compact />
        </div>
      ))}
    </div>
  </div>
);

/** The device frame itself — dark bezel, a saturated emerald→sky "screen",
 *  a small stand underneath. Starts below the fold on phone by design. */
const HeroDevicePanel: React.FC = () => (
  <div className="relative mx-auto mt-12 w-full max-w-[380px] sm:mt-16 sm:max-w-[460px]">
    <div className="rounded-[30px] bg-[#0B2B2B] p-3 shadow-[0_28px_60px_-24px_rgba(6,122,99,0.55)] sm:p-3.5">
      <div className="band-teal grain relative overflow-hidden rounded-[20px] p-3 sm:p-4">
        <p className="relative z-10 mb-3 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
          Nu op KijkIPTV
        </p>

        <div className="hero-panel-animated relative z-10 grid grid-cols-2 gap-3">
          {PANEL_COLUMNS.map((tiles, i) => (
            <PanelColumn key={i} tiles={tiles} direction={COLUMN_DIRECTION[i]} seconds={COLUMN_SECONDS[i]} />
          ))}
        </div>

        <div className="hero-panel-static relative z-10 grid-cols-2 gap-3">
          {PANEL_CHANNELS.slice(0, 6).map((channel) => (
            <ChannelTile key={channel.id} channel={channel} compact />
          ))}
        </div>
      </div>
    </div>
    {/* Stand — a short neck and a wide foot, just enough to read as a TV. */}
    <div className="mx-auto h-4 w-3 bg-[#0B2B2B]/90 sm:h-5" aria-hidden="true" />
    <div className="mx-auto h-2 w-24 rounded-full bg-[#0B2B2B]/70 sm:w-28" aria-hidden="true" />
  </div>
);

export const Hero: React.FC<HeroProps> = ({ onOpenOrderModal }) => {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* Light ground, per the site's bright-and-friendly identity — the
          saturated gradient is reserved for the CTAs and the device screen
          below, not the whole hero. */}
      <div className="blob -left-24 -top-16 h-72 w-72 bg-sky/12" aria-hidden="true" />
      <div className="blob -right-20 top-1/4 h-96 w-96 bg-teal/12" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1180px] px-5 pb-14 pt-10 text-center sm:py-24 lg:py-28">
        {/* Badge — a flourish, not a fold citizen: hidden below sm so it can
            never crowd the headline on a phone. */}
        <span className="glass-panel-light mx-auto hidden items-center gap-2.5 rounded-full px-5 py-2.5 text-[13px] font-bold text-ink sm:inline-flex">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-coral" />
          Exclusieve aanbiedingen vandaag – directe activering
        </span>

        {/* Short, high-contrast headline — the whole point of the fold. */}
        <h1 className="mx-auto max-w-[15ch] text-[clamp(2.4rem,10.5vw,4.75rem)] font-extrabold leading-[1.04] text-ink sm:mt-7">
          Beste IPTV van Nederland
        </h1>

        {/* One supporting line — everything else moved to the intro section
            below the fold. */}
        <p className="mx-auto mt-4 max-w-[38ch] text-[clamp(1.02rem,3.6vw,1.3rem)] font-semibold text-muted sm:mt-5">
          Duizenden zenders, films en live sport in HD/4K — direct actief, altijd opzegbaar.
        </p>

        {/* CTA cluster — one dominant pill, not a matched pair. "Kies je
            pakket" is the order action and carries the full weight (wide
            pill, the whole label); WhatsApp drops to a compact circular icon
            button of equal height right beside it — a different shape
            language, not a second stacked full-width bar, while keeping its
            own green, unmistakably-WhatsApp affordance. Inline on every
            viewport, ≥52px tall throughout. */}
        <div className="mx-auto mt-8 flex max-w-[420px] items-stretch gap-3 sm:mt-10 sm:max-w-none sm:justify-center">
          <GlassButton
            variant="primary"
            size="lg"
            fullWidthOnMobile={false}
            className="flex-1 !text-[16px] sm:flex-initial"
            onClick={() => onOpenOrderModal('plan-12m')}
          >
            Kies je pakket
          </GlassButton>
          <GlassButton
            variant="whatsapp"
            size="lg"
            fullWidthOnMobile={false}
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel="Contact via WhatsApp"
            className="!min-h-[52px] !w-[52px] shrink-0 !p-0"
          >
            <WhatsAppGlyph className="h-5 w-5" />
          </GlassButton>
        </div>

        {/* Trust row — one line on phone via the horizontal rail, wraps and
            centres once there's room. */}
        <div className="rail mx-auto mt-7 max-w-full gap-2.5 sm:mt-8 sm:flex-wrap sm:justify-center sm:overflow-visible">
          {TRUST_CHIPS.map((chip) => (
            <span
              key={chip.label}
              className="glass-panel-light inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-[12px] font-bold text-teal-deep"
            >
              {chip.icon}
              {chip.label}
            </span>
          ))}
        </div>

        <HeroDevicePanel />
      </div>
    </section>
  );
};
