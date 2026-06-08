'use client';
import React from 'react';

/* ─── Icons (same as page.tsx) ─────────────────────────────────── */
const I = {
  tree: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V14"/><path d="M7 14l5-10 5 10H7z"/><path d="M9 8l3-6 3 6"/></svg>,
  treeLg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V14"/><path d="M7 14l5-10 5 10H7z"/><path d="M9 8l3-6 3 6"/></svg>,
  treeXl: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V14"/><path d="M7 14l5-10 5 10H7z"/><path d="M9 8l3-6 3 6"/></svg>,
  seedling: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M12 12c0-4 3-7 7-7-1 4-4 7-7 7z"/><path d="M12 12c0-4-3-7-7-7 1 4 4 7 7 7z"/></svg>,
  gift: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13"/><path d="M3 12h18"/><path d="M12 8c-2-2-4-3-4-5a2 2 0 114 0"/><path d="M12 8c2-2 4-3 4-5a2 2 0 10-4 0"/></svg>,
  heart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  check: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>,
  trophy: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H3.5a1.5 1.5 0 010-3H6"/><path d="M18 9h2.5a1.5 1.5 0 000-3H18"/><path d="M6 4h12v6a6 6 0 11-12 0V4z"/><path d="M12 16v4"/><path d="M8 22h8"/></svg>,
  user: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  share: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>,
  bell: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  chevLeft: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  chevRight: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  mapPin: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  wallet: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="5" width="22" height="16" rx="2"/><path d="M1 10h22"/><circle cx="18" cy="15" r="1"/></svg>,
  lightning: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  lock: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  certificate: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h10M7 12h6M7 16h8"/></svg>,
  mail: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>,
  link: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
  plus: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  dice: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1" fill="currentColor"/></svg>,
  target: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  globe: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  clipboard: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>,
  map: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  home: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  signal: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 20V4"/></svg>,
  alertTri: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  info: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
  backspace: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg>,
  copy: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
  camera: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  chat: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  fb: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
  tag: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/></svg>,
  cashback: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8"/><path d="M12 6v2m0 8v2"/></svg>,
  plane: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
  phone: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/></svg>,
  cart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>,
  star: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  fire: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c4-3 8-6.58 8-12a8.002 8.002 0 00-15.42-3A8 8 0 004 10c0 5.42 4 9 8 12z"/></svg>,
  settings: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  shield: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  help: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  medal1: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><circle cx="12" cy="14" r="7" fill="#FFD700" stroke="#DAA520"/><path d="M9 2l3 5 3-5" fill="#EF4444" stroke="#DC2626" strokeLinejoin="round"/><text x="12" y="17" textAnchor="middle" fontSize="8" fontWeight="800" fill="#92400E">1</text></svg>,
  medal2: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><circle cx="12" cy="14" r="7" fill="#C0C0C0" stroke="#A0A0A0"/><path d="M9 2l3 5 3-5" fill="#3B82F6" stroke="#2563EB" strokeLinejoin="round"/><text x="12" y="17" textAnchor="middle" fontSize="8" fontWeight="800" fill="#374151">2</text></svg>,
  medal3: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><circle cx="12" cy="14" r="7" fill="#CD7F32" stroke="#A0522D"/><path d="M9 2l3 5 3-5" fill="#10B981" stroke="#059669" strokeLinejoin="round"/><text x="12" y="17" textAnchor="middle" fontSize="8" fontWeight="800" fill="#FFF">3</text></svg>,
};

function Av({ name, size = 32, bg }: { name: string; size?: number; bg?: string }) {
  const initials = name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();
  const colors = ['#F47B20','#3B82F6','#10B981','#8B5CF6','#EF4444','#EC4899','#14B8A6','#F59E0B'];
  const bgColor = bg || colors[name.charCodeAt(0) % colors.length];
  return (
    <div className="av" style={{ width: size, height: size, background: bgColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: size * 0.38, fontWeight: 700, flexShrink: 0, letterSpacing: -0.5 }}>
      {initials}
    </div>
  );
}

const fmt = (n: number) => n.toLocaleString('vi-VN');

/* ─── Static data (frozen snapshot) ───────────────────────────── */
const rewardPts = 3000000, cashbackPts = 2500000, totalTrees = 1240, streak = 7;
const TREE_PRICE = 50000;

const COMTREES = [
  { id: 1, name: 'Cây Bàng Xanh #214', currentPoints: 32000, targetPoints: 50000, contributors: [{ name: 'Minh' }, { name: 'Lan' }, { name: 'Hùng' }], contributorCount: 12, completed: false, treeNumber: undefined as number | undefined },
  { id: 2, name: 'Cây Phượng Đỏ #215', currentPoints: 45000, targetPoints: 50000, contributors: [{ name: 'Mai' }, { name: 'Dũng' }], contributorCount: 8, completed: false, treeNumber: undefined as number | undefined },
  { id: 3, name: 'Cây Sưa Đỏ #216', currentPoints: 15000, targetPoints: 50000, contributors: [{ name: 'Hà' }], contributorCount: 4, completed: false, treeNumber: undefined as number | undefined },
  { id: 4, name: 'Cây Xoài Cát #213', currentPoints: 50000, targetPoints: 50000, contributors: [{ name: 'Tuấn' }, { name: 'Linh' }, { name: 'Bảo' }, { name: 'Thảo' }], contributorCount: 15, completed: true, treeNumber: 213 },
];
const MYTREES = [
  { id: 1, name: 'Cây Bàng', date: '15/05/2026', location: 'Làng Bác Trạch', treeNumber: 198 },
  { id: 2, name: 'Cây Xoài', date: '20/05/2026', location: 'Tiền Hải', treeNumber: 201 },
  { id: 3, name: 'Cây Phượng', date: '28/05/2026', location: 'Đồng Châu', treeNumber: 210 },
];
const LOCATIONS = [
  { id: 'tienhai', name: 'Tiền Hải', address: 'Huyện Tiền Hải, Thái Bình', treeCount: 156, icon: 'TH' },
  { id: 'langbac', name: 'Làng Bác Trạch', address: 'Xã Bác Trạch, Tiền Hải, Thái Bình', treeCount: 89, icon: 'BT' },
  { id: 'dongchau', name: 'Đồng Châu', address: 'Biển Đồng Châu, Tiền Hải, Thái Bình', treeCount: 67, icon: 'DC' },
  { id: 'thaibinh', name: 'TP. Thái Bình', address: 'Thành phố Thái Bình', treeCount: 120, icon: 'TB' },
];
const LB_INDIVIDUALS = [
  { rank: 1, name: 'Nguyễn Thị Hương', trees: 142, co2: 2840, tier: 'diamond' },
  { rank: 2, name: 'Trần Văn An', trees: 98, co2: 1960, tier: 'diamond' },
  { rank: 3, name: 'Lê Minh Khoa', trees: 87, co2: 1740, tier: 'gold' },
  { rank: 4, name: 'Phạm Thu Bình', trees: 61, co2: 1220, tier: 'gold' },
  { rank: 5, name: 'Đỗ Hải Nam', trees: 55, co2: 1100, tier: 'gold' },
  { rank: 6, name: 'Vũ Thị Lan', trees: 49, co2: 980, tier: 'silver' },
  { rank: 7, name: 'Hoàng Đức Long', trees: 43, co2: 860, tier: 'silver' },
  { rank: 8, name: 'Ngô Thị Mai', trees: 38, co2: 760, tier: 'silver' },
  { rank: 9, name: 'Bùi Văn Thắng', trees: 32, co2: 640, tier: 'silver' },
  { rank: 10, name: 'Đinh Thu Hà', trees: 28, co2: 560, tier: 'bronze' },
  { rank: 247, name: 'Bạn', trees: 3, co2: 60, tier: 'bronze', isMe: true },
];
const LB_GROUPS = [
  { rank: 1, name: 'Sài Gòn Xanh', members: 24, trees: 289, topMember: 'Nguyễn T.H.' },
  { rank: 2, name: 'Hà Nội Go Green', members: 18, trees: 187, topMember: 'Trần V.A.' },
  { rank: 3, name: 'SHB Family HCM', members: 31, trees: 156, topMember: 'Lê M.K.' },
  { rank: 4, name: 'Xanh Việt Nam', members: 12, trees: 98, topMember: 'Phạm T.B.' },
  { rank: 5, name: 'Team Eco Warriors', members: 9, trees: 76, topMember: 'Đỗ H.N.' },
];
const TIER_LABEL: Record<string, string> = { starter: 'Hạt Mầm', bronze: 'Người Gieo', silver: 'Người Bảo Vệ', gold: 'Người Giữ Rừng', diamond: 'Người Dẫn Đầu Xanh' };
const TIER_ICON: Record<string, React.ReactNode> = {
  starter: <span className="tier-badge tier-starter">Starter</span>,
  bronze: <span className="tier-badge tier-bronze">Bronze</span>,
  silver: <span className="tier-badge tier-silver">Silver</span>,
  gold: <span className="tier-badge tier-gold">Gold</span>,
  diamond: <span className="tier-badge tier-diamond">Diamond</span>,
};
const FESTIVAL_OFFERS = [
  { id: 'pizza', brand: 'The Pizza Company', desc: 'Voucher giảm 50k cho đơn từ 199k', price: '20,000', img: 'pizza', bg: 'linear-gradient(135deg,#FFF3E0,#FFE0B2)' },
  { id: 'coffee', brand: 'Highland Coffee', desc: 'Voucher giảm 50k cho đơn từ 199k', price: '20,000', img: 'coffee', bg: 'linear-gradient(135deg,#FFEBEE,#FFCDD2)' },
  { id: 'gs25', brand: 'GS25', desc: 'Voucher giảm 50k cho đơn từ 199k', price: '20,000', img: 'store', bg: 'linear-gradient(135deg,#E3F2FD,#BBDEFB)' },
  { id: 'hyundai', brand: 'Hyundai', desc: 'Voucher ưu đãi bảo dưỡng xe', price: '50,000', img: 'car', bg: 'linear-gradient(135deg,#E8EAF6,#C5CAE9)' },
];
const BRAND_OFFERS = [
  { id: 'b1', brand: 'Highland Coffee', desc: 'Voucher giảm 50k cho đơn từ 199k', price: '20,000', img: 'coffee', bg: 'linear-gradient(135deg,#FFEBEE,#FFCDD2)' },
  { id: 'b2', brand: 'The Pizza Company', desc: 'Voucher giảm 50k cho đơn từ 199k', price: '20,000', img: 'pizza', bg: 'linear-gradient(135deg,#FFF3E0,#FFE0B2)' },
  { id: 'b3', brand: 'Lotteria', desc: 'Combo ăn ngon giảm 30%', price: '15,000', img: 'burger', bg: 'linear-gradient(135deg,#FFF8E1,#FFECB3)' },
  { id: 'b4', brand: 'CGV Cinema', desc: 'Vé xem phim 2D chỉ 45k', price: '25,000', img: 'cinema', bg: 'linear-gradient(135deg,#F3E5F5,#E1BEE7)' },
];
const OFFER_ICON: Record<string, string> = { pizza: 'P', coffee: 'C', store: 'G', car: 'H', burger: 'L', cinema: 'CGV' };
const CATEGORIES = [
  { icon: 'tag', label: 'Đổi voucher' },
  { icon: 'cashback', label: 'Đổi tiền hoàn' },
  { icon: 'plane', label: 'Đổi dặm bay' },
  { icon: 'phone', label: 'Đổi điện thoại' },
  { icon: 'cart', label: 'Đổi VETO' },
];
const FOREST_RANKS = [
  { name: 'Hạt Mầm', icon: '🌱', min: 0, color: '#10B981' },
  { name: 'Đồng', icon: '🥉', min: 10, color: '#CD7F32' },
  { name: 'Bạc', icon: '🥈', min: 25, color: '#9CA3AF' },
  { name: 'Vàng', icon: '🥇', min: 50, color: '#F59E0B' },
  { name: 'Bạch Kim', icon: '💎', min: 100, color: '#8B5CF6' },
  { name: 'Kim Cương', icon: '💠', min: 200, color: '#3B82F6' },
];
const FEED = [
  { id: 1, text: '<strong>Anh Minh</strong> vừa góp <strong>5,000 điểm</strong> vào cây #214', bg: '#FFF0E0', avatar: 'M', time: 'Vừa xong' },
  { id: 2, text: '<strong>Chị Lan</strong> vừa mua <strong>1 cây xanh</strong>', bg: '#E8F5E9', avatar: 'L', time: '30s trước' },
  { id: 3, text: '<strong>Nhóm Sài Gòn Xanh</strong> vừa trồng được cây thứ <strong>45</strong>', bg: '#DBEAFE', avatar: 'S', time: '1p trước' },
  { id: 4, text: '<strong>Anh Hùng</strong> vừa tạo nhóm "<strong>Rừng Xanh</strong>"', bg: '#FCE4EC', avatar: 'H', time: '2p trước' },
  { id: 5, text: '<strong>Chị Mai</strong> vừa góp <strong>20,000 điểm</strong> vào cây #216', bg: '#FFF0E0', avatar: 'M', time: '3p trước' },
];
const target = 5000;

/* ─── ImpactRing (same logic as page.tsx) ───────────────────────── */
function ImpactRing({ trees }: { trees: number }) {
  const area = trees * 25;
  const pct = Math.min(trees / 50, 1);
  const r = 58; const circ = 2 * Math.PI * r;
  const dash = circ * pct;
  return (
    <div className="impact-wrap">
      <svg className="impact-ring-svg" viewBox="0 0 150 150">
        <defs><linearGradient id="impactGradWF" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10B981"/><stop offset="100%" stopColor="#34D399"/></linearGradient></defs>
        <circle cx="75" cy="75" r={r} fill="none" stroke="#F0FDF4" strokeWidth="12"/>
        <circle cx="75" cy="75" r={r} fill="none" stroke="url(#impactGradWF)" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${dash} ${circ}`} style={{ transformOrigin: '75px 75px', transform: 'rotate(-90deg)' }}/>
        <text x="75" y="68" textAnchor="middle" fontSize="22" fontWeight="900" fill="#111827">{trees}</text>
        <text x="75" y="83" textAnchor="middle" fontSize="10" fontWeight="700" fill="#6B7280">cây đã trồng</text>
        <text x="75" y="96" textAnchor="middle" fontSize="9" fontWeight="600" fill="#10B981">🌿 {Math.round(pct * 100)}% mục tiêu</text>
      </svg>
      <div className="impact-stats-row">
        <div className="impact-stat"><div className="impact-stat-val">{area}</div><div className="impact-stat-lbl">m² phủ xanh</div></div>
        <div className="impact-stat"><div className="impact-stat-val">{LOCATIONS.length}</div><div className="impact-stat-lbl">khu vực</div></div>
      </div>
    </div>
  );
}

/* ─── Phone shell (reuses actual phone-frame CSS) ───────────────── */
function Phone({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, flexShrink: 0 }}>
      <div style={{ background: '#1a1a2e', color: '#F47B20', fontSize: 11, fontWeight: 800, padding: '4px 14px', borderRadius: 20, letterSpacing: 0.5 }}>{label}</div>
      <div className="phone-wrapper" style={{ transform: 'none' }}>
        <div className="phone-btn-silent" />
        <div className="phone-btn-vol-up" />
        <div className="phone-btn-vol-down" />
        <div className="phone-btn-power" />
        <div className="phone-frame" style={{ height: 'auto', minHeight: 400 }}>
          <div className="dynamic-island"><div className="di-sensor"/><div className="di-camera"/></div>
          <div className="phone-screen" style={{ overflow: 'visible', flex: 'none', paddingTop: 54 }}>
            {children}
          </div>
          <div className="phone-home-indicator"><div className="phi-bar"/></div>
        </div>
      </div>
    </div>
  );
}

/* ─── TAB: REWARDS ───────────────────────────────────────────────── */
function TabRewards() {
  return (
    <div className="app-shell">
      <header className="rw-header">
        <div className="rw-header-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#fff', fontSize: 13, fontWeight: 700, opacity: .85 }}>SHB</span>
            <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 13 }}>›</span>
            <h1 className="rw-title">Đổi điểm thưởng</h1>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="rw-header-btn" style={{ position: 'relative' }}>
              {I.bell}
              <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, background: '#EF4444', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.2)' }}/>
            </button>
          </div>
        </div>
        <div className="rw-search">
          <span className="rw-search-icon">{I.search}</span>
          <input readOnly placeholder="Tìm ưu đãi, thương hiệu..."/>
        </div>
      </header>
      {/* Points banner */}
      <div style={{ background: 'var(--shb-grad)', padding: '0 16px 20px' }}>
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--r-xl)', padding: '14px 16px', border: '1px solid rgba(255,255,255,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,.8)', fontSize: 11, fontWeight: 600, marginBottom: 2 }}>Tổng điểm khả dụng</div>
              <div style={{ color: '#fff', fontSize: 22, fontWeight: 900, letterSpacing: -1 }}>{fmt(rewardPts + cashbackPts)} <span style={{ fontSize: 13, fontWeight: 600, opacity: .7 }}>đ</span></div>
            </div>
            <button style={{ background: '#fff', border: 'none', borderRadius: 'var(--r-full)', color: 'var(--shb)', fontWeight: 800, fontSize: 12, padding: '8px 14px', cursor: 'pointer', fontFamily: 'inherit' }}>Trồng cây →</button>
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className="rw-cats">
        {CATEGORIES.map((c, i) => (
          <div key={i} className="rw-cat">
            <div className="rw-cat-icon" style={{ background: '#FFF0E0', color: 'var(--shb)' }}>{I[c.icon as keyof typeof I]}</div>
            <span className="rw-cat-label">{c.label}</span>
          </div>
        ))}
      </div>
      {/* Privileges */}
      <div className="rw-privileges" style={{ margin: '12px 16px 0' }}>
        <div className="rw-priv-item"><div className="rw-priv-left"><span className="ic-inline">{I.star}</span>Đặc quyền ưu đãi thẻ</div><span className="rw-priv-arrow">{I.chevRight}</span></div>
        <div className="rw-priv-item"><div className="rw-priv-left"><span className="ic-inline">{I.gift}</span>Kho quà cao cấp</div><span className="rw-priv-arrow">{I.chevRight}</span></div>
      </div>
      {/* Festival */}
      <div className="rw-section">
        <div className="rw-section-head"><h2 className="rw-section-title"><span className="ic-inline">{I.fire}</span>Mùa lễ hội</h2><span className="rw-section-link">Tất cả</span></div>
        <div className="rw-scroll">
          <div className="rw-offer-card rw-tree-card">
            <div className="rw-offer-img rw-tree-img" style={{ height: 100 }}><span style={{ color: '#16A34A' }}>{I.treeXl}</span></div>
            <div className="rw-offer-body">
              <div className="rw-offer-brand">Chiến dịch Trồng Cây</div>
              <div className="rw-offer-desc">Góp điểm trồng cây xanh, phủ xanh Việt Nam</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span className="rw-offer-price">50,000</span><span className="rw-offer-unit">Điểm / cây</span></div>
            </div>
          </div>
          {FESTIVAL_OFFERS.map(o => (
            <div key={o.id} className="rw-offer-card">
              <div className="rw-offer-img" style={{ background: o.bg, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span className="offer-brand-icon">{OFFER_ICON[o.img] || o.img}</span></div>
              <div className="rw-offer-body">
                <div className="rw-offer-brand">{o.brand}</div>
                <div className="rw-offer-desc">{o.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span className="rw-offer-price">{o.price}</span><span className="rw-offer-unit">Điểm</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Brands */}
      <div className="rw-section">
        <div className="rw-section-head"><h2 className="rw-section-title"><span className="ic-inline">{I.star}</span>Thương hiệu món ngon</h2><span className="rw-section-link">Tất cả</span></div>
        <div className="rw-scroll">
          {BRAND_OFFERS.map(o => (
            <div key={o.id} className="rw-offer-card">
              <div className="rw-offer-img" style={{ background: o.bg, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span className="offer-brand-icon">{OFFER_ICON[o.img] || o.img}</span></div>
              <div className="rw-offer-body">
                <div className="rw-offer-brand">{o.brand}</div>
                <div className="rw-offer-desc">{o.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span className="rw-offer-price">{o.price}</span><span className="rw-offer-unit">Điểm</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Grid */}
      <div className="rw-section" style={{ paddingBottom: 16 }}>
        <div className="rw-section-head"><h2 className="rw-section-title"><span className="ic-inline">{I.fire}</span>Ưu đãi mới nhất</h2><span className="rw-section-link">Tất cả</span></div>
        <div className="rw-brands-grid">
          {[...FESTIVAL_OFFERS, ...BRAND_OFFERS].map((o, i) => (
            <div key={i} className="rw-offer-card" style={{ minWidth: 'unset', maxWidth: 'unset' }}>
              <div className="rw-offer-img" style={{ background: o.bg, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span className="offer-brand-icon">{OFFER_ICON[o.img] || o.img}</span></div>
              <div className="rw-offer-body">
                <div className="rw-offer-brand">{o.brand}</div>
                <div className="rw-offer-desc">{o.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span className="rw-offer-price">{o.price}</span><span className="rw-offer-unit">Điểm</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── TAB: CAMPAIGN ─────────────────────────────────────────────── */
function TabCampaign() {
  return (
    <div className="app-shell">
      <nav className="cp-nav">
        <span className="cp-nav-title"><span className="ic-inline">{I.seedling}</span>Chiến dịch Trồng Cây</span>
        <div className="cp-nav-right"><button className="cp-nav-btn">{I.share}</button></div>
      </nav>
      <div className="cp-hero">
        <div className="streak-banner">
          <div className="streak-fire">🔥</div>
          <div className="streak-info"><div className="streak-num">{streak} ngày</div><div className="streak-lbl">Chuỗi đóng góp liên tiếp</div></div>
          <button className="streak-go">Tiếp tục →</button>
        </div>
        <div className="cp-points">
          <div className="cp-point-card active"><div className="cp-point-lbl"><span className="ic-inline">{I.gift}</span>Điểm thưởng</div><div className="cp-point-val">{fmt(rewardPts)}<span className="cp-point-unit"> đ</span></div></div>
          <div className="cp-point-card"><div className="cp-point-lbl"><span className="ic-inline">{I.wallet}</span>Hoàn tiền</div><div className="cp-point-val">{fmt(cashbackPts)}<span className="cp-point-unit"> đ</span></div></div>
        </div>
        <div className="cp-cta">
          <button className="cp-cta-btn cp-cta-primary ripple" style={{ border: '2px solid #ffffff' }}><span className="ic-inline">{I.tree}</span>Đổi cây ngay</button>
          <button className="cp-cta-btn cp-cta-secondary ripple"><span className="ic-inline">{I.heart}</span>Góp điểm</button>
        </div>
        <div className="cp-cta-row2">
          <button className="cp-cta-ghost"><span className="ic-inline">{I.tree}</span>Cây của tôi</button>
          <button className="cp-cta-ghost"><span className="ic-inline">{I.trophy}</span>Bảng Xếp hạng</button>
          <button className="cp-cta-ghost cp-cta-ghost-green"><span className="ic-inline">{I.dice}</span>Đổi cây ngẫu nhiên</button>
          <button className="cp-cta-ghost cp-cta-ghost-blue"><span className="ic-inline">{I.users}</span>Tạo nhóm</button>
        </div>
      </div>
      <div className="cp-body">
        <div className="cp-overview">
          <div className="cp-counter">
            <div className="cp-counter-lbl"><span className="ic-inline">{I.globe}</span>Tổng số cây đã trồng</div>
            <div className="cp-counter-row"><span style={{ color: '#16A34A' }}>{I.treeLg}</span><span className="cp-counter-val">{fmt(totalTrees)}</span></div>
            <div className="cp-counter-unit">cây xanh trên toàn quốc</div>
          </div>
          <div className="cp-prog">
            <div className="cp-prog-head">
              <span className="cp-prog-lbl"><span className="ic-inline">{I.target}</span>Mục tiêu cộng đồng</span>
              <span className="cp-prog-val">{fmt(totalTrees)} / {fmt(target)}</span>
            </div>
            <div className="cp-prog-bar"><div className="cp-prog-fill" style={{ width: `${(totalTrees / target) * 100}%` }}/></div>
          </div>
          {/* Flash Event sample */}
          <div className="flash-banner" style={{ marginTop: 14 }}>
            <div className="flash-left"><span className="flash-bolt">{I.lightning}</span><div><div className="flash-title">FLASH EVENT</div><div className="flash-desc">50,000 điểm = <strong>2 cây</strong> — còn</div></div></div>
            <div className="flash-right"><div className="flash-timer">42s</div><button className="flash-cta"><span className="ic-inline">{I.lightning}</span>Mua ngay</button></div>
          </div>
        </div>
        <div className="sec-title"><span className="ic-inline">{I.seedling}</span>Cây cộng đồng đang góp</div>
        {COMTREES.map(t => (
          <div key={t.id} className={`ct-card ${t.completed ? 'ct-done' : ''}`}>
            <div className="ct-head">
              <span className="ct-name">{t.completed ? I.check : I.seedling} {t.name}</span>
              <span className={`ct-badge ${t.completed ? 'ct-badge-ok' : 'ct-badge-on'}`}>{t.completed ? `Hoàn thành #${t.treeNumber}` : 'Đang góp'}</span>
            </div>
            <div className="ct-bar"><div className={`ct-bar-fill ${t.completed ? 'ct-bar-ok' : ''}`} style={{ width: `${(t.currentPoints / t.targetPoints) * 100}%` }}/></div>
            <div className="ct-info">
              <span className="ct-info-text">{fmt(t.currentPoints)} / {fmt(t.targetPoints)} điểm</span>
              <span className={`ct-info-pct ${t.completed ? 'ct-pct-ok' : ''}`}>{Math.round((t.currentPoints / t.targetPoints) * 100)}%</span>
            </div>
            <div className="ct-avatars">
              {t.contributors.slice(0, 4).map((c, i) => <Av key={i} name={c.name} size={28}/>)}
              {t.contributorCount > 4 && <div className="ct-av-more">+{t.contributorCount - 4}</div>}
              <span className="ct-av-count">{t.contributorCount} người góp</span>
            </div>
            <div className="ct-action">
              {t.completed
                ? <button className="ct-btn ct-btn-ok"><span className="ic-inline">{I.check}</span>Đã trồng thành công</button>
                : <button className="ct-btn ct-btn-go ripple"><span className="ic-inline">{I.heart}</span>Góp điểm cho cây này</button>}
            </div>
          </div>
        ))}
        <div className="sec-title"><span className="ic-inline">{I.users}</span>Nhóm trồng cây</div>
        <div className="grp-actions">
          <button className="grp-btn grp-btn-new"><span className="grp-btn-icon">{I.plus}</span>Tạo nhóm mới</button>
          <button className="grp-btn grp-btn-join"><span className="grp-btn-icon">{I.link}</span>Nhập mã nhóm</button>
        </div>
        <div className="sec-title"><span className="ic-inline">{I.signal}</span>Hoạt động trực tiếp</div>
        <div className="feed">
          {FEED.map(f => (
            <div key={f.id} className="feed-item">
              <div className="feed-av" style={{ background: f.bg }}><Av name={f.avatar} size={28}/></div>
              <div className="feed-body">
                <div className="feed-text" dangerouslySetInnerHTML={{ __html: f.text }}/>
                <div className="feed-time">{f.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── TAB: FOREST ───────────────────────────────────────────────── */
function TabForest() {
  const greenArea = MYTREES.length * 25;
  return (
    <div className="app-shell">
      <nav className="cp-nav">
        <button className="cp-nav-btn">{I.chevLeft}</button>
        <span className="cp-nav-title"><span className="ic-inline">{I.home}</span>Khu rừng của tôi</span>
        <button className="cp-nav-btn">{I.clipboard}</button>
      </nav>
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ marginTop: 16, marginBottom: 12 }}><ImpactRing trees={MYTREES.length}/></div>
        {/* Rank card */}
        <div style={{ background: 'var(--card)', borderRadius: 'var(--r-xl)', padding: 16, marginBottom: 12, boxShadow: 'var(--sh-md)', border: '1px solid var(--b1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 36 }}>🌱</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#10B981' }}>Hạt Mầm</div>
              <div style={{ fontSize: 11, color: 'var(--t2)', marginTop: 2 }}>Còn 7 cây để lên Đồng</div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--shb)' }}>{MYTREES.length} 🌳</div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--t2)', marginBottom: 4 }}>
              <span>Hạt Mầm</span><span style={{ color: 'var(--shb)', fontWeight: 700 }}>30%</span><span>Đồng</span>
            </div>
            <div className="cp-prog-bar"><div className="cp-prog-fill" style={{ width: '30%' }}/></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {FOREST_RANKS.map((r, i) => (
              <div key={r.name} style={{ padding: '8px 6px', borderRadius: 10, textAlign: 'center', background: i === 0 ? '#FFF5EB' : '#F9FAFB', border: i === 0 ? '2px solid var(--shb)' : '1px solid var(--b1)' }}>
                <div style={{ fontSize: 22 }}>{r.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: i === 0 ? 'var(--shb)' : 'var(--t3)', marginTop: 2 }}>{r.name}</div>
                <div style={{ fontSize: 9, color: 'var(--t3)', marginTop: 1 }}>{r.min === 0 ? '1 cây' : `${r.min} cây`}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
            <button className="cp-cta-btn cp-cta-primary ripple" style={{ margin: 0, fontSize: 12, padding: '10px 8px', border: '2px solid #ffffff' }}><span className="ic-inline">{I.tree}</span>Đổi cây ngay</button>
            <button className="cp-cta-btn cp-cta-secondary ripple" style={{ margin: 0, fontSize: 12, padding: '10px 8px' }}><span className="ic-inline">{I.heart}</span>Góp điểm ngay</button>
          </div>
        </div>
        {/* 3D Forest placeholder */}
        <div className="three-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg,#87CEEB 0%,#57A657 100%)', position: 'relative' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', paddingBottom: 20 }}>
            {['🌲','🌳','🌲','🌳','🌲'].map((t, i) => <span key={i} style={{ fontSize: [32,42,28,38,30][i] }}>{t}</span>)}
          </div>
          <div style={{ position: 'absolute', bottom: 8, right: 12, background: 'rgba(0,0,0,.5)', color: '#fff', fontSize: 9, padding: '3px 8px', borderRadius: 6 }}>3D · Kéo để xoay</div>
        </div>
        <div className="forest-stats">
          <div className="fs-item"><div className="fs-val">{MYTREES.length}</div><div className="fs-lbl">Cây đã trồng</div></div>
          <div className="fs-div"/>
          <div className="fs-item"><div className="fs-val">~{greenArea}</div><div className="fs-lbl">m² phủ xanh</div></div>
          <div className="fs-div"/>
          <div className="fs-item"><div className="fs-val">{LOCATIONS.length}</div><div className="fs-lbl">Khu vực</div></div>
        </div>
        <div className="forest-grid">
          {MYTREES.map(t => (
            <div key={t.id} className="ft-item">
              <span className="ft-icon" style={{ color: '#16A34A' }}>{I.tree}</span>
              <div className="ft-num">#{t.treeNumber}</div>
              <div className="ft-date">{t.date}</div>
              <div className="ft-loc"><span className="ic-inline">{I.mapPin}</span>{t.location}</div>
            </div>
          ))}
        </div>
        <button className="mt-view-all-btn">{I.clipboard} Xem thông tin tất cả cây →</button>
        <div className="sec-title"><span className="ic-inline">{I.map}</span>Vị trí cây đã trồng</div>
        <div className="map-card">
          <div className="map-visual">
            <div className="map-pin" style={{ top: '22%', left: '28%' }}><span className="map-pin-dot">{I.mapPin}</span><span className="map-pin-tag">Tiền Hải</span></div>
            <div className="map-pin" style={{ top: '38%', left: '55%', animationDelay: '.5s' }}><span className="map-pin-dot">{I.mapPin}</span><span className="map-pin-tag">Bác Trạch</span></div>
            <div className="map-pin" style={{ top: '60%', left: '32%', animationDelay: '1s' }}><span className="map-pin-dot">{I.mapPin}</span><span className="map-pin-tag">Đồng Châu</span></div>
            <div className="map-pin" style={{ top: '28%', left: '74%', animationDelay: '1.5s' }}><span className="map-pin-dot">{I.mapPin}</span><span className="map-pin-tag">TP Thái Bình</span></div>
          </div>
          <div className="map-tags">
            {LOCATIONS.map(l => <button key={l.id} className={`map-tag ${l.id === 'tienhai' ? 'map-tag-on' : 'map-tag-off'}`}>{l.icon} {l.name} ({l.treeCount})</button>)}
          </div>
          <div className="loc-detail">
            <div className="loc-head"><span className="loc-icon">{I.mapPin}</span><div><div className="loc-name">Tiền Hải</div><div className="loc-addr">Huyện Tiền Hải, Thái Bình</div></div></div>
            <div style={{ fontSize: 13, color: 'var(--t2)', marginBottom: 6 }}><span className="ic-inline">{I.tree}</span>156 cây đã trồng tại đây</div>
            <div className="loc-trees">{Array.from({ length: 8 }, (_, i) => <div key={i} className="loc-dot" style={{ color: '#16A34A' }}>{I.tree}</div>)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── TAB: LEADERBOARD ──────────────────────────────────────────── */
function TabLeaderboard() {
  return (
    <div className="app-shell">
      <nav className="cp-nav">
        <button className="cp-nav-btn">{I.chevLeft}</button>
        <span className="cp-nav-title"><span className="ic-inline">{I.trophy}</span>Bảng xếp hạng</span>
      </nav>
      <div style={{ padding: '16px 16px 16px' }}>
        <div className="lb-card">
          <div className="lb-tabs">
            <button className="lb-tab lb-tab-on"><span className="ic-inline">{I.user}</span>Cá nhân</button>
            <button className="lb-tab"><span className="ic-inline">{I.users}</span>Nhóm</button>
          </div>
          <div className="lb-filters">
            <button className="lb-filter lb-filter-on">Tháng này</button>
            <button className="lb-filter">Tất cả</button>
          </div>
          <div className="lb-legend">
            {Object.entries(TIER_LABEL).map(([k, v]) => <div key={k} className="lb-legend-item"><span>{k}</span><span>{v}</span></div>)}
          </div>
          <div className="lb-list">
            {LB_INDIVIDUALS.slice(0, 10).map((u, i) => (
              <div key={u.rank} className={`lb-row ${i < 3 ? 'lb-row-top' : ''}`}>
                <div className="lb-rank">{i === 0 ? I.medal1 : i === 1 ? I.medal2 : i === 2 ? I.medal3 : <span className="lb-rank-num">{u.rank}</span>}</div>
                <div className="lb-avatar"><Av name={u.name} size={32}/></div>
                <div className="lb-info">
                  <div className="lb-name">{u.name}<span className="lb-tier">{TIER_ICON[u.tier]}</span></div>
                  <div className="lb-sub">{TIER_LABEL[u.tier]}</div>
                </div>
                <div className="lb-stats">
                  <div className="lb-trees">{u.trees}<span className="ic-inline">{I.tree}</span></div>
                  <div className="lb-co2">{fmt(u.co2)} kg CO₂</div>
                </div>
              </div>
            ))}
            <div className="lb-divider">· · ·</div>
            <div className="lb-row lb-row-me">
              <div className="lb-rank"><span className="lb-rank-num">247</span></div>
              <div className="lb-avatar"><Av name="Bạn" size={32}/></div>
              <div className="lb-info">
                <div className="lb-name">Bạn<span className="lb-tier">{TIER_ICON['bronze']}</span></div>
                <div className="lb-sub">Cần +{LB_INDIVIDUALS[9].trees - MYTREES.length + 1} cây để vào Top 10</div>
              </div>
              <div className="lb-stats">
                <div className="lb-trees">{MYTREES.length}<span className="ic-inline">{I.tree}</span></div>
                <div className="lb-co2">{MYTREES.length * 20} kg CO₂</div>
              </div>
            </div>
            <button className="lb-buy-nudge"><span className="ic-inline">{I.tree}</span>Đổi cây để leo hạng →</button>
          </div>
          {/* Groups preview */}
          <div style={{ borderTop: '1px solid var(--b1)', paddingTop: 12, marginTop: 4 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--t2)', marginBottom: 8 }}>Xếp hạng nhóm</div>
            <div className="lb-list">
              {LB_GROUPS.map((g, i) => (
                <div key={g.rank} className={`lb-row ${i < 3 ? 'lb-row-top' : ''}`}>
                  <div className="lb-rank">{i === 0 ? I.medal1 : i === 1 ? I.medal2 : i === 2 ? I.medal3 : <span className="lb-rank-num">{g.rank}</span>}</div>
                  <div className="lb-avatar"><Av name={g.name} size={32}/></div>
                  <div className="lb-info">
                    <div className="lb-name">{g.name}</div>
                    <div className="lb-sub">{g.members} thành viên · Top: {g.topMember}</div>
                  </div>
                  <div className="lb-stats">
                    <div className="lb-trees">{g.trees}<span className="ic-inline">{I.tree}</span></div>
                    <div className="lb-co2">{fmt(g.trees * 20)} kg CO₂</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── TAB: PROFILE ──────────────────────────────────────────────── */
function TabProfile() {
  return (
    <div className="app-shell">
      <div className="profile-hero">
        <div className="profile-av"><Av name="Nguyễn Văn A" size={74}/></div>
        <div className="profile-name">Nguyễn Văn A</div>
        <div className="profile-id">SHB • 0123 4567 8901</div>
        <div className="profile-tier-row"><span style={{ fontSize: 14 }}>🥉</span><span className="profile-tier-text">Người Gieo · Hạng 247</span></div>
      </div>
      <div className="profile-content">
        <div className="profile-stats-grid">
          <div className="profile-stat"><div className="profile-stat-val">{MYTREES.length}</div><div className="profile-stat-lbl">Cây đã trồng</div></div>
          <div className="profile-stat"><div className="profile-stat-val">{streak}</div><div className="profile-stat-lbl">Ngày streak 🔥</div></div>
          <div className="profile-stat"><div className="profile-stat-val">{fmt(rewardPts + cashbackPts)}</div><div className="profile-stat-lbl">Tổng điểm</div></div>
        </div>
        <div style={{ background: 'linear-gradient(135deg,#FFF5EB,#FFE8D0)', borderRadius: 'var(--r-xl)', padding: 16, marginBottom: 16, border: '1px solid rgba(244,123,32,.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>🎯 Tiến độ lên hạng Silver</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--shb)' }}>{MYTREES.length}/20 cây</span>
          </div>
          <div className="cp-prog-bar"><div className="cp-prog-fill" style={{ width: `${Math.min(MYTREES.length / 20 * 100, 100)}%` }}/></div>
          <div style={{ fontSize: 11, color: 'var(--t2)', marginTop: 6 }}>Cần thêm {Math.max(20 - MYTREES.length, 0)} cây để lên hạng <strong>Người Bảo Vệ 🥈</strong></div>
        </div>
        {/* My trees inline */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700 }}><span className="ic-inline" style={{ color: '#16A34A' }}>{I.tree}</span>Cây của tôi</div>
            <span style={{ fontSize: 12, color: 'var(--shb)', fontWeight: 600 }}>{MYTREES.length} cây</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {MYTREES.map((t, i) => (
              <div key={t.id} style={{ background: 'var(--card)', borderRadius: 'var(--r-lg)', padding: '12px 14px', border: '1px solid var(--b1)', display: 'flex', alignItems: 'center', gap: 12, boxShadow: 'var(--sh-sm)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--r-md)', background: 'linear-gradient(135deg,#E8F5E9,#C8E6C9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><span style={{ color: '#16A34A' }}>{I.tree}</span></div>
                <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 13 }}>{t.name}</div><div style={{ fontSize: 11, color: 'var(--t2)', marginTop: 2 }}>{t.location} · {t.date}</div></div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ok)', background: '#D1FAE5', borderRadius: 'var(--r-full)', padding: '2px 8px', flexShrink: 0 }}>#{i + 1}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="profile-menu">
          {[
            { icon: I.certificate, bg: '#FFF0E0', label: 'Chứng nhận xanh', sub: 'Xem & chia sẻ chứng chỉ' },
            { icon: I.shield, bg: '#EFF6FF', label: 'Bảo mật & PIN', sub: 'Quản lý mã xác thực' },
            { icon: I.bell, bg: '#F3E5F5', label: 'Thông báo', sub: 'Cài đặt nhận thông báo' },
            { icon: I.help, bg: '#ECFDF5', label: 'Trợ giúp', sub: 'Câu hỏi thường gặp' },
            { icon: I.settings, bg: '#FFF8E1', label: 'Cài đặt', sub: 'Ngôn ngữ, giao diện' },
          ].map((item, i) => (
            <button key={i} className="profile-menu-item">
              <div className="profile-menu-icon" style={{ background: item.bg }}>{item.icon}</div>
              <div className="profile-menu-text"><div className="profile-menu-title">{item.label}</div><div className="profile-menu-sub">{item.sub}</div></div>
              {I.chevRight}
            </button>
          ))}
        </div>
        <button style={{ width: '100%', border: '1.5px solid var(--err)', borderRadius: 'var(--r-xl)', padding: 14, background: '#FEF2F2', color: 'var(--err)', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', minHeight: 50 }}>Đăng xuất</button>
        <div className="profile-version">SHB Green v2.4.1 · Bản demo 2026</div>
      </div>
    </div>
  );
}

/* ─── MODALS ────────────────────────────────────────────────────── */
function ModalBuy() {
  return (
    <div style={{ padding: '0 0 16px' }}>
      <div className="modal-handle"/>
      <div className="modal-title"><span className="ic-inline">{I.tree}</span>Đổi cây ngay</div>
      <div className="modal-sub">Sử dụng <strong>{fmt(TREE_PRICE)} điểm</strong> từ <strong>Quỹ điểm thưởng</strong> để đổi 1 cây xanh</div>
      <div style={{ background: 'var(--section)', borderRadius: 'var(--r-lg)', padding: 16, marginBottom: 16 }}>
        {[['Giá mỗi cây', `${fmt(TREE_PRICE)} điểm`], ['Số dư hiện tại', `${fmt(rewardPts)} điểm`], ['Sau khi đổi', `${fmt(rewardPts - TREE_PRICE)} điểm`]].map(([k, v], i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i < 2 ? 8 : 0 }}>
            <span style={{ fontSize: 13, color: 'var(--t2)' }}>{k}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: i === 2 ? 'var(--ok)' : i === 1 ? 'var(--shb)' : 'var(--t1)' }}>{v}</span>
          </div>
        ))}
      </div>
      <div className="pt-toggle">
        <button className="pt-btn pt-on"><span className="ic-inline">{I.gift}</span>Điểm thưởng</button>
        <button className="pt-btn"><span className="ic-inline">{I.wallet}</span>Hoàn tiền</button>
      </div>
      <button className="m-btn m-btn-primary">Xem lại &amp; Xác nhận</button>
      <button className="m-btn m-btn-ghost">Hủy</button>
    </div>
  );
}

function ModalDonateTree() {
  return (
    <div style={{ padding: '0 0 16px' }}>
      <div className="modal-handle"/>
      <div className="modal-title"><span className="ic-inline">{I.heart}</span>Góp điểm</div>
      <div className="modal-sub">Góp cho Cây Phượng Đỏ #215</div>
      <div className="pt-toggle">
        <button className="pt-btn pt-on"><span className="ic-inline">{I.gift}</span>Thưởng: {fmt(rewardPts)}</button>
        <button className="pt-btn"><span className="ic-inline">{I.wallet}</span>Hoàn: {fmt(cashbackPts)}</button>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label className="modal-label">Số điểm muốn góp</label>
        <div className="modal-input" style={{ color: 'var(--t3)' }}>Nhập số điểm...</div>
        <div className="modal-hint">Tối đa: {fmt(rewardPts)} điểm</div>
      </div>
      <div className="quick-grid">
        {[5000, 10000, 20000, 30000, 40000, 50000].map(a => <button key={a} className={`q-btn ${a === 10000 ? 'q-on' : ''}`}>{fmt(a)}</button>)}
      </div>
      <button className="m-btn m-btn-primary">Xem lại &amp; Xác nhận</button>
      <button className="m-btn m-btn-ghost">Hủy</button>
    </div>
  );
}

function ModalEcert() {
  return (
    <div style={{ padding: '0 0 16px' }}>
      <div className="modal-handle"/>
      <div className="modal-title"><span className="ic-inline">{I.check}</span>Chứng nhận trồng cây</div>
      <div className="ecert">
        <div className="ecert-logo">SHB GREEN</div>
        <div className="ecert-h">Chứng nhận trồng cây xanh</div>
        <span className="ecert-icon" style={{ color: '#16A34A' }}>{I.treeXl}</span>
        <div className="ecert-rows">
          {[['Người trồng','Nguyễn Văn A'],['Mã cây','SHB-TREE-198'],['Ngày trồng','15/05/2026'],['Vị trí','Làng Bác Trạch'],['Phủ xanh','~25 m²']].map(([k,v],i)=>(
            <div key={i} className="ecert-row"><span className="ecert-k">{k}</span><span className="ecert-v">{k==='Vị trí'?<>{I.mapPin}{v}</>:v}</span></div>
          ))}
        </div>
        <button className="ecert-share">{I.share} Chia sẻ chứng nhận</button>
      </div>
      <button className="m-btn m-btn-ghost">Đóng</button>
    </div>
  );
}

function ModalConfirmPin() {
  return (
    <div style={{ padding: '0 0 28px' }}>
      <div className="modal-handle"/>
      {/* Confirm step */}
      <div style={{ textAlign: 'center', marginBottom: 18 }}>
        <div style={{ marginBottom: 8, color: 'var(--shb)' }}>{I.tree}</div>
        <div className="modal-title" style={{ marginBottom: 4 }}>Đổi cây xanh</div>
        <div className="modal-sub">Trồng 1 cây xanh cho Việt Nam</div>
      </div>
      <div style={{ background: 'var(--section)', borderRadius: 'var(--r-lg)', padding: 18, marginBottom: 14, border: '1px solid var(--b1)' }}>
        {[['Số điểm trừ',<span style={{ fontSize: 15, fontWeight: 800, color: 'var(--shb)' }}>{fmt(TREE_PRICE)} điểm</span>],['Nguồn điểm','Điểm thưởng'],['Số dư sau GD',<span style={{ fontWeight: 700, color: 'var(--ok)' }}>{fmt(rewardPts - TREE_PRICE)} điểm</span>]].map(([k,v],i,arr)=>(
          <div key={i} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:i<arr.length-1?'1px dashed var(--b2)':'none' }}>
            <span style={{ fontSize:13,color:'var(--t2)' }}>{k as string}</span>
            <span style={{ fontSize:13,fontWeight:600 }}>{v as React.ReactNode}</span>
          </div>
        ))}
      </div>
      <div style={{ background:'#FEF3C7',borderRadius:'var(--r-md)',padding:'10px 14px',marginBottom:14,display:'flex',gap:8,alignItems:'flex-start' }}>
        <span style={{ flexShrink:0 }}>{I.alertTri}</span>
        <span style={{ fontSize:12,color:'#92400E',lineHeight:1.5 }}>Kiểm tra kỹ thông tin trước khi xác nhận. Giao dịch không thể hoàn tác sau khi nhập mã PIN.</span>
      </div>
      <button className="m-btn m-btn-primary">{I.lock} Nhập mã PIN để xác nhận</button>
      <button className="m-btn m-btn-ghost">Hủy giao dịch</button>
      {/* PIN step */}
      <div style={{ borderTop:'1px solid var(--b1)',marginTop:16,paddingTop:16,textAlign:'center' }}>
        <div style={{ marginBottom:8 }}>{I.lock}</div>
        <div style={{ fontSize:19,fontWeight:700,marginBottom:4 }}>Nhập mã PIN</div>
        <div style={{ fontSize:13,color:'var(--t2)',marginBottom:18 }}>Xác nhận giao dịch bằng mã PIN 6 số</div>
        <div style={{ display:'flex',justifyContent:'center',gap:14,marginBottom:20 }}>
          {[true,true,true,false,false,false].map((f,i)=><div key={i} style={{ width:14,height:14,borderRadius:'50%',background:f?'var(--shb)':'var(--b2)' }}/>)}
        </div>
        <div className="pin-pad">
          {['1','2','3','4','5','6','7','8','9','','0','del'].map((k,i)=>
            k===''?<div key={i}/>:<button key={i} className={`pin-key ${k==='del'?'pin-key-back':''}`}>{k==='del'?I.backspace:k}</button>
          )}
        </div>
        <div style={{ textAlign:'center',marginTop:8,fontSize:11,color:'var(--t3)' }}>Demo: nhập 1-2-3-4-5-6</div>
      </div>
    </div>
  );
}

function ModalGroupFlow() {
  return (
    <div style={{ padding: '0 0 16px' }}>
      <div className="modal-handle"/>
      <div className="modal-title"><span className="ic-inline">{I.plus}</span>Tạo nhóm trồng cây</div>
      <div className="modal-sub">Tạo nhóm kêu gọi bạn bè cùng góp điểm</div>
      <div style={{ marginBottom: 16 }}>
        <label className="modal-label">Tên nhóm</label>
        <div className="modal-input" style={{ color:'var(--t3)' }}>VD: Rừng Xanh SHB...</div>
      </div>
      <button className="m-btn m-btn-primary"><span className="ic-inline">{I.plus}</span>Tạo nhóm</button>
      <button className="m-btn m-btn-ghost">Hủy</button>
      <div style={{ borderTop:'1px solid var(--b1)',marginTop:16,paddingTop:16 }}>
        <div className="modal-title"><span className="ic-inline">{I.link}</span>Tham gia nhóm</div>
        <div className="modal-sub">Nhập mã nhóm để cùng góp điểm</div>
        <div style={{ marginBottom: 16 }}>
          <label className="modal-label">Mã nhóm</label>
          <div className="modal-input" style={{ letterSpacing:4,textAlign:'center',fontSize:20,fontWeight:700,color:'var(--t3)' }}>ABC123</div>
        </div>
        <button className="m-btn m-btn-primary"><span className="ic-inline">{I.link}</span>Tham gia nhóm</button>
      </div>
    </div>
  );
}

function ModalGiftTree() {
  return (
    <div style={{ padding: '0 0 16px' }}>
      <div className="modal-handle"/>
      <div className="modal-title"><span className="ic-inline">{I.gift}</span>Tặng cây cho bạn bè</div>
      <div className="modal-sub">Tặng đi một phần tương lai xanh cho người thân</div>
      <div style={{ background:'linear-gradient(135deg,#F0FDF4,#DCFCE7)',borderRadius:'var(--r-md)',padding:14,marginBottom:14,border:'1.5px solid var(--ok)',display:'flex',alignItems:'center',gap:12 }}>
        <span style={{ color:'#16A34A' }}>{I.treeLg}</span>
        <div><div style={{ fontWeight:700,fontSize:14 }}>Cây Bàng <span style={{ color:'var(--shb)',fontWeight:800 }}>#198</span></div><div style={{ fontSize:11,color:'var(--t2)',marginTop:2 }}>{I.mapPin} Làng Bác Trạch · 15/05/2026</div></div>
      </div>
      {[{l:'Tên người nhận *',ph:'VD: Nguyễn Thị Hoa'},{l:'Email hoặc Số điện thoại *',ph:'VD: hoa@gmail.com'},{l:'Lời nhắn (tùy chọn)',ph:'VD: Chúc mừng sinh nhật!'}].map((f,i)=>(
        <div key={i} style={{ marginBottom:12 }}><label className="modal-label">{f.l}</label><div className="modal-input" style={{ color:'var(--t3)' }}>{f.ph}</div></div>
      ))}
      <button className="m-btn m-btn-primary">Xác nhận tặng cây</button>
      <button className="m-btn m-btn-ghost">Hủy</button>
    </div>
  );
}

function ModalShare() {
  return (
    <div style={{ padding: '0 0 16px' }}>
      <div className="modal-handle"/>
      <div className="modal-title"><span className="ic-inline">{I.share}</span>Chia sẻ chiến dịch</div>
      <div className="modal-sub">Lan tỏa thông điệp xanh — mỗi lượt chia sẻ là thêm một cây được trồng</div>
      <div style={{ background:'var(--section)',borderRadius:'var(--r-lg)',padding:18,marginBottom:14,textAlign:'center',border:'1px solid var(--b1)' }}>
        <div style={{ marginBottom:6,color:'#16A34A' }}>{I.treeLg}</div>
        <div style={{ fontSize:15,fontWeight:800,marginBottom:4 }}>Chiến dịch Trồng Cây SHB 2026</div>
        <div style={{ fontSize:12,color:'var(--t2)',marginBottom:10 }}>Cùng nhau trồng {fmt(target)} cây xanh cho Việt Nam</div>
        <div style={{ display:'inline-flex',alignItems:'center',gap:8,background:'var(--card)',borderRadius:'var(--r-sm)',padding:'6px 14px',fontSize:12,color:'var(--t3)',border:'1px solid var(--b2)' }}><span>{I.link}</span>shb.vn/trong-cay-2026</div>
      </div>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10,marginBottom:12 }}>
        {[{icon:'copy',label:'Sao chép link'},{icon:'chat',label:'Chia sẻ Zalo'},{icon:'fb',label:'Facebook'},{icon:'camera',label:'Lưu ảnh'}].map((s,i)=>(
          <button key={i} style={{ border:'1.5px solid var(--b2)',borderRadius:'var(--r-md)',padding:'14px 8px',background:'var(--card)',cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',justifyContent:'center',gap:8,fontSize:13,fontWeight:600,minHeight:50 }}>
            <span className="ic-inline">{I[s.icon as keyof typeof I]}</span>{s.label}
          </button>
        ))}
      </div>
      <button className="m-btn m-btn-ghost">Đóng</button>
    </div>
  );
}

/* ─── Document page ─────────────────────────────────────────────── */
export default function WireframePage() {
  return (
    <>
      <style>{`
        .wf-doc { background: #1a1a2e; min-height: 100vh; padding: 32px 24px 64px; }
        .wf-title { color: #fff; font-size: 22px; font-weight: 900; letter-spacing: -0.5px; }
        .wf-sub { color: rgba(255,255,255,.5); font-size: 13px; margin-top: 4px; margin-bottom: 32px; }
        .wf-section { margin-bottom: 56px; }
        .wf-section-label { color: #F47B20; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
        .wf-section-label::before { content:''; display:inline-block; width:3px; height:14px; background:#F47B20; border-radius:2px; }
        .wf-row { display: flex; gap: 24px; flex-wrap: wrap; }
        /* Override phone-frame height for wireframe */
        .wf-doc .phone-frame { height: auto !important; min-height: 200px; }
        .wf-doc .phone-screen { overflow: visible !important; flex: none !important; }
        .wf-doc .phone-wrapper { transform: none !important; }
        /* Modals shown inline */
        .wf-modal-wrap { width: 393px; background: var(--card); border-radius: 24px 24px 52px 52px; overflow: hidden; border: 6px solid #1A1A1C; box-shadow: 0 40px 100px rgba(0,0,0,.85); padding: 0 16px; }
      `}</style>
      <div className="wf-doc">
        <div className="wf-title">🌳 SHB Rewards — Toàn bộ tính năng</div>
        <div className="wf-sub">Tất cả màn hình &amp; modal hiển thị đầy đủ · cuộn xuống để xem hết</div>

        {/* ── Màn hình chính ── */}
        <div className="wf-section">
          <div className="wf-section-label">Màn hình chính — 5 tabs</div>
          <div className="wf-row">
            <Phone label="Tab 1 · Đổi Quà"><TabRewards/></Phone>
            <Phone label="Tab 2 · Chiến Dịch"><TabCampaign/></Phone>
            <Phone label="Tab 3 · Rừng Của Tôi"><TabForest/></Phone>
            <Phone label="Tab 4 · Xếp Hạng"><TabLeaderboard/></Phone>
            <Phone label="Tab 5 · Cá Nhân"><TabProfile/></Phone>
          </div>
        </div>

        {/* ── Modals ── */}
        <div className="wf-section">
          <div className="wf-section-label">Modals &amp; Bottom Sheets</div>
          <div className="wf-row">
            <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:10 }}>
              <div style={{ background:'#1a1a2e',color:'#F47B20',fontSize:11,fontWeight:800,padding:'4px 14px',borderRadius:20 }}>Mua / Đổi Cây</div>
              <div className="wf-modal-wrap"><ModalBuy/></div>
            </div>
            <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:10 }}>
              <div style={{ background:'#1a1a2e',color:'#F47B20',fontSize:11,fontWeight:800,padding:'4px 14px',borderRadius:20 }}>Góp Điểm</div>
              <div className="wf-modal-wrap"><ModalDonateTree/></div>
            </div>
            <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:10 }}>
              <div style={{ background:'#1a1a2e',color:'#F47B20',fontSize:11,fontWeight:800,padding:'4px 14px',borderRadius:20 }}>Chứng Nhận</div>
              <div className="wf-modal-wrap"><ModalEcert/></div>
            </div>
            <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:10 }}>
              <div style={{ background:'#1a1a2e',color:'#F47B20',fontSize:11,fontWeight:800,padding:'4px 14px',borderRadius:20 }}>Xác Nhận + PIN</div>
              <div className="wf-modal-wrap"><ModalConfirmPin/></div>
            </div>
            <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:10 }}>
              <div style={{ background:'#1a1a2e',color:'#F47B20',fontSize:11,fontWeight:800,padding:'4px 14px',borderRadius:20 }}>Tạo / Tham Gia Nhóm</div>
              <div className="wf-modal-wrap"><ModalGroupFlow/></div>
            </div>
            <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:10 }}>
              <div style={{ background:'#1a1a2e',color:'#F47B20',fontSize:11,fontWeight:800,padding:'4px 14px',borderRadius:20 }}>Tặng Cây</div>
              <div className="wf-modal-wrap"><ModalGiftTree/></div>
            </div>
            <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:10 }}>
              <div style={{ background:'#1a1a2e',color:'#F47B20',fontSize:11,fontWeight:800,padding:'4px 14px',borderRadius:20 }}>Chia Sẻ</div>
              <div className="wf-modal-wrap"><ModalShare/></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
