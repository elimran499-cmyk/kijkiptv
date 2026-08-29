import appHotPlayer from '../assets/app-hot-player.webp';
import appIboPlayer from '../assets/app-ibo-player.webp';
import appIboProPlayer from '../assets/app-ibo-pro-player.webp';
import appIptvSmartersPro from '../assets/app-iptv-smarters-pro.webp';
import appSmartIptv from '../assets/app-smart-iptv.webp';
import appSmartStb from '../assets/app-smart-stb.webp';
import appXciptv from '../assets/app-xciptv.webp';
import paymentIcons from '../assets/payment-icons.webp';
import photoAbonnementPremium from '../assets/photo-abonnement-premium.webp';
import photoFranceIptvA from '../assets/photo-france-iptv-a.webp';
import photoFranceIptvB from '../assets/photo-france-iptv-b.webp';
import type {
  AppLogo,
  BenefitCard,
  ComparisonRow,
  CustomerReview,
  FAQItem,
  MultiScreenPlan,
  PricingPlan,
  StepCard,
} from '../types';

export const CONTACT = {
  phone: '+44 7832 486269',
  /** wa.me needs the number in E.164 with no spaces or leading plus. */
  whatsapp: 'https://wa.me/447832486269',
};

/** Shared feature list used by every single-screen plan. */
const CORE_FEATURES = [
  '35.500+ Internationale tv-zenders',
  '179.000+ films & series on-demand',
  'SD/HD/FHD/4K/UHD Beeldkwaliteit',
  'Anti-buffer EU-servers (stabiel)',
  '99,99% Stabiliteit',
  'TV terugkijken (Replay TV) + EPG',
  '7 dagen geld-terug garantie',
];

/**
 * Backdrop photos, bundled from src/assets so the site works offline. Each is
 * used behind a dark scrim so white text stays readable — swap which section
 * uses which by moving the constant, the layering is identical everywhere.
 */
export const HOW_IMAGE = photoAbonnementPremium;
export const FOOTBALL_IMAGE = photoFranceIptvB;

/** Hero cycles through these, crossfading. Order is the display order. */
export const HERO_IMAGES = [
  photoFranceIptvA,
  photoAbonnementPremium,
  photoFranceIptvB,
];

/** Seconds each hero photo stays on screen before crossfading to the next. */
export const HERO_SLIDE_SECONDS = 6;

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-3m',
    duration: '3 Maanden',
    price: '€29,00',
    originalPrice: '€34,95',
    perMonthLabel: 'Meest flexibel • €9,67/maand',
    highlightLabel: 'Flexibele keuze — geen lange termijn',
    highlightIcon: '🎬',
    screens: '1 apparaat',
    features: CORE_FEATURES,
  },
  {
    id: 'plan-12m',
    duration: '12 Maanden',
    price: '€49,00',
    originalPrice: '€69,95',
    perMonthLabel: 'Meest gekozen • €4,08/maand',
    highlightLabel: 'Maximaal voordeel — laagste prijs',
    highlightIcon: '🚀',
    ribbon: 'Populair',
    screens: '1 apparaat',
    features: CORE_FEATURES,
  },
  {
    id: 'plan-12m-family',
    duration: '12 Maanden',
    price: '€79,00',
    originalPrice: '€98,00',
    perMonthLabel: 'Gezinspakket • 2 apparaten tegelijk',
    highlightLabel: 'Perfect voor gezinnen',
    highlightIcon: '👨‍👩‍👧',
    badge: '🔥Beste deal',
    featured: true,
    screens: '2 apparaten tegelijk',
    features: CORE_FEATURES,
  },
  {
    id: 'plan-24m',
    duration: '24 Maanden',
    price: '€89,00',
    originalPrice: '€150,00',
    perMonthLabel: 'Langste termijn • €3,71/maand',
    highlightLabel: 'Beste prijs per maand',
    highlightIcon: '🌍',
    screens: '1 apparaat',
    features: CORE_FEATURES,
  },
];

export const MULTISCREEN_PLANS: MultiScreenPlan[] = [
  {
    id: 'ms-3',
    title: '12 Maanden • 3 Schermen',
    price: '€109,00',
    screensLabel: '3 schermen tegelijk • €9,08/mnd',
    badge: 'Laagste prijs per maand',
    badgeIcon: '🔥',
    connections: '3 gelijktijdige verbindingen',
  },
  {
    id: 'ms-4',
    title: '12 Maanden • 4 Schermen',
    price: '€139,00',
    screensLabel: '4 schermen tegelijk • €11,58/mnd',
    badge: 'Laagste prijs per maand',
    badgeIcon: '🔥',
    connections: '4 gelijktijdige verbindingen',
  },
  {
    id: 'ms-5',
    title: '12 Maanden • 5 Schermen',
    price: '€169,00',
    screensLabel: '5 schermen tegelijk • €14,08/mnd',
    badge: 'Meest gekozen door gezinnen',
    badgeIcon: '👨‍👩‍👧',
    connections: '5 gelijktijdige verbindingen',
  },
];

export const MULTISCREEN_FEATURES = CORE_FEATURES;

export const BENEFITS: BenefitCard[] = [
  {
    id: 'b1',
    title: '4K / Full HD — stabiele streams',
    body: 'Geoptimaliseerde EU/NL netwerken: wedstrijden, films en series zonder onderbrekingen, minimale latency, betrouwbaar IPTV Abonnement.',
  },
  {
    id: 'b2',
    title: 'Compatibel met alle apparaten',
    body: 'Samsung/LG Smart TV, Android/Google TV, Fire TV, Apple TV, iOS/Android, PC/Mac (M3U & Xtream).',
  },
  {
    id: 'b3',
    title: 'IPTV onbeperkt & flexibel',
    body: 'Duidelijke aanbiedingen, geen verborgen kosten, VOD & replay, automatische zenderupdates IPTV Nederland.',
  },
  {
    id: 'b4',
    title: 'WhatsApp Support NL 24/7',
    body: 'Eenvoudige handleidingen + directe hulp tot volledige activering van je premium IPTV.',
  },
  {
    id: 'b5',
    title: '7 Dagen Geld-Terug Garantie',
    body: 'Beveiligde betaling, privacy gerespecteerd, eerst proberen voordat je beslist over je IPTV abonnement.',
  },
  {
    id: 'b6',
    title: 'Sport, films & series',
    body: 'Nederlandse & internationale zenders, VOD 4K/HD, grote sportevenementen live — Eredivisie, Champions League, F1.',
  },
];

export const BENEFIT_PILLS = [
  { label: 'Veilige betaling', icon: 'lock' },
  { label: 'Activering 5–15 min', icon: 'zap' },
  { label: 'HD/4K Kwaliteit', icon: 'star' },
  { label: 'WhatsApp 24/7', icon: 'whatsapp' },
  { label: 'Focus op Nederland', icon: 'flag' },
];

/** Player apps we're compatible with. Tiles without a `logo` fall back to text. */
export const APP_LOGOS: AppLogo[] = [
  { id: 'a1', name: 'IPTV Smarters Pro', color: '#6d28d9', logo: appIptvSmartersPro },
  { id: 'a2', name: 'IBO Player', color: '#dc2626', logo: appIboPlayer },
  { id: 'a3', name: 'IBO Pro Player', color: '#7c3aed', logo: appIboProPlayer },
  { id: 'a4', name: 'Smart STB', color: '#1d4ed8', logo: appSmartStb },
  { id: 'a5', name: 'Smart IPTV', color: '#b91c1c', logo: appSmartIptv },
  { id: 'a6', name: 'Hot Player', color: '#f97316', logo: appHotPlayer },
  { id: 'a7', name: 'XCIPTV', color: '#dc2626', logo: appXciptv },
  { id: 'a8', name: 'TiVimate', color: '#2563eb' },
];

/** The 3-step "buy, activate, watch" strip. */
export const BUY_STEPS: StepCard[] = [
  {
    id: 's1',
    number: 1,
    title: 'Kies je IPTV Abonnement',
    body: 'maandelijks, per kwartaal of jaarlijks',
    bullets: [],
  },
  {
    id: 's2',
    number: 2,
    title: 'Veilige betaling (iDEAL, PayPal, kaart).',
    body: 'Activering direct.',
    bullets: [],
  },
  {
    id: 's3',
    number: 3,
    title: 'Installeer & kijk in HD/4K',
    body: 'op Smart TV, Android, iOS, Box & PC',
    bullets: [],
  },
];

export const HOW_IT_WORKS: StepCard[] = [
  {
    id: 'h1',
    number: 1,
    title: 'Kies je aanbieding',
    body: 'Selecteer je formule voor IPTV abonnement.',
    bullets: ['Zonder verplichtingen', 'Directe activering', 'Nederlandse support'],
  },
  {
    id: 'h2',
    number: 2,
    title: 'Installeer de IPTV app',
    body: 'Ontvang je toegangsgegevens en configureer je applicatie.',
    bullets: ['Smart TV, Android, iOS, PC', 'Handleidingen inbegrepen', 'Stabiele HD/4K streaming'],
  },
  {
    id: 'h3',
    number: 3,
    title: 'Geniet zonder limiet',
    body: 'Toegang tot al je favoriete zenders, films en sport.',
    bullets: ['Zenders & VOD onbeperkt', 'Live sport', 'Premium kwaliteit'],
  },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  { id: 'c1', criterion: 'Snelle activering (5–15 min)', iconName: 'zap' },
  { id: 'c2', criterion: 'HD/4K kwaliteit stabiel (anti-buffer)', iconName: 'monitor' },
  { id: 'c3', criterion: 'Compatibel Smart TV, Android, iOS, PC & Box', iconName: 'smartphone' },
  { id: 'c4', criterion: 'EPG, Replay & VOD films/series', iconName: 'list' },
  {
    id: 'c5',
    criterion: 'Sport & live evenementen (afhankelijk van beschikbaarheid)',
    iconName: 'football',
  },
  { id: 'c6', criterion: 'Nederlandse support 24/7 (WhatsApp)', iconName: 'whatsapp' },
  { id: 'c7', criterion: 'Geen verborgen kosten • 7 dagen geld-terug', iconName: 'euro' },
  { id: 'c8', criterion: 'Wekelijkse catalogus updates', iconName: 'refresh' },
];

export const WHY_CARDS: BenefitCard[] = [
  {
    id: 'w1',
    title: 'Zonder verplichtingen',
    body: 'Stop wanneer je wilt. KijkIPTV = totale flexibiliteit.',
  },
  {
    id: 'w2',
    title: 'Premium ervaring in Nederland',
    body: 'Vloeiende HD/4K streaming voor films, series, entertainment en internationale zenders.',
  },
  {
    id: 'w3',
    title: '24/7 Ondersteuning',
    body: 'Begeleide installatie + directe hulp via WhatsApp, 7/7.',
  },
];

export const VOD_CARDS: BenefitCard[] = [
  {
    id: 'v1',
    title: 'Duidelijke categorieën',
    body: 'Vind snel wat je wilt kijken dankzij een eenvoudige en georganiseerde navigatie.',
  },
  {
    id: 'v2',
    title: 'Vloeiend afspelen',
    body: 'Een stabiele ervaring, met HD/4K kwaliteit afhankelijk van je apparaat en verbinding.',
  },
  {
    id: 'v3',
    title: 'Multi-apparaten',
    body: 'Compatibel met Smart TV, Android, iOS, Box & PC — en hulp indien nodig.',
  },
];

export const REVIEWS: CustomerReview[] = [
  {
    id: 'r1',
    author: 'Lucas M.',
    location: 'Amsterdam',
    comment:
      'Snelle activering, beeld 4K super stabiel. De NL zenders zijn compleet en het buffert nooit.',
  },
  {
    id: 'r2',
    author: 'Sophie B.',
    location: 'Rotterdam',
    comment:
      'WhatsApp support zeer reactief. Ik had toegang binnen enkele minuten. Top op Smart TV.',
  },
  {
    id: 'r3',
    author: 'Thomas D.',
    location: 'Utrecht',
    comment: 'VOD + sport + internationale zenders. Ik wilde iets premium en ik ben tevreden.',
  },
  {
    id: 'r4',
    author: 'Emma L.',
    location: 'Den Haag',
    comment: 'Werkt perfect op Apple TV en Android. Eenvoudige interface, nette kwaliteit.',
  },
  {
    id: 'r5',
    author: 'Daan V.',
    location: 'Eindhoven',
    comment: 'Installatie in een paar minuten met de handleiding. Live sport zonder haperingen.',
  },
  {
    id: 'r6',
    author: 'Julia K.',
    location: 'Groningen',
    comment: 'Goede prijs-kwaliteit. De replay en EPG functies gebruik ik dagelijks.',
  },
  {
    id: 'r7',
    author: 'Sem J.',
    location: 'Tilburg',
    comment: 'Twee apparaten tegelijk voor het gezin. Alles blijft stabiel in Full HD.',
  },
  {
    id: 'r8',
    author: 'Noa P.',
    location: 'Almere',
    comment: 'Duidelijke uitleg, veilige betaling en direct actief. Precies wat beloofd werd.',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'f1',
    question: 'Hoe lang duurt het om mijn IPTV Abonnement te activeren?',
    answer:
      'Na een geslaagde betaling wordt je IPTV abonnement doorgaans binnen 5 tot 15 minuten geactiveerd. Je ontvangt je toegangsgegevens per e-mail of via WhatsApp, zodat je direct kunt beginnen met kijken.',
  },
  {
    id: 'f2',
    question: 'Welke apparaten zijn compatibel met jullie IPTV Nederland?',
    answer:
      'Onze dienst werkt op Samsung en LG Smart TV, Android en Google TV, Fire TV en Fire Stick, Apple TV, iOS en Android smartphones en tablets, MAG-boxen en PC/Mac. We ondersteunen zowel M3U als Xtream Codes.',
  },
  {
    id: 'f3',
    question: 'Hoe installeer ik de beste IPTV op mijn TV of mobiel?',
    answer:
      'Je installeert een compatibele app zoals IPTV Smarters, TiVimate, IBO Player of Smart IPTV en vult je toegangsgegevens in. Je ontvangt duidelijke Nederlandse handleidingen bij je bestelling en onze support helpt je via WhatsApp tot alles werkt.',
  },
  {
    id: 'f4',
    question: 'Kan ik snel beginnen als ik er niets van weet?',
    answer:
      'Ja. Je hebt geen technische kennis nodig. We begeleiden je stap voor stap bij de installatie via WhatsApp en de meeste klanten kijken binnen een kwartier. Onze Nederlandse support is 7 dagen per week beschikbaar.',
  },
  {
    id: 'f5',
    question: 'Wat is de kwaliteit en stabiliteit van jullie premium IPTV?',
    answer:
      'We streamen in SD, HD, Full HD, 4K en UHD via anti-buffer EU-servers met 99,99% stabiliteit. De uiteindelijke beeldkwaliteit hangt af van je internetsnelheid en apparaat; we raden minimaal 25 Mbps aan voor 4K.',
  },
  {
    id: 'f6',
    question: 'Welke betaalmethodes en verlengingsopties bieden jullie?',
    answer:
      'Je kunt veilig betalen via iDEAL, Visa, Mastercard, American Express, Bancontact, PayPal, Apple Pay en Google Pay. Er is geen automatische verlenging: je verlengt zelf wanneer je wilt en je hebt 7 dagen geld-terug garantie.',
  },
];

export const NAV_LINKS = [
  { label: 'IPTV Kopen', href: '/' },
  { label: 'Zenders', href: '/zenders' },
  { label: 'Films & Series', href: '/films-en-series' },
  { label: 'IPTV Abonnement', href: '/pakketten' },
  { label: 'Installatiegids', href: '/hoe-werkt-het' },
  { label: 'Nieuws', href: '/reviews' },
  { label: 'FAQ', href: '/faq' },
];

export const FOOTER_PAGES = [
  'Home',
  'Zenders',
  'Films & Series',
  'IPTV Abonnement',
  'Installatiegids',
  'FAQ',
  'Contact',
];

/** Single sprite holding every card logo, as used in production. */
export const PAYMENT_ICONS = paymentIcons;
export const PAYMENT_ICONS_ALT = 'Betaalmethoden: iDEAL, PayPal, Visa, Mastercard';
