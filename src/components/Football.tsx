import React from 'react';
import { Trophy } from 'lucide-react';
import { FOOTBALL_IMAGE } from '../data/iptvData';
import { SectionHeading } from './ui';

const STATS = [
  { label: 'Live wedstrijden', icon: '⚽' },
  { label: 'HD/4K streaming', icon: '📺' },
  { label: 'WhatsApp support 24/7', icon: '💬' },
];

export const Football: React.FC = () => (
  <section id="voetbal" className="band-coral grain relative overflow-hidden py-14 sm:py-16">
    <div
      className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
      style={{ backgroundImage: `url('${FOOTBALL_IMAGE}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      aria-hidden="true"
    />
    <div className="blob -left-16 -top-16 h-64 w-64 bg-white/25" aria-hidden="true" />
    <div className="blob -right-10 bottom-0 h-72 w-72 bg-teal/25" aria-hidden="true" />

    <div className="relative mx-auto max-w-[1180px] px-5 text-center">
      <span className="glass-panel mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full text-white">
        <Trophy className="h-6 w-6" />
      </span>

      <SectionHeading
        light
        sub={
          <>
            Geniet van live voetbal met vloeiende{' '}
            <strong className="font-bold text-white">HD/4K</strong> streaming. Bekijk de grote
            sportevenementen het hele seizoen door, eenvoudig toegankelijk op{' '}
            <strong className="font-bold text-white">Smart TV, Android, iOS, Box &amp; PC</strong>.
          </>
        }
      >
        Het beste van voetbal — IPTV Abonnement
      </SectionHeading>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {STATS.map((stat) => (
          <span
            key={stat.label}
            className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-bold text-white"
          >
            <span aria-hidden="true">{stat.icon}</span>
            {stat.label}
          </span>
        ))}
      </div>
    </div>
  </section>
);
