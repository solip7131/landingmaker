// ============================================================
//  sections.jsx — page sections
// ============================================================

const FOODS = ['🍜','🍣','🍔','🍕','🍗','🍙','🍤','🥘','🌮','🍰','☕','🥟','🍻','🍲','🧁','🥗'];

// ---------------- Brand wordmark ----------------
function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-lg shadow-sm ${light ? 'bg-white' : 'bg-mint'}`}>
        <span>🍽️</span>
      </div>
      <div className={`leading-tight ${light ? 'text-white' : 'text-ink'}`}>
        <div className="font-display text-[1.05rem] tracking-tight">랜딩페이지 제작소</div>
        <div className={`text-[10px] font-bold tracking-[.18em] ${light ? 'text-white/70' : 'text-mint-deep'}`}>FOR F&amp;B FRANCHISE</div>
      </div>
    </div>
  );
}

// ---------------- Top nav ----------------
function Nav({ onOpen }) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${solid ? 'bg-white/92 backdrop-blur-md shadow-[0_4px_24px_rgba(0,143,102,.08)] py-3' : 'py-5'}`}>
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        <Logo light={!solid} />
        <button onClick={onOpen} className={`hidden sm:inline-flex items-center gap-1.5 font-bold text-sm px-5 py-2.5 rounded-full transition-all active:scale-95 ${solid ? 'bg-mint text-white hover:bg-mint-deep' : 'bg-white text-mint-deep hover:bg-white/90'} shadow-md`}>
          무료 상담 신청 <span aria-hidden="true">→</span>
        </button>
      </div>
    </header>
  );
}

// ---------------- 1. HERO ----------------
function Hero({ onOpen }) {
  const particles = useRef(
    Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      emoji: FOODS[i % FOODS.length],
      left: Math.round((i * 53 + 7) % 100),
      size: 18 + ((i * 7) % 26),
      dur: 7 + ((i * 1.3) % 7),
      delay: -((i * 1.7) % 9),
      spin: (i % 2 ? 1 : -1) * (10 + (i % 4) * 12),
      opacity: 0.28 + ((i % 5) * 0.06),
    }))
  ).current;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mint via-mint to-mint-deep text-white">
      {/* particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <span key={p.id} className="particle"
            style={{ left: p.left + '%', bottom: '-40px', fontSize: p.size, '--dur': p.dur + 's', animationDelay: p.delay + 's', '--spin': p.spin + 'deg', opacity: p.opacity }}>
            {p.emoji}
          </span>
        ))}
      </div>
      {/* decorative blobs */}
      <Blob className="absolute -left-24 top-24 w-80 h-80 opacity-20 slowspin" color="#ffffff" />
      <Blob className="absolute -right-28 bottom-10 w-96 h-96 opacity-15 slowspin" color="#FFE08A" />

      <div className="relative max-w-5xl mx-auto px-5 pt-36 md:pt-44 pb-24 md:pb-32 text-center">
        <div className="reveal inline-flex items-center gap-2 bg-punch text-white font-bold text-sm md:text-[15px] px-5 py-2.5 rounded-full shadow-lg mb-8">
          <span className="animate-pulse">⚡</span> 지금 신청하면 <u className="decoration-2 underline-offset-2">48시간 이내</u> 제작 착수
        </div>

        <h1 className="reveal reveal-d1 font-display text-[2.5rem] leading-[1.16] md:text-[4.4rem] md:leading-[1.1] tracking-tight">
          사장님, 가맹점 문의가<br />
          <span className="relative inline-block">
            <span className="relative z-10">알아서 들어오게</span>
            <span className="absolute left-0 right-0 bottom-1 h-3 md:h-5 bg-punch/70 rounded-full -z-0"></span>
          </span> 만들어 드릴게요
        </h1>

        <p className="reveal reveal-d2 mt-7 text-lg md:text-2xl font-bold text-white/95">
          외식업 프랜차이즈 전문 랜딩페이지로 가맹 문의를 <span className="text-gold">2배</span> 늘려보세요
        </p>
        <p className="reveal reveal-d3 mt-4 text-[15px] md:text-lg text-white/85 font-medium max-w-2xl mx-auto leading-relaxed">
          직접 영업 뛰지 않아도 됩니다. 잘 만든 랜딩페이지 하나가<br className="hidden md:block" /> 24시간 가맹 영업사원이 되어드립니다.
        </p>

        <div className="reveal reveal-d4 mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={onOpen} className="w-full sm:w-auto bg-white text-mint-deep font-extrabold text-lg px-9 py-4 rounded-full shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all active:scale-95">
            무료 상담 신청하기 →
          </button>
          <a href="#process" className="w-full sm:w-auto bg-white/15 text-white font-bold text-lg px-9 py-4 rounded-full border border-white/40 hover:bg-white/25 transition-all">
            제작 과정 보기
          </a>
        </div>
      </div>

      {/* curved divider */}
      <svg className="block w-full -mb-px" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path fill="#ffffff" d="M0,80 L0,40 C240,80 480,80 720,52 C960,24 1200,24 1440,52 L1440,80 Z"></path>
      </svg>
    </section>
  );
}

// ---------------- 2. STATS ----------------
function Stats() {
  const items = [
    { node: <><Counter target={120} suffix="+" /></>, label: '제작 완료 랜딩페이지', sub: '외식업 전문 제작 실적', icon: '📄' },
    { node: <><Counter target={500} suffix="%" /></>, label: '평균 가맹 문의 증가율', sub: '제작 전 대비', icon: '📈' },
    { node: <><Counter target={98} suffix="%" /></>, label: '고객 만족도', sub: '재의뢰율 포함', icon: '💚' },
  ];
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-5 grid sm:grid-cols-3 gap-5 md:gap-7">
        {items.map((it, i) => (
          <div key={i} className={`reveal reveal-d${i + 1} relative bg-white rounded-[28px] p-7 md:p-9 text-center border border-mint-soft shadow-[0_14px_40px_rgba(0,143,102,.08)]`}>
            <div className="text-3xl mb-3">{it.icon}</div>
            <div className="font-display text-mint-deep text-[2.6rem] md:text-[3.2rem] leading-none">{it.node}</div>
            <div className="mt-3 font-bold text-ink text-lg">{it.label}</div>
            <div className="mt-1 text-sm text-ink/50 font-medium">{it.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------- 3. PAIN POINTS ----------------
function Pain({ onOpen }) {
  const pains = [
    { icon: '😓', text: 'SNS 광고는 하는데 가맹 문의로 이어지질 않아요' },
    { icon: '😓', text: '직접 설명하기엔 시간이 너무 부족해요' },
    { icon: '😓', text: '경쟁 브랜드보다 우리 브랜드가 좋은데, 전달이 안 돼요' },
  ];
  return (
    <section className="relative bg-mint-light py-20 md:py-28 overflow-hidden">
      <Blob className="absolute right-[-6rem] top-10 w-72 h-72 opacity-40 slowspin" color="#ffffff" />
      <div className="relative max-w-5xl mx-auto px-5">
        <SectionHead eyebrow="WHY YOU NEED IT" title="이런 고민, 혹시 하고 계신가요?" />
        <div className="grid md:grid-cols-3 gap-5">
          {pains.map((p, i) => (
            <div key={i} className={`reveal reveal-d${i + 1} bg-white rounded-3xl p-7 shadow-[0_10px_30px_rgba(0,143,102,.07)] border border-white`}>
              <div className="w-14 h-14 rounded-2xl bg-mint-light flex items-center justify-center text-3xl mb-5">{p.icon}</div>
              <p className="text-[17px] md:text-lg font-bold text-ink leading-relaxed break-keep">"{p.text}"</p>
            </div>
          ))}
        </div>

        <div className="reveal flex justify-center mt-10 mb-2">
          <div className="bobble text-4xl text-mint-deep">↓</div>
        </div>

        <div className="reveal reveal-d1 mx-auto max-w-3xl">
          <button onClick={onOpen} className="group w-full text-center bg-gradient-to-r from-mint to-mint-deep text-white rounded-[28px] p-7 md:p-9 shadow-[0_18px_44px_rgba(0,143,102,.28)] hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-center gap-4">
              <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">✨</div>
              <p className="font-display text-xl md:text-[1.9rem] leading-snug break-keep text-left">
                가맹 모집 전용 랜딩페이지가<br className="hidden md:block" /> 이 모든 걸 해결합니다
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

// ---------------- 4. FEATURES ----------------
function Features() {
  const feats = [
    { icon: '🎯', title: '외식업 전문 기획', desc: '메뉴, 창업비용, 수익 구조까지 외식업 가맹 문의에 최적화된 구성' },
    { icon: '⚡', title: '빠른 제작, 5일 완성', desc: '신청 후 24시간 이내 기획안 제시, 5일 이내 완성 납품' },
    { icon: '📱', title: '모바일 완벽 대응', desc: '가맹 희망자의 80%는 모바일로 검색합니다. 모든 기기에서 완벽하게' },
    { icon: '🔄', title: '납품 후 2주 이내 수정 무제한', desc: '오탈자, 내용 변경, 이미지 교체 모두 포함' },
  ];
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-5">
        <SectionHead eyebrow="WHAT MAKES US DIFFERENT" title="랜딩페이지 제작소가 다른 이유" />
        <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {feats.map((f, i) => (
            <div key={i} className={`reveal reveal-d${(i % 2) + 1} group flex gap-5 bg-white rounded-[26px] p-7 md:p-8 border border-mint-soft hover:border-mint hover:shadow-[0_18px_44px_rgba(0,143,102,.12)] transition-all`}>
              <div className="shrink-0 w-16 h-16 rounded-2xl bg-mint-light text-mint-deep flex items-center justify-center text-3xl group-hover:bg-mint group-hover:text-white transition-colors">{f.icon}</div>
              <div>
                <h3 className="font-display text-xl md:text-[1.55rem] text-ink leading-tight">{f.title}</h3>
                <p className="mt-2 text-[15px] md:text-base text-ink/60 font-medium leading-relaxed break-keep">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------- 5. PROCESS ----------------
function Process() {
  const steps = [
    { n: '01', icon: '📝', title: '신청서 작성', desc: '브랜드 정보와 목표를 알려주세요' },
    { n: '02', icon: '📋', title: '기획안 전달', desc: '24시간 이내 맞춤 기획안을 전달해 드립니다' },
    { n: '03', icon: '🎨', title: '디자인 & 개발', desc: '고퀄리티 랜딩페이지를 제작합니다' },
    { n: '04', icon: '🚀', title: '납품 & 운영 지원', desc: '광고 연동까지 도와드립니다' },
  ];
  return (
    <section id="process" className="relative bg-mint-light py-20 md:py-28 overflow-hidden scroll-mt-20">
      <div className="relative max-w-6xl mx-auto px-5">
        <SectionHead eyebrow="HOW IT WORKS" title="이렇게 만들어 드려요" sub="신청부터 운영까지, 4단계로 끝납니다" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {steps.map((s, i) => (
            <div key={i} className={`reveal reveal-d${i + 1} relative bg-white rounded-[26px] p-7 text-center shadow-[0_12px_34px_rgba(0,143,102,.08)] border border-white`}>
              <div className="mx-auto w-14 h-14 rounded-full bg-mint text-white font-display text-xl flex items-center justify-center shadow-md mb-4">{s.n}</div>
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="font-display text-lg md:text-xl text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink/55 font-medium break-keep leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 z-10 text-mint-deep text-2xl font-bold">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------- 6. PRIZES / PACKAGES ----------------
function Prizes({ onOpen }) {
  return (
    <section className="relative bg-gradient-to-b from-mint-deep to-mint text-white py-20 md:py-28 overflow-hidden">
      <Blob className="absolute -left-20 bottom-0 w-80 h-80 opacity-15 slowspin" color="#ffffff" />
      <div className="relative max-w-5xl mx-auto px-5">
        <SectionHead eyebrow="LIMITED BENEFIT" title="지금 신청 시 특별 혜택" sub="선착순 신청 팀에게만 제공되는 패키지입니다" light />

        {/* 1등 골드 카드 */}
        <div className="reveal relative rounded-[32px] p-[3px] bg-gradient-to-br from-gold-light via-gold to-gold-deep shadow-[0_24px_60px_rgba(201,162,75,.4)]">
          <div className="rounded-[30px] bg-white px-7 py-9 md:px-12 md:py-11">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="shrink-0 relative">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-gold-light to-gold-deep flex flex-col items-center justify-center text-ink shadow-inner">
                  <span className="text-3xl">🥇</span>
                  <span className="font-display text-lg mt-0.5">1등 혜택</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-display text-[1.7rem] md:text-[2.4rem] leading-tight gold-text">가맹 문의 폭발 패키지</h3>
                <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                  {['랜딩페이지 제작', 'SNS 광고 소재 3종', '카카오채널 연동 무료'].map((t, i) => (
                    <span key={i} className="bg-mint-light text-mint-deep font-bold text-sm px-4 py-2 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2등 / 3등 */}
        <div className="grid sm:grid-cols-2 gap-5 mt-6">
          {[
            { rank: '2등', icon: '🥈', title: '성장 가속 패키지', chips: ['랜딩페이지 제작', '수정 무제한', '1개월 A/B 테스트 무료'] },
            { rank: '3등', icon: '🥉', title: '스타트 패키지', chips: ['기본 랜딩페이지 제작', '모바일 최적화'] },
          ].map((p, i) => (
            <div key={i} className={`reveal reveal-d${i + 1} bg-white/10 backdrop-blur rounded-[26px] p-7 border border-white/25`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{p.icon}</span>
                <span className="font-display text-xl">{p.rank} · {p.title}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.chips.map((c, j) => (
                  <span key={j} className="bg-white/15 text-white font-semibold text-sm px-3.5 py-1.5 rounded-full border border-white/20">{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="reveal text-center mt-10">
          <button onClick={onOpen} className="bg-punch hover:bg-punch-deep text-white font-extrabold text-lg px-9 py-4 rounded-full shadow-xl hover:-translate-y-0.5 transition-all active:scale-95">
            특별 혜택 받고 신청하기 🎁
          </button>
        </div>
      </div>
    </section>
  );
}

// ---------------- 7. FINAL CTA ----------------
function FinalCTA({ onOpen }) {
  return (
    <section className="relative bg-mint-dark text-white py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }}></div>
      <div className="relative max-w-3xl mx-auto px-5 text-center">
        <div className="reveal inline-flex items-center gap-2 bg-punch font-bold text-sm px-5 py-2 rounded-full mb-7">
          🔥 선착순 10팀 한정
        </div>
        <h2 className="reveal reveal-d1 font-display text-[2.3rem] md:text-[3.6rem] leading-[1.12]">지금 바로 신청하세요</h2>
        <p className="reveal reveal-d2 mt-5 text-lg md:text-xl text-white/85 font-medium break-keep">
          먼저 신청한 <span className="text-gold font-bold">10팀</span>에게는 기획 컨설팅을 무료로 드립니다
        </p>
        <button onClick={onOpen} className="reveal reveal-d3 mt-9 bg-white text-mint-dark font-extrabold text-xl px-11 py-5 rounded-full shadow-2xl hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(0,0,0,.25)] transition-all active:scale-95">
          무료 상담 신청하기 →
        </button>
        <p className="reveal reveal-d4 mt-5 text-sm text-white/60">신청은 1분이면 충분합니다 · 부담 없이 상담만 받아보셔도 좋아요</p>
      </div>
    </section>
  );
}

// ---------------- Footer ----------------
function Footer() {
  return (
    <footer className="bg-ink text-white/70 py-12">
      <div className="max-w-5xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo light />
        <div className="text-center md:text-right text-sm leading-relaxed">
          <p className="font-bold text-white">요식업 대표님들을 위한 랜딩페이지 제작소</p>
          <p className="mt-1 text-white/55">외식업 프랜차이즈 가맹 모집 전문 · 평일 10:00–19:00</p>
          <p className="mt-2 text-white/35 text-xs">© 2026 랜딩페이지 제작소. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ---------------- PORTFOLIO ----------------
const PORTFOLIO = [
  {
    emoji: '🍖', brand: '명품직화구이', tag: '한식', tagColor: 'bg-orange-100 text-orange-600',
    metric: '+620%', metricLabel: '가맹 문의 증가',
    bg: 'from-orange-400 to-red-400',
    desc: '랜딩페이지 오픈 3개월 만에 신규 가맹점 12호점 계약 완료',
    period: '제작 후 3개월',
  },
  {
    emoji: '🧋', brand: '달콤공방', tag: '카페·디저트', tagColor: 'bg-pink-100 text-pink-600',
    metric: '월 47건', metricLabel: '가맹 문의 달성',
    bg: 'from-pink-400 to-purple-400',
    desc: 'SNS 광고와 랜딩페이지 연동으로 문의가 폭증, 카카오 채널 전환율 31%',
    period: '제작 후 2개월',
  },
  {
    emoji: '🍗', brand: '바삭통닭', tag: '치킨·피자', tagColor: 'bg-yellow-100 text-yellow-700',
    metric: '5배', metricLabel: '가맹 문의 증가',
    bg: 'from-yellow-400 to-orange-400',
    desc: '제작 2주 만에 첫 가맹 계약 완료, 이후 6개월 누적 23건 계약',
    period: '제작 후 2주',
  },
  {
    emoji: '🥘', brand: '한우국밥 본가', tag: '한식', tagColor: 'bg-green-100 text-green-700',
    metric: '+8개', metricLabel: '신규 가맹점',
    bg: 'from-green-500 to-teal-500',
    desc: '광고 예산 변동 없이 랜딩페이지 개편만으로 6개월간 지속 가맹 유입',
    period: '제작 후 6개월',
  },
  {
    emoji: '🍜', brand: '탄탄면왕', tag: '중식', tagColor: 'bg-red-100 text-red-600',
    metric: '18%', metricLabel: '가맹 신청 전환율',
    bg: 'from-red-400 to-pink-500',
    desc: '방문자 100명 중 18명이 가맹 상담을 신청 — 업계 평균의 6배 수준',
    period: '오픈 후 1개월',
  },
  {
    emoji: '🍰', brand: '달달과자', tag: '카페·디저트', tagColor: 'bg-purple-100 text-purple-600',
    metric: '100%', metricLabel: '재의뢰율',
    bg: 'from-purple-400 to-indigo-400',
    desc: '첫 랜딩페이지 성과에 만족하여 시즌2 업그레이드 버전 제작 진행 중',
    period: '지속 파트너십',
  },
];

function Portfolio() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHead eyebrow="PORTFOLIO" title="실제 제작 사례" sub="외식업 브랜드가 경험한 진짜 성과입니다" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {PORTFOLIO.map((p, i) => (
            <div key={i} className={`reveal reveal-d${(i % 3) + 1} group bg-white rounded-[24px] overflow-hidden border border-mint-soft hover:border-mint hover:shadow-[0_18px_44px_rgba(0,143,102,.12)] transition-all`}>
              {/* card header */}
              <div className={`relative bg-gradient-to-br ${p.bg} h-32 flex items-center justify-center`}>
                <span className="text-6xl filter drop-shadow-md">{p.emoji}</span>
                <div className="absolute top-3 right-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${p.tagColor} bg-white/90`}>{p.tag}</span>
                </div>
              </div>
              {/* card body */}
              <div className="p-6">
                <h3 className="font-display text-xl text-ink">{p.brand}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-[2rem] leading-none text-mint-deep">{p.metric}</span>
                  <span className="text-sm font-bold text-ink/50">{p.metricLabel}</span>
                </div>
                <p className="mt-3 text-sm text-ink/60 font-medium leading-relaxed break-keep">{p.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 bg-mint-light text-mint-deep text-xs font-bold px-3 py-1.5 rounded-full">
                  <span>⏱</span> {p.period}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Logo, Nav, Hero, Stats, Pain, Features, Portfolio, Process, Prizes, FinalCTA, Footer });
