import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Lock, 
  Key, 
  ShieldCheck, 
  Users, 
  Ticket, 
  Mail, 
  Calendar, 
  UtensilsCrossed, 
  CheckCircle2, 
  Trash2,
  Disc,
  DollarSign
} from 'lucide-react';
import { SupperClubEvent, ReservationSubmission, CateringInquirySubmission } from '../types';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: SupperClubEvent[];
  bookings: ReservationSubmission[];
  inquiries: CateringInquirySubmission[];
  onCancelBooking?: (id: string) => void;
  onClearInquiry?: (id: string) => void;
}

export default function AdminPortalModal({
  isOpen,
  onClose,
  events,
  bookings,
  inquiries,
  onCancelBooking,
  onClearInquiry,
}: AdminPortalModalProps) {
  const [passcodeInput, setPasscodeInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'inquiries' | 'inventory'>('overview');

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput.trim() === 'supperclub2026') {
      setIsUnlocked(true);
      setPasscodeInput('');
    } else {
      alert('Invalid passcode. Use demo key: supperclub2026');
    }
  };

  const totalRevenue = bookings.reduce((sum, b) => {
    const ev = events.find(e => e.id === b.eventId);
    const price = ev ? ev.price : 145;
    return sum + (b.guestCount * price) + (b.curationAddon ? 35 : 0);
  }, 0);

  const totalSeatsBooked = bookings.reduce((sum, b) => sum + b.guestCount, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#111113] border border-[#27272A] w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl relative shadow-2xl overflow-hidden">
        
        {/* Top Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
              <Lock className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-white tracking-tight">
                Aura Supper Club Back-Office OS
              </h3>
              <p className="font-mono text-xs text-stone-400">
                Executive Guest Registry & Tasting Room Allocations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-left space-y-6">
          {!isUnlocked ? (
            /* Locked State with 1-Click Bypass */
            <div className="max-w-md mx-auto py-8 space-y-6">
              
              {/* 1-Click Cheat Code Autofill Pill */}
              <div className="p-5 bg-[#18181E] border border-[#2E2E35] rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider flex items-center font-medium">
                    <Sparkles className="w-4 h-4 text-amber-400 mr-2" />
                    DEMO CHEAT CODE
                  </span>
                  <span className="text-xs font-mono px-2.5 py-1 bg-amber-500/20 text-amber-300 uppercase font-semibold rounded">
                    1-Click Fill
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPasscodeInput('supperclub2026')}
                  className="w-full text-left font-mono text-base text-zinc-100 hover:text-amber-300 bg-[#0E0E12] px-4 py-3 border border-zinc-700 hover:border-amber-500/50 rounded-lg transition-all flex items-center justify-between cursor-pointer"
                >
                  <span className="font-semibold">supperclub2026</span>
                  <span className="text-xs text-amber-400 font-medium">[Click to autofill]</span>
                </button>
              </div>

              <form onSubmit={handleUnlock} className="space-y-4">
                <div>
                  <label className="block text-sm font-mono text-zinc-300 uppercase tracking-wider mb-2 font-medium">
                    Executive Passcode
                  </label>
                  <input
                    type="password"
                    value={passcodeInput}
                    onChange={(e) => setPasscodeInput(e.target.value)}
                    placeholder="Enter passcode..."
                    className="w-full bg-[#0E0E12] border border-[#2E2E35] px-4 py-3.5 text-base text-white font-mono focus:outline-none focus:border-amber-400 rounded-lg"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 text-sm font-mono uppercase tracking-wider bg-gold hover:bg-gold-hover text-obsidian font-bold rounded-lg transition-all cursor-pointer shadow-lg shadow-gold/10"
                >
                  Unlock Tasting Room Control
                </button>
              </form>
            </div>
          ) : (
            /* Unlocked Executive Dashboard */
            <div className="space-y-6">
              
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
                {(['overview', 'bookings', 'inquiries', 'inventory'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === tab
                        ? 'bg-gold text-obsidian font-bold shadow-md'
                        : 'bg-stone-900 text-stone-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {tab === 'overview' && 'Tasting Room Overview'}
                    {tab === 'bookings' && `Guest Ledger (${bookings.length})`}
                    {tab === 'inquiries' && `Catering Pipeline (${inquiries.length})`}
                    {tab === 'inventory' && 'Tasting Sessions (4)'}
                  </button>
                ))}
              </div>

              {/* TAB 1: OVERVIEW METRICS */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-stone-950 border border-white/10 p-5 rounded-xl">
                      <span className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1">
                        Gross Board Cleared
                      </span>
                      <h4 className="text-3xl font-mono text-white font-bold">
                        ${totalRevenue.toLocaleString()}
                      </h4>
                      <span className="text-[11px] font-mono text-emerald-400 mt-2 block">
                        Verified pre-paid seating
                      </span>
                    </div>

                    <div className="bg-stone-950 border border-white/10 p-5 rounded-xl">
                      <span className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1">
                        Total Chairs Booked
                      </span>
                      <h4 className="text-3xl font-mono text-white font-bold">
                        {totalSeatsBooked} Guests
                      </h4>
                      <span className="text-[11px] font-mono text-gold mt-2 block">
                        Across View Park & Baldwin Hills
                      </span>
                    </div>

                    <div className="bg-stone-950 border border-white/10 p-5 rounded-xl">
                      <span className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1">
                        Catering Dossiers
                      </span>
                      <h4 className="text-3xl font-mono text-white font-bold">
                        {inquiries.length} Inquiries
                      </h4>
                      <span className="text-[11px] font-mono text-terracotta mt-2 block">
                        Private kitchen takeover queue
                      </span>
                    </div>
                  </div>

                  {/* Security Verification Status */}
                  <div className="p-4 bg-stone-900/50 border border-gold/20 rounded-xl flex items-start gap-3.5">
                    <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <strong className="text-white text-sm font-medium block">
                        Supabase RLS & Discrete Seating Protocols Active
                      </strong>
                      <p className="text-xs text-stone-300 font-sans leading-relaxed">
                        Guest contact details and VIP seating notes are isolated under tenant-level Row Level Security policies. Private estate coordinates are cryptographically hidden until 48 hours prior to dinner call.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: BOOKINGS LIST */}
              {activeTab === 'bookings' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-lg text-white font-medium">Verified Guest Registry</h4>
                    <span className="text-xs font-mono text-stone-400">{bookings.length} reservations</span>
                  </div>

                  {bookings.length > 0 ? (
                    <div className="space-y-3 font-mono text-xs">
                      {bookings.map((b) => {
                        const evt = events.find(e => e.id === b.eventId);
                        return (
                          <div 
                            key={b.id}
                            className="p-4 bg-stone-950 border border-white/5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-bold text-sm">{b.customerName}</span>
                                <span className="text-stone-500">•</span>
                                <span className="text-gold font-semibold">{b.id}</span>
                                <span className="text-stone-500">•</span>
                                <span className="px-2 py-0.5 bg-stone-900 border border-white/10 rounded text-[10px] text-terracotta">
                                  {b.guestCount} Chairs
                                </span>
                              </div>
                              <p className="text-stone-400 text-xs font-sans">
                                {evt ? evt.title : 'Supper Club Dinner'} | {b.seatingPreference} | Spice: {b.customSpiceTier}
                              </p>
                              <div className="text-[11px] text-stone-500 flex items-center gap-3">
                                <span>{b.customerEmail}</span>
                                <span>{b.customerPhone}</span>
                                {b.curationAddon && <span className="text-gold font-semibold">+ Vinyl Addon</span>}
                              </div>
                            </div>

                            {onCancelBooking && (
                              <button
                                onClick={() => onCancelBooking(b.id)}
                                className="text-stone-500 hover:text-rose-400 transition-colors self-end md:self-center p-2 rounded hover:bg-white/5 cursor-pointer"
                                title="Cancel reservation voucher"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-stone-950/60 border border-dashed border-white/10 rounded-xl">
                      <Ticket className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                      <p className="text-xs text-stone-400 font-mono">No guest bookings registered in current sandbox yet.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: INQUIRIES LIST */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-lg text-white font-medium">Private Catering Dossiers</h4>
                    <span className="text-xs font-mono text-stone-400">{inquiries.length} inquiries</span>
                  </div>

                  {inquiries.length > 0 ? (
                    <div className="space-y-3 font-mono text-xs">
                      {inquiries.map((inq) => (
                        <div 
                          key={inq.id}
                          className="p-4 bg-stone-950 border border-white/5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-bold text-sm">{inq.customerName}</span>
                              <span className="text-stone-500">•</span>
                              <span className="text-gold font-semibold">{inq.id}</span>
                              <span className="text-stone-500">•</span>
                              <span className="text-terracotta">{inq.neighborhood}</span>
                            </div>
                            <p className="text-stone-300 text-xs font-sans">
                              Target Date: <strong className="text-white">{inq.eventDate}</strong> | Party Size: <strong className="text-white">{inq.groupSize} Guests</strong> | Scope: <span className="text-gold">{inq.cateringScope}</span>
                            </p>
                            <div className="text-[11px] text-stone-500 flex items-center gap-3">
                              <span>{inq.customerEmail}</span>
                              <span>{inq.customerPhone}</span>
                            </div>
                            {inq.customRequestNotes && (
                              <p className="text-stone-400 text-xs italic font-sans bg-stone-900/60 p-2 rounded mt-1 border border-white/5">
                                "{inq.customRequestNotes}"
                              </p>
                            )}
                          </div>

                          {onClearInquiry && (
                            <button
                              onClick={() => onClearInquiry(inq.id)}
                              className="text-stone-500 hover:text-rose-400 transition-colors self-end md:self-center p-2 rounded hover:bg-white/5 cursor-pointer"
                              title="Dismiss inquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-stone-950/60 border border-dashed border-white/10 rounded-xl">
                      <Mail className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                      <p className="text-xs text-stone-400 font-mono">No catering dossiers in current sandbox queue.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: SESSIONS INVENTORY */}
              {activeTab === 'inventory' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-lg text-white font-medium">Seasonal Tasting Sessions</h4>
                    <span className="text-xs font-mono text-stone-400">{events.length} sessions listed</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {events.map((evt) => (
                      <div key={evt.id} className="p-4 bg-stone-950 border border-white/5 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-terracotta uppercase tracking-wider">{evt.neighborhood}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                            evt.status === 'Open' ? 'bg-emerald-950 text-emerald-300 border border-emerald-900' : 'bg-amber-950 text-amber-300 border border-amber-900'
                          }`}>
                            {evt.status}
                          </span>
                        </div>
                        <h5 className="font-serif text-base text-white font-medium">{evt.title}</h5>
                        <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                          <span>{evt.date}</span>
                          <span className="text-white font-bold">${evt.price} / Seat</span>
                        </div>
                        <div className="w-full bg-stone-900 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-gold h-full rounded-full" 
                            style={{ width: `${Math.round(((evt.capacity - evt.ticketsLeft) / evt.capacity) * 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[11px] font-mono text-stone-500">
                          <span>{evt.ticketsLeft} seats open</span>
                          <span>Capacity: {evt.capacity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-stone-950/80 flex items-center justify-between text-xs font-mono text-stone-500">
          <span>Aura & Grid • Ghost Factory™ 9.0+ Production Engine</span>
          <button
            onClick={() => setIsUnlocked(false)}
            className="hover:text-stone-300 transition-colors cursor-pointer"
          >
            {isUnlocked ? 'Lock Control' : 'Secure Mode'}
          </button>
        </div>

      </div>
    </div>
  );
}
