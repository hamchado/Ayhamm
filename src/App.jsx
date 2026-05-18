import { useState } from 'react'
import './App.css'

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
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
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
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
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
      'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=600&q=80',
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80',
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
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
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
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
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
      'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&q=80',
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&q=80',
    ],
    registrationMethod: 'حجز التذاكر عبر التطبيق أو عند الباب (محدود)',
    registrationLink: 'https://example.com/register',
    capacity: 150,
    registered: 148,
  },
]

const categoryColors = {
  ثقافي: '#6c63ff',
  تقني: '#00b894',
  رياضي: '#e17055',
  أعمال: '#0984e3',
  فني: '#fd79a8',
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ar-SY', { year: 'numeric', month: 'long', day: 'numeric' })
}

function RegistrationBar({ capacity, registered }) {
  const pct = Math.min(100, Math.round((registered / capacity) * 100))
  const full = pct >= 100
  return (
    <div className="reg-bar-wrap">
      <div className="reg-bar-header">
        <span className="reg-bar-label">اكتمال التسجيل</span>
        <span className={`reg-bar-pct ${full ? 'full' : ''}`}>
          {full ? '🔴 مكتمل' : `${pct}%`}
        </span>
      </div>
      <div className="reg-bar-track">
        <div
          className="reg-bar-fill"
          style={{ width: `${pct}%`, background: full ? '#e17055' : '#6c63ff' }}
        />
      </div>
      <div className="reg-bar-count">
        {registered} / {capacity} مقعد
      </div>
    </div>
  )
}

function EventModal({ event, onClose }) {
  const [imgIdx, setImgIdx] = useState(0)
  if (!event) return null
  const catColor = categoryColors[event.category] || '#6c63ff'
  const isFull = event.registered >= event.capacity

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()} dir="rtl">
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-gallery">
          <img
            src={event.images[imgIdx]}
            alt={event.title}
            className="modal-main-img"
          />
          {event.images.length > 1 && (
            <div className="modal-thumbs">
              {event.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className={`modal-thumb ${i === imgIdx ? 'active' : ''}`}
                  onClick={() => setImgIdx(i)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="modal-content">
          <span className="modal-category" style={{ background: catColor }}>
            {event.category}
          </span>
          <h2 className="modal-title">{event.title}</h2>

          <div className="modal-meta">
            <div className="meta-item">
              <span className="meta-icon">📅</span>
              <span>{formatDate(event.date)} — {event.time}</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">📍</span>
              <span>{event.location}</span>
            </div>
          </div>

          <p className="modal-desc">{event.description}</p>

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

function EventCard({ event, onClick }) {
  const catColor = categoryColors[event.category] || '#6c63ff'
  const pct = Math.min(100, Math.round((event.registered / event.capacity) * 100))
  const full = pct >= 100

  return (
    <div className="event-card">
      <div className="card-img-wrap">
        <img src={event.images[0]} alt={event.title} className="card-img" />
        <span className="card-category" style={{ background: catColor }}>
          {event.category}
        </span>
        {full && <span className="card-full-badge">مكتمل</span>}
      </div>
      <div className="card-body">
        <h3 className="card-title">{event.title}</h3>
        <div className="card-meta">
          <span>📅 {formatDate(event.date)}</span>
          <span>📍 {event.location}</span>
        </div>
        <div className="card-mini-bar">
          <div
            className="card-mini-fill"
            style={{ width: `${pct}%`, background: full ? '#e17055' : catColor }}
          />
        </div>
        <button className="card-btn" onClick={onClick} style={{ borderColor: catColor, color: catColor }}>
          اطّلع على التفاصيل
        </button>
      </div>
    </div>
  )
}

function App() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('الكل')

  const categories = ['الكل', ...Array.from(new Set(events.map(e => e.category)))]
  const filtered = filter === 'الكل' ? events : events.filter(e => e.category === filter)

  return (
    <div className="app" dir="rtl">
      <header className="site-header">
        <div className="header-inner">
          <h1 className="site-title">🗓️ الفعاليات الحالية</h1>
          <p className="site-subtitle">اكتشف أبرز الفعاليات والأنشطة القادمة</p>
        </div>
      </header>

      <div className="filter-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <main className="events-grid">
        {filtered.map(event => (
          <EventCard key={event.id} event={event} onClick={() => setSelected(event)} />
        ))}
      </main>

      <EventModal event={selected} onClose={() => setSelected(null)} />

      <footer className="site-footer">
        <p>© 2026 — منصة الفعاليات</p>
      </footer>
    </div>
  )
}

export default App
