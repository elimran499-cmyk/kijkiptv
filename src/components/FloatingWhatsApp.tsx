import React from 'react';
import { CONTACT } from '../data/iptvData';
import { WhatsAppGlyph } from './ui';

/**
 * Desktop-only floating bubble. On phones the compact sticky navbar already
 * carries its own WhatsApp button once scrolled, and the sticky bottom CTA
 * bar sits along the bottom edge — a third floating WA target would pile up
 * on top of both, so it is dropped below the `xl` breakpoint entirely.
 */
export const FloatingWhatsApp: React.FC = () => (
  <a
    href={CONTACT.whatsapp}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contact via WhatsApp"
    className="glass-btn glass-btn--whatsapp fixed bottom-6 right-6 z-40 hidden h-14 w-14 xl:flex"
  >
    <WhatsAppGlyph className="h-7 w-7" />
  </a>
);
