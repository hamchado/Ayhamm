import { useState, useEffect } from 'react'
import './App.css'

// ─── Brand colors ─────────────────────────────────────────
const PRIMARY = '#4455cb'
const SECONDARY = '#0f4e40'

// ─── Events data ──────────────────────────────────────────
const events = [
  {
    id: 1,
    title: 'مهرجان الفنون والثقافة',
    category: 'ثقافي',
    date: '2026-06-10',
    time: '17:00',
    location: 'المسرح الوطني، دمشق',
    description:
      'مهرجان سنوي يجمع نخبة من الفنانين والمبدعين لتقديم أعمال فنية متنوعة تشمل الموسيقى والرسم والمسرح. تستمر الفعالية على مدى ثلاثة أيام مليئة بالفن والإبداع.',
    images: [
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900&q=85',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&q=85',
    ],
    registrationMethod: 'التسجيل عبر الموقع الرسمي أو الاتصال على 011-123-4567',
    registrationLink: 'https://example.com/register',
    capacity: 500,
    registered: 480,
  },
  {
    id: 2,
    title: 'ورشة تطوير التطبيقات',
    category: 'تقني',
    date: '2026-05-25',
    time: '09:00',
    location: 'مركز الابتكار التقني، حلب',
    description:
      'ورشة عمل تفاعلية مدتها يومان تتناول أحدث تقنيات تطوير تطبيقات الهاتف المحمول باستخدام React Native وFlutter. مناسبة للمطورين من جميع المستويات.',
    images: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=85',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=85',
    ],
    registrationMethod: 'إرسال طلب التسجيل على البريد الإلكتروني: tech@workshop.sy',
    registrationLink: 'https://example.com/register',
    capacity: 50,
    registered: 50,
  },
  {
    id: 3,
    title: 'بطولة كرة القدم الشبابية',
    category: 'رياضي',
    date: '2026-06-01',
    time: '15:00',
    location: 'الملعب البلدي، اللاذقية',
    description:
      'بطولة كروية تجمع أفضل الفرق الشبابية من مختلف المحافظات. تقام البطولة على مدى أسبوعين بمشاركة 16 فريقاً وجوائز قيّمة للفائزين.',
    images: [
      'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=900&q=85',
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=900&q=85',
    ],
    registrationMethod: 'التسجيل عبر المركز الرياضي أو زيارة المقر الرئيسي',
    registrationLink: 'https://example.com/register',
    capacity: 200,
    registered: 120,
  },
  {
    id: 4,
    title: 'معرض الكتاب الدولي',
    category: 'ثقافي',
    date: '2026-07-05',
    time: '10:00',
    location: 'مركز المعارض، دمشق',
    description:
      'معرض الكتاب السنوي الدولي الذي يستقطب مئات دور النشر العربية والعالمية. فرصة للقاء المؤلفين وحضور جلسات التوقيع والندوات الفكرية.',
    images: [
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=85',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=85',
    ],
    registrationMethod: 'الدخول مجاني للجمهور. التسجيل للندوات عبر الموقع',
    registrationLink: 'https://example.com/register',
    capacity: 2000,
    registered: 850,
  },
  {
    id: 5,
    title: 'ملتقى ريادة الأعمال',
    category: 'أعمال',
    date: '2026-06-18',
    time: '11:00',
    location: 'فندق الشيراتون، دمشق',
    description:
      'ملتقى سنوي يجمع رواد الأعمال والمستثمرين والخبراء لتبادل الأفكار ومناقشة فرص الاستثمار. يتضمن ورش عمل وعروض تقديمية ونشاط تواصل مميز.',
    images: [
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900&q=85',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=85',
    ],
    registrationMethod: 'التسجيل المبكر متاح بسعر مخفض عبر الرابط الرسمي',
    registrationLink: 'https://example.com/register',
    capacity: 300,
    registered: 270,
  },
  {
    id: 6,
    title: 'حفل موسيقى الجاز',
    category: 'فني',
    date: '2026-05-30',
    time: '20:00',
    location: 'دار الأوبرا، دمشق',
    description:
      'أمسية موسيقية راقية تقدم فيها فرقة الجاز الوطنية أجمل المقطوعات الكلاسيكية والمعاصرة. تجربة سمعية لا تُنسى في قلب العاصمة.',
    images: [
      'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=900&q=85',
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=900&q=85',
    ],
    registrationMethod: 'حجز التذاكر عبر التطبيق أو عند الباب (محدود)',
    registrationLink: 'https://example.com/register',
    capacity: 150,
    registered: 148,
  },
]

// ─── Circulars data ───────────────────────────────────────
const circulars = [
  {
    id: 1,
    title: 'تعميم رقم (1): تحديث إجراءات التسجيل في الفعاليات',
    date: '2026-05-01',
    summary: 'تحديث هام لإجراءات التسجيل وآليات المشاركة في جميع الفعاليات القادمة.',
    body: `يُعلم جميع المعنيين أنه تم تحديث إجراءات التسجيل وفق الآتي:

١. يجب تعبئة نموذج التسجيل الإلكتروني قبل ٧٢ ساعة من موعد الفعالية.
٢. يشترط تقديم وثيقة هوية سارية المفعول عند الحضور.
٣. لا يُسمح بالتحويل إلى شخص آخر بعد اكتمال التسجيل.
٤. في حال الإلغاء قبل ٤٨ ساعة يُسترد كامل المبلغ.

للاستفسار يرجى التواصل مع مكتب الخدمات على الرقم 011-456-7890.`,
    images: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=85',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=85',
    ],
  },
  {
    id: 2,
    title: 'تعميم رقم (2): الجدول الزمني للفعاليات الصيفية 2026',
    date: '2026-05-10',
    summary: 'الإعلان عن الجدول الزمني الكامل للفعاليات الصيفية المقررة للعام 2026.',
    body: `يسعدنا الإعلان عن الجدول الزمني الكامل للفعاليات الصيفية:

• يونيو 2026: مهرجان الفنون والثقافة — المسرح الوطني
• يونيو 2026: بطولة كرة القدم الشبابية — الملعب البلدي
• يونيو 2026: ملتقى ريادة الأعمال — فندق الشيراتون
• يوليو 2026: معرض الكتاب الدولي — مركز المعارض

تُفتح بوابة التسجيل في الأول من يونيو لجميع الفعاليات.`,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=85',
    ],
  },
  {
    id: 3,
    title: 'تعميم رقم (3): منح وجوائز للمتميزين في الفعاليات',
    date: '2026-05-15',
    summary: 'إعلان عن برنامج منح وجوائز مالية للمتميزين في الفعاليات الثقافية والرياضية.',
    body: `ضمن حرصنا على تحفيز المشاركة والتميز، نُعلن عن برنامج الجوائز:

🏆 الجائزة الأولى: 500,000 ل.س لكل فئة
🥈 الجائزة الثانية: 300,000 ل.س لكل فئة
🥉 الجائزة الثالثة: 150,000 ل.س لكل فئة

الفئات المشمولة: الفنون البصرية، الموسيقى، الرياضة، ريادة الأعمال.

يُشكّل لجنة تحكيم متخصصة لكل فئة. نتائج التحكيم نهائية وغير قابلة للطعن.`,
    images: [
      'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=900&q=85',
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=85',
    ],
  },
  {
    id: 4,
    title: 'تعميم رقم (4): بروتوكول الصحة والسلامة في الفعاليات',
    date: '2026-05-18',
    summary: 'تحديث بروتوكولات الصحة والسلامة الواجب اتباعها في جميع الفعاليات.',
    body: `انطلاقاً من اهتمامنا بسلامة المشاركين، تُطبَّق البروتوكولات التالية:

✅ يُشترط ارتداء الكمامة في الأماكن المغلقة
✅ الحفاظ على مسافة لا تقل عن متر واحد
✅ توفر محطات تعقيم على مداخل كل مرفق
✅ مراقبة الحضور عبر بطاقة التسجيل الإلكتروني

في حال ظهور أي أعراض مرضية يُرجى الامتناع عن الحضور والتواصل مع الجهة المنظمة.`,
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=900&q=85',
    ],
  },
]

// ─── Ticker items ─────────────────────────────────────────
const tickerItems = [
  '🎉 تسجيل مهرجان الفنون والثقافة وصل لـ 96% — سجّل قبل نفاد الأماكن',
  '📢 تعميم جديد: بروتوكول الصحة والسلامة — اقرأ التفاصيل',
  '🏆 بطولة كرة القدم الشبابية: تسجيل الفرق مفتوح حتى 25 مايو',
  '📚 معرض الكتاب الدولي: دخول مجاني للجمهور — يوليو 2026',
  '💼 ملتقى ريادة الأعمال: تسجيل مبكر بسعر مخفض',
  '🎵 حفل موسيقى الجاز: آخر التذاكر المتبقية — احجز مكانك الآن',
]

// ─── Category colors ──────────────────────────────────────
const categoryColors = {
  ثقافي: PRIMARY,
  تقني: '#00b894',
  رياضي: '#e17055',
  أعمال: SECONDARY,
  فني: '#fd79a8',
}

// ─── Utilities ────────────────────────────────────────────
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ar-SY', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function useHash() {
  const [hash, setHash] = useState(window.location.hash || '#home')
  useEffect(() => {
    const handler = () => setHash(window.location.hash || '#home')
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])
  return hash
}

// ─── Ticker ───────────────────────────────────────────────
function Ticker({ items }) {
  return (
    <div className="ticker-wrap">
      <span className="ticker-label">أخبار</span>
      <div className="ticker-track">
        <div className="ticker-content">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="ticker-item">{item}&nbsp;&nbsp;•&nbsp;&nbsp;</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── RegistrationBar ──────────────────────────────────────
function RegistrationBar({ capacity, registered }) {
  const pct = Math.min(100, Math.round((registered / capacity) * 100))
  const full = pct >= 100
  return (
    <div className="reg-bar-wrap">
      <div className="reg-bar-header">
        <span className="reg-bar-label">اكتمال التسجيل</span>
        <span className={`reg-bar-pct${full ? ' full' : ''}`}>
          {full ? '🔴 مكتمل' : `${pct}%`}
        </span>
      </div>
      <div className="reg-bar-track">
        <div className="reg-bar-fill" style={{ width: `${pct}%`, background: full ? '#e17055' : PRIMARY }} />
      </div>
      <div className="reg-bar-count">{registered} / {capacity} مقعد</div>
    </div>
  )
}

// ─── EventModal ───────────────────────────────────────────
function EventModal({ event, onClose }) {
  const [imgIdx, setImgIdx] = useState(0)
  const [copied, setCopied] = useState(false)
  if (!event) return null
  const catColor = categoryColors[event.category] || PRIMARY
  const isFull = event.registered >= event.capacity

  function handleShare() {
    if (!navigator.clipboard) {
      setCopied('fail')
      setTimeout(() => setCopied(false), 2500)
      return
    }
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied('ok')
      setTimeout(() => setCopied(false), 2500)
    }).catch(() => {
      setCopied('fail')
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()} dir="rtl">
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-gallery">
          <img src={event.images[imgIdx]} alt={event.title} className="modal-main-img" />
          {event.images.length > 1 && (
            <div className="modal-thumbs">
              {event.images.map((img, i) => (
                <img
                  key={i} src={img} alt=""
                  className={`modal-thumb${i === imgIdx ? ' active' : ''}`}
                  onClick={() => setImgIdx(i)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="modal-content">
          <div className="modal-header-row">
            <span className="modal-category" style={{ background: catColor }}>{event.category}</span>
            <button className="share-btn" onClick={handleShare}>
              {copied === 'ok' ? '✅ تم نسخ الرابط' : copied === 'fail' ? '⚠️ تعذّر النسخ' : '🔗 مشاركة'}
            </button>
          </div>
          <h2 className="modal-title">{event.title}</h2>
          <p className="modal-desc">{event.description}</p>

          <table className="detail-table">
            <tbody>
              <tr><th>التاريخ</th><td>{formatDate(event.date)}</td></tr>
              <tr><th>الوقت</th><td>{event.time}</td></tr>
              <tr><th>المكان</th><td>{event.location}</td></tr>
              <tr><th>الطاقة الاستيعابية</th><td>{event.capacity} مقعد</td></tr>
              <tr><th>المسجلون</th><td>{event.registered}</td></tr>
              <tr>
                <th>الحالة</th>
                <td>
                  <span className={isFull ? 'status-full' : 'status-open'}>
                    {isFull ? '🔴 مكتمل' : '🟢 مفتوح للتسجيل'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <RegistrationBar capacity={event.capacity} registered={event.registered} />

          <div className="modal-reg-method">
            <h4>طريقة التسجيل</h4>
            <p>{event.registrationMethod}</p>
            <a
              href={event.registrationLink}
              className="reg-btn"
              target="_blank"
              rel="noreferrer"
              style={{ background: isFull ? '#b2bec3' : catColor, pointerEvents: isFull ? 'none' : 'auto' }}
            >
              {isFull ? 'التسجيل مكتمل' : 'سجّل الآن'}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── CircularModal ────────────────────────────────────────
function CircularModal({ circular, onClose }) {
  const [imgIdx, setImgIdx] = useState(0)
  const [copied, setCopied] = useState(false)
  if (!circular) return null

  function handleShare() {
    if (!navigator.clipboard) {
      setCopied('fail')
      setTimeout(() => setCopied(false), 2500)
      return
    }
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied('ok')
      setTimeout(() => setCopied(false), 2500)
    }).catch(() => {
      setCopied('fail')
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()} dir="rtl">
        <button className="modal-close" onClick={onClose}>✕</button>

        {circular.images?.length > 0 && (
          <div className="modal-gallery">
            <img src={circular.images[imgIdx]} alt={circular.title} className="modal-main-img" />
            {circular.images.length > 1 && (
              <div className="modal-thumbs">
                {circular.images.map((img, i) => (
                  <img
                    key={i} src={img} alt=""
                    className={`modal-thumb${i === imgIdx ? ' active' : ''}`}
                    onClick={() => setImgIdx(i)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="modal-content">
          <div className="modal-header-row">
            <span className="modal-category" style={{ background: SECONDARY }}>تعميم رسمي</span>
            <button className="share-btn" onClick={handleShare}>
              {copied === 'ok' ? '✅ تم نسخ الرابط' : copied === 'fail' ? '⚠️ تعذّر النسخ' : '🔗 مشاركة'}
            </button>
          </div>
          <h2 className="modal-title">{circular.title}</h2>
          <div className="meta-item">
            <span className="meta-icon">📅</span>
            <span>{formatDate(circular.date)}</span>
          </div>
          <div className="circ-body">{circular.body}</div>
        </div>
      </div>
    </div>
  )
}

// ─── EventCard ────────────────────────────────────────────
function EventCard({ event, onOpen }) {
  const catColor = categoryColors[event.category] || PRIMARY
  const pct = Math.min(100, Math.round((event.registered / event.capacity) * 100))
  const full = pct >= 100

  return (
    <div className="event-card">
      <div className="card-img-wrap">
        <img src={event.images[0]} alt={event.title} className="card-img" />
        <span className="card-category" style={{ background: catColor }}>{event.category}</span>
        {full && <span className="card-full-badge">مكتمل</span>}
      </div>
      <div className="card-body">
        <h3 className="card-title">{event.title}</h3>
        <div className="card-meta">
          <span>📅 {formatDate(event.date)}</span>
          <span>📍 {event.location}</span>
        </div>
        <div className="card-mini-bar">
          <div className="card-mini-fill" style={{ width: `${pct}%`, background: full ? '#e17055' : catColor }} />
        </div>
        <button className="card-btn" onClick={onOpen} style={{ borderColor: catColor, color: catColor }}>
          اطّلع على التفاصيل
        </button>
      </div>
    </div>
  )
}

// ─── CircularCard ─────────────────────────────────────────
function CircularCard({ circular, onOpen }) {
  return (
    <div className="circ-card" onClick={onOpen} role="button" tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onOpen()}>
      <div className="circ-card-icon">📋</div>
      <div className="circ-card-body">
        <h3 className="circ-card-title">{circular.title}</h3>
        <p className="circ-card-date">📅 {formatDate(circular.date)}</p>
        <p className="circ-card-summary">{circular.summary}</p>
      </div>
      <span className="circ-card-arrow">‹</span>
    </div>
  )
}

// ─── HomePage ─────────────────────────────────────────────
function HomePage() {
  return (
    <div className="home-page">
      <div className="home-hero">
        <h2 className="hero-title">مرحباً بكم في منصة الفعاليات</h2>
        <p className="hero-subtitle">تابع آخر الفعاليات والتعميمات في مكان واحد</p>
        <div className="hero-actions">
          <a href="#events" className="hero-btn primary-btn">🗓️ الفعاليات الحالية</a>
          <a href="#circulars" className="hero-btn secondary-btn">📋 التعميمات</a>
        </div>
      </div>

      <div className="home-stats">
        <div className="stat-card" style={{ borderTopColor: PRIMARY }}>
          <span className="stat-num" style={{ color: PRIMARY }}>{events.length}</span>
          <span className="stat-label">إجمالي الفعاليات</span>
        </div>
        <div className="stat-card" style={{ borderTopColor: '#00b894' }}>
          <span className="stat-num" style={{ color: '#00b894' }}>
            {events.filter(e => e.registered < e.capacity).length}
          </span>
          <span className="stat-label">فعالية مفتوحة</span>
        </div>
        <div className="stat-card" style={{ borderTopColor: SECONDARY }}>
          <span className="stat-num" style={{ color: SECONDARY }}>{circulars.length}</span>
          <span className="stat-label">تعميم رسمي</span>
        </div>
        <div className="stat-card" style={{ borderTopColor: '#e17055' }}>
          <span className="stat-num" style={{ color: '#e17055' }}>
            {events.filter(e => e.registered >= e.capacity).length}
          </span>
          <span className="stat-label">فعالية مكتملة</span>
        </div>
      </div>

      <div className="home-featured">
        <h3 className="section-title">أبرز الفعاليات القادمة</h3>
        <div className="featured-grid">
          {events.slice(0, 3).map(event => {
            const catColor = categoryColors[event.category] || PRIMARY
            const pct = Math.min(100, Math.round((event.registered / event.capacity) * 100))
            return (
              <a key={event.id} href={`#events/${event.id}`} className="featured-card">
                <img src={event.images[0]} alt={event.title} />
                <div className="featured-overlay">
                  <span className="featured-cat" style={{ background: catColor }}>{event.category}</span>
                  <h4>{event.title}</h4>
                  <p>📅 {formatDate(event.date)}</p>
                  <div className="featured-bar">
                    <div style={{ width: `${pct}%`, background: pct >= 100 ? '#e17055' : '#fff' }} />
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>

      <div className="home-latest-circulars">
        <h3 className="section-title">آخر التعميمات</h3>
        <div className="latest-circ-list">
          {circulars.slice(0, 3).map(c => (
            <a key={c.id} href={`#circulars/${c.id}`} className="latest-circ-item">
              <span className="latest-circ-icon">📋</span>
              <div>
                <div className="latest-circ-title">{c.title}</div>
                <div className="latest-circ-date">{formatDate(c.date)}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── EventsPage ───────────────────────────────────────────
function EventsPage({ openEventId }) {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('الكل')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (openEventId) {
      setSelected(events.find(e => e.id === openEventId) || null)
    } else {
      setSelected(null)
    }
  }, [openEventId])

  const categories = ['الكل', ...Array.from(new Set(events.map(e => e.category)))]
  const filtered = filter === 'الكل' ? events : events.filter(e => e.category === filter)

  return (
    <div className="section-page">
      <div className="section-banner" style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, #667eea 100%)` }}>
        <h2>🗓️ الفعاليات الحالية</h2>
        <p>اكتشف أبرز الفعاليات والأنشطة القادمة</p>
      </div>
      <div className="filter-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn${filter === cat ? ' active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <main className="events-grid">
        {filtered.map(event => (
          <EventCard
            key={event.id}
            event={event}
            onOpen={() => { window.location.hash = `events/${event.id}` }}
          />
        ))}
      </main>
      {selected && (
        <EventModal event={selected} onClose={() => { window.location.hash = 'events' }} />
      )}
    </div>
  )
}

// ─── CircularsPage ────────────────────────────────────────
function CircularsPage({ openCircularId }) {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (openCircularId) {
      setSelected(circulars.find(c => c.id === openCircularId) || null)
    } else {
      setSelected(null)
    }
  }, [openCircularId])

  return (
    <div className="section-page">
      <div className="section-banner" style={{ background: `linear-gradient(135deg, ${SECONDARY} 0%, #1a7a5e 100%)` }}>
        <h2>📋 التعميمات</h2>
        <p>اطّلع على آخر التعميمات والإعلانات الرسمية</p>
      </div>
      <main className="circulars-list">
        {circulars.map(c => (
          <CircularCard
            key={c.id}
            circular={c}
            onOpen={() => { window.location.hash = `circulars/${c.id}` }}
          />
        ))}
      </main>
      {selected && (
        <CircularModal circular={selected} onClose={() => { window.location.hash = 'circulars' }} />
      )}
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────
function App() {
  const hash = useHash()
  const clean = hash.replace(/^#/, '') || 'home'
  const [section, rawId] = clean.split('/')
  const itemId = rawId ? parseInt(rawId, 10) : null

  return (
    <div className="app" dir="rtl">
      <header className="site-header">
        <div className="header-inner">
          <a href="#home" className="site-logo">
            <span className="logo-icon">🏛️</span>
            <span className="logo-text">منصة الفعاليات</span>
          </a>
          <nav className="main-nav">
            <a href="#home" className={`nav-link${section === 'home' || section === '' ? ' active' : ''}`}>
              الرئيسية
            </a>
            <a href="#events" className={`nav-link${section === 'events' ? ' active' : ''}`}>
              الفعاليات
            </a>
            <a href="#circulars" className={`nav-link${section === 'circulars' ? ' active' : ''}`}>
              التعميمات
            </a>
          </nav>
        </div>
      </header>

      <Ticker items={tickerItems} />

      <div className="page-content">
        {(section === 'home' || section === '') && <HomePage />}
        {section === 'events' && <EventsPage openEventId={itemId} />}
        {section === 'circulars' && <CircularsPage openCircularId={itemId} />}
      </div>

      <footer className="site-footer">
        <p>© 2026 — منصة الفعاليات | جميع الحقوق محفوظة</p>
      </footer>
    </div>
  )
}

export default App
