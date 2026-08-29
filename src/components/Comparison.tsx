import React from 'react';
import {
  Euro,
  Headphones,
  Infinity as InfinityIcon,
  List,
  Monitor,
  RefreshCw,
  Smartphone,
  Star,
  Trophy,
  Zap,
} from 'lucide-react';
import { COMPARISON_ROWS, WHY_CARDS } from '../data/iptvData';
import { Check, Cross, TriRule, WhatsAppGlyph } from './ui';
import { usePageHeadingTag } from '../router';

const ROW_ICONS: Record<string, React.ReactNode> = {
  zap: <Zap className="h-4 w-4" />,
  monitor: <Monitor className="h-4 w-4" />,
  smartphone: <Smartphone className="h-4 w-4" />,
  list: <List className="h-4 w-4" />,
  football: <Trophy className="h-4 w-4" />,
  whatsapp: <WhatsAppGlyph className="h-4 w-4" />,
  euro: <Euro className="h-4 w-4" />,
  refresh: <RefreshCw className="h-4 w-4" />,
};

const WHY_ICONS = [
  <InfinityIcon key="i" className="h-5 w-5" />,
  <Star key="s" className="h-5 w-5" />,
  <Headphones key="h" className="h-5 w-5" />,
];

export const Comparison: React.FC = () => {
  const Heading = usePageHeadingTag();
  return (
  <section id="waarom" className="bg-mist py-12 sm:py-20">
    <div className="mx-auto max-w-[1180px] px-5">
      <div className="text-center">
        <Heading className="text-[clamp(1.75rem,5vw,2.625rem)] font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-teal to-sky-deep bg-clip-text text-transparent">
            KijkIPTV
          </span>{' '}
          <span className="text-ink">— waarom ons kiezen?</span>
        </Heading>
        <TriRule />
      </div>

      {/* Table on tablet/desktop — restacked into cards below sm so nothing
          needs to scroll horizontally on a phone. */}
      <div className="mt-8 hidden overflow-hidden rounded-[24px] bg-white shadow-soft sm:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-6 py-5 text-[15px] font-bold text-ink">Belangrijke criteria</th>
                <th className="border-b-[3px] border-teal bg-tint px-6 py-5 text-center text-[15px] font-bold text-ink">
                  KijkIPTV (IPTV Nederland)
                </th>
                <th className="px-6 py-5 text-center text-[15px] font-bold text-ink">
                  Andere aanbieders
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-tint text-teal-deep">
                        {ROW_ICONS[row.iconName]}
                      </span>
                      <span className="text-[14.5px] font-bold text-ink">{row.criterion}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex justify-center">
                      <Check className="text-teal-deep" />
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex justify-center">
                      <Cross />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Phone restack — one card per criterion, KijkIPTV vs. "Andere
          aanbieders" side by side so nothing overflows at 320px. */}
      <div className="mt-8 space-y-2.5 sm:hidden">
        <div className="flex items-center gap-3 px-4 text-[11px] font-bold uppercase tracking-wide text-muted">
          <span className="flex-1">Criteria</span>
          <span className="w-14 text-center text-teal-deep">Kijk</span>
          <span className="w-14 text-center">Anderen</span>
        </div>
        {COMPARISON_ROWS.map((row) => (
          <div
            key={row.id}
            className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-soft"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-tint text-teal-deep">
              {ROW_ICONS[row.iconName]}
            </span>
            <span className="flex-1 text-[13px] font-bold leading-snug text-ink">{row.criterion}</span>
            <span className="flex w-14 shrink-0 justify-center">
              <Check className="text-teal-deep" />
            </span>
            <span className="flex w-14 shrink-0 justify-center">
              <Cross />
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {WHY_CARDS.map((card, i) => (
          <article
            key={card.id}
            className="card-lift rounded-[24px] bg-white px-6 py-8 text-center shadow-soft"
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tint text-teal-deep">
              {WHY_ICONS[i]}
            </span>
            <h3 className="mt-4 text-[17px] font-extrabold text-ink">{card.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{card.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
  );
};
