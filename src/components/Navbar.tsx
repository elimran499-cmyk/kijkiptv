import React, { useEffect, useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { CONTACT, NAV_LINKS } from '../data/iptvData';
import { GlassButton, Logo, LogoGlyph, WhatsAppGlyph } from './ui';
import { Link } from '../router';

interface NavbarProps {
  onOpenOrderModal: (planId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  /* Pointer-events must be set in exactly one place. Putting
     `pointer-events-none` in the base and `pointer-events-auto` in the
     scrolled state lands both classes on the same element, and Tailwind emits
     `.pointer-events-none` after `.pointer-events-auto`, so `none` always won
     and the whole floating header was unclickable. The wrapper now toggles it
     exclusively, and the children set nothing. */
  const floatBase =
    'fixed top-[calc(env(safe-area-inset-top)+0.75rem)] z-50 transition-[opacity,transform] duration-300 ease-out xl:hidden';
  const floatVisible = scrolled
    ? 'pointer-events-auto translate-y-0 opacity-100'
    : 'pointer-events-none -translate-y-3 opacity-0';

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow ${
        scrolled ? 'shadow-[0_4px_24px_-8px_rgba(6,122,99,0.22)]' : ''
      }`}
    >
      {/* ── Desktop / tablet bar — unchanged by scroll besides the shadow. ── */}
      <nav className="mx-auto hidden h-20 max-w-[1400px] items-center justify-between gap-4 bg-white/90 px-6 backdrop-blur-md xl:flex xl:px-10">
        <Logo />

        <ul className="flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                to={link.href}
                className="text-[15px] font-semibold text-ink transition-colors hover:text-teal-deep"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <GlassButton
            variant="whatsapp"
            size="md"
            fullWidthOnMobile={false}
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            icon={<WhatsAppGlyph className="h-4 w-4" />}
          >
            WhatsApp
          </GlassButton>
          <GlassButton
            variant="primary"
            size="md"
            fullWidthOnMobile={false}
            onClick={() => onOpenOrderModal('plan-12m')}
          >
            Bestel nu
          </GlassButton>
        </div>
      </nav>

      {/* ── Phone top bar — the pre-scroll state only. Once `scrolled` flips,
          this fades out and the three floating elements below take over. ── */}
      <div className="relative h-[68px] bg-white/95 backdrop-blur-md xl:hidden">
        <div
          className={`absolute inset-0 flex items-center justify-between px-4 transition-[opacity,transform] duration-300 ease-out ${
            scrolled ? 'pointer-events-none -translate-y-1.5 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <Logo className="h-8" />
          <button
            type="button"
            aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-tint"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* ── Floating scrolled header — three independent elements over the
          live page, each carrying its own shadow, no bar/background/border
          tying them together. Fixed to the viewport so they read as
          overlaying content, not as a header row. ── */}
      <div className={`${floatBase} left-3 ${floatVisible}`}>
        <button
          type="button"
          onClick={() => onOpenOrderModal('plan-12m')}
          className="glass-btn glass-btn--primary inline-flex !min-h-[46px] items-center gap-1.5 !px-4 text-[13px]"
        >
          <Zap className="h-4 w-4" fill="currentColor" />
          Kies pakket
        </button>
      </div>

      <div className={`${floatBase} left-1/2 -translate-x-1/2 ${scrolled ? 'pointer-events-auto translate-y-0 translate-x-[-50%] opacity-100' : 'pointer-events-none -translate-y-3 translate-x-[-50%] opacity-0'}`}>
        <Link
          to="/"
          aria-label="KijkIPTV — home"
          className="flex h-[46px] w-[46px] items-center justify-center rounded-2xl bg-[#0B2B2B] shadow-[0_12px_26px_-8px_rgba(6,122,99,0.55)] ring-1 ring-white/10"
        >
          <LogoGlyph className="h-[26px] w-[26px]" />
        </Link>
      </div>

      <div className={`${floatBase} right-3 ${floatVisible}`}>
        <button
          type="button"
          aria-label={open ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-[46px] w-[46px] items-center justify-center rounded-2xl bg-white text-ink shadow-[0_12px_26px_-8px_rgba(11,43,43,0.35)]"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* ── Mobile menu — a real bottom sheet, the same language as the order
          modal: anchored to the viewport floor, rounded top corners only, a
          grab handle, slides up rather than dropping down. Backdrop click
          and Escape both close it, body scroll locked while open. ── */}
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-ink/35 backdrop-blur-[2px] transition-opacity duration-300 ease-out motion-reduce:transition-none xl:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`band-teal grain safe-bottom fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-[28px] px-5 pb-6 shadow-card transition-transform duration-300 ease-out motion-reduce:transition-none xl:hidden ${
          open ? 'translate-y-0' : 'pointer-events-none translate-y-full'
        }`}
      >
        {/* Grab handle — the same affordance as the order modal's sheet. */}
        <div className="flex justify-center pb-1 pt-2.5" aria-hidden="true">
          <span className="h-1.5 w-10 rounded-full bg-white/30" />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[15px] font-extrabold text-white">Menu</span>
          <button
            type="button"
            aria-label="Menu sluiten"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <ul className="relative z-10 mt-2 flex flex-col">
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.label}
              className={open ? 'animate-fadeIn' : ''}
              style={open ? { animationDelay: `${i * 40}ms`, animationFillMode: 'backwards' } : undefined}
            >
              <Link
                to={link.href}
                onNavigate={() => setOpen(false)}
                className="flex min-h-[44px] items-center border-b border-white/15 py-3 text-[17px] font-bold text-white transition-colors hover:text-white/70"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Same asymmetric CTA cluster as the hero: one dominant pill for the
            order action, WhatsApp as its own compact circular affordance
            beside it — not a second stacked full-width bar. */}
        <div className="relative z-10 mt-5 flex items-stretch gap-3">
          <GlassButton
            variant="primary"
            size="lg"
            fullWidthOnMobile={false}
            className="flex-1"
            onClick={() => {
              setOpen(false);
              onOpenOrderModal('plan-12m');
            }}
          >
            Bestellen
          </GlassButton>
          <GlassButton
            variant="whatsapp"
            size="lg"
            fullWidthOnMobile={false}
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel="Contact via WhatsApp"
            onClick={() => setOpen(false)}
            className="!min-h-[52px] !w-[52px] shrink-0 !p-0"
          >
            <WhatsAppGlyph className="h-5 w-5" />
          </GlassButton>
        </div>
      </div>
    </header>
  );
};
