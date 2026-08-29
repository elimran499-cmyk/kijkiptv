import React, { useEffect } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import { Award, Flame, Monitor, ShieldCheck, Sparkles } from 'lucide-react';
import { CONTACT } from '../data/iptvData';
import { DurationPack, DURATION_PACKS, PACKAGE_TIERS, type PackageTier } from '../data/catalog';
import { GlassButton, PaymentRow, SectionHeading, WhatsAppGlyph } from './ui';

/* All three durations sit side by side as equal-height cards — one column on
 * phone, two at `md`, three at `lg` — in catalogue order (12+3 → 6 → 3),
 * never re-sorted. The tier switch and device selector sit above the grid
 * and drive every card simultaneously. The best-deal pack (whichever one
 * `catalog.ts` flags) keeps KijkIPTV's existing showcase treatment: the
 * coloured band card, grain, and the spinning VIP rim. The other two packs
 * are plain hairline cards so the showcase still reads as the showcase. */

const formatPrice = (val: number) => `€${val.toFixed(2).replace('.', ',')}`;
const waLink = (message: string) => `${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;

/**
 * A price (or per-month figure) that rolls to its new value over ~0.4s,
 * ease-out, rather than snapping. Reused for every numeral on the page so a
 * tier/device change always reads as a considered update. The component is
 * never remounted on tier/device change (callers never key it on either) —
 * it stays mounted and this effect just retargets the running tween, so the
 * count never restarts from zero. Tabular numerals keep digit widths fixed
 * while the value counts so nothing around it jitters mid-roll. Reduced
 * motion jumps straight to the value.
 */
const AnimatedEuro: React.FC<{ value: number; className?: string }> = ({ value, className }) => {
  const reduceMotion = !!useReducedMotion();
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => formatPrice(v));

  useEffect(() => {
    if (reduceMotion) {
      mv.jump(value);
      return;
    }
    const controls = animate(mv, value, { duration: 0.4, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduceMotion]);

  return <motion.span className={`tabular-nums ${className ?? ''}`}>{text}</motion.span>;
};

/** Generic segmented control — a sliding pill (`layoutId`) behind whichever
 *  option is active, used for the tier switch and the desktop device row.
 *  Also reused by `OrderModal`, so it stays exported. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  layoutId,
  fillClass,
  reduceMotion,
}: {
  options: Array<{ id: T; label: React.ReactNode }>;
  value: T;
  onChange: (id: T) => void;
  layoutId: string;
  fillClass: string;
  reduceMotion: boolean;
}) {
  return (
    <div className="glass-panel-light inline-flex items-center gap-1 rounded-full p-1.5">
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className="relative rounded-full px-4 py-2.5 text-[13.5px] font-bold sm:px-5"
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className={`absolute inset-0 rounded-full shadow-card ${fillClass}`}
                transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
            <span
              className={`relative z-10 flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors ${
                active ? 'text-white' : 'text-muted hover:text-ink'
              }`}
            >
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

const DEVICE_COUNTS = [1, 2, 3, 4] as const;

/** Device selector — a 2×2 grid of full-width targets on phones (each one a
 *  comfortable tap target), the familiar pill row from `sm` up. Both use the
 *  same sliding-pill treatment as the tier switch, on their own `layoutId`s
 *  so the two trees never fight over one shared indicator. */
const DeviceSelector: React.FC<{
  devices: number;
  onChange: (n: number) => void;
  fillClass: string;
  reduceMotion: boolean;
}> = ({ devices, onChange, fillClass, reduceMotion }) => (
  <div className="mt-6 flex flex-col items-center gap-2.5">
    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Aantal apparaten</p>

    <div className="mx-auto grid w-full max-w-xs grid-cols-2 gap-2.5 sm:hidden">
      {DEVICE_COUNTS.map((n) => {
        const active = devices === n;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className="relative flex min-h-[48px] items-center justify-center gap-2 overflow-hidden rounded-2xl text-sm font-bold"
          >
            {active && (
              <motion.span
                layoutId="device-pill-mobile"
                className={`absolute inset-0 rounded-2xl ${fillClass}`}
                transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
            {!active && <span className="absolute inset-0 rounded-2xl border border-border bg-white" />}
            <span className={`relative z-10 flex items-center gap-2 ${active ? 'text-white' : 'text-muted'}`}>
              <Monitor className="h-4 w-4" />
              {n} {n === 1 ? 'apparaat' : 'apparaten'}
            </span>
          </button>
        );
      })}
    </div>

    <div className="hidden sm:flex">
      <SegmentedControl
        layoutId="device-pill-desktop"
        reduceMotion={reduceMotion}
        value={String(devices)}
        onChange={(v) => onChange(Number(v))}
        fillClass={fillClass}
        options={DEVICE_COUNTS.map((n) => ({
          id: String(n),
          label: (
            <>
              <Monitor className="h-3.5 w-3.5" />
              {n}
            </>
          ),
        }))}
      />
    </div>
  </div>
);

export const Pricing: React.FC = () => {
  const reduceMotion = useReducedMotion() ?? false;
  const [tierId, setTierId] = React.useState<PackageTier['id']>('basic');
  const [devices, setDevices] = React.useState(1);

  const activeTier = PACKAGE_TIERS.find((t) => t.id === tierId) ?? PACKAGE_TIERS[0];
  const isVip = tierId === 'vip';
  const fillClass = isVip ? 'bg-gradient-to-br from-sky to-sky-deep' : 'bg-gradient-to-br from-teal to-teal-deep';

  const orderMessage = (pack: DurationPack, price: number) =>
    `Hoi KijkIPTV! Ik wil graag het pakket ${activeTier.name} — ${pack.label} bestellen voor ${devices} ` +
    `${devices === 1 ? 'apparaat' : 'apparaten'} (${formatPrice(price)}). Kunnen jullie mij de ` +
    `betaalgegevens en activatiestappen sturen?`;

  return (
    <section id="pricing" className="relative overflow-hidden bg-white py-12 sm:py-20">
      <div
        className={`blob -right-24 top-10 h-96 w-96 transition-colors duration-500 ${isVip ? 'bg-sky/15' : 'bg-teal/12'}`}
        aria-hidden="true"
      />
      <div
        className={`blob -left-20 bottom-0 h-80 w-80 transition-colors duration-500 ${isVip ? 'bg-teal/12' : 'bg-sky/15'}`}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1100px] px-5">
        <div className="mx-auto max-w-[640px]">
          <SectionHeading
            sub={
              <>
                Kies een niveau en het aantal apparaten — alle looptijden staan hieronder naast elkaar,
                zodat je meteen kunt vergelijken. Stuur ons een WhatsApp-bericht en je login staat binnen
                5 minuten klaar. <strong className="font-bold text-ink">Altijd opzegbaar</strong>, geen
                contract.
              </>
            }
          >
            Kies je pakket
          </SectionHeading>

          {/* ── Tier switch — Basis / Premium VIP — drives every card below. ── */}
          <div className="mt-9 flex justify-center">
            <SegmentedControl
              layoutId="tier-pill"
              reduceMotion={reduceMotion}
              value={tierId}
              onChange={setTierId}
              fillClass={fillClass}
              options={PACKAGE_TIERS.map((t) => ({
                id: t.id,
                label: (
                  <>
                    {t.id === 'vip' && <Sparkles className="h-4 w-4" />}
                    {t.name}
                  </>
                ),
              }))}
            />
          </div>

          {/* ── Devices — 2×2 grid on phones, pill row from sm up. ── */}
          <DeviceSelector devices={devices} onChange={setDevices} fillClass={fillClass} reduceMotion={reduceMotion} />
        </div>

        {/* ── Side-by-side grid — one column on phone, two at `md`, three at
            `lg`, equal-height cards (`items-stretch`), rendered in
            `DURATION_PACKS` order (12+3 → 6 → 3), never re-sorted. The
            best-deal card's showcase treatment follows `pack.bestDeal`, not
            a position. ── */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {DURATION_PACKS.map((pack, i) => (
            <PackSpread
              key={pack.id}
              pack={pack}
              index={i + 1}
              tierId={tierId}
              isVip={isVip}
              devices={devices}
              activeTier={activeTier}
              orderMessage={orderMessage}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <div className="mx-auto max-w-[640px]">
          {/* Talk-to-us banner */}
          <div className="glass-panel-light relative mt-10 flex flex-col items-center justify-between gap-4 overflow-hidden rounded-[28px] p-5 sm:flex-row">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="glass-btn glass-btn--whatsapp !min-h-0 flex h-11 w-11 shrink-0 items-center justify-center !p-0">
                <WhatsAppGlyph className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-ink">Weet je niet welk pakket bij je past?</h4>
                <p className="mt-0.5 text-[12.5px] text-muted">
                  Stuur ons een WhatsApp-bericht — we zoeken samen de juiste looptijd en het aantal
                  apparaten uit.
                </p>
              </div>
            </div>
            <GlassButton
              variant="ghost"
              size="md"
              fullWidthOnMobile={false}
              className="shrink-0"
              href={waLink('Hoi KijkIPTV! Welk abonnement past het beste bij mij?')}
              target="_blank"
              rel="noopener noreferrer"
              icon={<WhatsAppGlyph className="h-4 w-4" />}
            >
              Chat via WhatsApp
            </GlassButton>
          </div>

          {/* Trust / payment strip */}
          <div className="mt-10 text-center">
            <div className="glass-panel-light relative inline-flex flex-col flex-wrap items-center justify-center gap-3 rounded-3xl px-6 py-4 text-[12px] text-muted sm:flex-row sm:gap-6 sm:rounded-full sm:px-7">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-teal-deep" /> iDEAL, PayPal, kaart of overboeking
              </span>
              <span className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-teal-deep" /> M3U- &amp; Xtream-login via de chat
              </span>
              <span className="flex items-center gap-2">
                <Award className="h-4 w-4 text-sky-deep" /> 7 dagen niet-goed-geld-terug
              </span>
            </div>
            <div className="mt-5 flex justify-center">
              <PaymentRow />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface PackSpreadProps {
  pack: DurationPack;
  index: number;
  tierId: PackageTier['id'];
  isVip: boolean;
  devices: number;
  activeTier: PackageTier;
  orderMessage: (pack: DurationPack, price: number) => string;
  reduceMotion: boolean;
}

/**
 * One pack, one full-width spread. Always the same DOM shape whether or not
 * it is the showcase, so the price counter and the VIP rim/sweep never
 * remount (and lose their animated state) on a devices change — only the
 * `isVip` condition mounts/unmounts the rim and sweep, and that is keyed on
 * the tier alone, never on `devices`. The best-deal pack (wherever the data
 * puts it) keeps KijkIPTV's existing showcase card: the teal/coral band,
 * grain, and — only while VIP is active — the spinning gradient rim and
 * specular sweep. The other two packs are plain hairline cards so the
 * showcase still reads as the showcase.
 */
const PackSpread: React.FC<PackSpreadProps> = ({
  pack,
  index,
  tierId,
  isVip,
  devices,
  activeTier,
  orderMessage,
  reduceMotion,
}) => {
  const price = pack.prices[tierId][devices - 1];
  const perMonth = price / pack.months;
  const best = !!pack.bestDeal;

  const cta = (
    <GlassButton
      variant="primary"
      size="lg"
      block
      dataCta="order"
      href={waLink(orderMessage(pack, price))}
      target="_blank"
      rel="noopener noreferrer"
      icon={<WhatsAppGlyph className="h-4 w-4" />}
    >
      {isVip ? 'Word VIP nu' : 'Bestel nu'}
    </GlassButton>
  );

  const badge = (
    <motion.span
      key={`${pack.id}-${tierId}`}
      initial={reduceMotion ? undefined : { opacity: 0, y: -4 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.14em] ${
        best ? 'bg-white/90 text-teal-deep' : 'border border-border bg-tint text-teal-deep'
      }`}
    >
      {best ? `🔥 Beste deal · -${pack.savePercent}%` : `-${pack.savePercent}%`}
    </motion.span>
  );

  const deviceIndicator = (
    <div
      className={`flex items-center gap-2 text-[12px] font-semibold ${best ? 'text-white/85' : 'text-muted'}`}
    >
      <Monitor className={`h-3.5 w-3.5 ${best ? 'text-white' : 'text-teal-deep'}`} />
      {devices} {devices === 1 ? 'apparaat' : 'apparaten'}
    </div>
  );

  if (best) {
    return (
      <article className="pack-card pack-card--best relative h-full">
        {isVip && <div className="vip-rim absolute rounded-[32px]" aria-hidden="true" />}
        <div className="grain relative flex h-full flex-col overflow-hidden rounded-[32px] p-6 text-white shadow-card sm:p-9">
          <div className="absolute inset-0 band-teal" aria-hidden="true" />
          <motion.div
            className="absolute inset-0 band-coral"
            aria-hidden="true"
            initial={false}
            animate={{ opacity: isVip ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' }}
          />
          {isVip && !reduceMotion && <div className="vip-sweep" aria-hidden="true" />}

          <div className="relative z-10 flex flex-wrap items-baseline justify-between gap-3">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <span className="text-[11px] font-bold tracking-[0.3em] text-white/60">
                {String(index).padStart(2, '0')}
              </span>
              <h3 className="text-[clamp(1.6rem,5.5vw,2.4rem)] font-extrabold leading-[1.05] tracking-tight text-white">
                {pack.label}
              </h3>
              {badge}
            </div>
            {deviceIndicator}
          </div>

          <div className="relative z-10 mt-4 flex flex-wrap items-end gap-x-4 gap-y-1">
            <AnimatedEuro
              value={price}
              className="text-[clamp(3rem,10vw,5.25rem)] font-extrabold leading-none tracking-tight text-white"
            />
            <span className="pb-1 text-[13px] text-white/80 sm:text-sm">
              ≈ <AnimatedEuro value={perMonth} className="font-semibold text-white" /> / maand
            </span>
          </div>

          <h4 className="relative z-10 mt-5 text-[13px] font-bold text-white">{activeTier.headline}</h4>
          <motion.ul
            key={tierId}
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: reduceMotion ? 0 : 0.03 } } }}
            className="relative z-10 mt-3 divide-y divide-white/20 border-t border-white/20 text-[13.5px]"
          >
            {activeTier.features.map((feature, idx) => (
              <motion.li
                key={feature}
                variants={{
                  hidden: { opacity: 0, y: reduceMotion ? 0 : 6 },
                  show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' } },
                }}
                className={`flex items-baseline gap-3 rounded-lg px-2 -mx-2 py-2.5 transition-colors duration-150 hover:bg-white/10 ${idx < 2 ? 'font-bold text-white' : 'text-white/85'}`}
              >
                <span className="text-white/60" aria-hidden="true">
                  —
                </span>
                {feature}
              </motion.li>
            ))}
          </motion.ul>

          <div className="relative z-10 mt-auto pt-7">{cta}</div>
        </div>
      </article>
    );
  }

  return (
    <article className="pack-card pack-card--plain relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border bg-white p-6 shadow-[0_18px_40px_-20px_rgba(6,122,99,0.22)] sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <span className="text-[11px] font-bold tracking-[0.3em] text-teal-deep">
            {String(index).padStart(2, '0')}
          </span>
          <h3 className="text-[clamp(1.6rem,5.5vw,2.4rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
            {pack.label}
          </h3>
          {badge}
        </div>
        {deviceIndicator}
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-x-4 gap-y-1">
        <AnimatedEuro
          value={price}
          className="text-[clamp(2.25rem,7vw,3.25rem)] font-extrabold leading-none tracking-tight text-ink"
        />
        <span className="pb-1 text-[13px] text-muted sm:text-sm">
          ≈ <AnimatedEuro value={perMonth} className="font-semibold text-ink" /> / maand
        </span>
      </div>

      <h4 className="mt-5 text-[13px] font-bold text-ink">{activeTier.headline}</h4>
      <motion.ul
        key={tierId}
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: reduceMotion ? 0 : 0.03 } } }}
        className="mt-3 divide-y divide-[#C9E4DA] border-t border-[#C9E4DA] text-[13.5px]"
      >
        {activeTier.features.map((feature, idx) => (
          <motion.li
            key={feature}
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 6 },
              show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' } },
            }}
            className={`flex items-baseline gap-3 rounded-lg px-2 -mx-2 py-2.5 transition-colors duration-150 hover:bg-teal/8 ${idx < 2 ? 'font-bold text-ink' : 'text-muted'}`}
          >
            <span className="text-teal-deep" aria-hidden="true">
              —
            </span>
            {feature}
          </motion.li>
        ))}
      </motion.ul>

      <div className="mt-auto pt-7">{cta}</div>
    </article>
  );
};
