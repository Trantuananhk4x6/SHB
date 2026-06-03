'use client';

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

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

// ================================================================
// CONSTANTS & MOCK DATA
// ================================================================
const TREE_PRICE = 50000;
const NAMES = ['Anh Minh','Chị Lan','Anh Hùng','Chị Mai','Anh Dũng','Chị Hà','Anh Tuấn','Chị Linh','Anh Bảo','Chị Thảo','Anh Khoa','Chị Ngọc','Anh Phú','Chị Vy','Anh Long'];
const AVATARS = ['🧑','👩','👨','👧','🧔','👱‍♀️','🧑‍💼','👩‍💼','👨‍🌾','👩‍🎓'];
const TREE_ICONS = ['🌳','🌲','🌴','🎋','🪴','🌿'];
const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
const fmt = (n: number) => n.toLocaleString('vi-VN');
const genCode = () => { const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let r = ''; for (let i = 0; i < 6; i++) r += c[Math.floor(Math.random() * c.length)]; return r; };

const INIT_TREES: CommunityTree[] = [
  { id:1, name:'Cây Bàng Xanh #214', currentPoints:32000, targetPoints:50000,
    contributors:[{name:'Minh',avatar:'🧑'},{name:'Lan',avatar:'👩'},{name:'Hùng',avatar:'👨'}],
    contributorCount:12, completed:false },
  { id:2, name:'Cây Phượng Đỏ #215', currentPoints:45000, targetPoints:50000,
    contributors:[{name:'Mai',avatar:'👧'},{name:'Dũng',avatar:'🧔'}],
    contributorCount:8, completed:false },
  { id:3, name:'Cây Sưa Đỏ #216', currentPoints:15000, targetPoints:50000,
    contributors:[{name:'Hà',avatar:'👱‍♀️'}],
    contributorCount:4, completed:false },
  { id:4, name:'Cây Xoài Cát #213', currentPoints:50000, targetPoints:50000,
    contributors:[{name:'Tuấn',avatar:'🧑‍💼'},{name:'Linh',avatar:'👩‍💼'},{name:'Bảo',avatar:'👨‍🌾'},{name:'Thảo',avatar:'👩‍🎓'}],
    contributorCount:15, completed:true, treeNumber:213 },
];
const LOCATIONS: LocationData[] = [
  { id:'tienhai', name:'Tiền Hải', address:'Huyện Tiền Hải, Thái Bình', treeCount:156, icon:'🏞️' },
  { id:'langbac', name:'Làng Bác Trạch', address:'Xã Bác Trạch, Tiền Hải, Thái Bình', treeCount:89, icon:'🏘️' },
  { id:'dongchau', name:'Đồng Châu', address:'Biển Đồng Châu, Tiền Hải, Thái Bình', treeCount:67, icon:'🏖️' },
  { id:'thaibinh', name:'TP. Thái Bình', address:'Thành phố Thái Bình', treeCount:120, icon:'🏙️' },
];
const INIT_MY: MyTree[] = [
  { id:1, name:'Cây Bàng', date:'15/05/2026', icon:'🌳', location:'Làng Bác Trạch', treeNumber:198 },
  { id:2, name:'Cây Xoài', date:'20/05/2026', icon:'🌲', location:'Tiền Hải', treeNumber:201 },
  { id:3, name:'Cây Phượng', date:'28/05/2026', icon:'🌴', location:'Đồng Châu', treeNumber:210 },
];

// Festival / Rewards mock offers
const FESTIVAL_OFFERS = [
  { id:'pizza', brand:'The Pizza Company', desc:'Voucher giảm 50k cho đơn từ 199k', price:'20,000', img:'🍕', bg:'linear-gradient(135deg,#FFF3E0,#FFE0B2)' },
  { id:'coffee', brand:'Highland Coffee', desc:'Voucher giảm 50k cho đơn từ 199k', price:'20,000', img:'☕', bg:'linear-gradient(135deg,#FFEBEE,#FFCDD2)' },
  { id:'gs25', brand:'GS25', desc:'Voucher giảm 50k cho đơn từ 199k', price:'20,000', img:'🏪', bg:'linear-gradient(135deg,#E3F2FD,#BBDEFB)' },
  { id:'hyundai', brand:'Hyundai', desc:'Voucher ưu đãi bảo dưỡng xe', price:'50,000', img:'🚗', bg:'linear-gradient(135deg,#E8EAF6,#C5CAE9)' },
];
const BRAND_OFFERS = [
  { id:'b1', brand:'Highland Coffee', desc:'Voucher giảm 50k cho đơn từ 199k', price:'20,000', img:'☕', bg:'linear-gradient(135deg,#FFEBEE,#FFCDD2)' },
  { id:'b2', brand:'The Pizza Company', desc:'Voucher giảm 50k cho đơn từ 199k', price:'20,000', img:'🍕', bg:'linear-gradient(135deg,#FFF3E0,#FFE0B2)' },
  { id:'b3', brand:'Lotteria', desc:'Combo ăn ngon giảm 30%', price:'15,000', img:'🍔', bg:'linear-gradient(135deg,#FFF8E1,#FFECB3)' },
  { id:'b4', brand:'CGV Cinema', desc:'Vé xem phim 2D chỉ 45k', price:'25,000', img:'🎬', bg:'linear-gradient(135deg,#F3E5F5,#E1BEE7)' },
];
const CATEGORIES = [
  { icon:'🎫', label:'Đổi voucher', bg:'#FFF0E0', color:'#F47B20' },
  { icon:'💸', label:'Đổi tiền hoàn', bg:'#FFF0E0', color:'#F47B20' },
  { icon:'✈️', label:'Đổi dặm bay', bg:'#FFF0E0', color:'#F47B20' },
  { icon:'📱', label:'Đổi điện thoại', bg:'#FFF0E0', color:'#F47B20' },
  { icon:'🛒', label:'Đổi điểm VETO', bg:'#FFF0E0', color:'#F47B20' },
];

// ================================================================
// 3D COMPONENTS
// ================================================================
function Trunk() {
  return (<mesh position={[0, 0.6, 0]}><cylinderGeometry args={[0.08, 0.12, 1.2, 8]} /><meshStandardMaterial color="#8B5E3C" roughness={0.8} /></mesh>);
}
function Leaves({ position: p, scale: s, color: c }: { position: [number,number,number]; scale: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  const off = useRef(Math.random() * Math.PI * 2);
  useFrame((st) => { if (ref.current) { ref.current.rotation.y = Math.sin(st.clock.elapsedTime * 0.5 + off.current) * 0.05; ref.current.position.y = p[1] + Math.sin(st.clock.elapsedTime * 0.8 + off.current) * 0.02; } });
  return (<mesh ref={ref} position={p} scale={s}><sphereGeometry args={[0.45, 12, 12]} /><meshStandardMaterial color={c} roughness={0.6} /></mesh>);
}
function Tree3D({ position: p, scale: s = 1 }: { position: [number,number,number]; scale?: number }) {
  const g = useRef<THREE.Group>(null!);
  useFrame((st) => { if (g.current) g.current.rotation.y = Math.sin(st.clock.elapsedTime * 0.3) * 0.02; });
  return (<group ref={g} position={p} scale={s}><Trunk /><Leaves position={[0,1.3,0]} scale={1} color="#2D8B4E" /><Leaves position={[-.25,1.1,.15]} scale={.7} color="#3BA55C" /><Leaves position={[.25,1.15,-.1]} scale={.65} color="#228B22" /><Leaves position={[0,1.55,0]} scale={.55} color="#45B764" /></group>);
}
function ForestScene({ count }: { count: number }) {
  const trees = [];
  const n = Math.min(count, 15);
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; const r = 1 + Math.random() * 1.8; trees.push(<Tree3D key={i} position={[Math.cos(a)*r, 0, Math.sin(a)*r]} scale={.5+Math.random()*.5} />); }
  return (<><ambientLight intensity={0.5} /><directionalLight position={[5,8,3]} intensity={1} color="#FFF5E0" /><directionalLight position={[-3,5,-2]} intensity={0.3} color="#87CEEB" /><mesh rotation={[-Math.PI/2,0,0]} position={[0,-.01,0]}><planeGeometry args={[20,20]} /><meshStandardMaterial color="#7EC850" roughness={.9} /></mesh>{trees}<OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} maxPolarAngle={Math.PI/2.5} minPolarAngle={Math.PI/4} /></>);
}

// Confetti
function Confetti() {
  return (<div className="confetti">{Array.from({length:35},(_,i) => (<div key={i} className="confetti-p" style={{ left:`${Math.random()*100}%`, background:['#F47B20','#FF9A4D','#FFB347','#10B981','#3B82F6','#EF4444','#F59E0B'][i%7], animationDelay:`${Math.random()*2}s`, animationDuration:`${2+Math.random()*2}s`, width:`${6+Math.random()*8}px`, height:`${6+Math.random()*8}px` }} />))}</div>);
}

// ================================================================
// MAIN PAGE
// ================================================================
export default function App() {
  // NAVIGATION
  const [page, setPage] = useState<'rewards' | 'campaign'>('rewards');

  // POINTS
  const [rewardPts, setRewardPts] = useState(3000000);
  const [cashbackPts, setCashbackPts] = useState(2500000);
  const [ptType, setPtType] = useState<'reward'|'cashback'>('reward');
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
  const [toast, setToast] = useState<{text:string;type:'success'|'error'}|null>(null);
  const [confetti, setConfetti] = useState(false);
  const showToast = useCallback((text: string, type: 'success'|'error') => setToast({text,type}), []);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 4000); return () => clearTimeout(t); }, [toast]);

  // FORM STATE
  const [donateAmt, setDonateAmt] = useState('');
  const [selTreeId, setSelTreeId] = useState<number|null>(null);
  const [ecertData, setEcertData] = useState<{name:string;code:string;date:string;loc:string}|null>(null);
  const [grpName, setGrpName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [grpDonate, setGrpDonate] = useState('');
  const [selLoc, setSelLoc] = useState('tienhai');
  const [donateTab, setDonateTab] = useState<'random'|'group'>('random');

  // GROUP
  const [group, setGroup] = useState<GroupData|null>(null);

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
          showToast(`🌳 ${t.name} đã được trồng thành công! Cây #${tn}`, 'success');
          setConfetti(true); setTimeout(() => setConfetti(false), 3000);
          setTotalTrees(p => p + 1);
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
        `<strong>${n}</strong> vừa góp <strong>${fmt((Math.floor(Math.random()*10)+1)*1000)} điểm</strong> vào cây #${200+Math.floor(Math.random()*50)}`,
        `<strong>${n}</strong> vừa mua <strong>1 cây</strong> 🌳`,
        `<strong>Nhóm ${pick(['Sài Gòn Xanh','Hà Nội Go Green','SHB Family','Xanh Việt'])}</strong> vừa trồng được cây thứ <strong>${Math.floor(Math.random()*50)+10}</strong>`,
        `<strong>${n}</strong> vừa tạo nhóm "<strong>${pick(['Rừng Xanh','Team Green','Cùng Trồng Cây'])}</strong>"`,
      ];
      return { id: feedId.current++, text: pick(tpls), avatar: pick(AVATARS), bg: pick(['#FFF0E0','#E8F5E9','#DBEAFE','#FCE4EC']), time: 'Vừa xong' };
    };
    setFeed(Array.from({length:5}, () => gen()));
    const i = setInterval(() => setFeed(p => [gen(), ...p.slice(0,9)]), 5000);
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
            const tn = totalTrees + Math.floor(Math.random()*5)+1;
            showToast(`🌳 Nhóm "${prev.name}" vừa trồng cây #${tn}!`, 'success');
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

  // ---- HANDLERS ----
  const handleBuy = useCallback(() => {
    if (pts() < TREE_PRICE) { showToast('❌ Bạn không đủ điểm!', 'error'); return; }
    deduct(TREE_PRICE);
    const tn = totalTrees + 1; setTotalTrees(p => p + 1);
    const t: MyTree = { id: Date.now(), name: `Cây ${pick(['Bàng','Xoài','Phượng','Sưa','Bằng Lăng'])}`, date: new Date().toLocaleDateString('vi-VN'), icon: pick(TREE_ICONS), location: pick(LOCATIONS).name, treeNumber: tn };
    setMyTrees(p => [t, ...p]);
    setEcertData({ name:'Nguyễn Văn A', code:`SHB-TREE-${tn}`, date: new Date().toLocaleDateString('vi-VN'), loc: t.location });
    setShowBuy(false); setShowEcert(true); setConfetti(true); setTimeout(() => setConfetti(false), 3000);
    showToast(`🌳 Trồng thành công cây #${tn}!`, 'success');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ptType, rewardPts, cashbackPts, totalTrees]);

  const handleDonateTree = useCallback(() => {
    const a = parseInt(donateAmt);
    if (!a || a <= 0) { showToast('❌ Nhập số điểm hợp lệ!', 'error'); return; }
    if (a > pts()) { showToast('❌ Không đủ điểm!', 'error'); return; }
    deduct(a);
    setComTrees(prev => prev.map(t => {
      if (t.id !== selTreeId) return t;
      const np = Math.min(t.currentPoints + a, t.targetPoints);
      const done = np >= t.targetPoints;
      if (done && !t.completed) {
        const tn = totalTrees + 1; setTotalTrees(p => p + 1);
        showToast(`🌳 ${t.name} đã trồng thành công!`, 'success');
        setConfetti(true); setTimeout(() => setConfetti(false), 3000);
        return { ...t, currentPoints: np, completed: true, treeNumber: tn, contributorCount: t.contributorCount+1, contributors: [...t.contributors, {name:'Bạn',avatar:'😊'}] };
      }
      return { ...t, currentPoints: np, contributorCount: t.contributorCount+1, contributors: [...t.contributors, {name:'Bạn',avatar:'😊'}] };
    }));
    setShowDonateTree(false); setDonateAmt('');
    showToast(`✅ Góp ${fmt(a)} điểm thành công!`, 'success');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donateAmt, selTreeId, ptType, rewardPts, cashbackPts, totalTrees]);

  const handleCreateGrp = useCallback(() => {
    if (!grpName.trim()) { showToast('❌ Nhập tên nhóm!', 'error'); return; }
    const code = genCode();
    setGroup({ id: Date.now().toString(), name: grpName, code, members: [{name:'Bạn',avatar:'😊'},{name:pick(NAMES),avatar:pick(AVATARS)}], trees: [{id:1,current:0,target:TREE_PRICE,completed:false}], totalTreesBought: 0 });
    setShowCreateGrp(false); setGrpName('');
    showToast(`✅ Đã tạo nhóm – Mã: ${code}`, 'success');
  }, [grpName, showToast]);

  const handleJoinGrp = useCallback(() => {
    if (!joinCode.trim() || joinCode.length < 4) { showToast('❌ Mã nhóm không hợp lệ!', 'error'); return; }
    setGroup({ id: Date.now().toString(), name: pick(['Rừng Xanh SHB','Team Green VN','Sài Gòn Xanh']), code: joinCode.toUpperCase(), members: [{name:pick(NAMES),avatar:pick(AVATARS)},{name:pick(NAMES),avatar:pick(AVATARS)},{name:'Bạn',avatar:'😊'}], trees: [{id:1,current:35000,target:TREE_PRICE,completed:false},{id:2,current:TREE_PRICE,target:TREE_PRICE,completed:true,treeNumber:195}], totalTreesBought:1 });
    setShowJoinGrp(false); setJoinCode('');
    showToast('✅ Đã tham gia nhóm!', 'success');
  }, [joinCode, showToast]);

  const handleGrpDonate = useCallback(() => {
    const a = parseInt(grpDonate);
    if (!a || a <= 0) { showToast('❌ Nhập số điểm hợp lệ!', 'error'); return; }
    if (a > pts()) { showToast('❌ Không đủ điểm!', 'error'); return; }
    deduct(a);
    setGroup(prev => {
      if (!prev) return null;
      let rem = a;
      const ut = prev.trees.map(t => {
        if (t.completed || rem <= 0) return t;
        const add = Math.min(rem, t.target - t.current); rem -= add;
        const nc = t.current + add;
        if (nc >= t.target) {
          const tn = totalTrees + Math.floor(Math.random()*5)+1;
          showToast(`🌳 Nhóm "${prev.name}" trồng cây #${tn}!`, 'success');
          setConfetti(true); setTimeout(() => setConfetti(false), 3000);
          setTotalTrees(p => p + 1);
          return { ...t, current: nc, completed: true, treeNumber: tn };
        }
        return { ...t, current: nc };
      });
      while (rem > 0) {
        const nid = ut.length + 1;
        if (rem >= TREE_PRICE) {
          ut.push({id:nid,current:TREE_PRICE,target:TREE_PRICE,completed:true,treeNumber:totalTrees+nid});
          rem -= TREE_PRICE;
        } else { ut.push({id:nid,current:rem,target:TREE_PRICE,completed:false}); rem=0; }
      }
      return { ...prev, trees: ut, totalTreesBought: ut.filter(t=>t.completed).length };
    });
    setGrpDonate(''); showToast(`✅ Góp ${fmt(a)} điểm cho nhóm!`, 'success');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grpDonate, ptType, rewardPts, cashbackPts, totalTrees]);

  // m² calculation (1 tree ≈ 25m²)
  const greenArea = myTrees.length * 25;

  // ================================================================
  // RENDER — PAGE 1: ĐỔI ĐIỂM THƯỞNG
  // ================================================================
  if (page === 'rewards') {
    return (
      <div className="app-shell">
        {toast && <div className={`toast ${toast.type==='error'?'toast-err':'toast-ok'}`}><span className="toast-icon">{toast.type==='error'?'⚠️':'🎉'}</span><span className="toast-msg">{toast.text}</span></div>}

        {/* HEADER */}
        <header className="rw-header">
          <div className="rw-header-row">
            <button className="rw-header-btn" id="rw-back">←</button>
            <h1 className="rw-title">Đổi điểm thưởng</h1>
            <button className="rw-header-btn" id="rw-notif">🔔</button>
          </div>
          <div className="rw-search">
            <span className="rw-search-icon">🔍</span>
            <input placeholder="Tìm ưu đãi, thương hiệu..." />
          </div>
        </header>

        {/* CATEGORIES */}
        <div className="rw-cats">
          {CATEGORIES.map((c, i) => (
            <div key={i} className="rw-cat">
              <div className="rw-cat-icon" style={{ background: c.bg }}>{c.icon}</div>
              <span className="rw-cat-label">{c.label}</span>
            </div>
          ))}
        </div>

        {/* PRIVILEGES */}
        <div className="rw-privileges">
          <div className="rw-priv-item">
            <div className="rw-priv-left"><span>✨</span> Đặc quyền ưu đãi thẻ</div>
            <span className="rw-priv-arrow">›</span>
          </div>
          <div className="rw-priv-item">
            <div className="rw-priv-left"><span>🎁</span> Kho quà cao cấp</div>
            <span className="rw-priv-arrow">›</span>
          </div>
        </div>

        {/* MÙA LỄ HỘI — tree planting card is HERE */}
        <div className="rw-section">
          <div className="rw-section-head">
            <h2 className="rw-section-title">🎉 Mùa lễ hội</h2>
            <span className="rw-section-link">Tất cả</span>
          </div>
          <div className="rw-scroll">
            {/* TREE PLANTING — special card */}
            <div className="rw-offer-card rw-tree-card" onClick={() => setPage('campaign')} id="offer-tree">
              <div className="rw-offer-img rw-tree-img" style={{ height: 110 }}>
                <span style={{ fontSize: 50 }}>🌳</span>
              </div>
              <div className="rw-offer-body">
                <div className="rw-offer-brand">Chiến dịch Trồng Cây</div>
                <div className="rw-offer-desc">Góp điểm trồng cây xanh, phủ xanh Việt Nam</div>
                <div style={{ display:'flex', alignItems:'center', gap: 4 }}>
                  <span className="rw-offer-price">50,000</span>
                  <span className="rw-offer-unit">Điểm / cây</span>
                </div>
              </div>
            </div>
            {FESTIVAL_OFFERS.map(o => (
              <div key={o.id} className="rw-offer-card">
                <div className="rw-offer-img" style={{ background: o.bg, height: 110, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontSize: 44 }}>{o.img}</span>
                </div>
                <div className="rw-offer-body">
                  <div className="rw-offer-brand">{o.brand}</div>
                  <div className="rw-offer-desc">{o.desc}</div>
                  <div style={{ display:'flex', alignItems:'center', gap: 4 }}>
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
            <h2 className="rw-section-title">🍽️ Thương hiệu món ngon</h2>
            <span className="rw-section-link">Tất cả</span>
          </div>
          <div className="rw-scroll">
            {BRAND_OFFERS.map(o => (
              <div key={o.id} className="rw-offer-card">
                <div className="rw-offer-img" style={{ background: o.bg, height: 110, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontSize: 44 }}>{o.img}</span>
                </div>
                <div className="rw-offer-body">
                  <div className="rw-offer-brand">{o.brand}</div>
                  <div className="rw-offer-desc">{o.desc}</div>
                  <div style={{ display:'flex', alignItems:'center', gap: 4 }}>
                    <span className="rw-offer-price">{o.price}</span>
                    <span className="rw-offer-unit">Điểm</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ƯU ĐÃI MỚI NHẤT */}
        <div className="rw-section" style={{ paddingBottom: 40 }}>
          <div className="rw-section-head">
            <h2 className="rw-section-title">🔥 Ưu đãi mới nhất</h2>
            <span className="rw-section-link">Tất cả</span>
          </div>
          <div className="rw-brands-grid">
            {[...FESTIVAL_OFFERS, ...BRAND_OFFERS].map((o, i) => (
              <div key={`grid-${i}`} className="rw-offer-card" style={{ minWidth: 'unset', maxWidth: 'unset' }}>
                <div className="rw-offer-img" style={{ background: o.bg, height: 100, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontSize: 36 }}>{o.img}</span>
                </div>
                <div className="rw-offer-body">
                  <div className="rw-offer-brand">{o.brand}</div>
                  <div className="rw-offer-desc">{o.desc}</div>
                  <div style={{ display:'flex', alignItems:'center', gap: 4 }}>
                    <span className="rw-offer-price">{o.price}</span>
                    <span className="rw-offer-unit">Điểm</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ================================================================
  // RENDER — PAGE 2: CHIẾN DỊCH TRỒNG CÂY
  // ================================================================
  return (
    <div className="app-shell">
      {toast && <div className={`toast ${toast.type==='error'?'toast-err':'toast-ok'}`}><span className="toast-icon">{toast.type==='error'?'⚠️':'🎉'}</span><span className="toast-msg">{toast.text}</span></div>}
      {confetti && <Confetti />}

      {/* NAV */}
      <nav className="cp-nav">
        <button className="cp-nav-btn" onClick={() => setPage('rewards')} id="cp-back">←</button>
        <span className="cp-nav-title">🌱 Chiến dịch Trồng Cây</span>
        <div className="cp-nav-right">
          <button className="cp-nav-btn" id="cp-share">📤</button>
        </div>
      </nav>

      {/* HERO */}
      <div className="cp-hero">
        <div className="cp-points">
          <div className={`cp-point-card ${ptType==='reward'?'active':''}`} onClick={() => setPtType('reward')}>
            <div className="cp-point-lbl">🎁 Quỹ điểm thưởng</div>
            <div className="cp-point-val">{fmt(rewardPts)}<span className="cp-point-unit"> đ</span></div>
          </div>
          <div className={`cp-point-card ${ptType==='cashback'?'active':''}`} onClick={() => setPtType('cashback')}>
            <div className="cp-point-lbl">💰 Quỹ hoàn tiền</div>
            <div className="cp-point-val">{fmt(cashbackPts)}<span className="cp-point-unit"> đ</span></div>
          </div>
        </div>
      </div>

      {/* BODY — 2 col on desktop */}
      <div className="cp-body">
        <div className="cp-main">
          {/* OVERVIEW */}
          <div className="cp-overview">
            <div className="cp-counter">
              <div className="cp-counter-lbl">🌍 Tổng số cây đã trồng</div>
              <div className="cp-counter-row">
                <span style={{ fontSize: 28 }}>🌳</span>
                <span className="cp-counter-val">{fmt(totalTrees)}</span>
              </div>
              <div className="cp-counter-unit">cây xanh trên toàn quốc</div>
            </div>
            <div className="cp-prog">
              <div className="cp-prog-head">
                <span className="cp-prog-lbl">🎯 Mục tiêu cộng đồng</span>
                <span className="cp-prog-val">{fmt(totalTrees)} / {fmt(target)}</span>
              </div>
              <div className="cp-prog-bar">
                <div className="cp-prog-fill" style={{ width:`${Math.min((totalTrees/target)*100,100)}%` }} />
              </div>
            </div>
            <div className="cp-cta">
              <button className="cp-cta-btn cp-cta-primary" onClick={() => setShowBuy(true)} id="btn-buy">🌳 Mua cây ngay</button>
              <button className="cp-cta-btn cp-cta-secondary" onClick={() => setShowDonate(true)} id="btn-donate">💚 Góp điểm</button>
            </div>
          </div>

          {/* COMMUNITY TREES */}
          <div className="sec-title">🌱 Cây cộng đồng đang góp</div>
          {comTrees.map(t => (
            <div key={t.id} className={`ct-card ${t.completed?'ct-done':''}`}>
              <div className="ct-head">
                <span className="ct-name">{t.completed?'✅':'🌱'} {t.name}</span>
                <span className={`ct-badge ${t.completed?'ct-badge-ok':'ct-badge-on'}`}>
                  {t.completed?`Hoàn thành #${t.treeNumber}`:'Đang góp'}
                </span>
              </div>
              <div className="ct-bar"><div className={`ct-bar-fill ${t.completed?'ct-bar-ok':''}`} style={{width:`${(t.currentPoints/t.targetPoints)*100}%`}} /></div>
              <div className="ct-info">
                <span className="ct-info-text">{fmt(t.currentPoints)} / {fmt(t.targetPoints)} điểm</span>
                <span className={`ct-info-pct ${t.completed?'ct-pct-ok':''}`}>{Math.round((t.currentPoints/t.targetPoints)*100)}%</span>
              </div>
              <div className="ct-avatars">
                {t.contributors.slice(0,4).map((c,i) => (<div key={i} className="ct-av" style={{background:['#FFF0E0','#E8F5E9','#DBEAFE','#FCE4EC'][i%4]}}>{c.avatar}</div>))}
                {t.contributorCount > 4 && <div className="ct-av-more">+{t.contributorCount-4}</div>}
                <span className="ct-av-count">{t.contributorCount} người góp</span>
              </div>
              <div className="ct-action">
                {t.completed
                  ? <button className="ct-btn ct-btn-ok">✅ Đã trồng thành công</button>
                  : <button className="ct-btn ct-btn-go" onClick={() => { setSelTreeId(t.id); setShowDonateTree(true); }}>💚 Góp điểm cho cây này</button>
                }
              </div>
            </div>
          ))}

          {/* GROUPS */}
          <div className="sec-title">👥 Nhóm trồng cây</div>
          {!group ? (
            <div className="grp-actions">
              <button className="grp-btn grp-btn-new" onClick={() => setShowCreateGrp(true)}>
                <span className="grp-btn-icon">➕</span>Tạo nhóm mới
              </button>
              <button className="grp-btn grp-btn-join" onClick={() => setShowJoinGrp(true)}>
                <span className="grp-btn-icon">🔗</span>Nhập mã nhóm
              </button>
            </div>
          ) : (
            <div className="ct-card" style={{ border:'2px solid var(--shb)' }}>
              <div className="ct-head">
                <span className="ct-name">👥 {group.name}</span>
                <span className="ct-badge ct-badge-on">{group.members.length} thành viên</span>
              </div>
              <div className="grp-code">
                <div className="grp-code-lbl">Mã nhóm (chia sẻ để mời bạn bè)</div>
                <div className="grp-code-val">{group.code}</div>
              </div>
              <div className="ct-avatars">
                {group.members.map((m,i) => (<div key={i} className="ct-av" style={{background:['#FFF0E0','#E8F5E9','#DBEAFE','#FCE4EC'][i%4]}}>{m.avatar}</div>))}
                <span className="ct-av-count">{group.members.length} thành viên</span>
              </div>
              <div style={{fontSize:13,fontWeight:700,margin:'12px 0 6px'}}>🌳 Cây của nhóm ({group.totalTreesBought} đã trồng)</div>
              <div className="grp-tree-list">
                {group.trees.map(t => (
                  <div key={t.id} className="grp-tree">
                    <div className="grp-tree-no">#{t.id}</div>
                    <div className="grp-tree-info">
                      <div className="grp-tree-bar"><div className={`grp-tree-fill ${t.completed?'grp-tree-fill-ok':'grp-tree-fill-on'}`} style={{width:`${(t.current/t.target)*100}%`}} /></div>
                      <div className={`grp-tree-st ${t.completed?'grp-tree-st-ok':''}`}>
                        {t.completed ? `✅ Đã trồng – Cây #${t.treeNumber}` : `${fmt(t.current)} / ${fmt(t.target)} (${Math.round((t.current/t.target)*100)}%)`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:12,display:'flex',gap:8}}>
                <input type="number" className="modal-input" placeholder="Nhập số điểm..." value={grpDonate} onChange={e => setGrpDonate(e.target.value)} style={{flex:1,padding:'10px 12px',fontSize:14}} />
                <button className="cp-cta-btn cp-cta-primary" style={{padding:'10px 18px',whiteSpace:'nowrap'}} onClick={handleGrpDonate}>💚 Góp</button>
              </div>
              <div className="quick-grid" style={{marginTop:8,marginBottom:0}}>
                {[5000,10000,25000].map(a => (<button key={a} className="q-btn" onClick={() => setGrpDonate(a.toString())}>{fmt(a)}</button>))}
              </div>
              <button style={{width:'100%',marginTop:8,padding:8,border:'none',background:'transparent',color:'var(--t3)',fontSize:12,cursor:'pointer',fontFamily:'inherit'}} onClick={() => setGroup(null)}>Rời nhóm</button>
            </div>
          )}

          {/* LIVE FEED */}
          <div className="sec-title">📡 Hoạt động trực tiếp</div>
          <div className="feed">
            {feed.slice(0,6).map(f => (
              <div key={f.id} className="feed-item">
                <div className="feed-av" style={{background:f.bg}}>{f.avatar}</div>
                <div className="feed-body">
                  <div className="feed-text" dangerouslySetInnerHTML={{__html:f.text}} />
                  <div className="feed-time">{f.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR (desktop) / inline (mobile) */}
        <div className="cp-side">
          {/* MY FOREST */}
          <div className="sec-title">🏡 Khu rừng của tôi</div>
          <div className="three-wrap">
            <Suspense fallback={<div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,#E8F5E9,#C8E6C9)'}}>
              <div style={{display:'flex',gap:4}}>{[0,1,2].map(i => (<div key={i} style={{width:8,height:8,borderRadius:'50%',background:'var(--shb)',animation:`loadDot 1.4s ease-in-out ${i*.2}s infinite`}} />))}</div>
            </div>}>
              <Canvas camera={{position:[4,3,4],fov:50}}>
                <ForestScene count={myTrees.length} />
              </Canvas>
            </Suspense>
          </div>

          <div className="forest-stats">
            <div className="fs-item">
              <div className="fs-val">{myTrees.length}</div>
              <div className="fs-lbl">Cây đã trồng</div>
            </div>
            <div className="fs-div" />
            <div className="fs-item">
              <div className="fs-val">~{greenArea}</div>
              <div className="fs-lbl">m² phủ xanh</div>
            </div>
            <div className="fs-div" />
            <div className="fs-item">
              <div className="fs-val">{LOCATIONS.length}</div>
              <div className="fs-lbl">Khu vực</div>
            </div>
          </div>

          <div className="forest-grid">
            {myTrees.map(t => (
              <div key={t.id} className="ft-item" onClick={() => { setSelLoc(LOCATIONS.find(l=>l.name===t.location)?.id||'tienhai'); setShowLocModal(true); }}>
                <span className="ft-icon">{t.icon}</span>
                <div className="ft-num">#{t.treeNumber}</div>
                <div className="ft-date">{t.date}</div>
                <div className="ft-loc">📍 {t.location}</div>
              </div>
            ))}
          </div>

          {/* MAP */}
          <div className="sec-title">🗺️ Vị trí cây đã trồng</div>
          <div className="map-card">
            <div className="map-visual">
              <div className="map-pin" style={{top:'22%',left:'28%'}}><span className="map-pin-dot">📍</span><span className="map-pin-tag">Tiền Hải</span></div>
              <div className="map-pin" style={{top:'38%',left:'55%',animationDelay:'.5s'}}><span className="map-pin-dot">📍</span><span className="map-pin-tag">Bác Trạch</span></div>
              <div className="map-pin" style={{top:'60%',left:'32%',animationDelay:'1s'}}><span className="map-pin-dot">📍</span><span className="map-pin-tag">Đồng Châu</span></div>
              <div className="map-pin" style={{top:'28%',left:'74%',animationDelay:'1.5s'}}><span className="map-pin-dot">📍</span><span className="map-pin-tag">TP Thái Bình</span></div>
              {/* deco */}
              <div style={{position:'absolute',top:'12%',left:'18%',fontSize:13,opacity:.35}}>🌲</div>
              <div style={{position:'absolute',top:'48%',left:'44%',fontSize:11,opacity:.25}}>🌳</div>
              <div style={{position:'absolute',top:'72%',left:'68%',fontSize:14,opacity:.35}}>🌴</div>
            </div>
            <div className="map-tags">
              {LOCATIONS.map(l => (
                <button key={l.id} className={`map-tag ${selLoc===l.id?'map-tag-on':'map-tag-off'}`} onClick={() => setSelLoc(l.id)}>
                  {l.icon} {l.name} ({l.treeCount})
                </button>
              ))}
            </div>
            {(() => { const l = LOCATIONS.find(x => x.id === selLoc); if (!l) return null; return (
              <div className="loc-detail">
                <div className="loc-head"><span className="loc-icon">{l.icon}</span><div><div className="loc-name">{l.name}</div><div className="loc-addr">{l.address}</div></div></div>
                <div style={{fontSize:13,color:'var(--t2)',marginBottom:6}}>🌳 {l.treeCount} cây đã trồng tại đây</div>
                <div className="loc-trees">
                  {Array.from({length:Math.min(l.treeCount,8)},(_,i) => (<div key={i} className="loc-dot">{TREE_ICONS[i%TREE_ICONS.length]}</div>))}
                </div>
              </div>
            ); })()}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  MODALS                                                       */}
      {/* ============================================================ */}

      {/* BUY */}
      {showBuy && (
        <div className="modal-bg" onClick={() => setShowBuy(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div className="modal-title">🌳 Mua cây ngay</div>
            <div className="modal-sub">Sử dụng <strong>{fmt(TREE_PRICE)} điểm</strong> từ <strong>{ptType==='reward'?'Quỹ điểm thưởng':'Quỹ hoàn tiền'}</strong> để trồng 1 cây xanh</div>
            <div style={{background:'var(--section)',borderRadius:'var(--r-lg)',padding:16,marginBottom:16}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                <span style={{fontSize:13,color:'var(--t2)'}}>Giá mỗi cây</span>
                <span style={{fontSize:13,fontWeight:700}}>{fmt(TREE_PRICE)} điểm</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                <span style={{fontSize:13,color:'var(--t2)'}}>Số dư hiện tại</span>
                <span style={{fontSize:13,fontWeight:700,color:'var(--shb)'}}>{fmt(pts())} điểm</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <span style={{fontSize:13,color:'var(--t2)'}}>Sau khi mua</span>
                <span style={{fontSize:13,fontWeight:700,color:pts()>=TREE_PRICE?'var(--ok)':'var(--err)'}}>{fmt(Math.max(pts()-TREE_PRICE,0))} điểm</span>
              </div>
            </div>
            <div className="pt-toggle">
              <button className={`pt-btn ${ptType==='reward'?'pt-on':''}`} onClick={() => setPtType('reward')}>🎁 Điểm thưởng</button>
              <button className={`pt-btn ${ptType==='cashback'?'pt-on':''}`} onClick={() => setPtType('cashback')}>💰 Hoàn tiền</button>
            </div>
            <button className="m-btn m-btn-primary" onClick={handleBuy} disabled={pts()<TREE_PRICE}>
              {pts()>=TREE_PRICE ? '🌳 Xác nhận mua cây' : '❌ Không đủ điểm'}
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
            <div className="modal-title">💚 Góp điểm trồng cây</div>
            <div className="modal-sub">Chọn cách bạn muốn góp điểm</div>
            <div className="tab-row" style={{marginBottom:16}}>
              <button className={`tab ${donateTab==='random'?'tab-on':'tab-off'}`} onClick={() => setDonateTab('random')}>🌱 Góp ngẫu nhiên</button>
              <button className={`tab ${donateTab==='group'?'tab-on':'tab-off'}`} onClick={() => setDonateTab('group')}>👥 Tạo/Tham gia nhóm</button>
            </div>
            {donateTab === 'random' ? (
              <>
                <div style={{fontSize:13,color:'var(--t2)',marginBottom:12}}>Chọn một cây cộng đồng:</div>
                {comTrees.filter(t => !t.completed).map(t => (
                  <div key={t.id} style={{background:'var(--section)',borderRadius:'var(--r-md)',padding:12,marginBottom:8,cursor:'pointer',border:'1px solid var(--b1)',transition:'var(--tr-f)'}}
                    onClick={() => { setSelTreeId(t.id); setShowDonate(false); setShowDonateTree(true); }}>
                    <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>🌱 {t.name}</div>
                    <div className="ct-bar" style={{height:6}}><div className="ct-bar-fill" style={{width:`${(t.currentPoints/t.targetPoints)*100}%`}} /></div>
                    <div style={{fontSize:11,color:'var(--t2)',marginTop:4}}>{fmt(t.currentPoints)} / {fmt(t.targetPoints)} · {Math.round((t.currentPoints/t.targetPoints)*100)}%</div>
                  </div>
                ))}
              </>
            ) : (
              <div className="grp-actions">
                <button className="grp-btn grp-btn-new" onClick={() => { setShowDonate(false); setShowCreateGrp(true); }}>
                  <span className="grp-btn-icon">➕</span>Tạo nhóm mới
                </button>
                <button className="grp-btn grp-btn-join" onClick={() => { setShowDonate(false); setShowJoinGrp(true); }}>
                  <span className="grp-btn-icon">🔗</span>Nhập mã nhóm
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
            <div className="modal-title">💚 Góp điểm</div>
            <div className="modal-sub">Góp cho {comTrees.find(t=>t.id===selTreeId)?.name || 'cây cộng đồng'}</div>
            <div className="pt-toggle">
              <button className={`pt-btn ${ptType==='reward'?'pt-on':''}`} onClick={() => setPtType('reward')}>🎁 Thưởng: {fmt(rewardPts)}</button>
              <button className={`pt-btn ${ptType==='cashback'?'pt-on':''}`} onClick={() => setPtType('cashback')}>💰 Hoàn: {fmt(cashbackPts)}</button>
            </div>
            <div style={{marginBottom:12}}>
              <label className="modal-label">Số điểm muốn góp</label>
              <input type="number" className="modal-input" placeholder="Nhập số điểm..." value={donateAmt} onChange={e => setDonateAmt(e.target.value)} />
              <div className="modal-hint">Tối đa: {fmt(pts())} điểm</div>
            </div>
            <div className="quick-grid">
              {[5000,10000,20000,30000,40000,50000].map(a => (
                <button key={a} className={`q-btn ${donateAmt===a.toString()?'q-on':''}`} onClick={() => setDonateAmt(a.toString())}>{fmt(a)}</button>
              ))}
            </div>
            <button className="m-btn m-btn-primary" onClick={handleDonateTree}>💚 Xác nhận góp điểm</button>
            <button className="m-btn m-btn-ghost" onClick={() => { setShowDonateTree(false); setDonateAmt(''); }}>Hủy</button>
          </div>
        </div>
      )}

      {/* E-CERT */}
      {showEcert && ecertData && (
        <div className="modal-bg" onClick={() => setShowEcert(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div className="modal-title">🎉 Chứng nhận trồng cây</div>
            <div className="ecert">
              <div className="ecert-logo">SHB GREEN</div>
              <div className="ecert-h">Chứng nhận trồng cây xanh</div>
              <span className="ecert-icon">🌳</span>
              <div className="ecert-rows">
                <div className="ecert-row"><span className="ecert-k">Người trồng</span><span className="ecert-v">{ecertData.name}</span></div>
                <div className="ecert-row"><span className="ecert-k">Mã cây</span><span className="ecert-v">{ecertData.code}</span></div>
                <div className="ecert-row"><span className="ecert-k">Ngày trồng</span><span className="ecert-v">{ecertData.date}</span></div>
                <div className="ecert-row"><span className="ecert-k">Vị trí</span><span className="ecert-v">📍 {ecertData.loc}</span></div>
                <div className="ecert-row"><span className="ecert-k">Phủ xanh</span><span className="ecert-v">~25 m²</span></div>
              </div>
              <button className="ecert-share" onClick={() => showToast('✅ Đã sao chép link!','success')}>📤 Chia sẻ chứng nhận</button>
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
            <div className="modal-title">➕ Tạo nhóm trồng cây</div>
            <div className="modal-sub">Tạo nhóm kêu gọi bạn bè cùng góp điểm</div>
            <div style={{marginBottom:16}}>
              <label className="modal-label">Tên nhóm</label>
              <input type="text" className="modal-input" placeholder="VD: Rừng Xanh SHB..." value={grpName} onChange={e => setGrpName(e.target.value)} />
            </div>
            <button className="m-btn m-btn-primary" onClick={handleCreateGrp}>➕ Tạo nhóm</button>
            <button className="m-btn m-btn-ghost" onClick={() => setShowCreateGrp(false)}>Hủy</button>
          </div>
        </div>
      )}

      {/* JOIN GROUP */}
      {showJoinGrp && (
        <div className="modal-bg" onClick={() => setShowJoinGrp(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div className="modal-title">🔗 Tham gia nhóm</div>
            <div className="modal-sub">Nhập mã nhóm để cùng góp điểm</div>
            <div style={{marginBottom:16}}>
              <label className="modal-label">Mã nhóm</label>
              <input type="text" className="modal-input" placeholder="VD: ABC123" value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())} maxLength={6} style={{letterSpacing:4,textAlign:'center',fontSize:20,fontWeight:700}} />
            </div>
            <button className="m-btn m-btn-primary" onClick={handleJoinGrp}>🔗 Tham gia nhóm</button>
            <button className="m-btn m-btn-ghost" onClick={() => setShowJoinGrp(false)}>Hủy</button>
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
              <div className="modal-title">{l.icon} {l.name}</div>
              <div className="modal-sub">{l.address}</div>
              <div style={{background:'var(--section)',borderRadius:'var(--r-lg)',padding:18,marginBottom:16,textAlign:'center'}}>
                <div style={{fontSize:32,marginBottom:4}}>🌳</div>
                <div style={{fontSize:28,fontWeight:800,color:'var(--shb)'}}>{l.treeCount}</div>
                <div style={{fontSize:13,color:'var(--t2)'}}>cây đã trồng tại đây</div>
              </div>
              {mt.length > 0 && (<>
                <div style={{fontSize:14,fontWeight:700,marginBottom:8}}>🌱 Cây của bạn tại {l.name}</div>
                {mt.map(t => (
                  <div key={t.id} style={{display:'flex',alignItems:'center',gap:10,padding:10,background:'var(--section)',borderRadius:'var(--r-sm)',marginBottom:6}}>
                    <span style={{fontSize:24}}>{t.icon}</span>
                    <div>
                      <div style={{fontWeight:700,fontSize:13}}>Cây #{t.treeNumber}</div>
                      <div style={{fontSize:11,color:'var(--t2)'}}>Trồng ngày {t.date} · ~25 m² phủ xanh</div>
                    </div>
                  </div>
                ))}
              </>)}
              <button className="m-btn m-btn-ghost" onClick={() => setShowLocModal(false)}>Đóng</button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
