import React from 'react';
import {
  Clapperboard,
  CreditCard,
  HelpCircle,
  MessageCircle,
  Monitor,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Star,
  Trophy,
  Tv,
} from 'lucide-react';
import { AppCompat } from './components/AppCompat';
import { Benefits } from './components/Benefits';
import { BuySteps } from './components/BuySteps';
import { Channels } from './components/Channels';
import { Comparison } from './components/Comparison';
import { FAQ } from './components/FAQ';
import { FilmsSeries } from './components/FilmsSeries';
import { Football } from './components/Football';
import { HowItWorks } from './components/HowItWorks';
import { Pricing } from './components/Pricing';
import { Reviews } from './components/Reviews';
import { RailHeader } from './components/ui';
import { TOTAL_CHANNELS, TOTAL_VOD } from './data/catalog';
import { Link } from './router';

/* Every section is its own page now, so each one needs a real path plus its
   own title and description — otherwise splitting the page would leave
   twelve URLs all claiming the same metadata, which is worse for search than
   one long page was. */

export interface RouteDef {
  path: string;
  /** Short label for nav, footer and the home-screen cards. */
  label: string;
  title: string;
  description: string;
  /** Icon on the home screen's poster card. */
  icon: React.ReactNode;
  /** Undefined on the home route, which composes its own body. */
  render?: () => React.ReactNode;
}

export const PACKS_PATH = '/pakketten';

export const ROUTES: RouteDef[] = [
  {
    path: '/',
    label: 'Home',
    title: 'IPTV Kopen bij KijkIPTV | Beste IPTV Aanbieder 2026',
    description:
      'Ontdek het ultieme IPTV Abonnement voor IPTV Nederland: duizenden zenders, films, series en live sport in HD/4K kwaliteit. Directe activering, WhatsApp support 7/7.',
    icon: <Tv className="h-5 w-5" />,
  },
  {
    path: PACKS_PATH,
    label: 'Pakketten',
    title: 'IPTV Pakketten & Prijzen | KijkIPTV',
    description:
      'Kies je IPTV pakket: Basis of Premium VIP, voor 1 tot 4 apparaten, met looptijden van 3, 6, 12 of 24 maanden. Transparante prijzen, geen verborgen kosten.',
    icon: <CreditCard className="h-5 w-5" />,
    render: () => <Pricing />,
  },
  {
    path: '/zenders',
    label: 'Zenders',
    title: `${TOTAL_CHANNELS} TV- en Sportzenders | KijkIPTV`,
    description: `${TOTAL_CHANNELS} zenders — van NPO, RTL en SBS6 tot Ziggo Sport, ESPN en Viaplay — Nederlandse hoofdzenders voorop, allemaal in HD/4K.`,
    icon: <Tv className="h-5 w-5" />,
    render: () => <Channels />,
  },
  {
    path: '/films-en-series',
    label: 'Films & Series',
    title: 'Films & Series On-Demand | KijkIPTV',
    description: `Een streamingbibliotheek van ${TOTAL_VOD} films en series on-demand, in HD/4K en wekelijks bijgewerkt met nieuwe releases.`,
    icon: <Clapperboard className="h-5 w-5" />,
    render: () => <FilmsSeries />,
  },
  {
    path: '/apparaten',
    label: 'Apparaten',
    title: 'Compatibele Apparaten & Apps | KijkIPTV',
    description:
      'Werkt op Smart TV, Android, iOS, Fire Stick, Apple TV, MAG-boxen en PC. Ondersteuning voor IPTV Smarters Pro, TiVimate, IBO Player en meer.',
    icon: <Monitor className="h-5 w-5" />,
    render: () => <AppCompat />,
  },
  {
    path: '/voordelen',
    label: 'Voordelen',
    title: 'Voordelen van KijkIPTV | Stabiel, Snel, Onbeperkt',
    description:
      'Anti-buffer EU-servers, 99,99% stabiliteit, directe activering en Nederlandse WhatsApp support 7 dagen per week — dit krijg je bij KijkIPTV.',
    icon: <ShieldCheck className="h-5 w-5" />,
    render: () => <Benefits />,
  },
  {
    path: '/bestellen',
    label: 'Bestellen',
    title: 'Zo Bestel Je Je IPTV Abonnement | KijkIPTV',
    description:
      'In drie stappen geregeld: kies je IPTV abonnement, betaal veilig via iDEAL, PayPal of kaart, en begin direct met kijken in HD/4K.',
    icon: <ShoppingCart className="h-5 w-5" />,
    render: () => <BuySteps />,
  },
  {
    path: '/hoe-werkt-het',
    label: 'Hoe werkt het',
    title: 'Hoe Werkt IPTV? Installatiegids | KijkIPTV',
    description:
      'Hoe IPTV werkt en hoe je het installeert op je TV, telefoon of box. Duidelijke Nederlandse uitleg en hulp via WhatsApp tot alles werkt.',
    icon: <HelpCircle className="h-5 w-5" />,
    render: () => <HowItWorks />,
  },
  {
    path: '/vergelijking',
    label: 'Vergelijking',
    title: 'KijkIPTV Vergelijken met Andere Aanbieders',
    description:
      'Waarom KijkIPTV kiezen? Vergelijk activering, HD/4K stabiliteit, compatibiliteit, support en prijs met andere IPTV aanbieders.',
    icon: <Scale className="h-5 w-5" />,
    render: () => <Comparison />,
  },
  {
    path: '/voetbal',
    label: 'Voetbal',
    title: 'Voetbal Kijken via IPTV | KijkIPTV',
    description:
      'De grote competities live in HD/4K streaming, eenvoudig toegankelijk op Smart TV, Android, iOS, Box en PC — zonder buffering.',
    icon: <Trophy className="h-5 w-5" />,
    render: () => <Football />,
  },
  {
    path: '/reviews',
    label: 'Reviews',
    title: 'Ervaringen & Reviews | KijkIPTV',
    description:
      'Wat klanten zeggen over KijkIPTV: beeldkwaliteit, stabiliteit, snelheid van activering en de Nederlandse WhatsApp support.',
    icon: <Star className="h-5 w-5" />,
    render: () => <Reviews />,
  },
  {
    path: '/faq',
    label: 'FAQ',
    title: 'Veelgestelde Vragen over IPTV | KijkIPTV',
    description:
      'Alles over activering, installatie, compatibiliteit, betaalmethodes en support van je IPTV abonnement bij KijkIPTV.',
    icon: <MessageCircle className="h-5 w-5" />,
    render: () => <FAQ />,
  },
];

export const findRoute = (path: string): RouteDef =>
  ROUTES.find((r) => r.path === path) ?? ROUTES[0];

/**
 * Home-screen index into the other pages. Not a plain link list: each entry
 * is a poster-style tile — a dark teal band carrying the route's icon, like
 * a shelf of app tiles rather than a sitemap — so the home route still reads
 * as this site's streaming-app shell once the sections move out to their
 * own pages.
 */
export const HomeIndex: React.FC = () => {
  const items = ROUTES.filter((r) => r.path !== '/');

  return (
    <section className="bg-mist py-12 sm:py-20">
      <RailHeader
        kicker="Ontdek KijkIPTV"
        title="Alles in de app"
        count={items.length}
        className="mx-auto max-w-[1180px]"
      />
      <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-3 px-5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {items.map((route, i) => (
          <Link
            key={route.path}
            to={route.path}
            className="card-lift group flex flex-col overflow-hidden rounded-[22px] border border-teal/15 bg-white shadow-soft no-underline"
          >
            <div className="band-teal grain relative flex h-24 items-center justify-center sm:h-28">
              <span
                aria-hidden="true"
                className="absolute left-3 top-3 font-mono text-[10px] font-bold tracking-[0.16em] text-white/60"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="glass-panel relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-white">
                {route.icon}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-1 p-4">
              <span className="text-[14.5px] font-extrabold text-ink transition-colors group-hover:text-teal-deep sm:text-[15px]">
                {route.label}
              </span>
              <span className="line-clamp-2 text-[12.5px] leading-relaxed text-muted">
                {route.description.split('.')[0]}.
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
