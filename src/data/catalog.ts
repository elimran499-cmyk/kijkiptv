/* ── Gedeelde catalogus ───────────────────────────────────────────────────
   Zenders, films/series en de pakketprijzen. Deze data is identiek op alle
   drie de sites — alleen de vormgeving verschilt. Prijzen en pakketinhoud
   komen één-op-één uit het bestaande aanbod; pas ze hier aan, nergens anders.

   Logo's staan in /public/logos, posters in /public/posters, dus ze worden
   als gewone URL-strings geladen (geen bundler-import) en kunnen lui laden.

   Elke zender en elke titel komt precies één keer in deze lijsten voor. De
   marquees dupliceren hun rij in de DOM om naadloos te kunnen loopen — dat is
   een render-truc, geen dubbele data. Toon nooit dezelfde titel twee keer in
   twee zichtbare rijen naast elkaar; verdeel de lijst in plaats daarvan.
   ──────────────────────────────────────────────────────────────────────── */

export interface NlChannel {
  id: string;
  /** Zendernaam zoals die in de gids staat. */
  name: string;
  /** Pad onder /public/logos. */
  logo: string;
  /** Kort label voor de categoriechip. */
  category: string;
  /** Beeldkwaliteit, getoond als badge. */
  quality: string;
  /** Helderheid van het logo zelf, gemeten uit de pixels. 'light' = een wit
   *  of licht merk dat op een witte tegel onzichtbaar is en dus een donkere
   *  plaat nodig heeft; 'dark' staat goed op wit. */
  tone: 'light' | 'dark';
}

export interface VodTitle {
  id: string;
  title: string;
  /** Pad onder /public/posters. */
  poster: string;
  genre: string;
  year: number;
  /** 'film' of 'serie' — stuurt het filterlabel aan. */
  kind: 'film' | 'serie';
}

export interface PackageTier {
  id: 'basic' | 'vip';
  name: string;
  headline: string;
  features: string[];
}

export interface DurationPack {
  id: string;
  label: string;
  /** Gefactureerde maanden — basis voor het bedrag per maand. */
  months: number;
  bestDeal?: boolean;
  savePercent?: number;
  /** Prijs per aantal apparaten; index 0 = 1 apparaat. */
  prices: Record<'basic' | 'vip', number[]>;
}

/* ── Nederlandse zenders ─────────────────────────────────────────────────
   Alleen de hoofdzenders — de netten die iedereen herkent. Bewust géén
   sub-varianten (Film1-genrekanalen, Nick Jr / Nicktoons, Zappelin) en géén
   regionale omroepen: die maakten de muur druk en herhalend zonder iets toe
   te voegen. De teller in de sectiekop noemt het volledige aanbod (80.000+);
   dit is de etalage.

   Twee aparte stroken, elk met een eigen kop: tv-zenders en sportzenders.
   Zo ziet een bezoeker in één oogopslag dat beide in het pakket zitten.

   `tone` blijft kloppende metadata, maar alle tegels staan op één donkere
   plaat: geen enkel logo hier zit onder luminantie 0.34, dus ze zijn stuk
   voor stuk leesbaar op donker en de rij oogt rustig in plaats van als een
   schaakbord van wisselend wit en donker. */
export const TV_CHANNELS: NlChannel[] = [
  { id: 'npo1', name: 'NPO 1'              , logo: '/logos/npo1-nl.png', category: 'Algemeen', quality: 'FHD 60FPS', tone: 'dark' },
  { id: 'npo2', name: 'NPO 2'              , logo: '/logos/npo2-nl.png', category: 'Algemeen', quality: 'FHD 60FPS', tone: 'light' },
  { id: 'npo3', name: 'NPO 3'              , logo: '/logos/npo3-nl.png', category: 'Algemeen', quality: 'FHD 60FPS', tone: 'light' },
  { id: 'rtl4', name: 'RTL 4'              , logo: '/logos/rtl4-nl.png', category: 'Algemeen', quality: 'FHD 60FPS', tone: 'light' },
  { id: 'rtl5', name: 'RTL 5'              , logo: '/logos/rtl5-nl.png', category: 'Algemeen', quality: 'FHD 60FPS', tone: 'dark' },
  { id: 'rtl7', name: 'RTL 7'              , logo: '/logos/rtl7-nl.png', category: 'Algemeen', quality: 'FHD 60FPS', tone: 'light' },
  { id: 'rtl8', name: 'RTL 8'              , logo: '/logos/rtl8-nl.png', category: 'Algemeen', quality: 'FHD 60FPS', tone: 'dark' },
  { id: 'sbs6', name: 'SBS6'               , logo: '/logos/sbs6-nl.png', category: 'Algemeen', quality: 'FHD 60FPS', tone: 'dark' },
  { id: 'sbs9', name: 'SBS9'               , logo: '/logos/sbs9-nl.png', category: 'Algemeen', quality: 'HD', tone: 'light' },
  { id: 'net5', name: 'Net5'               , logo: '/logos/net5-nl.png', category: 'Algemeen', quality: 'HD', tone: 'light' },
  { id: 'veronica', name: 'Veronica'           , logo: '/logos/veronica-nl.png', category: 'Algemeen', quality: 'HD', tone: 'dark' },
  { id: 'videoland', name: 'Videoland'          , logo: '/logos/videoland-nl.png', category: 'Films', quality: 'HD', tone: 'light' },
  { id: 'film1premiere', name: 'Film1 Premiere'     , logo: '/logos/film1-premiere-nl.png', category: 'Films', quality: 'HD', tone: 'light' },
  { id: 'fox', name: 'FOX'                , logo: '/logos/fox-nl.png', category: 'Films', quality: 'HD', tone: 'dark' },
  { id: 'discoverychannel', name: 'Discovery Channel'  , logo: '/logos/discovery-channel-nl.png', category: 'Documentaire', quality: 'FHD 60FPS', tone: 'light' },
  { id: 'nationalgeographic', name: 'National Geographic', logo: '/logos/national-geographic-nl.png', category: 'Documentaire', quality: 'FHD 60FPS', tone: 'light' },
  { id: 'historychannel', name: 'History'            , logo: '/logos/history-channel-nl.png', category: 'Documentaire', quality: 'HD', tone: 'light' },
  { id: 'tlc', name: 'TLC'                , logo: '/logos/tlc-nl.png', category: 'Documentaire', quality: 'HD', tone: 'dark' },
  { id: 'comedycentral', name: 'Comedy Central'     , logo: '/logos/comedy-central-nl.png', category: 'Entertainment', quality: 'HD', tone: 'light' },
  { id: 'mtv', name: 'MTV'                , logo: '/logos/mtv-nl.png', category: 'Muziek', quality: 'HD', tone: 'light' },
  { id: 'disneychannel', name: 'Disney Channel'     , logo: '/logos/disney-channel-nl.png', category: 'Kinderen', quality: 'HD', tone: 'light' },
  { id: 'nickelodeon', name: 'Nickelodeon'        , logo: '/logos/nickelodeon-nl.png', category: 'Kinderen', quality: 'HD', tone: 'light' },
  { id: 'cartoonnetwork', name: 'Cartoon Network'    , logo: '/logos/cartoon-network-nl.png', category: 'Kinderen', quality: 'HD', tone: 'dark' },
  { id: 'npozapp', name: 'NPO Zapp'           , logo: '/logos/npo-zapp-nl.png', category: 'Kinderen', quality: 'FHD', tone: 'light' },
];

/* Sportzenders — de tweede strook. */
export const SPORT_CHANNELS: NlChannel[] = [
  { id: 'ziggosport', name: 'Ziggo Sport'      , logo: '/logos/ziggo-sport-nl.png', category: 'Sport', quality: '4K Ultra HD', tone: 'dark' },
  { id: 'espn', name: 'ESPN'             , logo: '/logos/espn-nl.png', category: 'Sport', quality: '4K Ultra HD', tone: 'dark' },
  { id: 'viaplay', name: 'Viaplay'          , logo: '/logos/viaplay-nl.png', category: 'Sport', quality: 'FHD 60FPS', tone: 'dark' },
  { id: 'eurosport1hd', name: 'Eurosport 1'      , logo: '/logos/eurosport-1-hd-nl.png', category: 'Sport', quality: 'FHD 60FPS', tone: 'light' },
  { id: 'nposport', name: 'NPO Sport'        , logo: '/logos/npo-sport-nl.png', category: 'Sport', quality: 'HD', tone: 'dark' },
  { id: 'extremesportschannel', name: 'Extreme Sports'   , logo: '/logos/extreme-sports-channel-nl.png', category: 'Sport', quality: 'HD', tone: 'light' },
];

/* Alles bij elkaar, voor plekken die één lijst willen (zoals het hero-paneel). */
export const NL_CHANNELS: NlChannel[] = [...TV_CHANNELS, ...SPORT_CHANNELS];

/* ── Films & series ──────────────────────────────────────────────────────
   30 unieke titels: 21 films en 9 series, elk met een eigen poster. Geen
   dubbelingen — de vier posters die een bestaande titel herhaalden zijn
   verwijderd. De sectiekop noemt de 200.000+ titels die er echt in zitten. */
export const VOD_TITLES: VodTitle[] = [
  { id: 'f1', title: 'Dune: Part Two'                , poster: '/posters/f1.webp', genre: 'Sci-Fi', year: 2024, kind: 'film' },
  { id: 'f2', title: 'Oppenheimer'                   , poster: '/posters/f2.webp', genre: 'Drama', year: 2023, kind: 'film' },
  { id: 'f3', title: 'The Batman'                    , poster: '/posters/f3.webp', genre: 'Actie', year: 2022, kind: 'film' },
  { id: 'f4', title: 'Interstellar'                  , poster: '/posters/f4.webp', genre: 'Sci-Fi', year: 2014, kind: 'film' },
  { id: 'f5', title: 'Blade Runner 2049'             , poster: '/posters/f5.webp', genre: 'Sci-Fi', year: 2017, kind: 'film' },
  { id: 'f6', title: 'Top Gun: Maverick'             , poster: '/posters/f6.webp', genre: 'Actie', year: 2022, kind: 'film' },
  { id: 'f7', title: 'John Wick'                     , poster: '/posters/f7.webp', genre: 'Actie', year: 2014, kind: 'film' },
  { id: 'f8', title: 'Joker'                         , poster: '/posters/f8.webp', genre: 'Thriller', year: 2019, kind: 'film' },
  { id: 'f9', title: 'Avatar: The Way of Water'      , poster: '/posters/f9.webp', genre: 'Avontuur', year: 2022, kind: 'film' },
  { id: 'f10', title: 'Gladiator II'                  , poster: '/posters/f10.webp', genre: 'Actie', year: 2024, kind: 'film' },
  { id: 'f11', title: 'Tenet'                         , poster: '/posters/f11.webp', genre: 'Sci-Fi', year: 2020, kind: 'film' },
  { id: 'f12', title: 'Sicario'                       , poster: '/posters/f12.webp', genre: 'Thriller', year: 2015, kind: 'film' },
  { id: 'f13', title: 'Deadpool & Wolverine'          , poster: '/posters/f13.webp', genre: 'Actie', year: 2024, kind: 'film' },
  { id: 'f14', title: 'Inception'                     , poster: '/posters/f14.webp', genre: 'Sci-Fi', year: 2010, kind: 'film' },
  { id: 'f15', title: 'Furiosa: A Mad Max Saga'       , poster: '/posters/f15.webp', genre: 'Actie', year: 2024, kind: 'film' },
  { id: 'f16', title: 'The Dark Knight'               , poster: '/posters/f16.webp', genre: 'Actie', year: 2008, kind: 'film' },
  { id: 'breakingbad', title: 'Breaking Bad'                  , poster: '/posters/breaking-bad.webp', genre: 'Drama', year: 2008, kind: 'serie' },
  { id: 'chernobyl', title: 'Chernobyl'                     , poster: '/posters/chernobyl.webp', genre: 'Drama', year: 2019, kind: 'serie' },
  { id: 'got', title: 'Game of Thrones'               , poster: '/posters/got.webp', genre: 'Fantasy', year: 2011, kind: 'serie' },
  { id: 'lastofus', title: 'The Last of Us'                , poster: '/posters/last-of-us.webp', genre: 'Drama', year: 2023, kind: 'serie' },
  { id: 'peaky', title: 'Peaky Blinders'                , poster: '/posters/peaky.webp', genre: 'Drama', year: 2013, kind: 'serie' },
  { id: 'sopranos', title: 'The Sopranos'                  , poster: '/posters/sopranos.webp', genre: 'Drama', year: 1999, kind: 'serie' },
  { id: 'stranger', title: 'Stranger Things'               , poster: '/posters/stranger.webp', genre: 'Sci-Fi', year: 2016, kind: 'serie' },
  { id: 'succession', title: 'Succession'                    , poster: '/posters/succession.webp', genre: 'Drama', year: 2018, kind: 'serie' },
  { id: 'thewire', title: 'The Wire'                      , poster: '/posters/the-wire.webp', genre: 'Misdaad', year: 2002, kind: 'serie' },
  { id: 'godfather', title: 'The Godfather'                 , poster: '/posters/godfather.webp', genre: 'Drama', year: 1972, kind: 'film' },
  { id: 'lotr', title: 'The Lord of the Rings'         , poster: '/posters/lotr.webp', genre: 'Avontuur', year: 2001, kind: 'film' },
  { id: 'parasite', title: 'Parasite'                      , poster: '/posters/parasite.webp', genre: 'Thriller', year: 2019, kind: 'film' },
  { id: 'pulp', title: 'Pulp Fiction'                  , poster: '/posters/pulp.webp', genre: 'Misdaad', year: 1994, kind: 'film' },
  { id: 'shawshank', title: 'The Shawshank Redemption'      , poster: '/posters/shawshank.webp', genre: 'Drama', year: 1994, kind: 'film' },
];

/* ── Pakketten ───────────────────────────────────────────────────────────
   Twee niveaus (Basis / Premium VIP) × drie looptijden × 1–4 apparaten.
   Prijzen zijn overgenomen van het bestaande aanbod — niet wijzigen.

   Volgorde is bewust lang → kort: 12+3 maanden eerst, dan 6, dan 3. De
   langste looptijd is de beste deal, dus die hoort vooraan te staan —
   render ze in arrayvolgorde en sorteer ze nergens opnieuw. */
export const PACKAGE_TIERS: PackageTier[] = [
  {
    id: 'basic',
    name: 'Basis',
    headline: 'Wat zit er in het Basis Pakket?',
    features: [
      'SD/HD/FULL HD Kwaliteit',
      '+25.000 Kanalen + Netflix',
      'RTL, NPO, ZIGGO, SBS, ESPN, Viaplay',
      '+140.000 Films & Series',
      'Wekelijkse Updates',
      '24/7 Support NL & BE',
      '100% Anoniem',
      'AntiFreeze Technologie',
      'Alle Apparaten',
      'Exclusieve NL & BE Content',
      'Netflix, Amazon, HBO, Apple TV, Hulu',
    ],
  },
  {
    id: 'vip',
    name: 'Premium VIP',
    headline: 'Wat zit er in het Premium VIP Pakket?',
    features: [
      'SD/HD/FULL HD/4K/8K/HDR-VR',
      '+80.000 Kanalen + Netflix',
      'RTL, NPO, ZIGGO, SBS, ESPN, Viaplay, VTM',
      '+200.000 Films & Series',
      'Dagelijkse Updates',
      'Alle Sport PPV Events',
      'VIP 24/7 Support',
      'Enterprise Anti-Freeze PRO',
      'Persoonlijke VIP Manager',
      'Alle Apparaten',
      'VPN Inbegrepen',
      'Exclusieve VIP Content',
      'Videoland, Netflix, Amazon, HBO, Apple TV, Hulu',
    ],
  },
];

export const DURATION_PACKS: DurationPack[] = [
  {
    id: 'pack-15m',
    label: '12+3 maanden',
    months: 15,
    bestDeal: true,
    savePercent: 50,
    prices: {
      basic: [49.0, 79.0, 109.0, 129.0],
      vip: [79.99, 124.99, 179.99, 199.99],
    },
  },
  {
    id: 'pack-6m',
    label: '6 maanden',
    months: 6,
    savePercent: 40,
    prices: {
      basic: [34.99, 49.99, 69.99, 89.99],
      vip: [49.99, 79.99, 99.99, 139.99],
    },
  },
  {
    id: 'pack-3m',
    label: '3 maanden',
    months: 3,
    savePercent: 30,
    prices: {
      basic: [24.99, 39.99, 49.99, 57.99],
      vip: [34.99, 49.99, 69.99, 89.99],
    },
  },
];

/* De twee cijfers die overal in de kopteksten terugkomen. */
export const TOTAL_CHANNELS = '80.000+';
export const TOTAL_VOD = '200.000+';
