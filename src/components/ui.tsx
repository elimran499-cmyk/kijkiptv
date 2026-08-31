import React from 'react';
import { ChevronRight } from 'lucide-react';
import { PAYMENT_ICONS, PAYMENT_ICONS_ALT } from '../data/iptvData';

/**
 * KIJKIPTV brand mark. Inline SVG (not a raster asset) so it inherits the
 * palette and stays crisp at any density — a bold geometric "K" whose upper
 * arm terminates in a four-pointed sparkle star, with a smaller sparkle at
 * the lower arm, filled with the emerald → sky brand gradient. Paired with
 * the "Kijk" + "IPTV" wordmark. Reads clearly at 32px tall by default.
 */
/* Traced directly from the reference artwork the user supplied, so the
   silhouette matches it exactly rather than approximating it. */
export const KIJK_MARK_D =
  'M50.64 0.0L50.21 4.96L50.42 8.84L50.86 9.7L56.67 14.65L57.1 15.08L56.89 15.3L53.66 14.87L48.27 14.87L45.9 16.81L42.02 21.55L42.02 14.01L39.65 12.93L34.48 11.85L26.51 11.85L23.06 12.71L20.69 13.79L17.67 16.16L15.73 19.18L15.08 21.76L15.3 24.78L16.16 27.37L18.32 30.81L23.49 35.56L26.07 37.28L31.25 39.87L24.57 37.93L20.26 35.99L15.08 32.75L10.99 28.66L8.84 23.92L8.4 20.26L9.27 15.73L11.85 10.99L14.44 8.4L16.59 6.9L19.61 5.39L25.0 3.88L27.8 3.45L34.69 3.45L41.59 4.53L45.68 5.6L50.42 0.22ZM32.75 24.13L38.14 25.64L45.68 29.09L50.21 32.32L53.66 36.42L55.38 41.16L55.6 43.96L55.16 46.76L53.01 51.72L49.56 55.6L45.9 57.97L43.31 59.04L36.2 60.55L29.09 60.55L23.49 59.47L18.75 57.97L13.36 64.0L13.79 59.26L13.79 55.81L13.36 54.73L11.64 52.79L6.9 48.92L15.52 49.13L16.81 48.48L18.1 47.19L21.98 42.45L22.2 43.96L21.76 49.78L24.35 51.07L29.52 52.15L37.49 52.15L40.94 51.29L44.82 49.13L47.19 46.76L48.7 43.31L48.92 40.73L47.84 36.63L45.68 33.19L42.24 29.74L37.93 26.72L32.75 24.35Z';

export const Logo: React.FC<{ className?: string }> = ({ className = 'h-8 sm:h-9' }) => (
  <a href="#top"
    className="group flex shrink-0 items-center gap-2.5 no-underline"
    aria-label="KijkIPTV — home"
  >
    <svg viewBox="0 0 64 64" className={`w-auto shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id="kijkGrad" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#17D6AC" />
          <stop offset="50%" stopColor="#00B894" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
      <path d={KIJK_MARK_D} fill="url(#kijkGrad)" fillRule="evenodd" />
    </svg>
    <span className="flex items-baseline gap-[3px] font-extrabold leading-none tracking-tight">
      <span className="text-[19px] text-ink sm:text-[21px]">Kijk</span>
      <span className="text-[19px] font-semibold text-teal-deep sm:text-[21px]">IPTV</span>
    </span>
  </a>
);

/** Emerald → sky brand-gradient rule that sits under every section heading. */
export const TriRule: React.FC = () => (
  <div className="rule-tri my-4">
    <span />
  </div>
);

/**
 * Just the "K" glyph, gradient-stroked with no background plate — for
 * placing directly on a dark ground (the floating mobile-nav badge). The
 * full `Logo` mark below is the everyday brand lockup and keeps its own
 * gradient-filled rounded-square plate; this is a lighter-weight variant for
 * when the ground is already doing that job.
 */
export const LogoGlyph: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="kijkGlyphGrad" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#5CEBD1" />
        <stop offset="55%" stopColor="#17D6AC" />
        <stop offset="100%" stopColor="#38C6F4" />
      </linearGradient>
    </defs>
    <path d={KIJK_MARK_D} fill="url(#kijkGlyphGrad)" fillRule="evenodd" />
  </svg>
);

/**
 * Rail header — left-aligned kicker + title with a "see all" action on the
 * right, the way a streaming home screen labels a shelf. Deliberately not
 * `SectionHeading`: the centred rule-under-title pattern reads as an
 * editorial/marketing page, and the rails are meant to read as app UI.
 */
export const RailHeader: React.FC<{
  kicker?: string;
  title: React.ReactNode;
  /** Item count for the shelf, rendered as a small pill next to the title —
   *  the way a streaming home screen labels how many titles are in a row. */
  count?: number | string;
  light?: boolean;
  onSeeAll?: () => void;
  seeAllLabel?: string;
  className?: string;
  /** Set on the one `RailHeader` per route that stands in for that route's
   *  main heading (AppCompat, Benefits, FilmsSeries have no `SectionHeading`
   *  of their own) — renders `h1` there via `usePageHeadingTag`. Every other
   *  call site (sub-rails inside Channels/Reviews) leaves this unset and
   *  stays a plain `h3`, so a route never ends up with two `h1`s. */
  asPageHeading?: boolean;
}> = ({
  kicker,
  title,
  count,
  light,
  onSeeAll,
  seeAllLabel = 'Alles bekijken',
  className = '',
  asPageHeading = false,
}) => {
  // Hooks must run unconditionally, so this is always called — its result is
  // only used when `asPageHeading` is set.
  const Heading = asPageHeading ? 'h2' : 'h3';

  return (
  <div className={`mb-4 flex items-end justify-between gap-4 px-5 ${className}`}>
    <div>
      {kicker && (
        <p
          className={`text-[10.5px] font-bold uppercase tracking-[0.2em] ${
            light ? 'text-white/70' : 'text-teal-deep'
          }`}
        >
          {kicker}
        </p>
      )}
      <div className="mt-0.5 flex items-center gap-2">
        <h2
          className={`text-[clamp(1.25rem,3.4vw,1.7rem)] font-extrabold leading-tight ${
            light ? 'text-white' : 'text-ink'
          }`}
        >
          {title}
        </h2>
        {count != null && (
          <span
            className={`inline-flex h-5 shrink-0 items-center rounded-full px-2 text-[11px] font-extrabold tabular-nums ${
              light ? 'bg-white/20 text-white' : 'bg-teal/15 text-teal-deep'
            }`}
          >
            {count}
          </span>
        )}
      </div>
    </div>
    {onSeeAll && (
      <button
        type="button"
        onClick={onSeeAll}
        className={`flex shrink-0 items-center gap-0.5 whitespace-nowrap pb-1 text-[13px] font-bold transition-colors ${
          light ? 'text-white/85 hover:text-white' : 'text-teal-deep hover:text-ink'
        }`}
      >
        {seeAllLabel}
        <ChevronRight className="h-4 w-4" />
      </button>
    )}
  </div>
  );
};

interface SectionHeadingProps {
  children: React.ReactNode;
  light?: boolean;
  sub?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ children, light, sub }) => {
  return (
  <div className="text-center">
    <h2
      className={`text-[clamp(1.75rem,5vw,2.625rem)] font-extrabold leading-tight ${
        light ? 'text-white' : 'text-ink'
      }`}
    >
      {children}
    </h2>
    <TriRule />
    {sub && (
      <p
        className={`mx-auto max-w-3xl text-[15px] leading-relaxed sm:text-base ${
          light ? 'text-white/85' : 'text-muted'
        }`}
      >
        {sub}
      </p>
    )}
  </div>
  );
};

/** Frosted glass chip, e.g. "Directe activatie (±5 min)". */
export const Pill: React.FC<{
  children: React.ReactNode;
  dot?: string;
  className?: string;
}> = ({ children, dot, className = '' }) => (
  <span
    className={`glass-panel-light inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-teal-deep ${className}`}
  >
    {dot && <span className="h-2 w-2 rounded-full" style={{ background: dot }} />}
    {children}
  </span>
);

/** Solid teal gradient chip used in the benefits strip. */
export const TealPill: React.FC<{ children: React.ReactNode; icon?: React.ReactNode }> = ({
  children,
  icon,
}) => (
  <span
    className="glass-btn glass-btn--secondary glass-btn--sm inline-flex items-center gap-2"
    style={{ cursor: 'default' }}
  >
    {icon}
    {children}
  </span>
);

/**
 * The shared button/CTA control. Every clickable action on the site routes
 * through this: pass `href` for a link (WhatsApp, in-page anchors) or
 * `onClick` for a button (opens the order modal, etc). Glass fill + coloured
 * shadow per variant — warm orange (`primary`) is reserved for the
 * conversion action; every other variant routes through emerald / sky.
 */
export type GlassButtonVariant = 'primary' | 'secondary' | 'ghost' | 'ghost-light' | 'whatsapp' | 'invert';
export type GlassButtonSize = 'sm' | 'md' | 'lg';

interface GlassButtonProps {
  children: React.ReactNode;
  variant?: GlassButtonVariant;
  size?: GlassButtonSize;
  className?: string;
  icon?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler;
  type?: 'button' | 'submit';
  ariaLabel?: string;
  dataCta?: 'order';
  /** `w-full sm:w-auto` — the default, for CTA rows that stack on phones. */
  fullWidthOnMobile?: boolean;
  /** Always `w-full`, regardless of viewport — for buttons inside fixed-width cards. */
  block?: boolean;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  href,
  target,
  rel,
  onClick,
  type = 'button',
  ariaLabel,
  dataCta,
  fullWidthOnMobile = true,
  block = false,
}) => {
  const widthClass = block ? 'w-full' : fullWidthOnMobile ? 'w-full sm:w-auto' : '';
  const classes = `glass-btn glass-btn--${variant} glass-btn--${size} ${widthClass} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-label={ariaLabel}
        data-cta={dataCta}
        className={classes}
      >
        {icon}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      data-cta={dataCta}
      className={classes}
    >
      {icon}
      {children}
    </button>
  );
};

/** Card-brand logos shown at the foot of each pricing card. */
export const PaymentRow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`flex items-center justify-center rounded-2xl bg-white px-3 py-2 ${className}`}
  >
    <img
      src={PAYMENT_ICONS}
      alt={PAYMENT_ICONS_ALT}
      loading="lazy"
      decoding="async"
      className="h-[26px] w-auto max-w-full object-contain"
    />
  </div>
);

export const Check: React.FC<{ className?: string }> = ({ className = 'text-teal' }) => (
  <svg viewBox="0 0 20 20" className={`h-4 w-4 shrink-0 ${className}`} fill="currentColor">
    <path d="M7.6 14.6 3.4 10.4l1.4-1.4 2.8 2.8 7-7 1.4 1.4z" />
  </svg>
);

export const Cross: React.FC = () => (
  <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-slate-400" fill="currentColor">
    <path d="M15.5 5.9 14.1 4.5 10 8.6 5.9 4.5 4.5 5.9 8.6 10l-4.1 4.1 1.4 1.4L10 11.4l4.1 4.1 1.4-1.4L11.4 10z" />
  </svg>
);

/** Official WhatsApp mark, 24×24 viewBox, inherits colour from the parent. */
export const WhatsAppGlyph: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);
