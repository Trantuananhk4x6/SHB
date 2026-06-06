'use client';

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// ================================================================
// SVG ICON SYSTEM — SHB Banking Style
// ================================================================
const I = {
  tree: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V14" /><path d="M7 14l5-10 5 10H7z" /><path d="M9 8l3-6 3 6" /></svg>,
  treeLg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V14" /><path d="M7 14l5-10 5 10H7z" /><path d="M9 8l3-6 3 6" /></svg>,
  treeXl: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V14" /><path d="M7 14l5-10 5 10H7z" /><path d="M9 8l3-6 3 6" /></svg>,
  seedling: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12" /><path d="M12 12c0-4 3-7 7-7-1 4-4 7-7 7z" /><path d="M12 12c0-4-3-7-7-7 1 4 4 7 7 7z" /></svg>,
  gift: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="13" rx="2" /><path d="M12 8v13" /><path d="M3 12h18" /><path d="M12 8c-2-2-4-3-4-5a2 2 0 114 0" /><path d="M12 8c2-2 4-3 4-5a2 2 0 10-4 0" /></svg>,
  heart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
  check: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>,
  xCircle: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M15 9l-6 6M9 9l6 6" /></svg>,
  trophy: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H3.5a1.5 1.5 0 010-3H6" /><path d="M18 9h2.5a1.5 1.5 0 000-3H18" /><path d="M6 4h12v6a6 6 0 11-12 0V4z" /><path d="M12 16v4" /><path d="M8 22h8" /></svg>,
  user: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
  share: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>,
  bell: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>,
  search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  chevLeft: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>,
  chevRight: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
  mapPin: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  wallet: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="5" width="22" height="16" rx="2" /><path d="M1 10h22" /><circle cx="18" cy="15" r="1" /></svg>,
  lightning: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  lock: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>,
  certificate: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 8h10M7 12h6M7 16h8" /></svg>,
  mail: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" /></svg>,
  link: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>,
  plus: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
  dice: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8.5" cy="8.5" r="1" fill="currentColor" /><circle cx="15.5" cy="8.5" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="8.5" cy="15.5" r="1" fill="currentColor" /><circle cx="15.5" cy="15.5" r="1" fill="currentColor" /></svg>,
  sparkles: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z" /><path d="M19 15l.88 3.12L23 19l-3.12.88L19 23l-.88-3.12L15 19l3.12-.88L19 15z" /></svg>,
  target: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
  globe: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
  clipboard: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /></svg>,
  map: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></svg>,
  home: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  signal: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h.01" /><path d="M7 20v-4" /><path d="M12 20v-8" /><path d="M17 20V8" /><path d="M22 20V4" /></svg>,
  alertTri: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
  info: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>,
  backspace: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z" /><line x1="18" y1="9" x2="12" y2="15" /><line x1="12" y1="9" x2="18" y2="15" /></svg>,
  copy: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>,
  camera: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" /></svg>,
  chat: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
  fb: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>,
  tag: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>,
  cashback: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8" /><path d="M12 6v2m0 8v2" /></svg>,
  plane: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>,
  phone: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>,
  cart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" /></svg>,
  star: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
  fire: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c4-3 8-6.58 8-12a8.002 8.002 0 00-15.42-3A8 8 0 004 10c0 5.42 4 9 8 12z" /><path d="M12 22c-1.5-1.5-3-3-3-6 0-2.5 1.5-4 3-5 1.5 1 3 2.5 3 5s-1.5 4.5-3 6z" /></svg>,
  settings: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
  shield: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  help: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
  medal1: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><circle cx="12" cy="14" r="7" fill="#FFD700" stroke="#DAA520" /><path d="M9 2l3 5 3-5" fill="#EF4444" stroke="#DC2626" strokeLinejoin="round" /><text x="12" y="17" textAnchor="middle" fontSize="8" fontWeight="800" fill="#92400E">1</text></svg>,
  medal2: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><circle cx="12" cy="14" r="7" fill="#C0C0C0" stroke="#A0A0A0" /><path d="M9 2l3 5 3-5" fill="#3B82F6" stroke="#2563EB" strokeLinejoin="round" /><text x="12" y="17" textAnchor="middle" fontSize="8" fontWeight="800" fill="#374151">2</text></svg>,
  medal3: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><circle cx="12" cy="14" r="7" fill="#CD7F32" stroke="#A0522D" /><path d="M9 2l3 5 3-5" fill="#10B981" stroke="#059669" strokeLinejoin="round" /><text x="12" y="17" textAnchor="middle" fontSize="8" fontWeight="800" fill="#FFF">3</text></svg>,
};

// Avatar component
function Av({ name, size = 32, bg }: { name: string; size?: number; bg?: string }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const colors = ['#F47B20', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#EC4899', '#14B8A6', '#F59E0B'];
  const bgColor = bg || colors[name.charCodeAt(0) % colors.length];
  return (
    <div className="av" style={{ width: size, height: size, background: bgColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: size * 0.38, fontWeight: 700, flexShrink: 0, letterSpacing: -0.5 }}>
      {initials}
    </div>
  );
}

// ================================================================
// TYPES
// ================================================================
interface CommunityTree {
  id: number; name: string; currentPoints: number; targetPoints: number;
  contributors: { name: string; avatar: string }[];
  contributorCount: number; completed: boolean; treeNumber?: number;
}
interface GroupData {
  id: string; name: string; code: string;
  members: { name: string; avatar: string }[];
  trees: { id: number; current: number; target: number; completed: boolean; treeNumber?: number }[];
  totalTreesBought: number;
}
interface FeedItem { id: number; text: string; avatar: string; bg: string; time: string }
interface MyTree { id: number; name: string; date: string; icon: string; location: string; treeNumber: number }
interface LocationData { id: string; name: string; address: string; treeCount: number; icon: string }
interface LeaderboardUser { rank: number; name: string; avatar: string; trees: number; co2: number; tier: string; isMe?: boolean }
interface LeaderboardGroup { rank: number; name: string; members: number; trees: number; topMember: string; badge: string }

// ================================================================
// CONSTANTS & MOCK DATA
// ================================================================
const TREE_PRICE = 50000;
const NAMES = ['Anh Minh', 'Chị Lan', 'Anh Hùng', 'Chị Mai', 'Anh Dũng', 'Chị Hà', 'Anh Tuấn', 'Chị Linh', 'Anh Bảo', 'Chị Thảo', 'Anh Khoa', 'Chị Ngọc', 'Anh Phú', 'Chị Vy', 'Anh Long'];
const AVATARS = ['M', 'L', 'H', 'M', 'D', 'H', 'T', 'L', 'B', 'T'];
const TREE_ICONS = ['tree', 'tree', 'tree', 'tree', 'tree', 'tree'];
const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
const fmt = (n: number) => n.toLocaleString('vi-VN');
const genCode = () => { const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let r = ''; for (let i = 0; i < 6; i++) r += c[Math.floor(Math.random() * c.length)]; return r; };

const INIT_TREES: CommunityTree[] = [
  { id: 1, name: 'Cây Bàng Xanh #214', currentPoints: 32000, targetPoints: 50000, contributors: [{ name: 'Minh', avatar: 'M' }, { name: 'Lan', avatar: 'L' }, { name: 'Hùng', avatar: 'H' }], contributorCount: 12, completed: false },
  { id: 2, name: 'Cây Phượng Đỏ #215', currentPoints: 45000, targetPoints: 50000, contributors: [{ name: 'Mai', avatar: 'M' }, { name: 'Dũng', avatar: 'D' }], contributorCount: 8, completed: false },
  { id: 3, name: 'Cây Sưa Đỏ #216', currentPoints: 15000, targetPoints: 50000, contributors: [{ name: 'Hà', avatar: 'H' }], contributorCount: 4, completed: false },
  { id: 4, name: 'Cây Xoài Cát #213', currentPoints: 50000, targetPoints: 50000, contributors: [{ name: 'Tuấn', avatar: 'T' }, { name: 'Linh', avatar: 'L' }, { name: 'Bảo', avatar: 'B' }, { name: 'Thảo', avatar: 'T' }], contributorCount: 15, completed: true, treeNumber: 213 },
];
const LOCATIONS: LocationData[] = [
  { id: 'tienhai', name: 'Tiền Hải', address: 'Huyện Tiền Hải, Thái Bình', treeCount: 156, icon: 'TH' },
  { id: 'langbac', name: 'Làng Bác Trạch', address: 'Xã Bác Trạch, Tiền Hải, Thái Bình', treeCount: 89, icon: 'BT' },
  { id: 'dongchau', name: 'Đồng Châu', address: 'Biển Đồng Châu, Tiền Hải, Thái Bình', treeCount: 67, icon: 'DC' },
  { id: 'thaibinh', name: 'TP. Thái Bình', address: 'Thành phố Thái Bình', treeCount: 120, icon: 'TB' },
];
const INIT_MY: MyTree[] = [
  { id: 1, name: 'Cây Bàng', date: '15/05/2026', icon: 'tree', location: 'Làng Bác Trạch', treeNumber: 198 },
  { id: 2, name: 'Cây Xoài', date: '20/05/2026', icon: 'tree', location: 'Tiền Hải', treeNumber: 201 },
  { id: 3, name: 'Cây Phượng', date: '28/05/2026', icon: 'tree', location: 'Đồng Châu', treeNumber: 210 },
];
const LB_INDIVIDUALS: LeaderboardUser[] = [
  { rank: 1, name: 'Nguyễn Thị Hương', avatar: 'H', trees: 142, co2: 2840, tier: 'diamond' },
  { rank: 2, name: 'Trần Văn An', avatar: 'A', trees: 98, co2: 1960, tier: 'diamond' },
  { rank: 3, name: 'Lê Minh Khoa', avatar: 'K', trees: 87, co2: 1740, tier: 'gold' },
  { rank: 4, name: 'Phạm Thu Bình', avatar: 'B', trees: 61, co2: 1220, tier: 'gold' },
  { rank: 5, name: 'Đỗ Hải Nam', avatar: 'N', trees: 55, co2: 1100, tier: 'gold' },
  { rank: 6, name: 'Vũ Thị Lan', avatar: 'L', trees: 49, co2: 980, tier: 'silver' },
  { rank: 7, name: 'Hoàng Đức Long', avatar: 'L', trees: 43, co2: 860, tier: 'silver' },
  { rank: 8, name: 'Ngô Thị Mai', avatar: 'M', trees: 38, co2: 760, tier: 'silver' },
  { rank: 9, name: 'Bùi Văn Thắng', avatar: 'T', trees: 32, co2: 640, tier: 'silver' },
  { rank: 10, name: 'Đinh Thu Hà', avatar: 'H', trees: 28, co2: 560, tier: 'bronze' },
  { rank: 247, name: 'Bạn', avatar: 'B', trees: 12, co2: 240, tier: 'bronze', isMe: true },
];
const LB_GROUPS: LeaderboardGroup[] = [
  { rank: 1, name: 'Sài Gòn Xanh', members: 24, trees: 289, topMember: 'Nguyễn T.H.', badge: '1' },
  { rank: 2, name: 'Hà Nội Go Green', members: 18, trees: 187, topMember: 'Trần V.A.', badge: '2' },
  { rank: 3, name: 'SHB Family HCM', members: 31, trees: 156, topMember: 'Lê M.K.', badge: '3' },
  { rank: 4, name: 'Xanh Việt Nam', members: 12, trees: 98, topMember: 'Phạm T.B.', badge: '4' },
  { rank: 5, name: 'Team Eco Warriors', members: 9, trees: 76, topMember: 'Đỗ H.N.', badge: '5' },
];
const TIER_LABEL: Record<string, string> = {
  'starter': 'Hạt Mầm', 'bronze': 'Người Gieo', 'silver': 'Người Bảo Vệ', 'gold': 'Người Giữ Rừng', 'diamond': 'Người Dẫn Đầu Xanh',
};
const TIER_ICON: Record<string, React.ReactNode> = {
  'starter': <span className="tier-badge tier-starter">Starter</span>,
  'bronze': <span className="tier-badge tier-bronze">Bronze</span>,
  'silver': <span className="tier-badge tier-silver">Silver</span>,
  'gold': <span className="tier-badge tier-gold">Gold</span>,
  'diamond': <span className="tier-badge tier-diamond">Diamond</span>,
};
const FOREST_RANKS = [
  { name: 'Hạt Mầm', icon: '🌱', min: 0, max: 9, color: '#10B981', desc: 'Bắt đầu hành trình' },
  { name: 'Đồng', icon: '🥉', min: 10, max: 24, color: '#CD7F32', desc: 'Mua 10 cây' },
  { name: 'Bạc', icon: '🥈', min: 25, max: 49, color: '#9CA3AF', desc: 'Mua 25 cây' },
  { name: 'Vàng', icon: '🥇', min: 50, max: 99, color: '#F59E0B', desc: 'Mua 50 cây' },
  { name: 'Bạch Kim', icon: '💎', min: 100, max: 199, color: '#8B5CF6', desc: 'Mua 100 cây' },
  { name: 'Kim Cương', icon: '💠', min: 200, max: Infinity, color: '#3B82F6', desc: 'Mua 200 cây' },
];

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
  { icon: 'tag', label: 'Đổi voucher', bg: '#FFF0E0', color: '#F47B20' },
  { icon: 'cashback', label: 'Đổi tiền hoàn', bg: '#FFF0E0', color: '#F47B20' },
  { icon: 'plane', label: 'Đổi dặm bay', bg: '#FFF0E0', color: '#F47B20' },
  { icon: 'phone', label: 'Đổi điện thoại', bg: '#FFF0E0', color: '#F47B20' },
  { icon: 'cart', label: 'Đổi VETO', bg: '#FFF0E0', color: '#F47B20' },
];

// ================================================================
// 3D COMPONENTS
// ================================================================
const TREE_LAYOUT = [
  { pos: [0, 0, -1.9] as [number, number, number], scale: 0.65, v: 0 },
  { pos: [1.6, 0, -0.9] as [number, number, number], scale: 0.58, v: 1 },
  { pos: [1.95, 0, 0.8] as [number, number, number], scale: 0.7, v: 0 },
  { pos: [0.7, 0, 2.1] as [number, number, number], scale: 0.56, v: 2 },
  { pos: [-1.4, 0, 1.9] as [number, number, number], scale: 0.63, v: 1 },
  { pos: [-2.1, 0, 0.3] as [number, number, number], scale: 0.6, v: 0 },
  { pos: [-1.75, 0, -1.3] as [number, number, number], scale: 0.67, v: 2 },
  { pos: [-0.4, 0, -2.3] as [number, number, number], scale: 0.54, v: 1 },
  { pos: [2.35, 0, -1.65] as [number, number, number], scale: 0.5, v: 0 },
  { pos: [2.65, 0, 1.65] as [number, number, number], scale: 0.6, v: 2 },
  { pos: [0.2, 0, 3.2] as [number, number, number], scale: 0.52, v: 1 },
  { pos: [-2.85, 0, -0.55] as [number, number, number], scale: 0.58, v: 0 },
  { pos: [-0.5, 0, 3.4] as [number, number, number], scale: 0.56, v: 2 },
  { pos: [3.25, 0, -0.3] as [number, number, number], scale: 0.5, v: 1 },
  { pos: [-2.55, 0, 2.2] as [number, number, number], scale: 0.62, v: 0 },
];

function Tree3D({ position, scale = 1, v = 0 }: { position: [number, number, number]; scale?: number; v?: number }) {
  const g = useRef<THREE.Group>(null!);
  const sw = useRef({ off: Math.random() * Math.PI * 2, spd: 0.28 + Math.random() * 0.22 });
  useFrame(({ clock }) => { if (g.current) g.current.rotation.z = Math.sin(clock.elapsedTime * sw.current.spd + sw.current.off) * 0.022; });
  const T = "#7B4F2E";
  if (v === 1) return (
    <group ref={g} position={position} scale={scale}>
      <mesh position={[0, 0.45, 0]}><cylinderGeometry args={[0.06, 0.11, 0.9, 7]} /><meshStandardMaterial color={T} roughness={0.9} /></mesh>
      <mesh position={[0, 1.1, 0]}><coneGeometry args={[0.58, 0.86, 8]} /><meshStandardMaterial color="#1B5E20" roughness={0.75} /></mesh>
      <mesh position={[0, 1.46, 0]}><coneGeometry args={[0.44, 0.74, 8]} /><meshStandardMaterial color="#2E7D32" roughness={0.75} /></mesh>
      <mesh position={[0, 1.82, 0]}><coneGeometry args={[0.3, 0.65, 8]} /><meshStandardMaterial color="#388E3C" roughness={0.75} /></mesh>
      <mesh position={[0, 2.12, 0]}><coneGeometry args={[0.17, 0.5, 8]} /><meshStandardMaterial color="#43A047" roughness={0.75} /></mesh>
    </group>
  );
  if (v === 2) return (
    <group ref={g} position={position} scale={scale}>
      <mesh position={[0, 0.55, 0]}><cylinderGeometry args={[0.06, 0.1, 1.1, 7]} /><meshStandardMaterial color="#A1887F" roughness={0.85} /></mesh>
      <mesh position={[0, 1.4, 0]}><sphereGeometry args={[0.5, 10, 8]} /><meshStandardMaterial color="#388E3C" roughness={0.75} /></mesh>
      <mesh position={[-0.28, 1.24, 0.18]}><sphereGeometry args={[0.32, 8, 6]} /><meshStandardMaterial color="#F48FB1" roughness={0.65} /></mesh>
      <mesh position={[0.3, 1.2, -0.15]}><sphereGeometry args={[0.28, 8, 6]} /><meshStandardMaterial color="#F06292" roughness={0.65} /></mesh>
      <mesh position={[0, 1.68, 0]}><sphereGeometry args={[0.28, 8, 6]} /><meshStandardMaterial color="#EC407A" roughness={0.65} /></mesh>
    </group>
  );
  return (
    <group ref={g} position={position} scale={scale}>
      <mesh position={[0, 0.38, 0]}><cylinderGeometry args={[0.07, 0.13, 0.76, 8]} /><meshStandardMaterial color={T} roughness={0.9} /></mesh>
      <mesh position={[0, 0.96, 0]}><cylinderGeometry args={[0.04, 0.07, 0.38, 7]} /><meshStandardMaterial color={T} roughness={0.9} /></mesh>
      <mesh position={[0, 1.42, 0]}><sphereGeometry args={[0.52, 12, 10]} /><meshStandardMaterial color="#2E7D32" roughness={0.75} /></mesh>
      <mesh position={[-0.3, 1.22, 0.2]}><sphereGeometry args={[0.36, 10, 8]} /><meshStandardMaterial color="#388E3C" roughness={0.75} /></mesh>
      <mesh position={[0.32, 1.2, -0.15]}><sphereGeometry args={[0.33, 10, 8]} /><meshStandardMaterial color="#43A047" roughness={0.75} /></mesh>
      <mesh position={[0.1, 1.62, 0.12]}><sphereGeometry args={[0.28, 10, 8]} /><meshStandardMaterial color="#4CAF50" roughness={0.75} /></mesh>
      <mesh position={[-0.14, 1.68, -0.12]}><sphereGeometry args={[0.25, 10, 8]} /><meshStandardMaterial color="#66BB6A" roughness={0.75} /></mesh>
    </group>
  );
}

function Flower3D({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.09, 0]}><cylinderGeometry args={[0.013, 0.013, 0.18, 5]} /><meshStandardMaterial color="#4CAF50" roughness={0.9} /></mesh>
      <mesh position={[0, 0.195, 0]}><sphereGeometry args={[0.062, 7, 5]} /><meshStandardMaterial color={color} roughness={0.5} /></mesh>
      <mesh position={[0, 0.2, 0]}><sphereGeometry args={[0.023, 5, 4]} /><meshStandardMaterial color="#FFF176" roughness={0.4} /></mesh>
    </group>
  );
}

function Bird({ radius, speed, height, phase }: { radius: number; speed: number; height: number; phase: number }) {
  const ref = useRef<THREE.Group>(null!);
  const w1 = useRef<THREE.Group>(null!);
  const w2 = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + phase;
    if (ref.current) { ref.current.position.set(Math.cos(t) * radius, height + Math.sin(t * 2.5) * 0.12, Math.sin(t) * radius); ref.current.rotation.y = -t + Math.PI / 2; }
    const flap = Math.sin(clock.elapsedTime * 6) * 0.48;
    if (w1.current) w1.current.rotation.z = flap;
    if (w2.current) w2.current.rotation.z = -flap;
  });
  return (
    <group ref={ref}>
      <mesh><boxGeometry args={[0.22, 0.036, 0.065]} /><meshStandardMaterial color="#1a1a2e" /></mesh>
      <group ref={w1} position={[0, 0, 0.065]}><mesh position={[0, 0.01, 0.085]}><boxGeometry args={[0.13, 0.02, 0.14]} /><meshStandardMaterial color="#16213e" /></mesh></group>
      <group ref={w2} position={[0, 0, -0.065]}><mesh position={[0, 0.01, -0.085]}><boxGeometry args={[0.13, 0.02, 0.14]} /><meshStandardMaterial color="#16213e" /></mesh></group>
    </group>
  );
}

function ForestScene({ count }: { count: number }) {
  const visible = TREE_LAYOUT.slice(0, Math.min(Math.max(count, 5), TREE_LAYOUT.length));
  return (
    <>
      <color attach="background" args={['#87CEEB']} />
      <fog attach="fog" args={['#B0DCEF', 10, 30]} />
      <ambientLight intensity={0.68} color="#FFF8E7" />
      <directionalLight position={[6, 10, 4]} intensity={1.6} color="#FFF5D0" />
      <directionalLight position={[-4, 6, -3]} intensity={0.28} color="#B3E5FC" />
      <pointLight position={[0, 7, 0]} intensity={0.14} color="#FFFDE7" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}><planeGeometry args={[40, 40]} /><meshStandardMaterial color="#57A657" roughness={0.95} /></mesh>
      {([[0.8, 0.9], [-1.4, 0.5], [1.8, -1.2], [-0.6, -1.8], [2.5, 0.8], [-2.0, 1.6], [0.3, -0.7]] as [number, number][]).map(([x, z], i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0, z]}><circleGeometry args={[0.45 + i * 0.1, 8]} /><meshStandardMaterial color={i % 2 === 0 ? "#4a9e4a" : "#3d8b3d"} roughness={0.95} /></mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.0, 0.005, 1.8]}><circleGeometry args={[0.72, 24]} /><meshStandardMaterial color="#64B5F6" roughness={0.05} metalness={0.25} transparent opacity={0.9} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.0, 0.003, 1.8]}><ringGeometry args={[0.72, 0.85, 24]} /><meshStandardMaterial color="#8D6E63" roughness={0.9} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0.3]}><planeGeometry args={[0.45, 5]} /><meshStandardMaterial color="#D7CCC8" roughness={0.98} /></mesh>
      {visible.map((t, i) => <Tree3D key={i} position={t.pos} scale={t.scale} v={t.v} />)}
      {([
        { p: [0.5, 0, 0.4] as [number, number, number], c: '#FF80AB' },
        { p: [-0.6, 0, 0.3] as [number, number, number], c: '#FFD740' },
        { p: [0.3, 0, -0.9] as [number, number, number], c: '#82B1FF' },
        { p: [-0.4, 0, 1.1] as [number, number, number], c: '#FFFFFF' },
        { p: [1.0, 0, -0.4] as [number, number, number], c: '#FF7043' },
        { p: [-1.0, 0, -0.8] as [number, number, number], c: '#B39DDB' },
        { p: [0.8, 0, 1.6] as [number, number, number], c: '#80DEEA' },
        { p: [-0.2, 0, 0.9] as [number, number, number], c: '#FFEB3B' },
      ]).map((f, i) => <Flower3D key={i} position={f.p} color={f.c} />)}
      {([[-1.7, 0.22, 0.5], [1.4, 0.2, -1.3], [-0.6, 0.2, 2.3]] as [number, number, number][]).map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh><sphereGeometry args={[0.26, 8, 6]} /><meshStandardMaterial color="#388E3C" roughness={0.9} /></mesh>
          <mesh position={[0.18, -0.02, 0.12]}><sphereGeometry args={[0.2, 8, 6]} /><meshStandardMaterial color="#2E7D32" roughness={0.9} /></mesh>
          <mesh position={[-0.14, 0.04, -0.12]}><sphereGeometry args={[0.18, 8, 6]} /><meshStandardMaterial color="#43A047" roughness={0.9} /></mesh>
        </group>
      ))}
      <Bird radius={3.8} speed={0.33} height={2.9} phase={0} />
      <Bird radius={4.5} speed={0.25} height={3.5} phase={2.3} />
      <Bird radius={3.0} speed={0.42} height={2.4} phase={4.6} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 6} />
    </>
  );
}

function Confetti() {
  return (<div className="confetti">{Array.from({ length: 35 }, (_, i) => (<div key={i} className="confetti-p" style={{ left: `${Math.random() * 100}%`, background: ['#F47B20', '#FF9A4D', '#FFB347', '#10B981', '#3B82F6', '#EF4444', '#F59E0B'][i % 7], animationDelay: `${Math.random() * 2}s`, animationDuration: `${2 + Math.random() * 2}s`, width: `${6 + Math.random() * 8}px`, height: `${6 + Math.random() * 8}px` }} />))}</div>);
}

// ================================================================
// UI COMPONENTS
// ================================================================

// Status bar with real time
function StatusBar({ light = false }: { light?: boolean }) {
  const [time, setTime] = useState(() => {
    const n = new Date(); return `${n.getHours()}:${String(n.getMinutes()).padStart(2, '0')}`;
  });
  useEffect(() => {
    const i = setInterval(() => { const n = new Date(); setTime(`${n.getHours()}:${String(n.getMinutes()).padStart(2, '0')}`); }, 30000);
    return () => clearInterval(i);
  }, []);
  const col = light ? 'rgba(255,255,255,0.95)' : '#111827';
  return (
    <div className={`status-bar ${light ? 'sb-light' : 'sb-dark'}`}>
      <span className="status-time">{time}</span>
      <div className="status-icons">
        {/* Signal */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill={col}>
          <rect x="0" y="5" width="3" height="7" rx="1" opacity=".4"/>
          <rect x="4.5" y="3.5" width="3" height="8.5" rx="1" opacity=".6"/>
          <rect x="9" y="1.5" width="3" height="10.5" rx="1" opacity=".8"/>
          <rect x="13.5" y="0" width="3" height="12" rx="1"/>
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="2.5">
          <path d="M5 12.55a11 11 0 0114.08 0" strokeLinecap="round"/><path d="M1.42 9a16 16 0 0121.16 0" strokeLinecap="round"/><path d="M8.53 16.11a6 6 0 016.95 0" strokeLinecap="round"/><circle cx="12" cy="20" r="1.5" fill={col} stroke="none"/>
        </svg>
        {/* Battery */}
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
          <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke={col} strokeOpacity=".4"/>
          <rect x="2" y="2" width="18" height="9" rx="2" fill={col}/>
          <path d="M24 4.5v4a2 2 0 000-4z" fill={col} opacity=".4"/>
        </svg>
      </div>
    </div>
  );
}

// Bottom Navigation Bar
type TabType = 'campaign' | 'forest' | 'leaderboard' | 'rewards' | 'profile';
function BottomNav({ tab, setTab, notifCount }: { tab: TabType; setTab: (t: TabType) => void; notifCount: number }) {
  const items: { id: TabType; icon: React.ReactNode; label: string; badge?: number }[] = [
    { id: 'campaign', icon: I.seedling, label: 'Chiến dịch', badge: notifCount > 0 ? notifCount : undefined },
    { id: 'forest', icon: I.tree, label: 'Rừng tôi' },
    { id: 'leaderboard', icon: I.trophy, label: 'Xếp hạng' },
    { id: 'rewards', icon: I.gift, label: 'Đổi quà' },
    { id: 'profile', icon: I.user, label: 'Cá nhân' },
  ];
  return (
    <div className="bottom-nav">
      {items.map(item => (
        <button key={item.id} className={`nav-item ${tab === item.id ? 'nav-active' : ''}`} onClick={() => setTab(item.id)} id={`nav-${item.id}`}>
          <div className="nav-icon">
            {item.icon}
            {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
          </div>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

// Splash Screen
function SplashScreen({ hiding }: { hiding: boolean }) {
  return (
    <div className={`splash ${hiding ? 'splash-hiding' : ''}`}>
      <div className="splash-icon">🌳</div>
      <div className="splash-brand">SHB Green</div>
      <div className="splash-tagline">Cùng nhau phủ xanh Việt Nam</div>
      <div className="splash-progress"><div className="splash-progress-fill" /></div>
    </div>
  );
}

// Impact Ring (CO2)
function ImpactRing({ trees }: { trees: number }) {
  const area = trees * 25;
  const pct = Math.min(trees / 50, 1);
  const r = 58; const circ = 2 * Math.PI * r;
  const dash = circ * pct;
  return (
    <div className="impact-wrap">
      <svg className="impact-ring-svg" viewBox="0 0 150 150">
        <defs>
          <linearGradient id="impactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
        <circle cx="75" cy="75" r={r} fill="none" stroke="#F0FDF4" strokeWidth="12" />
        <circle cx="75" cy="75" r={r} fill="none" stroke="url(#impactGrad)" strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          style={{ transformOrigin: '75px 75px', transform: 'rotate(-90deg)', transition: 'stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)' }}
        />
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

// ================================================================
// MAIN APP
// ================================================================
export default function App() {
  // NAVIGATION
  const [tab, setTab] = useState<TabType>('campaign');

  // SPLASH
  const [splashHiding, setSplashHiding] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setSplashHiding(true), 1800);
    const t2 = setTimeout(() => setSplashDone(true), 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // STREAK & NOTIF
  const [streak] = useState(7);
  const [notifCount, setNotifCount] = useState(3);

  // POINTS
  const [rewardPts, setRewardPts] = useState(3000000);
  const [cashbackPts, setCashbackPts] = useState(2500000);
  const [ptType, setPtType] = useState<'reward' | 'cashback'>('reward');
  const pts = () => ptType === 'reward' ? rewardPts : cashbackPts;
  const deduct = (n: number) => ptType === 'reward' ? setRewardPts(p => p - n) : setCashbackPts(p => p - n);

  // CAMPAIGN STATE
  const [totalTrees, setTotalTrees] = useState(1240);
  const target = 5000;
  const [comTrees, setComTrees] = useState<CommunityTree[]>(INIT_TREES);
  const [myTrees, setMyTrees] = useState<MyTree[]>(INIT_MY);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const feedId = useRef(100);

  // MODALS
  const [showBuy, setShowBuy] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [showEcert, setShowEcert] = useState(false);
  const [showDonateTree, setShowDonateTree] = useState(false);
  const [showCreateGrp, setShowCreateGrp] = useState(false);
  const [showJoinGrp, setShowJoinGrp] = useState(false);
  const [showLocModal, setShowLocModal] = useState(false);

  // TOAST / CONFETTI
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [confetti, setConfetti] = useState(false);
  const showToast = useCallback((text: string, type: 'success' | 'error') => setToast({ text, type }), []);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 4000); return () => clearTimeout(t); }, [toast]);

  // FORM STATE
  const [donateAmt, setDonateAmt] = useState('');
  const [selTreeId, setSelTreeId] = useState<number | null>(null);
  const [ecertData, setEcertData] = useState<{ name: string; code: string; date: string; loc: string } | null>(null);
  const [grpName, setGrpName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [grpDonate, setGrpDonate] = useState('');
  const [selLoc, setSelLoc] = useState('tienhai');
  const [donateTab, setDonateTab] = useState<'random' | 'group'>('random');

  // GROUP
  const [group, setGroup] = useState<GroupData | null>(null);
  const [grpTreePage, setGrpTreePage] = useState(1);
  const TREES_PER_PAGE = 5;

  // LEADERBOARD
  const [lbTab, setLbTab] = useState<'individual' | 'group'>('individual');
  const [lbFilter, setLbFilter] = useState<'month' | 'alltime'>('month');

  // FLASH EVENT
  const [flashEvent, setFlashEvent] = useState<{ timeLeft: number } | null>(null);
  const flashTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // RANDOM DONATE
  const [showRandomDonate, setShowRandomDonate] = useState(false);
  const [randomAmt, setRandomAmt] = useState('');
  const [randomTarget, setRandomTarget] = useState<CommunityTree | null>(null);

  // MY TREES
  const [showMyTrees, setShowMyTrees] = useState(false);
  const [myTreeFilter, setMyTreeFilter] = useState<string>('all');
  const [showTreeDetail, setShowTreeDetail] = useState(false);
  const [selectedMyTree, setSelectedMyTree] = useState<MyTree | null>(null);

  // INVITE MEMBER
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  // GIFT TREE
  const [showGiftTree, setShowGiftTree] = useState(false);
  const [giftTreeId, setGiftTreeId] = useState<number | null>(null);
  const [giftName, setGiftName] = useState('');
  const [giftContact, setGiftContact] = useState('');
  const [giftMsg, setGiftMsg] = useState('');
  const [showGiftConfirm, setShowGiftConfirm] = useState(false);
  const [giftConfirmData, setGiftConfirmData] = useState<{ name: string; contact: string; msg: string; treeName: string; treeNumber: number; location: string } | null>(null);

  // SHARE
  const [showShare, setShowShare] = useState(false);

  // CONFIRM + PIN
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmData, setConfirmData] = useState<{ title: string; desc: string; amount: number; icon: string } | null>(null);
  const [showPin, setShowPin] = useState(false);
  const [pinValue, setPinValue] = useState('');
  const [pinError, setPinError] = useState(false);
  const pendingActionRef = useRef<(() => void) | null>(null);

  // ---- REALTIME SIM ----
  useEffect(() => {
    const i = setInterval(() => setTotalTrees(p => p + 1), 4000 + Math.random() * 2000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const i = setInterval(() => {
      setComTrees(prev => prev.map(t => {
        if (t.completed) return t;
        const inc = Math.floor(Math.random() * 2500) + 500;
        const np = Math.min(t.currentPoints + inc, t.targetPoints);
        if (np >= t.targetPoints && !t.completed) {
          const tn = totalTrees + Math.floor(Math.random() * 10);
          showToast(`${t.name} đã được trồng thành công! Cây #${tn}`, 'success');
          setConfetti(true); setTimeout(() => setConfetti(false), 3000);
          setTotalTrees(p => p + 1);
          setNotifCount(p => p + 1);
          return { ...t, currentPoints: np, completed: true, treeNumber: tn };
        }
        return { ...t, currentPoints: np };
      }));
    }, 8000);
    return () => clearInterval(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalTrees]);

  useEffect(() => {
    const gen = (): FeedItem => {
      const n = pick(NAMES);
      const tpls = [
        `<strong>${n}</strong> vừa góp <strong>${fmt((Math.floor(Math.random() * 10) + 1) * 1000)} điểm</strong> vào cây #${200 + Math.floor(Math.random() * 50)}`,
        `<strong>${n}</strong> vừa mua <strong>1 cây xanh</strong>`,
        `<strong>Nhóm ${pick(['Sài Gòn Xanh', 'Hà Nội Go Green', 'SHB Family', 'Xanh Việt'])}</strong> vừa trồng được cây thứ <strong>${Math.floor(Math.random() * 50) + 10}</strong>`,
        `<strong>${n}</strong> vừa tạo nhóm "<strong>${pick(['Rừng Xanh', 'Team Green', 'Cùng Trồng Cây'])}</strong>"`,
      ];
      return { id: feedId.current++, text: pick(tpls), avatar: pick(AVATARS), bg: pick(['#FFF0E0', '#E8F5E9', '#DBEAFE', '#FCE4EC']), time: 'Vừa xong' };
    };
    setFeed(Array.from({ length: 5 }, () => gen()));
    const i = setInterval(() => { setFeed(p => [gen(), ...p.slice(0, 9)]); setNotifCount(p => Math.min(p + 1, 9)); }, 1500);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (!group) return;
    const i = setInterval(() => {
      setGroup(prev => {
        if (!prev) return null;
        const ut = prev.trees.map(t => {
          if (t.completed) return t;
          const inc = Math.floor(Math.random() * 1500) + 500;
          const nc = Math.min(t.current + inc, t.target);
          if (nc >= t.target) {
            const tn = totalTrees + Math.floor(Math.random() * 5) + 1;
            showToast(`Nhóm "${prev.name}" vừa trồng cây #${tn}!`, 'success');
            setConfetti(true); setTimeout(() => setConfetti(false), 3000);
            setTotalTrees(p => p + 1);
            return { ...t, current: nc, completed: true, treeNumber: tn };
          }
          return { ...t, current: nc };
        });
        return { ...prev, trees: ut, totalTreesBought: ut.filter(t => t.completed).length };
      });
    }, 7000);
    return () => clearInterval(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group?.id, totalTrees]);

  // ---- FLASH EVENT ----
  useEffect(() => {
    let triggerTimeout: ReturnType<typeof setTimeout>;
    const trigger = () => {
      let t = 60;
      setFlashEvent({ timeLeft: t });
      flashTimer.current = setInterval(() => {
        t -= 1;
        if (t <= 0) { clearInterval(flashTimer.current!); setFlashEvent(null); triggerTimeout = setTimeout(trigger, 150000 + Math.random() * 120000); }
        else setFlashEvent({ timeLeft: t });
      }, 1000);
    };
    triggerTimeout = setTimeout(trigger, 40000 + Math.random() * 20000);
    return () => { clearTimeout(triggerTimeout); if (flashTimer.current) clearInterval(flashTimer.current); };
  }, []);

  // ---- HANDLERS ----
  const handleBuy = useCallback(() => {
    if (pts() < TREE_PRICE) { showToast('Bạn không đủ điểm!', 'error'); return; }
    deduct(TREE_PRICE);
    const tn = totalTrees + 1; setTotalTrees(p => p + 1);
    const t: MyTree = { id: Date.now(), name: `Cây ${pick(['Bàng', 'Xoài', 'Phượng', 'Sưa', 'Bằng Lăng'])}`, date: new Date().toLocaleDateString('vi-VN'), icon: pick(TREE_ICONS), location: pick(LOCATIONS).name, treeNumber: tn };
    setMyTrees(p => [t, ...p]);
    setEcertData({ name: 'Nguyễn Văn A', code: `SHB-TREE-${tn}`, date: new Date().toLocaleDateString('vi-VN'), loc: t.location });
    setShowBuy(false); setShowEcert(true); setConfetti(true); setTimeout(() => setConfetti(false), 3000);
    showToast(`Trồng thành công cây #${tn}!`, 'success');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ptType, rewardPts, cashbackPts, totalTrees]);

  const handleDonateTree = useCallback(() => {
    const amtTrim = donateAmt.trim();
    if (!/^\d+$/.test(amtTrim) || parseInt(amtTrim) <= 0) { showToast('Số điểm phải là số nguyên dương!', 'error'); return; }
    const a = parseInt(amtTrim);
    if (a > pts()) { showToast('Không đủ điểm!', 'error'); return; }
    deduct(a);
    setComTrees(prev => prev.map(t => {
      if (t.id !== selTreeId) return t;
      const np = Math.min(t.currentPoints + a, t.targetPoints);
      const done = np >= t.targetPoints;
      if (done && !t.completed) {
        const tn = totalTrees + 1; setTotalTrees(p => p + 1);
        showToast(`${t.name} đã trồng thành công!`, 'success');
        setConfetti(true); setTimeout(() => setConfetti(false), 3000);
        return { ...t, currentPoints: np, completed: true, treeNumber: tn, contributorCount: t.contributorCount + 1, contributors: [...t.contributors, { name: 'Bạn', avatar: 'B' }] };
      }
      return { ...t, currentPoints: np, contributorCount: t.contributorCount + 1, contributors: [...t.contributors, { name: 'Bạn', avatar: 'B' }] };
    }));
    setShowDonateTree(false); setDonateAmt('');
    showToast(`Góp ${fmt(a)} điểm thành công!`, 'success');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donateAmt, selTreeId, ptType, rewardPts, cashbackPts, totalTrees]);

  const handleCreateGrp = useCallback(() => {
    const nameTrim = grpName.trim();
    if (!nameTrim) { showToast('Nhập tên nhóm!', 'error'); return; }
    if (nameTrim.length < 3) { showToast('Tên nhóm phải có ít nhất 3 ký tự!', 'error'); return; }
    if (nameTrim.length > 30) { showToast('Tên nhóm không được quá 30 ký tự!', 'error'); return; }
    const code = genCode();
    setGroup({ id: Date.now().toString(), name: nameTrim, code, members: [{ name: 'Bạn', avatar: 'B' }, { name: pick(NAMES), avatar: pick(AVATARS) }], trees: [{ id: 1, current: 0, target: TREE_PRICE, completed: false }], totalTreesBought: 0 });
    setGrpTreePage(1); setShowCreateGrp(false); setGrpName('');
    showToast(`Đã tạo nhóm – Mã: ${code}`, 'success');
  }, [grpName, showToast]);

  const handleJoinGrp = useCallback(() => {
    const codeTrim = joinCode.trim().toUpperCase();
    if (!codeTrim) { showToast('Nhập mã nhóm!', 'error'); return; }
    if (!/^[A-Z0-9]{6}$/.test(codeTrim)) { showToast('Mã nhóm phải gồm đúng 6 ký tự!', 'error'); return; }
    setGroup({ id: Date.now().toString(), name: pick(['Rừng Xanh SHB', 'Team Green VN', 'Sài Gòn Xanh']), code: codeTrim, members: [{ name: pick(NAMES), avatar: pick(AVATARS) }, { name: pick(NAMES), avatar: pick(AVATARS) }, { name: 'Bạn', avatar: 'B' }], trees: [{ id: 1, current: 35000, target: TREE_PRICE, completed: false }, { id: 2, current: TREE_PRICE, target: TREE_PRICE, completed: true, treeNumber: 195 }], totalTreesBought: 1 });
    setGrpTreePage(1); setShowJoinGrp(false); setJoinCode('');
    showToast('Đã tham gia nhóm!', 'success');
  }, [joinCode, showToast]);

  const handleGrpDonate = useCallback(() => {
    const amtTrim = grpDonate.trim();
    if (!/^\d+$/.test(amtTrim) || parseInt(amtTrim) <= 0) { showToast('Số điểm phải là số nguyên dương!', 'error'); return; }
    const a = parseInt(amtTrim);
    if (a > pts()) { showToast('Không đủ điểm!', 'error'); return; }
    deduct(a);
    setGroup(prev => {
      if (!prev) return null;
      let rem = a;
      const ut = prev.trees.map(t => {
        if (t.completed || rem <= 0) return t;
        const add = Math.min(rem, t.target - t.current); rem -= add;
        const nc = t.current + add;
        if (nc >= t.target) {
          const tn = totalTrees + Math.floor(Math.random() * 5) + 1;
          showToast(`Nhóm "${prev.name}" trồng cây #${tn}!`, 'success');
          setConfetti(true); setTimeout(() => setConfetti(false), 3000);
          setTotalTrees(p => p + 1);
          return { ...t, current: nc, completed: true, treeNumber: tn };
        }
        return { ...t, current: nc };
      });
      while (rem > 0) {
        const nid = ut.length + 1;
        if (rem >= TREE_PRICE) { ut.push({ id: nid, current: TREE_PRICE, target: TREE_PRICE, completed: true, treeNumber: totalTrees + nid }); rem -= TREE_PRICE; }
        else { ut.push({ id: nid, current: rem, target: TREE_PRICE, completed: false }); rem = 0; }
      }
      return { ...prev, trees: ut, totalTreesBought: ut.filter(t => t.completed).length };
    });
    setGrpDonate(''); showToast(`Góp ${fmt(a)} điểm cho nhóm!`, 'success');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grpDonate, ptType, rewardPts, cashbackPts, totalTrees]);

  const openRandomDonate = useCallback(() => {
    const target = [...comTrees].filter(t => !t.completed).sort((a, b) => (a.currentPoints / a.targetPoints) - (b.currentPoints / b.targetPoints))[0] || null;
    setRandomTarget(target); setShowRandomDonate(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comTrees]);

  const handleRandomDonate = useCallback(() => {
    const amtTrim = randomAmt.trim();
    if (!/^\d+$/.test(amtTrim) || parseInt(amtTrim) <= 0) { showToast('Số điểm phải là số nguyên dương!', 'error'); return; }
    const a = parseInt(amtTrim);
    if (a > pts()) { showToast('Không đủ điểm!', 'error'); return; }
    if (!randomTarget) { showToast('Không có cây nào cần góp!', 'error'); return; }
    deduct(a);
    setComTrees(prev => prev.map(t => {
      if (t.id !== randomTarget.id) return t;
      const np = Math.min(t.currentPoints + a, t.targetPoints);
      const done = np >= t.targetPoints;
      if (done && !t.completed) {
        const tn = totalTrees + 1; setTotalTrees(p => p + 1);
        showToast(`${t.name} đã trồng thành công!`, 'success');
        setConfetti(true); setTimeout(() => setConfetti(false), 3000);
        return { ...t, currentPoints: np, completed: true, treeNumber: tn, contributorCount: t.contributorCount + 1, contributors: [...t.contributors, { name: 'Bạn', avatar: 'B' }] };
      }
      return { ...t, currentPoints: np, contributorCount: t.contributorCount + 1, contributors: [...t.contributors, { name: 'Bạn', avatar: 'B' }] };
    }));
    setShowRandomDonate(false); setRandomAmt('');
    showToast(`Đã góp ${fmt(a)} điểm cho ${randomTarget.name}!`, 'success');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randomAmt, randomTarget, ptType, rewardPts, cashbackPts, totalTrees]);

  const handleFlashBuy = useCallback(() => {
    if (pts() < TREE_PRICE) { showToast('Không đủ điểm!', 'error'); return; }
    deduct(TREE_PRICE);
    const tn1 = totalTrees + 1; const tn2 = totalTrees + 2;
    setTotalTrees(p => p + 2);
    const t1: MyTree = { id: Date.now(), name: `Cây ${pick(['Bàng', 'Xoài', 'Phượng'])}`, date: new Date().toLocaleDateString('vi-VN'), icon: pick(TREE_ICONS), location: pick(LOCATIONS).name, treeNumber: tn1 };
    const t2: MyTree = { id: Date.now() + 1, name: `Cây ${pick(['Sưa', 'Bằng Lăng', 'Tràm'])}`, date: new Date().toLocaleDateString('vi-VN'), icon: pick(TREE_ICONS), location: pick(LOCATIONS).name, treeNumber: tn2 };
    setMyTrees(p => [t2, t1, ...p]);
    setEcertData({ name: 'Nguyễn Văn A', code: `SHB-TREE-${tn1}`, date: new Date().toLocaleDateString('vi-VN'), loc: t1.location });
    if (flashTimer.current) clearInterval(flashTimer.current);
    setFlashEvent(null); setConfetti(true); setTimeout(() => setConfetti(false), 4000);
    showToast(`FLASH! Bạn nhận 2 cây #${tn1} & #${tn2}!`, 'success');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ptType, rewardPts, cashbackPts, totalTrees]);

  const handleInvite = useCallback(() => {
    const emailTrim = inviteEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrim)) { showToast('Email không đúng định dạng!', 'error'); return; }
    const newMember = { name: emailTrim.split('@')[0], avatar: pick(AVATARS) };
    setGroup(prev => prev ? { ...prev, members: [...prev.members, newMember] } : null);
    setShowInvite(false); setInviteEmail('');
    showToast(`Đã gửi lời mời đến ${emailTrim}!`, 'success');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteEmail]);

  const openConfirm = useCallback((title: string, desc: string, amount: number, icon: string, cb: () => void) => {
    pendingActionRef.current = cb; setConfirmData({ title, desc, amount, icon }); setShowConfirm(true);
  }, []);

  const handlePinInput = useCallback((digit: string) => {
    setPinValue(prev => {
      if (prev.length >= 6) return prev;
      const next = prev + digit;
      if (next.length === 6) {
        setTimeout(() => {
          if (next === '123456') {
            setShowPin(false); setShowConfirm(false);
            setPinValue(''); setPinError(false);
            pendingActionRef.current?.(); pendingActionRef.current = null;
          } else {
            setPinError(true);
            setTimeout(() => { setPinValue(''); setPinError(false); }, 700);
          }
        }, 150);
      }
      return next;
    });
  }, []);

  const handlePinBack = useCallback(() => { setPinValue(p => p.slice(0, -1)); setPinError(false); }, []);

  const handleGiftTree = useCallback(() => {
    const nameTrim = giftName.trim();
    if (!nameTrim) { showToast('Nhập tên người nhận!', 'error'); return; }
    if (nameTrim.length < 2) { showToast('Tên người nhận phải từ 2 ký tự!', 'error'); return; }
    const contactTrim = giftContact.trim();
    if (!contactTrim) { showToast('Nhập email hoặc số điện thoại!', 'error'); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(0|\+84|84)?([3|5|7|8|9][0-9]{8})$|^[0-9]{9,15}$/;
    if (!emailRegex.test(contactTrim) && !phoneRegex.test(contactTrim)) { showToast('Email hoặc Số điện thoại không hợp lệ!', 'error'); return; }
    const tree = myTrees.find(x => x.id === giftTreeId);
    setGiftConfirmData({ name: nameTrim, contact: contactTrim, msg: giftMsg, treeName: tree?.name || 'Cây xanh', treeNumber: tree?.treeNumber || 0, location: tree?.location || '' });
    setShowGiftConfirm(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [giftName, giftContact, giftMsg, giftTreeId, myTrees]);

  const handleGiftTreeConfirm = useCallback(() => {
    if (!giftConfirmData) return;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(giftConfirmData.contact);
    const channel = isEmail ? 'Email' : 'tin nhắn SMS';
    setShowGiftConfirm(false); setShowGiftTree(false);
    setGiftName(''); setGiftContact(''); setGiftMsg(''); setGiftConfirmData(null);
    setConfetti(true); setTimeout(() => setConfetti(false), 3000);
    showToast(`Bạn đã tặng ${giftConfirmData.treeName} cho ${giftConfirmData.name}! Đã gửi chứng nhận qua ${channel}`, 'success');
  }, [giftConfirmData]);

  const greenArea = myTrees.length * 25;

  // Static particle data - avoids SSR/client hydration mismatch
  const PARTICLES = [
    { left: 8,  w: 7, h: 6, dur: 14, del: 2 }, { left: 21, w: 5, h: 9, dur: 10, del: 7 },
    { left: 34, w: 9, h: 5, dur: 18, del: 1 }, { left: 47, w: 6, h: 7, dur: 12, del: 5 },
    { left: 59, w: 8, h: 6, dur: 16, del: 3 }, { left: 72, w: 5, h: 8, dur:  9, del: 8 },
    { left: 83, w: 7, h: 5, dur: 13, del: 0 }, { left: 15, w: 6, h: 9, dur: 11, del: 6 },
    { left: 44, w: 9, h: 7, dur: 17, del: 4 }, { left: 66, w: 5, h: 6, dur: 15, del: 9 },
    { left: 91, w: 8, h: 8, dur: 19, del: 2 }, { left:  3, w: 6, h: 5, dur: 10, del: 7 },
  ];

  return (
    <div className="desktop-scene">
      <div className="scene-particles">
        {PARTICLES.map((p, i) => (
          <div key={i} className="scene-particle" style={{
            left: `${p.left}%`, width: `${p.w}px`, height: `${p.h}px`,
            background: i % 3 === 0 ? 'rgba(245,130,32,0.5)' : i % 3 === 1 ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.3)',
            animationDuration: `${p.dur}s`, animationDelay: `${p.del}s`,
          }} />
        ))}
      </div>

      <div className="phone-wrapper">
        <div className="phone-btn-silent" />
        <div className="phone-btn-vol-up" />
        <div className="phone-btn-vol-down" />
        <div className="phone-btn-power" />

        <div className="phone-frame">
          <div className="dynamic-island">
            <div className="di-sensor" />
            <div className="di-camera" />
          </div>

          {/* Page headers — fixed flex children of phone-frame, outside scroll area */}
          {splashDone && tab === 'campaign' && (
            <nav className="cp-nav">
              <span className="cp-nav-title"><span className="ic-inline">{I.seedling}</span>Chiến dịch Trồng Cây</span>
              <div className="cp-nav-right">
                <button className="cp-nav-btn" id="cp-share" onClick={() => setShowShare(true)}>{I.share}</button>
              </div>
            </nav>
          )}
          {splashDone && tab === 'forest' && (
            <nav className="cp-nav">
              <button className="cp-nav-btn" onClick={() => setTab('campaign')}>{I.chevLeft}</button>
              <span className="cp-nav-title"><span className="ic-inline">{I.home}</span>Khu rừng của tôi</span>
              <button className="cp-nav-btn" onClick={() => setShowMyTrees(true)}>{I.clipboard}</button>
            </nav>
          )}
          {splashDone && tab === 'leaderboard' && (
            <nav className="cp-nav">
              <button className="cp-nav-btn" onClick={() => setTab('campaign')}>{I.chevLeft}</button>
              <span className="cp-nav-title"><span className="ic-inline">{I.trophy}</span>Bảng xếp hạng</span>
            </nav>
          )}

          <div className="phone-screen" style={splashDone ? {paddingTop:0} : {}}>
            <StatusBar light={true} />
            {/* Splash */}
            {!splashDone && <SplashScreen hiding={splashHiding} />}

            {/* ── TAB: REWARDS ── */}
            {tab === 'rewards' && (
              <div className="app-shell">
                {/* HEADER */}
                <header className="rw-header">
                  <div className="rw-header-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#fff', fontSize: 13, fontWeight: 700, opacity: .85 }}>SHB</span>
                      <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 13 }}>›</span>
                      <h1 className="rw-title">Đổi điểm thưởng</h1>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="rw-header-btn" id="rw-notif" style={{ position: 'relative' }} onClick={() => setNotifCount(0)}>
                        {I.bell}
                        {notifCount > 0 && <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, background: '#EF4444', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.2)' }} />}
                      </button>
                    </div>
                  </div>
                  <div className="rw-search">
                    <span className="rw-search-icon">{I.search}</span>
                    <input placeholder="Tìm ưu đãi, thương hiệu..." />
                  </div>
                </header>

                {/* Points summary banner */}
                <div style={{ background: 'var(--shb-grad)', padding: '0 16px 20px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--r-xl)', padding: '14px 16px', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ color: 'rgba(255,255,255,.8)', fontSize: 11, fontWeight: 600, marginBottom: 2 }}>Tổng điểm khả dụng</div>
                        <div style={{ color: '#fff', fontSize: 22, fontWeight: 900, letterSpacing: -1 }}>{fmt(rewardPts + cashbackPts)} <span style={{ fontSize: 13, fontWeight: 600, opacity: .7 }}>đ</span></div>
                      </div>
                      <button onClick={() => setTab('campaign')} style={{ background: '#fff', border: 'none', borderRadius: 'var(--r-full)', color: 'var(--shb)', fontWeight: 800, fontSize: 12, padding: '8px 14px', cursor: 'pointer', fontFamily: 'inherit' }}>
                        Trồng cây →
                      </button>
                    </div>
                  </div>
                </div>

                {/* CATEGORIES */}
                <div className="rw-cats">
                  {CATEGORIES.map((c, i) => (
                    <div key={i} className="rw-cat">
                      <div className="rw-cat-icon" style={{ background: c.bg, color: c.color }}>{I[c.icon as keyof typeof I]}</div>
                      <span className="rw-cat-label">{c.label}</span>
                    </div>
                  ))}
                </div>

                {/* PRIVILEGES */}
                <div className="rw-privileges" style={{ margin: '12px 16px 0' }}>
                  <div className="rw-priv-item">
                    <div className="rw-priv-left"><span className="ic-inline">{I.star}</span>Đặc quyền ưu đãi thẻ</div>
                    <span className="rw-priv-arrow">{I.chevRight}</span>
                  </div>
                  <div className="rw-priv-item">
                    <div className="rw-priv-left"><span className="ic-inline">{I.gift}</span>Kho quà cao cấp</div>
                    <span className="rw-priv-arrow">{I.chevRight}</span>
                  </div>
                </div>

                {/* MÙA LỄ HỘI */}
                <div className="rw-section">
                  <div className="rw-section-head">
                    <h2 className="rw-section-title"><span className="ic-inline">{I.fire}</span>Mùa lễ hội</h2>
                    <span className="rw-section-link">Tất cả</span>
                  </div>
                  <div className="rw-scroll">
                    <div className="rw-offer-card rw-tree-card" onClick={() => setTab('campaign')} id="offer-tree">
                      <div className="rw-offer-img rw-tree-img" style={{ height: 100 }}>
                        <span style={{ color: '#16A34A' }}>{I.treeXl}</span>
                      </div>
                      <div className="rw-offer-body">
                        <div className="rw-offer-brand">Chiến dịch Trồng Cây</div>
                        <div className="rw-offer-desc">Góp điểm trồng cây xanh, phủ xanh Việt Nam</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span className="rw-offer-price">50,000</span>
                          <span className="rw-offer-unit">Điểm / cây</span>
                        </div>
                      </div>
                    </div>
                    {FESTIVAL_OFFERS.map(o => (
                      <div key={o.id} className="rw-offer-card">
                        <div className="rw-offer-img" style={{ background: o.bg, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span className="offer-brand-icon">{OFFER_ICON[o.img] || o.img}</span>
                        </div>
                        <div className="rw-offer-body">
                          <div className="rw-offer-brand">{o.brand}</div>
                          <div className="rw-offer-desc">{o.desc}</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span className="rw-offer-price">{o.price}</span>
                            <span className="rw-offer-unit">Điểm</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* THƯƠNG HIỆU MÓN NGON */}
                <div className="rw-section">
                  <div className="rw-section-head">
                    <h2 className="rw-section-title"><span className="ic-inline">{I.star}</span>Thương hiệu món ngon</h2>
                    <span className="rw-section-link">Tất cả</span>
                  </div>
                  <div className="rw-scroll">
                    {BRAND_OFFERS.map(o => (
                      <div key={o.id} className="rw-offer-card">
                        <div className="rw-offer-img" style={{ background: o.bg, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span className="offer-brand-icon">{OFFER_ICON[o.img] || o.img}</span>
                        </div>
                        <div className="rw-offer-body">
                          <div className="rw-offer-brand">{o.brand}</div>
                          <div className="rw-offer-desc">{o.desc}</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span className="rw-offer-price">{o.price}</span>
                            <span className="rw-offer-unit">Điểm</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ƯU ĐÃI MỚI NHẤT */}
                <div className="rw-section" style={{ paddingBottom: 16 }}>
                  <div className="rw-section-head">
                    <h2 className="rw-section-title"><span className="ic-inline">{I.fire}</span>Ưu đãi mới nhất</h2>
                    <span className="rw-section-link">Tất cả</span>
                  </div>
                  <div className="rw-brands-grid">
                    {[...FESTIVAL_OFFERS, ...BRAND_OFFERS].map((o, i) => (
                      <div key={`grid-${i}`} className="rw-offer-card" style={{ minWidth: 'unset', maxWidth: 'unset' }}>
                        <div className="rw-offer-img" style={{ background: o.bg, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span className="offer-brand-icon">{OFFER_ICON[o.img] || o.img}</span>
                        </div>
                        <div className="rw-offer-body">
                          <div className="rw-offer-brand">{o.brand}</div>
                          <div className="rw-offer-desc">{o.desc}</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span className="rw-offer-price">{o.price}</span>
                            <span className="rw-offer-unit">Điểm</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <BottomNav tab={tab} setTab={setTab} notifCount={notifCount} />
              </div>
            )}

            {/* ── TAB: CAMPAIGN ── */}
            {tab === 'campaign' && (
              <div className="app-shell">
                {/* HERO */}
                <div className="cp-hero">
                  {/* Streak */}
                  <div className="streak-banner">
                    <div className="streak-fire">🔥</div>
                    <div className="streak-info">
                      <div className="streak-num">{streak} ngày</div>
                      <div className="streak-lbl">Chuỗi đóng góp liên tiếp</div>
                    </div>
                    <button className="streak-go" onClick={() => setShowBuy(true)}>Tiếp tục →</button>
                  </div>

                  <div className="cp-points">
                    <div className={`cp-point-card ${ptType === 'reward' ? 'active' : ''}`} onClick={() => setPtType('reward')}>
                      <div className="cp-point-lbl"><span className="ic-inline">{I.gift}</span>Điểm thưởng</div>
                      <div className="cp-point-val">{fmt(rewardPts)}<span className="cp-point-unit"> đ</span></div>
                    </div>
                    <div className={`cp-point-card ${ptType === 'cashback' ? 'active' : ''}`} onClick={() => setPtType('cashback')}>
                      <div className="cp-point-lbl"><span className="ic-inline">{I.wallet}</span>Hoàn tiền</div>
                      <div className="cp-point-val">{fmt(cashbackPts)}<span className="cp-point-unit"> đ</span></div>
                    </div>
                  </div>

                  <div className="cp-cta">
                    <button className="cp-cta-btn cp-cta-primary ripple" style={{ border: '2px solid #ffffff' }} onClick={() => setShowBuy(true)} id="btn-buy"><span className="ic-inline">{I.tree}</span>Đổi cây ngay</button>
                    <button className="cp-cta-btn cp-cta-secondary ripple" onClick={() => setShowDonate(true)} id="btn-donate"><span className="ic-inline">{I.heart}</span>Góp điểm</button>
                  </div>
                  <div className="cp-cta-row2">
                      <button className="cp-cta-ghost" onClick={() => setShowMyTrees(true)}><span className="ic-inline">{I.clipboard}</span>Cây của tôi</button>
                      <button className="cp-cta-ghost" onClick={() => setTab('leaderboard')}><span className="ic-inline">{I.trophy}</span>Bảng Xếp hạng</button>
                      <button className="cp-cta-ghost cp-cta-ghost-green" onClick={openRandomDonate}><span className="ic-inline">{I.dice}</span>Đổi cây ngẫu nhiên</button>
                      <button className="cp-cta-ghost cp-cta-ghost-blue" onClick={() => setShowCreateGrp(true)}><span className="ic-inline">{I.users}</span>Tạo nhóm</button>
                  </div>
                </div>

                <div className="cp-body">
                  {/* OVERVIEW */}
                  <div className="cp-overview">
                    <div className="cp-counter">
                      <div className="cp-counter-lbl"><span className="ic-inline">{I.globe}</span>Tổng số cây đã trồng</div>
                      <div className="cp-counter-row">
                        <span style={{ color: "#16A34A" }}>{I.treeLg}</span>
                        <span className="cp-counter-val">{fmt(totalTrees)}</span>
                      </div>
                      <div className="cp-counter-unit">cây xanh trên toàn quốc</div>
                    </div>
                    <div className="cp-prog">
                      <div className="cp-prog-head">
                        <span className="cp-prog-lbl"><span className="ic-inline">{I.target}</span>Mục tiêu cộng đồng</span>
                        <span className="cp-prog-val">{fmt(totalTrees)} / {fmt(target)}</span>
                      </div>
                      <div className="cp-prog-bar">
                        <div className="cp-prog-fill" style={{ width: `${Math.min((totalTrees / target) * 100, 100)}%` }} />
                      </div>
                    </div>

                    {/* Flash Event */}
                    {flashEvent && (
                      <div className="flash-banner" style={{ marginTop: 14 }}>
                        <div className="flash-left">
                          <span className="flash-bolt">{I.lightning}</span>
                          <div>
                            <div className="flash-title">FLASH EVENT</div>
                            <div className="flash-desc">50,000 điểm = <strong>2 cây</strong> — còn</div>
                          </div>
                        </div>
                        <div className="flash-right">
                          <div className="flash-timer">{flashEvent.timeLeft}s</div>
                          <button className="flash-cta" onClick={() => {
                            if (pts() < TREE_PRICE) { showToast('Không đủ điểm!', 'error'); return; }
                            openConfirm('Flash Sale: Mua 1 tặng 1', `Nhận NGAY 2 cây chỉ với ${fmt(TREE_PRICE)} điểm`, TREE_PRICE, 'lightning', handleFlashBuy);
                          }}><span className="ic-inline">{I.lightning}</span>Mua ngay</button>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* COMMUNITY TREES */}
                  <div className="sec-title"><span className="ic-inline">{I.seedling}</span>Cây cộng đồng đang góp</div>
                  {comTrees.map(t => (
                    <div key={t.id} className={`ct-card ${t.completed ? 'ct-done' : ''}`}>
                      <div className="ct-head">
                        <span className="ct-name">{t.completed ? I.check : I.seedling} {t.name}</span>
                        <span className={`ct-badge ${t.completed ? 'ct-badge-ok' : 'ct-badge-on'}`}>{t.completed ? `Hoàn thành #${t.treeNumber}` : 'Đang góp'}</span>
                      </div>
                      <div className="ct-bar"><div className={`ct-bar-fill ${t.completed ? 'ct-bar-ok' : ''}`} style={{ width: `${(t.currentPoints / t.targetPoints) * 100}%` }} /></div>
                      <div className="ct-info">
                        <span className="ct-info-text">{fmt(t.currentPoints)} / {fmt(t.targetPoints)} điểm</span>
                        <span className={`ct-info-pct ${t.completed ? 'ct-pct-ok' : ''}`}>{Math.round((t.currentPoints / t.targetPoints) * 100)}%</span>
                      </div>
                      <div className="ct-avatars">
                        {t.contributors.slice(0, 4).map((c, i) => (<Av key={i} name={c.name} size={28} />))}
                        {t.contributorCount > 4 && <div className="ct-av-more">+{t.contributorCount - 4}</div>}
                        <span className="ct-av-count">{t.contributorCount} người góp</span>
                      </div>
                      <div className="ct-action">
                        {t.completed
                          ? <button className="ct-btn ct-btn-ok"><span className="ic-inline">{I.check}</span>Đã trồng thành công</button>
                          : <button className="ct-btn ct-btn-go ripple" onClick={() => { setSelTreeId(t.id); setShowDonateTree(true); }}><span className="ic-inline">{I.heart}</span>Góp điểm cho cây này</button>
                        }
                      </div>
                    </div>
                  ))}

                  {/* GROUPS */}
                  <div className="sec-title"><span className="ic-inline">{I.users}</span>Nhóm trồng cây</div>
                  {!group ? (
                    <div className="grp-actions">
                      <button className="grp-btn grp-btn-new" onClick={() => setShowCreateGrp(true)}>
                        <span className="grp-btn-icon">{I.plus}</span>Tạo nhóm mới
                      </button>
                      <button className="grp-btn grp-btn-join" onClick={() => setShowJoinGrp(true)}>
                        <span className="grp-btn-icon">{I.link}</span>Nhập mã nhóm
                      </button>
                    </div>
                  ) : (
                    <div className="ct-card" style={{ border: '2px solid var(--shb)' }}>
                      <div className="ct-head">
                        <span className="ct-name"><span className="ic-inline">{I.users}</span>{group.name}</span>
                        <span className="ct-badge ct-badge-on">{group.members.length} thành viên</span>
                      </div>
                      <div className="grp-code">
                        <div className="grp-code-lbl">Mã nhóm (chia sẻ để mời bạn bè)</div>
                        <div className="grp-code-val">{group.code}</div>
                      </div>
                      <div className="ct-avatars">
                        {group.members.map((m, i) => (<Av key={i} name={m.name} size={28} />))}
                        <span className="ct-av-count">{group.members.length} thành viên</span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, margin: '10px 0 6px' }}><span className="ic-inline">{I.tree}</span>Cây của nhóm ({group.totalTreesBought} đã trồng)</div>
                      <div className="grp-tree-list">
                        {(() => {
                          const completedTrees = group.trees.filter(t => t.completed);
                          const activeTrees = group.trees.filter(t => !t.completed);
                          const reversedCompleted = [...completedTrees].reverse();
                          const N = reversedCompleted.length;
                          let displayTrees: typeof group.trees = [];
                          let totalGrpPages = 0;
                          let currentPage = 1;
                          if (N > 0) {
                            const remainder = N % TREES_PER_PAGE;
                            const firstPageSize = remainder === 0 ? TREES_PER_PAGE : remainder;
                            totalGrpPages = Math.ceil((N - firstPageSize) / TREES_PER_PAGE) + 1;
                            currentPage = Math.min(grpTreePage, Math.max(1, totalGrpPages));
                            if (currentPage === 1) { displayTrees = reversedCompleted.slice(0, firstPageSize); }
                            else { const startIndex = firstPageSize + (currentPage - 2) * TREES_PER_PAGE; displayTrees = reversedCompleted.slice(startIndex, startIndex + TREES_PER_PAGE); }
                          }
                          return (
                            <>
                              {displayTrees.map(t => (
                                <div key={t.id} className="grp-tree">
                                  <div className="grp-tree-no">#{t.id}</div>
                                  <div className="grp-tree-info">
                                    <div className="grp-tree-bar"><div className={`grp-tree-fill ${t.completed ? 'grp-tree-fill-ok' : 'grp-tree-fill-on'}`} style={{ width: `${(t.current / t.target) * 100}%` }} /></div>
                                    <div className={`grp-tree-st ${t.completed ? 'grp-tree-st-ok' : ''}`}>{t.completed ? `Đã trồng – Cây #${t.treeNumber}` : `${fmt(t.current)} / ${fmt(t.target)} (${Math.round((t.current / t.target) * 100)}%)`}</div>
                                  </div>
                                </div>
                              ))}
                              {totalGrpPages > 1 && (
                                <div className="grp-pagination">
                                  <button disabled={currentPage === 1} onClick={() => setGrpTreePage(p => Math.max(p - 1, 1))} className="grp-page-btn">{I.chevLeft}</button>
                                  <span className="grp-page-info">Trang {currentPage} / {totalGrpPages}</span>
                                  <button disabled={currentPage === totalGrpPages} onClick={() => setGrpTreePage(p => Math.min(p + 1, totalGrpPages))} className="grp-page-btn">{I.chevRight}</button>
                                </div>
                              )}
                              {activeTrees.map(t => (
                                <div key={t.id} style={{ border: '1.5px solid rgba(244,123,32,0.3)', background: 'linear-gradient(135deg,#FFFDF9,#FFF9F2)', padding: '12px 14px', borderRadius: 'var(--r-md)', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--shb)' }}>#{t.id}</span>
                                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--t1)' }}>Cây đang gieo trồng</span>
                                    </div>
                                    <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--shb)', background: '#FFF0E0', padding: '2px 8px', borderRadius: 'var(--r-full)', display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid rgba(244,123,32,0.2)', animation: 'grpPulse 2s infinite' }}>
                                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--shb)', display: 'inline-block', animation: 'grpPulseDot 1.4s infinite alternate' }} />
                                      Đang đóng góp
                                    </span>
                                  </div>
                                  <div className="grp-tree-bar" style={{ height: '7px', margin: '4px 0 2px', width: '100%' }}>
                                    <div className="grp-tree-fill grp-tree-fill-on" style={{ width: `${(t.current / t.target) * 100}%` }} />
                                  </div>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--t2)', fontWeight: 600 }}>
                                    <div>Đã góp: <span style={{ color: 'var(--shb)', fontWeight: 700 }}>{fmt(t.current)} đ</span></div>
                                    <div>Cần thêm: <span style={{ color: 'var(--t1)', fontWeight: 700 }}>{fmt(t.target - t.current)} đ</span> ({Math.round((t.current / t.target) * 100)}%)</div>
                                  </div>
                                </div>
                              ))}
                            </>
                          );
                        })()}
                      </div>
                      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                        <input type="number" className="modal-input" placeholder="Nhập số điểm..." value={grpDonate} onChange={e => setGrpDonate(e.target.value)} style={{ flex: 1, padding: '10px 12px', fontSize: 14 }} />
                        <button className="cp-cta-btn cp-cta-primary" style={{ padding: '10px 16px', whiteSpace: 'nowrap', fontSize: 13 }} onClick={() => {
                          const amtTrim = grpDonate.trim();
                          if (!/^\d+$/.test(amtTrim) || parseInt(amtTrim) <= 0) { showToast('Số điểm phải là số nguyên dương!', 'error'); return; }
                          const a = parseInt(amtTrim);
                          if (a > pts()) { showToast('Không đủ điểm!', 'error'); return; }
                          openConfirm('Góp điểm cho nhóm', `Nhóm "${group?.name}"`, a, 'users', handleGrpDonate);
                        }}><span className="ic-inline">{I.heart}</span>Góp</button>
                      </div>
                      <div className="quick-grid" style={{ marginTop: 8, marginBottom: 0 }}>
                        {[5000, 10000, 25000].map(a => (<button key={a} className="q-btn" onClick={() => setGrpDonate(a.toString())}>{fmt(a)}</button>))}
                      </div>
                      <button style={{ width: '100%', marginTop: 8, padding: '11px 8px', border: '1.5px solid var(--shb)', borderRadius: 'var(--r-md)', background: 'linear-gradient(135deg,#FFF5EB,#FFE8D0)', color: 'var(--shb)', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'var(--tr-f)', minHeight: 44 }} onClick={() => setShowInvite(true)}>
                        {I.mail} Mời thành viên mới
                      </button>
                      <button style={{ width: '100%', marginTop: 6, padding: 8, border: 'none', background: 'transparent', color: 'var(--t3)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }} onClick={() => { setGroup(null); setGrpTreePage(1); }}>Rời nhóm</button>
                    </div>
                  )}

                  {/* LIVE FEED */}
                  <div className="sec-title"><span className="ic-inline">{I.signal}</span>Hoạt động trực tiếp</div>
                  <div className="feed">
                    {feed.slice(0, 5).map(f => (
                      <div key={f.id} className="feed-item">
                        <div className="feed-av" style={{ background: f.bg }}><Av name={f.avatar} size={28} /></div>
                        <div className="feed-body">
                          <div className="feed-text" dangerouslySetInnerHTML={{ __html: f.text }} />
                          <div className="feed-time">{f.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <BottomNav tab={tab} setTab={setTab} notifCount={notifCount} />
                </div>
              </div>
            )}

            {/* ── TAB: FOREST ── */}
            {tab === 'forest' && (
              <div className="app-shell">
                <div style={{ padding: '0 16px 16px' }}>
                  {/* Impact Ring */}
                  <div style={{ marginTop: 16, marginBottom: 12 }}>
                    <ImpactRing trees={myTrees.length} />
                  </div>

                  {/* Rank Card */}
                  {(() => {
                    const rIdx = [...FOREST_RANKS].reverse().findIndex(r => myTrees.length >= r.min);
                    const currentRank = rIdx >= 0 ? [...FOREST_RANKS].reverse()[rIdx] : FOREST_RANKS[0];
                    const currentRankIdx = FOREST_RANKS.indexOf(currentRank);
                    const nextRank = FOREST_RANKS[currentRankIdx + 1];
                    const progressPct = nextRank
                      ? Math.round(((myTrees.length - currentRank.min) / (nextRank.min - currentRank.min)) * 100)
                      : 100;
                    return (
                      <div style={{ background: 'var(--card)', borderRadius: 'var(--r-xl)', padding: 16, marginBottom: 12, boxShadow: 'var(--sh-md)', border: '1px solid var(--b1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                          <span style={{ fontSize: 36 }}>{currentRank.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 16, fontWeight: 800, color: currentRank.color }}>{currentRank.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--t2)', marginTop: 2 }}>
                              {nextRank ? `Còn ${nextRank.min - myTrees.length} cây để lên ${nextRank.name}` : 'Đã đạt hạng cao nhất!'}
                            </div>
                          </div>
                          <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--shb)' }}>{myTrees.length} 🌳</div>
                        </div>
                        {nextRank && (
                          <div style={{ marginBottom: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--t2)', marginBottom: 4 }}>
                              <span>{currentRank.name}</span><span style={{ color: 'var(--shb)', fontWeight: 700 }}>{progressPct}%</span><span>{nextRank.name}</span>
                            </div>
                            <div className="cp-prog-bar">
                              <div className="cp-prog-fill" style={{ width: `${progressPct}%` }} />
                            </div>
                          </div>
                        )}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                          {FOREST_RANKS.map((r, i) => {
                            const unlocked = myTrees.length >= r.min;
                            const isCurrent = i === currentRankIdx;
                            return (
                              <div key={r.name} style={{ padding: '8px 6px', borderRadius: 10, textAlign: 'center', background: isCurrent ? '#FFF5EB' : unlocked ? '#F0FDF4' : 'var(--section)', border: isCurrent ? `2px solid var(--shb)` : unlocked ? '1.5px solid var(--ok)' : '1px solid var(--b1)', transition: 'all .2s' }}>
                                <div style={{ fontSize: 22 }}>{r.icon}</div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: isCurrent ? 'var(--shb)' : unlocked ? 'var(--ok-d)' : 'var(--t3)', marginTop: 2 }}>{r.name}</div>
                                <div style={{ fontSize: 9, color: 'var(--t3)', marginTop: 1 }}>{r.min === 0 ? '1 cây' : `${r.min} cây`}</div>
                              </div>
                            );
                          })}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
                          <button className="cp-cta-btn cp-cta-primary ripple" style={{ margin: 0, fontSize: 12, padding: '10px 8px', border: '2px solid #ffffff' }} onClick={() => { setTab('campaign'); setTimeout(() => setShowBuy(true), 50); }}>
                            <span className="ic-inline">{I.tree}</span>Đổi cây ngay
                          </button>
                          <button className="cp-cta-btn cp-cta-secondary ripple" style={{ margin: 0, fontSize: 12, padding: '10px 8px' }} onClick={() => { setTab('campaign'); setTimeout(() => setShowDonate(true), 50); }}>
                            <span className="ic-inline">{I.heart}</span>Góp điểm ngay
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  {/* 3D Forest */}
                  <div className="three-wrap">
                    <Suspense fallback={<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#E8F5E9,#C8E6C9)' }}>
                      <div style={{ display: 'flex', gap: 4 }}>{[0, 1, 2].map(i => (<div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--shb)', animation: `loadDot 1.4s ease-in-out ${i * .2}s infinite` }} />))}</div>
                    </div>}>
                      <Canvas camera={{ position: [4, 4.5, 4], fov: 46 }} gl={{ antialias: true }} dpr={[1, 2]}>
                        <ForestScene count={myTrees.length} />
                      </Canvas>
                    </Suspense>
                  </div>

                  {/* Stats */}
                  <div className="forest-stats">
                    <div className="fs-item"><div className="fs-val">{myTrees.length}</div><div className="fs-lbl">Cây đã trồng</div></div>
                    <div className="fs-div" />
                    <div className="fs-item"><div className="fs-val">~{greenArea}</div><div className="fs-lbl">m² phủ xanh</div></div>
                    <div className="fs-div" />
                    <div className="fs-item"><div className="fs-val">{LOCATIONS.length}</div><div className="fs-lbl">Khu vực</div></div>
                  </div>

                  {/* Grid */}
                  <div className="forest-grid">
                    {myTrees.map(t => (
                      <div key={t.id} className="ft-item" onClick={() => { setSelectedMyTree(t); setShowTreeDetail(true); }}>
                        <span className="ft-icon" style={{ color: "#16A34A" }}>{I.tree}</span>
                        <div className="ft-num">#{t.treeNumber}</div>
                        <div className="ft-date">{t.date}</div>
                        <div className="ft-loc"><span className="ic-inline">{I.mapPin}</span>{t.location}</div>
                      </div>
                    ))}
                  </div>

                  <button className="mt-view-all-btn" onClick={() => setShowMyTrees(true)}>
                    {I.clipboard} Xem thông tin tất cả cây →
                  </button>

                  {/* MAP */}
                  <div className="sec-title"><span className="ic-inline">{I.map}</span>Vị trí cây đã trồng</div>
                  <div className="map-card">
                    <div className="map-visual">
                      <div className="map-pin" style={{ top: '22%', left: '28%' }}><span className="map-pin-dot">{I.mapPin}</span><span className="map-pin-tag">Tiền Hải</span></div>
                      <div className="map-pin" style={{ top: '38%', left: '55%', animationDelay: '.5s' }}><span className="map-pin-dot">{I.mapPin}</span><span className="map-pin-tag">Bác Trạch</span></div>
                      <div className="map-pin" style={{ top: '60%', left: '32%', animationDelay: '1s' }}><span className="map-pin-dot">{I.mapPin}</span><span className="map-pin-tag">Đồng Châu</span></div>
                      <div className="map-pin" style={{ top: '28%', left: '74%', animationDelay: '1.5s' }}><span className="map-pin-dot">{I.mapPin}</span><span className="map-pin-tag">TP Thái Bình</span></div>
                      <div style={{ position: 'absolute', top: '12%', left: '18%', opacity: .35, color: '#16A34A' }}>{I.tree}</div>
                      <div style={{ position: 'absolute', top: '48%', left: '44%', opacity: .25, color: '#16A34A' }}>{I.tree}</div>
                      <div style={{ position: 'absolute', top: '72%', left: '68%', opacity: .35, color: '#16A34A' }}>{I.tree}</div>
                    </div>
                    <div className="map-tags">
                      {LOCATIONS.map(l => (
                        <button key={l.id} className={`map-tag ${selLoc === l.id ? 'map-tag-on' : 'map-tag-off'}`} onClick={() => setSelLoc(l.id)}>
                          {l.icon} {l.name} ({l.treeCount})
                        </button>
                      ))}
                    </div>
                    {(() => {
                      const l = LOCATIONS.find(x => x.id === selLoc); if (!l) return null; return (
                        <div className="loc-detail">
                          <div className="loc-head"><span className="loc-icon">{I.mapPin}</span><div><div className="loc-name">{l.name}</div><div className="loc-addr">{l.address}</div></div></div>
                          <div style={{ fontSize: 13, color: 'var(--t2)', marginBottom: 6 }}><span className="ic-inline">{I.tree}</span>{l.treeCount} cây đã trồng tại đây</div>
                          <div className="loc-trees">
                            {Array.from({ length: Math.min(l.treeCount, 8) }, (_, i) => (<div key={i} className="loc-dot" style={{ color: "#16A34A" }}>{I.tree}</div>))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                  <BottomNav tab={tab} setTab={setTab} notifCount={notifCount} />
                </div>
              </div>
            )}

            {/* ── TAB: LEADERBOARD ── */}
            {tab === 'leaderboard' && (
              <div className="app-shell">
                <div style={{ padding: '16px 16px 16px' }}>
                  <div className="lb-card">
                    <div className="lb-tabs">
                      <button className={`lb-tab ${lbTab === 'individual' ? 'lb-tab-on' : ''}`} onClick={() => setLbTab('individual')}><span className="ic-inline">{I.user}</span>Cá nhân</button>
                      <button className={`lb-tab ${lbTab === 'group' ? 'lb-tab-on' : ''}`} onClick={() => setLbTab('group')}><span className="ic-inline">{I.users}</span>Nhóm</button>
                    </div>
                    <div className="lb-filters">
                      <button className={`lb-filter ${lbFilter === 'month' ? 'lb-filter-on' : ''}`} onClick={() => setLbFilter('month')}>Tháng này</button>
                      <button className={`lb-filter ${lbFilter === 'alltime' ? 'lb-filter-on' : ''}`} onClick={() => setLbFilter('alltime')}>Tất cả</button>
                    </div>
                    <div className="lb-legend">
                      {Object.entries(TIER_LABEL).map(([k, v]) => (<div key={k} className="lb-legend-item"><span>{k}</span><span>{v}</span></div>))}
                    </div>
                    {lbTab === 'individual' ? (
                      <div className="lb-list">
                        {LB_INDIVIDUALS.slice(0, 10).map((u, i) => (
                          <div key={u.rank} className={`lb-row ${u.isMe ? 'lb-row-me' : ''} ${i < 3 ? 'lb-row-top' : ''}`}>
                            <div className="lb-rank">{i === 0 ? I.medal1 : i === 1 ? I.medal2 : i === 2 ? I.medal3 : <span className="lb-rank-num">{u.rank}</span>}</div>
                            <div className="lb-avatar"><Av name={u.name} size={32} /></div>
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
                        {(() => { const me = LB_INDIVIDUALS.find(u => u.isMe)!; return (
                          <div className="lb-row lb-row-me">
                            <div className="lb-rank"><span className="lb-rank-num">{me.rank}</span></div>
                            <div className="lb-avatar"><Av name="Bạn" size={32} /></div>
                            <div className="lb-info">
                              <div className="lb-name">Bạn<span className="lb-tier">{TIER_ICON[me.tier]}</span></div>
                              <div className="lb-sub">Cần +{Math.max(LB_INDIVIDUALS[9].trees - myTrees.length + 1, 1)} cây để vào Top 10</div>
                            </div>
                            <div className="lb-stats">
                              <div className="lb-trees">{myTrees.length}<span className="ic-inline">{I.tree}</span></div>
                              <div className="lb-co2">{fmt(myTrees.length * 20)} kg CO₂</div>
                            </div>
                          </div>
                        ); })()}
                        <button className="lb-buy-nudge" onClick={() => { setTab('campaign'); setShowBuy(true); }}><span className="ic-inline">{I.tree}</span>Đổi cây để leo hạng →</button>
                      </div>
                    ) : (
                      <div className="lb-list">
                        {LB_GROUPS.map((g, i) => (
                          <div key={g.rank} className={`lb-row ${i < 3 ? 'lb-row-top' : ''} ${group && group.name === g.name ? 'lb-row-me' : ''}`}>
                            <div className="lb-rank">{i === 0 ? I.medal1 : i === 1 ? I.medal2 : i === 2 ? I.medal3 : <span className="lb-rank-num">{g.rank}</span>}</div>
                            <div className="lb-avatar"><Av name={g.name} size={32} /></div>
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
                        {group && (<>
                          <div className="lb-divider">· · ·</div>
                          <div className="lb-row lb-row-me">
                            <div className="lb-rank"><span className="lb-rank-num">?</span></div>
                            <div className="lb-avatar">{I.users}</div>
                            <div className="lb-info">
                              <div className="lb-name">{group.name}<span style={{ fontSize: 10, color: 'var(--shb)', fontWeight: 700 }}>Nhóm bạn</span></div>
                              <div className="lb-sub">{group.members.length} thành viên</div>
                            </div>
                            <div className="lb-stats"><div className="lb-trees">{group.totalTreesBought}<span className="ic-inline">{I.tree}</span></div></div>
                          </div>
                        </>)}
                        {!group && (<button className="lb-buy-nudge" onClick={() => { setTab('campaign'); setShowCreateGrp(true); }}><span className="ic-inline">{I.users}</span>Tạo nhóm để lên bảng xếp hạng →</button>)}
                      </div>
                    )}
                  </div>
                  <BottomNav tab={tab} setTab={setTab} notifCount={notifCount} />
                </div>
              </div>
            )}

            {/* ── TAB: PROFILE ── */}
            {tab === 'profile' && (
              <div className="app-shell">
                {/* Hero */}
                <div className="profile-hero">
                  <div className="profile-av"><Av name="Nguyễn Văn A" size={74} /></div>
                  <div className="profile-name">Nguyễn Văn A</div>
                  <div className="profile-id">SHB • 0123 4567 8901</div>
                  <div className="profile-tier-row">
                    <span style={{ fontSize: 14 }}>🥉</span>
                    <span className="profile-tier-text">Người Gieo · Hạng 247</span>
                  </div>
                </div>

                {/* Content */}
                <div className="profile-content">
                  {/* Stats */}
                  <div className="profile-stats-grid">
                    <div className="profile-stat">
                      <div className="profile-stat-val">{myTrees.length}</div>
                      <div className="profile-stat-lbl">Cây đã trồng</div>
                    </div>
                    <div className="profile-stat">
                      <div className="profile-stat-val">{streak}</div>
                      <div className="profile-stat-lbl">Ngày streak 🔥</div>
                    </div>
                    <div className="profile-stat">
                      <div className="profile-stat-val">{fmt(rewardPts + cashbackPts)}</div>
                      <div className="profile-stat-lbl">Tổng điểm</div>
                    </div>
                  </div>

                  {/* Tier progress */}
                  <div style={{ background: 'linear-gradient(135deg,#FFF5EB,#FFE8D0)', borderRadius: 'var(--r-xl)', padding: 16, marginBottom: 16, border: '1px solid rgba(244,123,32,.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)' }}>🎯 Tiến độ lên hạng Silver</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--shb)' }}>{myTrees.length}/20 cây</span>
                    </div>
                    <div className="cp-prog-bar">
                      <div className="cp-prog-fill" style={{ width: `${Math.min(myTrees.length / 20 * 100, 100)}%` }} />
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--t2)', marginTop: 6 }}>Cần thêm {Math.max(20 - myTrees.length, 0)} cây để lên hạng <strong>Người Bảo Vệ 🥈</strong></div>
                  </div>


                  {/* My Trees - Inline */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: 'var(--t1)' }}>
                        <span className="ic-inline" style={{ color: '#16A34A' }}>{I.tree}</span>Cay cua toi
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--shb)', fontWeight: 600 }}>{myTrees.length} cay</span>
                    </div>
                    {myTrees.length === 0 ? (
                      <div style={{ background: 'var(--section)', borderRadius: 'var(--r-lg)', padding: 20, textAlign: 'center', color: 'var(--t3)', fontSize: 13 }}>
                        Ban chua trong cay nao. Hay bat dau!
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {myTrees.slice(0, 3).map((t, i) => (
                          <button key={t.id} style={{ background: 'var(--card)', borderRadius: 'var(--r-lg)', padding: '12px 14px', border: '1px solid var(--b1)', display: 'flex', alignItems: 'center', gap: 12, boxShadow: 'var(--sh-sm)', width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }} onClick={() => setShowMyTrees(true)}>
                            <div style={{ width: 40, height: 40, borderRadius: 'var(--r-md)', background: 'linear-gradient(135deg,#E8F5E9,#C8E6C9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <span style={{ color: '#16A34A' }}>{I.tree}</span>
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--t1)' }}>{t.name}</div>
                              <div style={{ fontSize: 11, color: 'var(--t2)', marginTop: 2 }}>{t.location} · {t.date}</div>
                            </div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ok)', background: '#D1FAE5', borderRadius: 'var(--r-full)', padding: '2px 8px', flexShrink: 0 }}>#{i + 1}</div>
                          </button>
                        ))}
                        {myTrees.length > 3 && (
                          <button onClick={() => setShowMyTrees(true)} style={{ width: '100%', padding: '10px', background: 'var(--section)', border: '1px dashed var(--b2)', borderRadius: 'var(--r-lg)', color: 'var(--shb)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                            Xem tat ca {myTrees.length} cay o
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Menu */}
                  <div className="profile-menu">
                    {[
                      { icon: I.certificate, bg: '#FFF0E0', label: 'Chung nhan xanh', sub: 'Xem & chia se chung chi', action: () => {} },
                      { icon: I.shield, bg: '#EFF6FF', label: 'Bao mat & PIN', sub: 'Quan ly ma xac thuc', action: () => {} },
                      { icon: I.bell, bg: '#F3E5F5', label: 'Thong bao', sub: 'Cai dat nhan thong bao', action: () => {} },
                      { icon: I.help, bg: '#ECFDF5', label: 'Tro giup', sub: 'Cau hoi thuong gap', action: () => {} },
                      { icon: I.settings, bg: '#FFF8E1', label: 'Cai dat', sub: 'Ngon ngu, giao dien', action: () => {} },
                    ].map((item, i) => (
                      <button key={i} className="profile-menu-item" onClick={item.action}>
                        <div className="profile-menu-icon" style={{ background: item.bg }}>{item.icon}</div>
                        <div className="profile-menu-text">
                          <div className="profile-menu-title">{item.label}</div>
                          <div className="profile-menu-sub">{item.sub}</div>
                        </div>
                        {I.chevRight}
                      </button>
                    ))}
                  </div>

                  <button style={{ width: '100%', border: '1.5px solid var(--err)', borderRadius: 'var(--r-xl)', padding: 14, background: '#FEF2F2', color: 'var(--err)', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', minHeight: 50 }}>
                    Đăng xuất
                  </button>
                  <div className="profile-version">SHB Green v2.4.1 · Bản demo 2026</div>
                </div>
                <BottomNav tab={tab} setTab={setTab} notifCount={notifCount} />
              </div>
            )}

            {/* ============================================================ */}
            {/*  MODALS (absolute positioned inside phone screen)             */}
            {/* ============================================================ */}

            {/* TOAST */}
            {toast && <div className={`toast ${toast.type === 'error' ? 'toast-err' : 'toast-ok'}`}><span className="toast-icon">{toast.type === 'error' ? I.alertTri : I.check}</span><span className="toast-msg">{toast.text}</span></div>}
            {confetti && <Confetti />}

            {/* BUY */}
            {showBuy && (
              <div className="modal-bg" onClick={() => setShowBuy(false)}>
                <div className="modal-sheet" onClick={e => e.stopPropagation()}>
                  <div className="modal-handle" />
                  <div className="modal-title"><span className="ic-inline">{I.tree}</span>Đổi cây ngay</div>
                  <div className="modal-sub">Sử dụng <strong>{fmt(TREE_PRICE)} điểm</strong> từ <strong>{ptType === 'reward' ? 'Quỹ điểm thưởng' : 'Quỹ hoàn tiền'}</strong> để đổi 1 cây xanh</div>
                  <div style={{ background: 'var(--section)', borderRadius: 'var(--r-lg)', padding: 16, marginBottom: 16 }}>
                    {[['Giá mỗi cây', `${fmt(TREE_PRICE)} điểm`], ['Số dư hiện tại', `${fmt(pts())} điểm`], ['Sau khi đổi', `${fmt(Math.max(pts() - TREE_PRICE, 0))} điểm`]].map(([k, v], i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i < 2 ? 8 : 0 }}>
                        <span style={{ fontSize: 13, color: 'var(--t2)' }}>{k}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: i === 2 ? (pts() >= TREE_PRICE ? 'var(--ok)' : 'var(--err)') : i === 1 ? 'var(--shb)' : 'var(--t1)' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-toggle">
                    <button className={`pt-btn ${ptType === 'reward' ? 'pt-on' : ''}`} onClick={() => setPtType('reward')}><span className="ic-inline">{I.gift}</span>Điểm thưởng</button>
                    <button className={`pt-btn ${ptType === 'cashback' ? 'pt-on' : ''}`} onClick={() => setPtType('cashback')}><span className="ic-inline">{I.wallet}</span>Hoàn tiền</button>
                  </div>
                  <button className="m-btn m-btn-primary" onClick={() => { if (pts() < TREE_PRICE) { showToast('Không đủ điểm!', 'error'); return; } setShowBuy(false); openConfirm('Đổi cây xanh', 'Trồng 1 cây xanh cho Việt Nam', TREE_PRICE, 'tree', handleBuy); }} disabled={pts() < TREE_PRICE}>
                    {pts() >= TREE_PRICE ? 'Xem lại & Xác nhận' : 'Không đủ điểm'}
                  </button>
                  <button className="m-btn m-btn-ghost" onClick={() => setShowBuy(false)}>Hủy</button>
                </div>
              </div>
            )}

            {/* DONATE CHOOSER */}
            {showDonate && (
              <div className="modal-bg" onClick={() => setShowDonate(false)}>
                <div className="modal-sheet" onClick={e => e.stopPropagation()}>
                  <div className="modal-handle" />
                  <div className="modal-title"><span className="ic-inline">{I.heart}</span>Góp điểm trồng cây</div>
                  <div className="modal-sub">Chọn cách bạn muốn góp điểm</div>
                  <div className="tab-row" style={{ marginBottom: 14 }}>
                    <button className={`tab ${donateTab === 'random' ? 'tab-on' : 'tab-off'}`} onClick={() => setDonateTab('random')}><span className="ic-inline">{I.seedling}</span>Góp ngẫu nhiên</button>
                    <button className={`tab ${donateTab === 'group' ? 'tab-on' : 'tab-off'}`} onClick={() => setDonateTab('group')}><span className="ic-inline">{I.users}</span>Tạo/Tham gia nhóm</button>
                  </div>
                  {donateTab === 'random' ? (
                    <>
                      <div style={{ fontSize: 13, color: 'var(--t2)', marginBottom: 12 }}>Chọn một cây cộng đồng:</div>
                      {comTrees.filter(t => !t.completed).map(t => (
                        <div key={t.id} style={{ background: 'var(--section)', borderRadius: 'var(--r-md)', padding: 12, marginBottom: 8, cursor: 'pointer', border: '1px solid var(--b1)', transition: 'var(--tr-f)' }}
                          onClick={() => { setSelTreeId(t.id); setShowDonate(false); setShowDonateTree(true); }}>
                          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}><span className="ic-inline">{I.seedling}</span>{t.name}</div>
                          <div className="ct-bar" style={{ height: 6 }}><div className="ct-bar-fill" style={{ width: `${(t.currentPoints / t.targetPoints) * 100}%` }} /></div>
                          <div style={{ fontSize: 11, color: 'var(--t2)', marginTop: 4 }}>{fmt(t.currentPoints)} / {fmt(t.targetPoints)} · {Math.round((t.currentPoints / t.targetPoints) * 100)}%</div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="grp-actions">
                      <button className="grp-btn grp-btn-new" onClick={() => { setShowDonate(false); setShowCreateGrp(true); }}>
                        <span className="grp-btn-icon">{I.plus}</span>Tạo nhóm mới
                      </button>
                      <button className="grp-btn grp-btn-join" onClick={() => { setShowDonate(false); setShowJoinGrp(true); }}>
                        <span className="grp-btn-icon">{I.link}</span>Nhập mã nhóm
                      </button>
                    </div>
                  )}
                  <button className="m-btn m-btn-ghost" onClick={() => setShowDonate(false)}>Đóng</button>
                </div>
              </div>
            )}

            {/* DONATE TO TREE */}
            {showDonateTree && (
              <div className="modal-bg" onClick={() => setShowDonateTree(false)}>
                <div className="modal-sheet" onClick={e => e.stopPropagation()}>
                  <div className="modal-handle" />
                  <div className="modal-title"><span className="ic-inline">{I.heart}</span>Góp điểm</div>
                  <div className="modal-sub">Góp cho {comTrees.find(t => t.id === selTreeId)?.name || 'cây cộng đồng'}</div>
                  <div className="pt-toggle">
                    <button className={`pt-btn ${ptType === 'reward' ? 'pt-on' : ''}`} onClick={() => setPtType('reward')}><span className="ic-inline">{I.gift}</span>Thưởng: {fmt(rewardPts)}</button>
                    <button className={`pt-btn ${ptType === 'cashback' ? 'pt-on' : ''}`} onClick={() => setPtType('cashback')}><span className="ic-inline">{I.wallet}</span>Hoàn: {fmt(cashbackPts)}</button>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label className="modal-label">Số điểm muốn góp</label>
                    <input type="number" className="modal-input" placeholder="Nhập số điểm..." value={donateAmt} onChange={e => setDonateAmt(e.target.value)} />
                    <div className="modal-hint">Tối đa: {fmt(pts())} điểm</div>
                  </div>
                  <div className="quick-grid">
                    {[5000, 10000, 20000, 30000, 40000, 50000].map(a => (
                      <button key={a} className={`q-btn ${donateAmt === a.toString() ? 'q-on' : ''}`} onClick={() => setDonateAmt(a.toString())}>{fmt(a)}</button>
                    ))}
                  </div>
                  <button className="m-btn m-btn-primary" onClick={() => {
                    const a = parseInt(donateAmt);
                    if (!a || a <= 0) { showToast('Nhập số điểm hợp lệ!', 'error'); return; }
                    if (a > pts()) { showToast('Không đủ điểm!', 'error'); return; }
                    const tree = comTrees.find(t => t.id === selTreeId);
                    setShowDonateTree(false);
                    openConfirm('Góp điểm trồng cây', `Góp vào "${tree?.name || 'cây cộng đồng'}"`, a, 'seedling', handleDonateTree);
                  }}>Xem lại & Xác nhận</button>
                  <button className="m-btn m-btn-ghost" onClick={() => { setShowDonateTree(false); setDonateAmt(''); }}>Hủy</button>
                </div>
              </div>
            )}

            {/* E-CERT */}
            {showEcert && ecertData && (
              <div className="modal-bg" onClick={() => setShowEcert(false)}>
                <div className="modal-sheet" onClick={e => e.stopPropagation()}>
                  <div className="modal-handle" />
                  <div className="modal-title"><span className="ic-inline">{I.check}</span>Chứng nhận trồng cây</div>
                  <div className="ecert">
                    <div className="ecert-logo">SHB GREEN</div>
                    <div className="ecert-h">Chứng nhận trồng cây xanh</div>
                    <span className="ecert-icon" style={{ color: "#16A34A" }}>{I.treeXl}</span>
                    <div className="ecert-rows">
                      <div className="ecert-row"><span className="ecert-k">Người trồng</span><span className="ecert-v">{ecertData.name}</span></div>
                      <div className="ecert-row"><span className="ecert-k">Mã cây</span><span className="ecert-v">{ecertData.code}</span></div>
                      <div className="ecert-row"><span className="ecert-k">Ngày trồng</span><span className="ecert-v">{ecertData.date}</span></div>
                      <div className="ecert-row"><span className="ecert-k">Vị trí</span><span className="ecert-v">{I.mapPin} {ecertData.loc}</span></div>
                      <div className="ecert-row"><span className="ecert-k">Phủ xanh</span><span className="ecert-v">~25 m²</span></div>
                    </div>
                    <button className="ecert-share" onClick={() => showToast('Đã sao chép link!', 'success')}>{I.share} Chia sẻ chứng nhận</button>
                  </div>
                  <button className="m-btn m-btn-ghost" onClick={() => setShowEcert(false)}>Đóng</button>
                </div>
              </div>
            )}

            {/* CREATE GROUP */}
            {showCreateGrp && (
              <div className="modal-bg" onClick={() => setShowCreateGrp(false)}>
                <div className="modal-sheet" onClick={e => e.stopPropagation()}>
                  <div className="modal-handle" />
                  <div className="modal-title"><span className="ic-inline">{I.plus}</span>Tạo nhóm trồng cây</div>
                  <div className="modal-sub">Tạo nhóm kêu gọi bạn bè cùng góp điểm</div>
                  <div style={{ marginBottom: 16 }}>
                    <label className="modal-label">Tên nhóm</label>
                    <input type="text" className="modal-input" placeholder="VD: Rừng Xanh SHB..." value={grpName} onChange={e => setGrpName(e.target.value)} />
                  </div>
                  <button className="m-btn m-btn-primary" onClick={handleCreateGrp}><span className="ic-inline">{I.plus}</span>Tạo nhóm</button>
                  <button className="m-btn m-btn-ghost" onClick={() => setShowCreateGrp(false)}>Hủy</button>
                </div>
              </div>
            )}

            {/* JOIN GROUP */}
            {showJoinGrp && (
              <div className="modal-bg" onClick={() => setShowJoinGrp(false)}>
                <div className="modal-sheet" onClick={e => e.stopPropagation()}>
                  <div className="modal-handle" />
                  <div className="modal-title"><span className="ic-inline">{I.link}</span>Tham gia nhóm</div>
                  <div className="modal-sub">Nhập mã nhóm để cùng góp điểm</div>
                  <div style={{ marginBottom: 16 }}>
                    <label className="modal-label">Mã nhóm</label>
                    <input type="text" className="modal-input" placeholder="VD: ABC123" value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())} maxLength={6} style={{ letterSpacing: 4, textAlign: 'center', fontSize: 20, fontWeight: 700 }} />
                  </div>
                  <button className="m-btn m-btn-primary" onClick={handleJoinGrp}><span className="ic-inline">{I.link}</span>Tham gia nhóm</button>
                  <button className="m-btn m-btn-ghost" onClick={() => setShowJoinGrp(false)}>Hủy</button>
                </div>
              </div>
            )}

            {/* RANDOM DONATE MODAL */}
            {showRandomDonate && (
              <div className="modal-bg" onClick={() => setShowRandomDonate(false)}>
                <div className="modal-sheet" onClick={e => e.stopPropagation()}>
                  <div className="modal-handle" />
                  <div className="modal-title"><span className="ic-inline">{I.dice}</span>Góp điểm ngẫu nhiên</div>
                  <div className="modal-sub">Hệ thống tự động chọn cây cần góp nhất</div>
                  {randomTarget ? (
                    <div className="rd-target">
                      <div className="rd-target-label"><span className="ic-inline">{I.target}</span>Cây được chọn tự động</div>
                      <div className="rd-target-name"><span className="ic-inline">{I.seedling}</span>{randomTarget.name}</div>
                      <div className="ct-bar" style={{ marginTop: 8 }}><div className="ct-bar-fill" style={{ width: `${(randomTarget.currentPoints / randomTarget.targetPoints) * 100}%` }} /></div>
                      <div style={{ fontSize: 11, color: 'var(--t2)', marginTop: 4 }}>{fmt(randomTarget.currentPoints)} / {fmt(randomTarget.targetPoints)} · Cần thêm <strong style={{ color: 'var(--shb)' }}>{fmt(randomTarget.targetPoints - randomTarget.currentPoints)}</strong> điểm</div>
                    </div>
                  ) : (
                    <div className="rd-target"><div className="rd-target-label"><span className="ic-inline">{I.check}</span>Không còn cây nào cần góp</div></div>
                  )}
                  <div className="pt-toggle" style={{ marginTop: 12 }}>
                    <button className={`pt-btn ${ptType === 'reward' ? 'pt-on' : ''}`} onClick={() => setPtType('reward')}><span className="ic-inline">{I.gift}</span>Thưởng: {fmt(rewardPts)}</button>
                    <button className={`pt-btn ${ptType === 'cashback' ? 'pt-on' : ''}`} onClick={() => setPtType('cashback')}><span className="ic-inline">{I.wallet}</span>Hoàn: {fmt(cashbackPts)}</button>
                  </div>
                  <div style={{ marginBottom: 8, marginTop: 12 }}>
                    <label className="modal-label">Số điểm muốn góp</label>
                    <input type="number" className="modal-input" placeholder="Nhập số điểm..." value={randomAmt} onChange={e => setRandomAmt(e.target.value)} />
                    <div className="modal-hint">Số dư: {fmt(pts())} điểm</div>
                  </div>
                  <div className="quick-grid">
                    {[5000, 10000, 20000, 30000, 40000, 50000].map(a => (
                      <button key={a} className={`q-btn ${randomAmt === a.toString() ? 'q-on' : ''}`} onClick={() => setRandomAmt(a.toString())}>{fmt(a)}</button>
                    ))}
                  </div>
                  <button className="m-btn m-btn-primary" onClick={() => {
                    const a = parseInt(randomAmt);
                    if (!a || a <= 0) { showToast('Nhập số điểm hợp lệ!', 'error'); return; }
                    if (a > pts()) { showToast('Không đủ điểm!', 'error'); return; }
                    if (!randomTarget) return;
                    setShowRandomDonate(false);
                    openConfirm('Góp điểm ngẫu nhiên', `Hệ thống chọn: "${randomTarget.name}"`, a, 'dice', handleRandomDonate);
                  }} disabled={!randomTarget}>Xem lại & Xác nhận</button>
                  <div className="rd-hint-box">
                    <div className="rd-hint-title"><span className="ic-inline">{I.info}</span>Tại sao chọn ngẫu nhiên?</div>
                    <div className="rd-hint-text">Hệ thống ưu tiên cây gần hoàn thành nhất — điểm của bạn có tác động tối đa!</div>
                  </div>
                  <button className="m-btn m-btn-ghost" onClick={() => setShowRandomDonate(false)}>Hủy</button>
                </div>
              </div>
            )}

            {/* INVITE MEMBER */}
            {showInvite && group && (
              <div className="modal-bg" onClick={() => setShowInvite(false)}>
                <div className="modal-sheet" onClick={e => e.stopPropagation()}>
                  <div className="modal-handle" />
                  <div className="modal-title"><span className="ic-inline">{I.mail}</span>Mời thành viên mới</div>
                  <div className="modal-sub">Gửi lời mời tham gia nhóm <strong>{group.name}</strong></div>
                  <div className="grp-code" style={{ marginBottom: 16 }}>
                    <div className="grp-code-lbl">Chia sẻ mã nhóm này cho bạn bè</div>
                    <div className="grp-code-val">{group.code}</div>
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label className="modal-label">Email người được mời</label>
                    <input type="email" className="modal-input" placeholder="vd: nguyenvana@gmail.com" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleInvite()} />
                    <div className="modal-hint">Người nhận sẽ nhận email với link và mã nhóm</div>
                  </div>
                  <button className="m-btn m-btn-primary" onClick={handleInvite} disabled={!inviteEmail.includes('@') || inviteEmail.length < 5}>
                    {I.mail} Gửi lời mời qua email
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '10px 0' }}>
                    <div style={{ flex: 1, height: 1, background: 'var(--b2)' }} />
                    <span style={{ fontSize: 12, color: 'var(--t3)', fontWeight: 500 }}>hoặc</span>
                    <div style={{ flex: 1, height: 1, background: 'var(--b2)' }} />
                  </div>
                  <button className="m-btn m-btn-ghost" onClick={() => { showToast('Đã sao chép link mời!', 'success'); setShowInvite(false); }}>
                    {I.link} Sao chép link mời
                  </button>
                  {group.members.length > 0 && (
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--b1)' }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--t2)', marginBottom: 8 }}>Thành viên hiện tại ({group.members.length})</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {group.members.map((m, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'var(--section)', borderRadius: 'var(--r-full)', padding: '4px 10px' }}>
                            <Av name={m.name} size={20} />
                            <span style={{ fontSize: 12, fontWeight: 600 }}>{m.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <button className="m-btn m-btn-ghost" style={{ marginTop: 8 }} onClick={() => setShowInvite(false)}>Đóng</button>
                </div>
              </div>
            )}

            {/* CONFIRM MODAL */}
            {showConfirm && confirmData && (
              <div className="modal-bg" onClick={() => setShowConfirm(false)}>
                <div className="modal-sheet" onClick={e => e.stopPropagation()}>
                  <div className="modal-handle" />
                  <div style={{ textAlign: 'center', marginBottom: 18 }}>
                    <div style={{ marginBottom: 8, color: "var(--shb)" }}>{I[confirmData.icon as keyof typeof I] || I.tree}</div>
                    <div className="modal-title" style={{ marginBottom: 4 }}>{confirmData.title}</div>
                    <div className="modal-sub">{confirmData.desc}</div>
                  </div>
                  <div style={{ background: 'var(--section)', borderRadius: 'var(--r-lg)', padding: 18, marginBottom: 14, border: '1px solid var(--b1)' }}>
                    {[
                      ['Số điểm trừ', <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--shb)' }}>{fmt(confirmData.amount)} điểm</span>],
                      ['Nguồn điểm', ptType === 'reward' ? 'Điểm thưởng' : 'Điểm hoàn tiền'],
                      ['Số dư sau GD', <span style={{ fontWeight: 700, color: 'var(--ok)' }}>{fmt(pts() - confirmData.amount)} điểm</span>],
                    ].map(([k, v], i, arr) => (
                      <div key={i as number} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px dashed var(--b2)' : 'none' }}>
                        <span style={{ fontSize: 13, color: 'var(--t2)' }}>{k as string}</span>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{v as React.ReactNode}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#FEF3C7', borderRadius: 'var(--r-md)', padding: '10px 14px', marginBottom: 14, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0 }}>{I.alertTri}</span>
                    <span style={{ fontSize: 12, color: '#92400E', lineHeight: 1.5 }}>Kiểm tra kỹ thông tin trước khi xác nhận. Giao dịch không thể hoàn tác sau khi nhập mã PIN.</span>
                  </div>
                  <button className="m-btn m-btn-primary" onClick={() => { setShowConfirm(false); setPinValue(''); setPinError(false); setShowPin(true); }}>
                    {I.lock} Nhập mã PIN để xác nhận
                  </button>
                  <button className="m-btn m-btn-ghost" onClick={() => setShowConfirm(false)}>Hủy giao dịch</button>
                </div>
              </div>
            )}

            {/* PIN MODAL */}
            {showPin && (
              <div className="modal-bg">
                <div className="modal-sheet" style={{ paddingBottom: 28 }} onClick={e => e.stopPropagation()}>
                  <div className="modal-handle" />
                  <div style={{ textAlign: 'center', marginBottom: 22 }}>
                    <div style={{ marginBottom: 8 }}>{I.lock}</div>
                    <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 4 }}>Nhập mã PIN</div>
                    <div style={{ fontSize: 13, color: 'var(--t2)' }}>Xác nhận giao dịch bằng mã PIN 6 số</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 24 }}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} style={{ width: 16, height: 16, borderRadius: '50%', background: pinError ? 'var(--err)' : i < pinValue.length ? 'var(--shb)' : 'var(--b2)', transition: 'background .15s ease, transform .15s ease', transform: pinError ? 'scale(1.25)' : 'scale(1)' }} />
                    ))}
                  </div>
                  <div className="pin-pad">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map((k, i) => (
                      k === '' ? <div key={i} /> :
                        <button key={i} className={`pin-key ${k === 'del' ? 'pin-key-back' : ''}`} onClick={() => k === 'del' ? handlePinBack() : handlePinInput(k)}>
                          {k === "del" ? I.backspace : k}
                        </button>
                    ))}
                  </div>
                  {pinError && (<div style={{ textAlign: 'center', color: 'var(--err)', fontSize: 13, fontWeight: 700, marginTop: 14, animation: 'feedIn .3s ease' }}>Mã PIN không đúng. Vui lòng thử lại.</div>)}
                  <div style={{ textAlign: 'center', marginTop: 8, fontSize: 11, color: 'var(--t3)' }}>Demo: nhập 1-2-3-4-5-6</div>
                  <button className="m-btn m-btn-ghost" style={{ marginTop: 12 }} onClick={() => { setShowPin(false); setPinValue(''); setPinError(false); }}>Hủy</button>
                </div>
              </div>
            )}

            {/* MY TREES MODAL */}
            {showMyTrees && (
              <div className="modal-bg" onClick={() => setShowMyTrees(false)}>
                <div className="modal-sheet" style={{ maxHeight: '90%' }} onClick={e => e.stopPropagation()}>
                  <div className="modal-handle" />
                  <div className="modal-title"><span className="ic-inline">{I.tree}</span>Cây của tôi</div>
                  <div className="mt-summary">
                    <div className="mt-stat"><div className="mt-stat-val">{myTrees.length}</div><div className="mt-stat-lbl">Cây đã mua</div></div>
                    <div className="mt-stat-div" />
                    <div className="mt-stat"><div className="mt-stat-val">{myTrees.length * 25}m²</div><div className="mt-stat-lbl">Phủ xanh</div></div>
                    <div className="mt-stat-div" />
                    <div className="mt-stat"><div className="mt-stat-val">{myTrees.length * 20}kg</div><div className="mt-stat-lbl">CO₂/năm</div></div>
                  </div>
                  <div className="tab-row" style={{ marginBottom: 12 }}>
                    <button className={`tab ${myTreeFilter === 'all' ? 'tab-on' : 'tab-off'}`} onClick={() => setMyTreeFilter('all')}>Tất cả ({myTrees.length})</button>
                    {LOCATIONS.filter(l => myTrees.some(t => t.location === l.name)).map(l => (
                      <button key={l.id} className={`tab ${myTreeFilter === l.id ? 'tab-on' : 'tab-off'}`} onClick={() => setMyTreeFilter(l.id)}>
                        {l.icon} {l.name} ({myTrees.filter(t => t.location === l.name).length})
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 8 }}>
                    {myTrees.filter(t => myTreeFilter === 'all' || LOCATIONS.find(l => l.id === myTreeFilter)?.name === t.location).reverse().map(t => (
                      <div key={t.id} className="mt-tree-card">
                        <div className="mt-tree-left">
                          <span className="mt-tree-icon" style={{ color: "#16A34A" }}>{I.treeLg}</span>
                          <div className="mt-tree-info">
                            <div className="mt-tree-name">{t.name}<span className="mt-tree-num">#{t.treeNumber}</span></div>
                            <div className="mt-tree-meta">{I.mapPin} {t.location} · {t.date}</div>
                            <div className="mt-tree-eco">~25 m² · ~20 kg CO₂/năm</div>
                          </div>
                        </div>
                        <div className="mt-tree-actions">
                          <button className="mt-btn-cert" title="Xem chứng nhận" onClick={() => { setEcertData({ name: 'Nguyễn Văn A', code: `SHB-TREE-${t.treeNumber}`, date: t.date, loc: t.location }); setShowMyTrees(false); setShowEcert(true); }}>{I.certificate}</button>
                          <button className="mt-btn-gift" title="Tặng cây" onClick={() => { setGiftTreeId(t.id); setShowMyTrees(false); setShowGiftTree(true); }}>{I.gift}</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="m-btn m-btn-ghost" onClick={() => setShowMyTrees(false)}>Đóng</button>
                </div>
              </div>
            )}

            {/* TREE DETAIL MODAL */}
            {showTreeDetail && selectedMyTree && (
              <div className="modal-bg" onClick={() => setShowTreeDetail(false)}>
                <div className="modal-sheet" onClick={e => e.stopPropagation()}>
                  <div className="modal-handle" />
                  <div style={{ textAlign: 'center', marginBottom: 14 }}>
                    <span style={{ display: "block", animation: "treeSway 3s ease-in-out infinite", color: "#16A34A" }}>{I.treeXl}</span>
                    <div style={{ fontSize: 20, fontWeight: 700, marginTop: 8 }}>{selectedMyTree.name}</div>
                    <div style={{ fontSize: 14, color: 'var(--shb)', fontWeight: 800, marginTop: 2 }}>Cây #{selectedMyTree.treeNumber}</div>
                  </div>
                  <div style={{ background: 'var(--section)', borderRadius: 'var(--r-lg)', padding: 16, marginBottom: 14 }}>
                    {[['Ngày trồng', selectedMyTree.date], ['Vị trí', selectedMyTree.location], ['Diện tích phủ xanh', '~25 m²'], ['CO₂ hấp thụ / năm', '~20 kg']].map(([k, v], i, arr) => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: i < arr.length - 1 ? '1px dashed var(--b2)' : 'none' }}>
                        <span style={{ fontSize: 13, color: 'var(--t2)' }}>{k}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: i >= 2 ? 'var(--ok)' : 'var(--t1)' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 8 }}>
                    <button className="m-btn m-btn-primary" style={{ margin: 0 }} onClick={() => { setEcertData({ name: 'Nguyễn Văn A', code: `SHB-TREE-${selectedMyTree.treeNumber}`, date: selectedMyTree.date, loc: selectedMyTree.location }); setShowTreeDetail(false); setShowEcert(true); }}>{I.certificate} Chứng nhận</button>
                    <button className="m-btn m-btn-ghost" style={{ margin: 0 }} onClick={() => { setGiftTreeId(selectedMyTree.id); setShowTreeDetail(false); setShowGiftTree(true); }}>{I.gift} Tặng cây</button>
                  </div>
                  <button className="m-btn m-btn-ghost" onClick={() => setShowTreeDetail(false)}>Đóng</button>
                </div>
              </div>
            )}

            {/* GIFT TREE MODAL */}
            {showGiftTree && (
              <div className="modal-bg" onClick={() => setShowGiftTree(false)}>
                <div className="modal-sheet" onClick={e => e.stopPropagation()}>
                  <div className="modal-handle" />
                  <div className="modal-title"><span className="ic-inline">{I.gift}</span>Tặng cây cho bạn bè</div>
                  <div className="modal-sub">Tặng đi một phần tương lai xanh cho người thân</div>
                  {(() => { const t = myTrees.find(x => x.id === giftTreeId); if (!t) return null; return (
                    <div style={{ background: 'linear-gradient(135deg,#F0FDF4,#DCFCE7)', borderRadius: 'var(--r-md)', padding: 14, marginBottom: 14, border: '1.5px solid var(--ok)', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ color: "#16A34A" }}>{I.treeLg}</span>
                      <div><div style={{ fontWeight: 700, fontSize: 14 }}>{t.name} <span style={{ color: 'var(--shb)', fontWeight: 800 }}>#{t.treeNumber}</span></div><div style={{ fontSize: 11, color: 'var(--t2)', marginTop: 2 }}>{I.mapPin} {t.location} · {t.date}</div></div>
                    </div>
                  ); })()}
                  <div style={{ marginBottom: 12 }}><label className="modal-label">Tên người nhận *</label><input type="text" className="modal-input" placeholder="VD: Nguyễn Thị Hoa" value={giftName} onChange={e => setGiftName(e.target.value)} /></div>
                  <div style={{ marginBottom: 12 }}><label className="modal-label">Email hoặc Số điện thoại *</label><input type="text" className="modal-input" placeholder="VD: hoa@gmail.com hoặc 0912345678" value={giftContact} onChange={e => setGiftContact(e.target.value)} /></div>
                  <div style={{ marginBottom: 14 }}><label className="modal-label">Lời nhắn (tùy chọn)</label><input type="text" className="modal-input" placeholder="VD: Chúc mừng sinh nhật!" value={giftMsg} onChange={e => setGiftMsg(e.target.value)} /></div>
                  <button className="m-btn m-btn-primary" onClick={handleGiftTree} disabled={!giftName.trim() || !giftContact.trim()}>Xác nhận tặng cây</button>
                  <button className="m-btn m-btn-ghost" onClick={() => setShowGiftTree(false)}>Hủy</button>
                </div>
              </div>
            )}

            {/* GIFT CONFIRM */}
            {showGiftConfirm && giftConfirmData && (
              <div className="modal-bg" onClick={() => setShowGiftConfirm(false)}>
                <div className="modal-sheet" onClick={e => e.stopPropagation()}>
                  <div className="modal-handle" />
                  <div className="modal-title"><span className="ic-inline">{I.gift}</span>Xác nhận tặng cây</div>
                  <div className="modal-sub">Vui lòng kiểm tra lại thông tin trước khi tặng</div>
                  <div style={{ background: 'linear-gradient(135deg,#F0FDF4,#DCFCE7)', borderRadius: 'var(--r-md)', padding: 14, marginBottom: 14, border: '1.5px solid var(--ok)', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: "#16A34A", fontSize: 24 }}>{I.gift}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>Cây được tặng</div>
                      <div style={{ fontSize: 13, color: 'var(--shb)', fontWeight: 700, marginTop: 4 }}>{giftConfirmData.treeName} <span style={{ color: '#666', fontSize: 12 }}>#{giftConfirmData.treeNumber}</span></div>
                      <div style={{ fontSize: 11, color: 'var(--t2)', marginTop: 3 }}>{I.mapPin} {giftConfirmData.location}</div>
                    </div>
                  </div>
                  <div style={{ background: 'var(--section)', borderRadius: 'var(--r-md)', padding: 14, marginBottom: 14, border: '1px solid var(--b1)' }}>
                    <div style={{ marginBottom: 10 }}><div style={{ fontSize: 12, color: 'var(--t2)', fontWeight: 600, marginBottom: 4 }}>👤 Tên người nhận</div><div style={{ fontSize: 14, fontWeight: 700 }}>{giftConfirmData.name}</div></div>
                    <div style={{ marginBottom: giftConfirmData.msg ? 10 : 0 }}><div style={{ fontSize: 12, color: 'var(--t2)', fontWeight: 600, marginBottom: 4 }}>{I.mail} Email/SĐT</div><div style={{ fontSize: 14, fontWeight: 700, color: 'var(--shb)' }}>{giftConfirmData.contact}</div></div>
                    {giftConfirmData.msg && (<div><div style={{ fontSize: 12, color: 'var(--t2)', fontWeight: 600, marginBottom: 4 }}>💬 Lời nhắn</div><div style={{ fontSize: 14, fontStyle: 'italic' }}>"{giftConfirmData.msg}"</div></div>)}
                  </div>
                  <div style={{ background: '#FFFBEB', borderRadius: 'var(--r-md)', padding: 12, marginBottom: 14, display: 'flex', gap: 8, fontSize: 12, color: '#92400E', border: '1px solid #FDE68A' }}>
                    <span style={{ fontSize: 14 }}>{I.info}</span>
                    <span>Hệ thống sẽ gửi thông báo và chứng chỉ tặng cây tới người nhận</span>
                  </div>
                  <button className="m-btn m-btn-primary" onClick={handleGiftTreeConfirm}>Xác nhận tặng cây</button>
                  <button className="m-btn m-btn-ghost" onClick={() => setShowGiftConfirm(false)}>Hủy</button>
                </div>
              </div>
            )}

            {/* SHARE MODAL */}
            {showShare && (
              <div className="modal-bg" onClick={() => setShowShare(false)}>
                <div className="modal-sheet" onClick={e => e.stopPropagation()}>
                  <div className="modal-handle" />
                  <div className="modal-title"><span className="ic-inline">{I.share}</span>Chia sẻ chiến dịch</div>
                  <div className="modal-sub">Lan tỏa thông điệp xanh — mỗi lượt chia sẻ là thêm một cây được trồng</div>
                  <div style={{ background: 'var(--section)', borderRadius: 'var(--r-lg)', padding: 18, marginBottom: 14, textAlign: 'center', border: '1px solid var(--b1)' }}>
                    <div style={{ marginBottom: 6, color: "#16A34A" }}>{I.treeLg}</div>
                    <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>Chiến dịch Trồng Cây SHB 2026</div>
                    <div style={{ fontSize: 12, color: 'var(--t2)', marginBottom: 10 }}>Cùng nhau trồng {fmt(target)} cây xanh cho Việt Nam</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--card)', borderRadius: 'var(--r-sm)', padding: '6px 14px', fontSize: 12, color: 'var(--t3)', border: '1px solid var(--b2)' }}>
                      <span>{I.link}</span>shb.vn/trong-cay-2026
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 12 }}>
                    {[
                      { icon: 'copy', label: 'Sao chép link' },
                      { icon: 'chat', label: 'Chia sẻ Zalo' },
                      { icon: 'fb', label: 'Facebook' },
                      { icon: 'camera', label: 'Lưu ảnh' },
                    ].map((s, i) => (
                      <button key={i} style={{ border: '1.5px solid var(--b2)', borderRadius: 'var(--r-md)', padding: '14px 8px', background: 'var(--card)', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13, fontWeight: 600, transition: 'var(--tr-f)', minHeight: 50 }}
                        onClick={() => { showToast(`${s.label} thành công!`, 'success'); setShowShare(false); }}>
                        <span className="ic-inline">{I[s.icon as keyof typeof I]}</span>{s.label}
                      </button>
                    ))}
                  </div>
                  <button className="m-btn m-btn-ghost" onClick={() => setShowShare(false)}>Đóng</button>
                </div>
              </div>
            )}

            {/* LOCATION MODAL */}
            {showLocModal && (() => {
              const l = LOCATIONS.find(x => x.id === selLoc);
              if (!l) return null;
              const mt = myTrees.filter(t => t.location === l.name);
              return (
                <div className="modal-bg" onClick={() => setShowLocModal(false)}>
                  <div className="modal-sheet" onClick={e => e.stopPropagation()}>
                    <div className="modal-handle" />
                    <div className="modal-title">{I.mapPin} {l.name}</div>
                    <div className="modal-sub">{l.address}</div>
                    <div style={{ background: 'var(--section)', borderRadius: 'var(--r-lg)', padding: 18, marginBottom: 14, textAlign: 'center' }}>
                      <div style={{ marginBottom: 4, color: "#16A34A" }}>{I.treeLg}</div>
                      <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--shb)' }}>{l.treeCount}</div>
                      <div style={{ fontSize: 13, color: 'var(--t2)' }}>cây đã trồng tại đây</div>
                    </div>
                    {mt.length > 0 && (<>
                      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}><span className="ic-inline">{I.seedling}</span>Cây của bạn tại {l.name}</div>
                      {mt.map(t => (
                        <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, background: 'var(--section)', borderRadius: 'var(--r-sm)', marginBottom: 6 }}>
                          <span style={{ color: "#16A34A" }}>{I.tree}</span>
                          <div><div style={{ fontWeight: 700, fontSize: 13 }}>Cây #{t.treeNumber}</div><div style={{ fontSize: 11, color: 'var(--t2)' }}>Trồng ngày {t.date} · ~25 m² phủ xanh</div></div>
                        </div>
                      ))}
                    </>)}
                    <button className="m-btn m-btn-ghost" onClick={() => setShowLocModal(false)}>Đóng</button>
                  </div>
                </div>
              );
            })()}

          </div>{/* end phone-screen */}

          {/* Home indicator */}
          <div className="phone-home-indicator">
            <div className="home-bar" />
          </div>

        </div>{/* end phone-frame */}
      </div>{/* end phone-wrapper */}
    </div>
  );
}
