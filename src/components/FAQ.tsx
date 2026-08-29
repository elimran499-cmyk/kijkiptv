import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CONTACT, FAQ_ITEMS } from '../data/iptvData';
import { Check, GlassButton, WhatsAppGlyph } from './ui';
import { usePageHeadingTag } from '../router';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const Heading = usePageHeadingTag();

  return (
    <section id="faq" className="bg-mist py-12 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-5">
        <div className="text-center">
          <Heading className="text-[clamp(1.75rem,5vw,2.625rem)] font-extrabold leading-tight">
            <span className="text-ink underline decoration-2 underline-offset-4">FAQ</span>{' '}
            <span className="text-ink">—</span>{' '}
            <span className="bg-gradient-to-r from-teal to-sky-deep bg-clip-text text-transparent">
              IPTV Abonnement
            </span>{' '}
            <span className="text-ink">(IPTV Nederland)</span>
          </Heading>
          <p className="mx-auto mt-5 max-w-3xl text-[15px] text-muted">
            Alles over activering, installatie, compatibiliteit en support van onze{' '}
            <strong className="font-bold text-ink">premium IPTV</strong>.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Accordion */}
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-soft transition-shadow"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex min-h-[44px] w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-[15px] font-bold text-ink">{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-teal-deep transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="animate-fadeIn border-t border-slate-100 px-5 py-4 text-[14px] leading-relaxed text-muted">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Support sidebar */}
          <aside className="band-teal grain relative h-fit overflow-hidden rounded-[24px] px-6 py-7 text-white shadow-card">
            <h3 className="relative z-10 text-xl font-extrabold">Direct hulp nodig?</h3>
            <p className="relative z-10 mt-3 text-[14px] leading-relaxed text-white/85">
              Neem contact op via WhatsApp voor snelle hulp en persoonlijke support.
            </p>

            <div className="relative z-10 mt-5">
              <GlassButton
                variant="whatsapp"
                size="md"
                block
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                icon={<WhatsAppGlyph className="h-4 w-4" />}
              >
                WhatsApp • Direct contact
              </GlassButton>
            </div>

            <ul className="relative z-10 mt-5 space-y-2.5 text-[13.5px] font-semibold">
              {[
                'Directe activering (Geen wachttijd)',
                'HD/4K stabiel & onbeperkt',
                'Installatiehulp inbegrepen',
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <Check className="text-white" />
                  {line}
                </li>
              ))}
            </ul>

            <p className="relative z-10 mt-5 text-center text-[12px] text-white/70">
              Of stuur ons een bericht via{' '}
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white underline"
              >
                WhatsApp
              </a>
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};
