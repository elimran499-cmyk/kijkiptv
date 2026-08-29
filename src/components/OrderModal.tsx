import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Lock, Monitor, X } from 'lucide-react';
import { CONTACT } from '../data/iptvData';
import { DURATION_PACKS, PACKAGE_TIERS, type PackageTier } from '../data/catalog';
import { Check, GlassButton, PaymentRow, WhatsAppGlyph } from './ui';
import { SegmentedControl } from './Pricing';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Kept for API compatibility with callers — every CTA on the site opens
   *  this as a generic "quick order" sheet now, so the modal always starts
   *  on the best-deal duration rather than trying to resolve an id. */
  initialPlanId?: string;
}

const formatPrice = (val: number) => `€${val.toFixed(2).replace('.', ',')}`;

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
  const reduceMotion = useReducedMotion() ?? false;
  const [tierId, setTierId] = useState<PackageTier['id']>('basic');
  const [durationId, setDurationId] = useState(DURATION_PACKS[0].id);
  const [devices, setDevices] = useState(1);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Lock background scroll while the sheet is open — a phone bottom sheet
  // that lets the page scroll behind it feels broken.
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const activeTier = PACKAGE_TIERS.find((t) => t.id === tierId) ?? PACKAGE_TIERS[0];
  const pack = DURATION_PACKS.find((p) => p.id === durationId) ?? DURATION_PACKS[0];
  const price = pack.prices[tierId][devices - 1];

  const waLink = `${CONTACT.whatsapp}?text=${encodeURIComponent(
    `Hallo KijkIPTV, ik wil graag bestellen: ${activeTier.name} — ${pack.label}, ${devices} ` +
      `${devices === 1 ? 'apparaat' : 'apparaten'} (${formatPrice(price)}).`,
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Bestelling afronden"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          {/* Rounded top corners, grab handle, springs up from the bottom on
              phone — a bottom sheet, not a centred web modal. */}
          <motion.div
            className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-[28px] bg-white shadow-2xl sm:max-h-[85vh] sm:rounded-[28px]"
            onClick={(e) => e.stopPropagation()}
            initial={reduceMotion ? { opacity: 0 } : { y: '100%', opacity: 0.6 }}
            animate={reduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: '100%', opacity: 0.6 }}
            transition={
              reduceMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 340, damping: 32 }
            }
          >
        {/* Grab handle — mobile bottom-sheet affordance. */}
        <div className="flex justify-center pb-1 pt-2.5 sm:hidden" aria-hidden="true">
          <span className="h-1.5 w-10 rounded-full bg-slate-300" />
        </div>

        <div className="band-teal grain relative flex shrink-0 items-center justify-between gap-4 px-6 py-5 text-white">
          <div className="relative z-10">
            <h2 className="text-xl font-extrabold">Bestelling afronden</h2>
            <p className="mt-1 text-[13px] text-white/80">Activering in 5–15 minuten</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Sluiten"
            className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6">
          <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-teal-deep">Pakket</p>
          <div className="mt-2">
            <SegmentedControl
              layoutId="modal-tier-pill"
              reduceMotion={reduceMotion}
              value={tierId}
              onChange={setTierId}
              fillClass="bg-gradient-to-br from-teal to-teal-deep"
              options={PACKAGE_TIERS.map((t) => ({ id: t.id, label: t.name }))}
            />
          </div>

          <p className="mt-5 text-[13px] font-bold uppercase tracking-[0.18em] text-teal-deep">
            Looptijd
          </p>
          <div className="mt-2">
            <SegmentedControl
              layoutId="modal-duration-pill"
              reduceMotion={reduceMotion}
              value={durationId}
              onChange={setDurationId}
              fillClass="bg-gradient-to-br from-teal to-teal-deep"
              options={DURATION_PACKS.map((p) => ({ id: p.id, label: p.label }))}
            />
          </div>

          <p className="mt-5 text-[13px] font-bold uppercase tracking-[0.18em] text-teal-deep">
            Apparaten
          </p>
          <div className="mt-2">
            <SegmentedControl
              layoutId="modal-devices-pill"
              reduceMotion={reduceMotion}
              value={String(devices)}
              onChange={(v) => setDevices(Number(v))}
              fillClass="bg-gradient-to-br from-teal to-teal-deep"
              options={[1, 2, 3, 4].map((n) => ({
                id: String(n),
                label: (
                  <>
                    <Monitor className="h-3.5 w-3.5" />
                    {n}
                  </>
                ),
              }))}
            />
          </div>

          <div className="mt-5 rounded-2xl bg-tint px-5 py-4">
            <div className="flex items-baseline justify-between">
              <span className="text-[14px] font-semibold text-ink">Totaal</span>
              <span className="text-3xl font-extrabold text-teal-deep">{formatPrice(price)}</span>
            </div>
            <ul className="mt-3 space-y-2 text-[13px] text-muted">
              {['7 dagen geld-terug garantie', 'Geen automatische verlenging', 'Nederlandse support 7/7'].map(
                (line) => (
                  <li key={line} className="flex items-center gap-2">
                    <Check className="text-teal-deep" />
                    {line}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="mt-5">
            <GlassButton
              variant="whatsapp"
              size="lg"
              block
              dataCta="order"
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              icon={<WhatsAppGlyph className="h-4 w-4" />}
            >
              Bestel via WhatsApp
            </GlassButton>
          </div>

          <p className="mt-4 flex items-center justify-center gap-2 text-[12px] font-semibold text-muted">
            <Lock className="h-3.5 w-3.5" /> Veilige betaling — je gegevens blijven privé
          </p>

          <PaymentRow className="mt-3 border border-slate-200" />
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
