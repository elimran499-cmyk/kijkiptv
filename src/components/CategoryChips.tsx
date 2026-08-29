import React from 'react';
import { Baby, Clapperboard, Film, Sparkles, Trophy } from 'lucide-react';
import { Link } from '../router';

/**
 * Streaming-app filter bar — the first structural signal that this is an app
 * shell, not a landing page. Sits directly under the hero and, like tapping
 * a genre chip on a Netflix/Videoland home screen, takes you straight to the
 * page carrying that content — a chip row that navigates is exactly how a
 * streaming app behaves.
 */
const CATEGORIES: Array<{ label: string; to: string; icon: React.ReactNode }> = [
  { label: 'Sport', to: '/zenders', icon: <Trophy className="h-4 w-4" /> },
  { label: 'Films', to: '/films-en-series', icon: <Film className="h-4 w-4" /> },
  { label: 'Series', to: '/films-en-series', icon: <Clapperboard className="h-4 w-4" /> },
  { label: 'Kinderen', to: '/zenders', icon: <Baby className="h-4 w-4" /> },
  { label: 'Nieuws', to: '/reviews', icon: <Sparkles className="h-4 w-4" /> },
];

export const CategoryChips: React.FC = () => (
  <div className="relative bg-mist pb-2 pt-6 sm:pt-8">
    <div className="rail mx-auto max-w-[1180px] gap-2.5 px-5 sm:flex-wrap sm:justify-center sm:overflow-visible">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.label}
          to={cat.to}
          className="glass-panel-light flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[13.5px] font-bold text-teal-deep transition-transform duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
        >
          {cat.icon}
          {cat.label}
        </Link>
      ))}
    </div>
  </div>
);
