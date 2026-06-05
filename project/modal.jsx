// ============================================================
//  modal.jsx — floating CTA + application form modal
// ============================================================

// ---- form field primitives ----
function Field({ label, hint, required, children }) {
  return (
    <label className="block">
      <span className="block font-bold text-ink text-[15px] mb-2">
        {label}{required && <span className="text-punch ml-1">*</span>}
      </span>
      {children}
      {hint && <span className="block text-[13px] text-ink/45 mt-1.5">{hint}</span>}
    </label>
  );
}

const inputCls = "w-full rounded-2xl border-2 border-mint-soft bg-mint-light/40 px-4 py-3 text-[15px] font-medium text-ink placeholder:text-ink/35 outline-none transition-colors focus:border-mint focus:bg-white";

function TextInput(props) { return <input {...props} className={inputCls + (props.className || '')} />; }

function Select({ value, onChange, placeholder, options }) {
  return (
    <select value={value} onChange={onChange} className={inputCls + ' appearance-none bg-[length:18px] bg-no-repeat pr-10 ' + (value ? 'text-ink' : 'text-ink/40')}
      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%2300A878' stroke-width='3' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundPosition: 'right 16px center' }}>
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => <option key={o} value={o} className="text-ink">{o}</option>)}
    </select>
  );
}

function RadioGroup({ name, value, onChange, options }) {
  return (
    <div className="grid sm:grid-cols-2 gap-2.5">
      {options.map((o) => {
        const active = value === o;
        return (
          <button type="button" key={o} onClick={() => onChange(o)}
            className={`text-left px-4 py-3 rounded-2xl border-2 font-semibold text-[15px] transition-all ${active ? 'border-mint bg-mint-light text-mint-deep' : 'border-mint-soft bg-white text-ink/70 hover:border-mint/50'}`}>
            <span className={`inline-block w-4 h-4 rounded-full border-2 mr-2 align-[-2px] ${active ? 'border-mint bg-mint' : 'border-ink/25'}`}>
              {active && <span className="block w-1.5 h-1.5 bg-white rounded-full m-[3px]"></span>}
            </span>
            {o}
          </button>
        );
      })}
    </div>
  );
}

function CheckGroup({ values, onToggle, options }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((o) => {
        const active = values.includes(o);
        return (
          <button type="button" key={o} onClick={() => onToggle(o)}
            className={`px-4 py-2.5 rounded-full border-2 font-semibold text-[14px] transition-all ${active ? 'border-mint bg-mint text-white' : 'border-mint-soft bg-white text-ink/65 hover:border-mint/50'}`}>
            {active && <span className="mr-1">✓</span>}{o}
          </button>
        );
      })}
    </div>
  );
}

// ---- the modal ----
function ApplyModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    brand: '', category: '', stores: '', exp: '', target: '', cost: '',
    strength: '', channels: [], timing: '', phone: '', name: '',
  });
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v?.target ? v.target.value : v }));
  const toggleChannel = (c) => setForm((f) => ({ ...f, channels: f.channels.includes(c) ? f.channels.filter((x) => x !== c) : [...f.channels, c] }));

  // lock body scroll + esc to close
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const onKey = (e) => e.key === 'Escape' && onClose();
      window.addEventListener('keydown', onKey);
      return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
    }
  }, [open, onClose]);

  // reset success state shortly after close
  useEffect(() => { if (!open) { const t = setTimeout(() => setSubmitted(false), 300); return () => clearTimeout(t); } }, [open]);

  if (!open) return null;

  const canSubmit = form.brand && form.phone && form.name;
  const onSubmit = (e) => { e.preventDefault(); if (!canSubmit) return; setSubmitted(true); };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-ink/55 backdrop-blur-sm overlay-in" onClick={onClose}></div>

      <div className="relative w-full sm:max-w-xl max-h-[92vh] sm:max-h-[88vh] bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl sheet-in flex flex-col overflow-hidden">
        {submitted ? (
          <SuccessView onClose={onClose} />
        ) : (
          <>
            {/* header */}
            <div className="relative bg-gradient-to-r from-mint to-mint-deep text-white px-6 py-6 sm:px-8">
              <button onClick={onClose} aria-label="닫기" className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-xl leading-none transition-colors">×</button>
              <h3 className="font-display text-[1.5rem] sm:text-[1.8rem] leading-tight pr-10">가맹 모집용 랜딩페이지 제작 신청</h3>
              <p className="mt-1.5 text-white/85 text-sm font-medium">아래 내용을 작성해 주시면 전문 기획자가 연락드립니다</p>
            </div>

            {/* body */}
            <form onSubmit={onSubmit} className="flex-1 overflow-y-auto nice-scroll px-6 sm:px-8 py-6 space-y-5">
              <Field label="브랜드명" required hint="운영 중인 브랜드 이름을 입력해 주세요">
                <TextInput value={form.brand} onChange={set('brand')} placeholder="예) 정성담은 한식당" />
              </Field>

              <Field label="업종 카테고리">
                <Select value={form.category} onChange={set('category')} placeholder="업종을 선택해 주세요"
                  options={['한식','중식','일식','양식','카페·디저트','치킨·피자','분식','기타']} />
              </Field>

              <Field label="현재 운영 매장 수">
                <Select value={form.stores} onChange={set('stores')} placeholder="매장 수를 선택해 주세요"
                  options={['1개 (직영만)','2~5개','6~10개','11개 이상']} />
              </Field>

              <Field label="가맹 모집 경험">
                <RadioGroup name="exp" value={form.exp} onChange={set('exp')}
                  options={['처음 시작합니다','진행 중이지만 효과가 없어요','잠깐 중단했다가 재개 예정']} />
              </Field>

              <Field label="월 가맹 문의 목표 수">
                <Select value={form.target} onChange={set('target')} placeholder="목표를 선택해 주세요"
                  options={['10건 이하','10~30건','30~50건','50건 이상']} />
              </Field>

              <Field label="예상 창업 비용대">
                <Select value={form.cost} onChange={set('cost')} placeholder="비용대를 선택해 주세요"
                  options={['3천만원 이하','3천~5천만원','5천만원~1억','1억 이상']} />
              </Field>

              <Field label="브랜드 강점" hint="우리 브랜드만의 강점이나 차별점을 자유롭게 적어주세요 (예: 독자 소스 개발, 본사 물류 지원 등)">
                <textarea value={form.strength} onChange={set('strength')} rows={3} placeholder="브랜드만의 강점을 적어주세요" className={inputCls + ' resize-none'} />
              </Field>

              <Field label="현재 사용 중인 마케팅 채널" hint="해당하는 채널을 모두 선택해 주세요">
                <CheckGroup values={form.channels} onToggle={toggleChannel}
                  options={['인스타그램','카카오 광고','네이버 광고','유튜브','오프라인','없음']} />
              </Field>

              <Field label="랜딩페이지 제작 희망 시기">
                <RadioGroup name="timing" value={form.timing} onChange={set('timing')}
                  options={['최대한 빨리','1개월 이내','2~3개월 이내','아직 미정']} />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="담당자 연락처" required hint="연락 가능한 전화번호">
                  <TextInput type="tel" inputMode="tel" value={form.phone} onChange={set('phone')} placeholder="010-0000-0000" className=" no-spin" />
                </Field>
                <Field label="담당자 이름" required>
                  <TextInput value={form.name} onChange={set('name')} placeholder="홍길동" />
                </Field>
              </div>
            </form>

            {/* footer submit */}
            <div className="border-t border-mint-soft px-6 sm:px-8 py-4 bg-white">
              <button onClick={onSubmit} disabled={!canSubmit}
                className={`w-full font-extrabold text-lg py-4 rounded-2xl transition-all active:scale-[.99] ${canSubmit ? 'bg-mint hover:bg-mint-deep text-white shadow-lg' : 'bg-mint-soft text-white/80 cursor-not-allowed'}`}>
                신청 완료하기
              </button>
              {!canSubmit && <p className="text-center text-[13px] text-ink/40 mt-2">브랜드명 · 연락처 · 이름은 필수 항목입니다</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SuccessView({ onClose }) {
  return (
    <div className="px-8 py-16 text-center">
      <div className="mx-auto w-24 h-24 rounded-full bg-mint-light flex items-center justify-center text-5xl mb-6 animate-[sheetIn_.5s_ease]">🎉</div>
      <h3 className="font-display text-[1.8rem] text-ink">신청이 완료되었습니다!</h3>
      <p className="mt-3 text-ink/60 font-medium text-lg">1~2 영업일 내 연락드릴게요 🎉</p>
      <div className="mt-6 inline-flex items-center gap-2 bg-mint-light text-mint-deep font-bold text-sm px-5 py-2.5 rounded-full">
        <span>⚡</span> 48시간 이내 제작 착수가 시작됩니다
      </div>
      <button onClick={onClose} className="mt-9 block mx-auto bg-mint hover:bg-mint-deep text-white font-extrabold text-lg px-10 py-4 rounded-2xl shadow-lg transition-colors active:scale-95">
        확인
      </button>
    </div>
  );
}

// ---- floating bottom CTA ----
function FloatingCTA({ onOpen, hidden }) {
  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 pointer-events-none transition-all duration-300 ${hidden ? 'translate-y-28 opacity-0' : 'translate-y-0 opacity-100'}`}>
      <div className="max-w-2xl mx-auto px-4 pb-4 sm:pb-5">
        <button onClick={onOpen}
          className="cta-pulse pointer-events-auto w-full bg-punch hover:bg-punch-deep text-white font-extrabold text-lg sm:text-xl py-4 sm:py-[18px] rounded-full flex items-center justify-center gap-2.5 transition-colors active:scale-[.99]">
          <span className="text-2xl">🍽️</span> 랜딩페이지 제작 신청하기
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { ApplyModal, FloatingCTA });
