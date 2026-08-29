import React from 'react';
import { Clock, Link2, Lock, ShieldCheck, Star, Zap } from 'lucide-react';
import { CONTACT, PAYMENT_ICONS, PAYMENT_ICONS_ALT } from '../data/iptvData';
import { Link } from '../router';
import { ROUTES } from '../routes';
import { Logo, WhatsAppGlyph } from './ui';

const LEGAL = ['Privacy', 'Terugbetaling', 'Voorwaarden', 'Disclaimer'];

export const Footer: React.FC = () => (
  <footer id="site-footer" className="bg-mist">
    <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        {/* Brand */}
        <div>
          <h3 className="text-[13px] font-extrabold tracking-[0.12em] text-ink">KIJKIPTV</h3>
          <p className="mt-4 text-[14px] leading-relaxed text-muted">
            Ontdek het ultieme <strong className="font-bold text-ink">IPTV Abonnement</strong> voor{' '}
            <strong className="font-bold text-ink">IPTV Nederland</strong>: duizenden zenders, films,
            series en live sport in <strong className="font-bold text-ink">HD/4K kwaliteit</strong>.
            De <strong className="font-bold text-ink">beste IPTV</strong> — zonder verplichtingen.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-ink shadow-soft">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-deep" /> Stabiel
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-ink shadow-soft">
              <Zap className="h-3.5 w-3.5 text-sky-deep" /> Snel
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-ink shadow-soft">
              <WhatsAppGlyph className="h-3.5 w-3.5" /> 24/7 Support
            </span>
          </div>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-[13px] font-extrabold tracking-[0.12em] text-ink">PAGINA'S</h3>
          <ul className="mt-4 space-y-3">
            {ROUTES.map((r) => (
              <li key={r.path}>
                <Link
                  to={r.path}
                  className="text-[14px] font-semibold text-ink no-underline transition-colors hover:text-teal-deep"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[13px] font-extrabold tracking-[0.12em] text-ink">CONTACT</h3>
          <ul className="mt-4 space-y-3 text-[14px]">
            <li className="flex items-center gap-2.5">
              <WhatsAppGlyph className="h-4 w-4 text-ink/60" />
              <a href={CONTACT.whatsapp} className="font-bold text-ink hover:text-teal-deep">
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-muted">
              <Clock className="h-4 w-4" /> Support 7/7 beschikbaar
            </li>
            <li className="flex items-center gap-2.5 text-muted">
              <Zap className="h-4 w-4" /> Activering in 5–15 min
            </li>
          </ul>
        </div>

        {/* Secure payment card */}
        <div className="h-fit rounded-2xl border border-teal/10 bg-white px-5 py-5 shadow-soft">
          <p className="flex items-center justify-center gap-2 text-[14px] font-bold text-ink">
            <Lock className="h-4 w-4" /> Veilig betalen
          </p>
          <div className="mt-4 flex justify-center">
            <img
              src={PAYMENT_ICONS}
              alt={PAYMENT_ICONS_ALT}
              loading="lazy"
              decoding="async"
              className="h-[28px] w-auto max-w-full object-contain"
            />
          </div>
          <p className="mt-4 text-center text-[12px] font-semibold leading-relaxed text-ink">
            Beveiligde betaling via iDEAL, Visa, Mastercard, PayPal &amp; Bancontact
          </p>
        </div>
      </div>

      {/* Partner links */}
      <div className="mt-12 border-t border-slate-200 pt-8">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-extrabold text-ink">Sites Web partenaires</h3>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-r from-teal to-sky-deep" />
        </div>
        <a
          href="/"
          className="mt-4 inline-flex items-center gap-2.5 text-[14px] font-semibold text-ink hover:text-teal-deep"
        >
          <Link2 className="h-4 w-4 text-muted" /> Abonnement IPTV
        </a>
      </div>

      {/* Trust chips */}
      <div className="mt-8 flex flex-wrap justify-center gap-3 border-t border-slate-200 pt-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-ink shadow-soft">
          <ShieldCheck className="h-4 w-4 text-teal-deep" /> SSL Beveiligd
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-ink shadow-soft">
          <Star className="h-4 w-4 text-coral" /> 4.9/5 Beoordeling
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-ink shadow-soft">
          <span aria-hidden="true">🇳🇱</span> Nederlandse Service
        </span>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 flex flex-col items-center gap-6 border-t border-slate-200 pt-8 pb-[calc(env(safe-area-inset-bottom,0px))] lg:flex-row lg:justify-between lg:pb-0">
        <p className="text-[13px] text-muted">
          © 2026 KijkIPTV — Premium IPTV Nederland. Alle rechten voorbehouden.
        </p>
        <Logo />
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {LEGAL.map((item) => (
            <li key={item}>
              <a
                href="/"
                className="text-[13px] font-semibold text-ink transition-colors hover:text-teal-deep"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);
