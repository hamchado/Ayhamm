import { useState, useEffect, useRef } from 'react'
import './App.css'

// ─── Brand colors ─────────────────────────────────────────
const PRIMARY = '#4455cb'
const SECONDARY = '#0f4e40'

// ─── Today for status calculation ─────────────────────────
const _today = new Date(); _today.setHours(0, 0, 0, 0)
const TODAY = _today

function getEventStatus(event) {
  const start = new Date(event.date); start.setHours(0, 0, 0, 0)
  const end = new Date(event.endDate || event.date); end.setHours(23, 59, 59, 0)
  if (TODAY > end) return 'ended'
  if (TODAY >= start) return 'ongoing'
  return 'upcoming'
}

const statusMeta = {
  upcoming: { label: 'قادمة',  color: PRIMARY },
  ongoing:  { label: 'جارية',  color: '#00b894' },
  ended:    { label: 'منتهية', color: '#636e72' },
}

// ─── Events data ──────────────────────────────────────────
const events = [
  {
    id: 1,
    title: 'المؤتمر العلمي لأطباء الأسنان',
    category: 'علمي',
    date: '2026-06-10',
    endDate: '2026-06-12',
    time: '09:00',
    location: 'فندق قصر الضيافة، اللاذقية',
    description: 'المؤتمر العلمي السنوي الذي يجمع أطباء الأسنان من مختلف المحافظات لتبادل الخبرات وعرض أحدث الأبحاث في مجال طب الأسنان والتقنيات الحديثة.',
    images: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=85',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=85',
    ],
    registrationMethod: 'التسجيل عبر الموقع الرسمي أو الاتصال على 041-123-4567',
    registrationLink: 'https://example.com/register',
    capacity: 300,
    registered: 285,
  },
  {
    id: 2,
    title: 'ورشة زراعة الأسنان المتقدمة',
    category: 'تدريب',
    date: '2026-05-25',
    endDate: '2026-05-26',
    time: '09:00',
    location: 'مركز التدريب الطبي، اللاذقية',
    description: 'ورشة عملية متقدمة في أحدث تقنيات زراعة الأسنان باستخدام تقنية الليزر والتصوير ثلاثي الأبعاد. مناسبة لأطباء الأسنان الراغبين في تطوير مهاراتهم.',
    images: [
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=900&q=85',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=900&q=85',
    ],
    registrationMethod: 'إرسال طلب التسجيل على البريد: training@dental-lat.sy',
    registrationLink: 'https://example.com/register',
    capacity: 20,
    registered: 20,
  },
  {
    id: 3,
    title: 'حملة الكشف المجاني على الأسنان',
    category: 'طبي',
    date: '2026-06-01',
    endDate: '2026-06-07',
    time: '10:00',
    location: 'مراكز صحية متعددة، اللاذقية',
    description: 'حملة للكشف المجاني على أسنان المواطنين وتوعيتهم بأساليب الوقاية. تشمل فحوصات الأسنان وعلاج التسوس البسيط دون رسوم.',
    images: [
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&q=85',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=85',
    ],
    registrationMethod: 'الدخول مجاني دون الحاجة للتسجيل المسبق',
    registrationLink: 'https://example.com/register',
    capacity: 2000,
    registered: 850,
  },
  {
    id: 4,
    title: 'الجمعية العمومية السنوية',
    category: 'إداري',
    date: '2026-07-05',
    endDate: '2026-07-05',
    time: '18:00',
    location: 'مقر النقابة، اللاذقية',
    description: 'الاجتماع السنوي للجمعية العمومية لمناقشة مستجدات العام ومراجعة الأنظمة الداخلية واتخاذ القرارات المتعلقة بشؤون النقابة.',
    images: [
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&q=85',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=85',
    ],
    registrationMethod: 'الحضور إلزامي لجميع الأعضاء المسجلين في النقابة',
    registrationLink: 'https://example.com/register',
    capacity: 400,
    registered: 180,
  },
  {
    id: 5,
    title: 'دورة إدارة عيادات الأسنان',
    category: 'تدريب',
    date: '2026-06-18',
    endDate: '2026-06-20',
    time: '17:00',
    location: 'مركز الأعمال، اللاذقية',
    description: 'دورة تدريبية متخصصة في إدارة عيادات الأسنان تشمل التسويق الرقمي والمحاسبة وإدارة الموارد البشرية وتطوير بيئة العمل.',
    images: [
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900&q=85',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=85',
    ],
    registrationMethod: 'التسجيل المبكر متاح بسعر مخفض عبر الرابط الرسمي',
    registrationLink: 'https://example.com/register',
    capacity: 50,
    registered: 38,
  },
  {
    id: 6,
    title: 'ليلة التكريم السنوية',
    category: 'اجتماعي',
    date: '2026-05-30',
    endDate: '2026-05-30',
    time: '19:00',
    location: 'قاعة الشهباء، اللاذقية',
    description: 'حفل تكريم سنوي للأطباء المتميزين والمتقاعدين الذين أدوا خدمات جليلة في مجال طب الأسنان على مستوى المحافظة.',
    images: [
      'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=900&q=85',
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=900&q=85',
    ],
    registrationMethod: 'الدعوات توزع عبر مقر النقابة. التسجيل إلزامي للحضور',
    registrationLink: 'https://example.com/register',
    capacity: 200,
    registered: 198,
  },
  {
    id: 7,
    title: 'ندوة صحة الفم والأسنان للأطفال',
    category: 'علمي',
    date: '2026-04-15',
    endDate: '2026-04-15',
    time: '10:00',
    location: 'مشفى الأطفال، اللاذقية',
    description: 'ندوة علمية تناولت أهمية العناية بأسنان الأطفال منذ الصغر وأساليب الوقاية من التسوس والتشوهات السنية.',
    images: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=900&q=85',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=85',
    ],
    registrationMethod: 'التسجيل مغلق — الفعالية انتهت',
    registrationLink: '#',
    capacity: 100,
    registered: 96,
  },
  {
    id: 8,
    title: 'ورشة طب الأسنان التجميلي',
    category: 'تدريب',
    date: '2026-05-05',
    endDate: '2026-05-06',
    time: '09:00',
    location: 'مركز التدريب الطبي، اللاذقية',
    description: 'ورشة عملية متخصصة في أحدث تقنيات تبييض الأسنان والفينير والتجميل الابتسامي باستخدام المواد والأجهزة الحديثة.',
    images: [
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=900&q=85',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=85',
    ],
    registrationMethod: 'التسجيل مغلق — الفعالية انتهت',
    registrationLink: '#',
    capacity: 20,
    registered: 20,
  },
  {
    id: 9,
    title: 'أسبوع التوعية بصحة الفم',
    category: 'طبي',
    date: '2026-05-14',
    endDate: '2026-05-22',
    time: '09:00',
    location: 'مراكز صحية متعددة، اللاذقية',
    description: 'أسبوع توعوي شامل يتضمن فحوصات مجانية وتوزيع أدوات العناية بالأسنان وندوات توعوية في مراكز صحية مختلفة.',
    images: [
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&q=85',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=900&q=85',
    ],
    registrationMethod: 'الحضور مجاني بدون تسجيل مسبق',
    registrationLink: 'https://example.com/register',
    capacity: 5000,
    registered: 2300,
  },
]

// ─── Circulars data ───────────────────────────────────────
const circulars = [
  {
    id: 1,
    title: 'تعميم رقم (1): تحديث إجراءات التسجيل في الفعاليات',
    date: '2026-05-01',
    summary: 'تحديث هام لإجراءات التسجيل وآليات المشاركة في جميع الفعاليات القادمة.',
    body: `يُعلم جميع الأعضاء أنه تم تحديث إجراءات التسجيل وفق الآتي:

١. يجب تعبئة نموذج التسجيل الإلكتروني قبل ٧٢ ساعة من موعد الفعالية.
٢. يشترط تقديم وثيقة هوية سارية المفعول عند الحضور.
٣. لا يُسمح بالتحويل إلى شخص آخر بعد اكتمال التسجيل.
٤. في حال الإلغاء قبل ٤٨ ساعة يُسترد كامل المبلغ.

للاستفسار يرجى التواصل مع مكتب الخدمات على الرقم 041-456-7890.`,
    images: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=85',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=85',
    ],
  },
  {
    id: 2,
    title: 'تعميم رقم (2): الجدول الزمني للفعاليات الصيفية 2026',
    date: '2026-05-10',
    summary: 'الإعلان عن الجدول الزمني الكامل للفعاليات المقررة للعام 2026.',
    body: `يسعدنا الإعلان عن الجدول الزمني الكامل للفعاليات الصيفية:

• يونيو 2026: المؤتمر العلمي لأطباء الأسنان — فندق قصر الضيافة
• يونيو 2026: حملة الكشف المجاني — مراكز صحية
• يونيو 2026: دورة إدارة عيادات الأسنان — مركز الأعمال
• يوليو 2026: الجمعية العمومية السنوية — مقر النقابة

تُفتح بوابة التسجيل في الأول من يونيو لجميع الفعاليات.`,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&q=85',
    ],
  },
  {
    id: 3,
    title: 'تعميم رقم (3): تجديد بطاقات عضوية النقابة',
    date: '2026-05-15',
    summary: 'إعلان هام بشأن تجديد بطاقات عضوية نقابة أطباء الأسنان للعام 2026.',
    body: `تُعلم نقابة أطباء الأسنان فرع اللاذقية جميع الأعضاء بما يلي:

📋 متطلبات تجديد العضوية:
١. صورة شخصية حديثة (٤×٦ سم)
٢. نسخة عن الشهادة الجامعية مصدقة
٣. شهادة براءة ذمة من المالية
٤. رسوم التجديد: 50,000 ل.س

⏰ المهلة النهائية: 30 يونيو 2026

🏢 مكان التقديم: مقر النقابة، شارع الرئيس، اللاذقية
📞 للاستفسار: 041-987-6543`,
    images: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=85',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=85',
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

// ─── News items ───────────────────────────────────────────
const newsItems = [
  {
    id: 1,
    title: 'نقابة أطباء الأسنان تطلق حملة "ابتسامة صحية"',
    date: '2026-05-17',
    category: 'أخبار النقابة',
    summary: 'أطلقت النقابة حملتها السنوية للتوعية بصحة الفم بمشاركة أكثر من 50 طبيباً متطوعاً في عدة مناطق بمحافظة اللاذقية.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=85',
  },
  {
    id: 2,
    title: 'اجتماع الهيئة الإدارية: قرارات هامة للعام 2026',
    date: '2026-05-12',
    category: 'إداري',
    summary: 'أصدرت الهيئة الإدارية جملة من القرارات المتعلقة بتنظيم المهنة وتطوير الخدمات المقدمة للأعضاء.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=85',
  },
  {
    id: 3,
    title: 'توصيات المؤتمر العلمي السنوي',
    date: '2026-05-08',
    category: 'علمي',
    summary: 'صدرت توصيات المؤتمر الذي ناقش أحدث التطورات في زراعة الأسنان والطباعة ثلاثية الأبعاد.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=85',
  },
  {
    id: 4,
    title: 'افتتاح مركز التدريب الطبي الجديد',
    date: '2026-04-25',
    category: 'أخبار النقابة',
    summary: 'افتتحت النقابة مركزها التدريبي الجديد المجهز بأحدث المعدات التعليمية لتدريب الأطباء.',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=85',
  },
  {
    id: 5,
    title: 'بيان حول ضوابط ممارسة مهنة طب الأسنان',
    date: '2026-04-18',
    category: 'تشريعي',
    summary: 'أصدرت النقابة بياناً حول المستجدات التشريعية المتعلقة بضوابط ممارسة المهنة في المحافظة.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=85',
  },
]

// ─── Ticker items ─────────────────────────────────────────
const tickerItems = [
  '🦷 ورشة زراعة الأسنان المتقدمة: التسجيل مكتمل — ترقّبوا الدورة القادمة',
  '📢 تعميم جديد: تجديد بطاقات العضوية قبل 30 يونيو 2026',
  '⚕️ حملة الكشف المجاني على الأسنان — يونيو 2026 — مجاناً للجمهور',
  '🗓️ الجمعية العمومية السنوية — 5 يوليو 2026 — حضور إلزامي',
  '🎓 دورة إدارة عيادات الأسنان: أماكن محدودة — سجّل الآن',
  '🏆 ليلة التكريم السنوية — 30 مايو 2026 — احجز مقعدك',
]

// ─── Category colors ──────────────────────────────────────
const categoryColors = {
  علمي:     PRIMARY,
  تدريب:    '#00b894',
  طبي:      '#e17055',
  إداري:    SECONDARY,
  اجتماعي:  '#fd79a8',
  ثقافي:    '#8e44ad',
  تقني:     '#0984e3',
  رياضي:    '#e67e22',
  أعمال:    SECONDARY,
  فني:      '#fd79a8',
}

const newsCatColors = {
  'أخبار النقابة': PRIMARY,
  'إداري':         SECONDARY,
  'علمي':          '#0984e3',
  'تشريعي':        '#8e44ad',
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

function useShareUrl() {
  const [copied, setCopied] = useState(false)
  function share() {
    if (!navigator.clipboard) { setCopied('fail'); setTimeout(() => setCopied(false), 2500); return }
    navigator.clipboard.writeText(window.location.href)
      .then(() => { setCopied('ok'); setTimeout(() => setCopied(false), 2500) })
      .catch(() => { setCopied('fail'); setTimeout(() => setCopied(false), 2500) })
  }
  return [copied, share]
}

// ─── Loading overlay ──────────────────────────────────────
function LoadingOverlay() {
  return (
    <div className="page-loading-overlay">
      <div className="loading-spinner" />
    </div>
  )
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
  const [copied, share] = useShareUrl()
  if (!event) return null
  const catColor = categoryColors[event.category] || PRIMARY
  const isFull = event.registered >= event.capacity
  const status = getEventStatus(event)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()} dir="rtl">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-gallery">
          <img src={event.images[imgIdx]} alt={event.title} className="modal-main-img" />
          {event.images.length > 1 && (
            <div className="modal-thumbs">
              {event.images.map((img, i) => (
                <img key={i} src={img} alt=""
                  className={`modal-thumb${i === imgIdx ? ' active' : ''}`}
                  onClick={() => setImgIdx(i)} />
              ))}
            </div>
          )}
        </div>
        <div className="modal-content">
          <div className="modal-header-row">
            <div className="modal-badges">
              <span className="modal-category" style={{ background: catColor }}>{event.category}</span>
              <span className="modal-status-badge" style={{ background: statusMeta[status].color }}>
                {statusMeta[status].label}
              </span>
            </div>
            <button className="share-btn" onClick={share}>
              {copied === 'ok' ? '✅ تم نسخ الرابط' : copied === 'fail' ? '⚠️ تعذّر النسخ' : '🔗 مشاركة'}
            </button>
          </div>
          <h2 className="modal-title">{event.title}</h2>
          <p className="modal-desc">{event.description}</p>
          <table className="detail-table">
            <tbody>
              <tr><th>التاريخ</th><td>{formatDate(event.date)}{event.endDate && event.endDate !== event.date ? ` — ${formatDate(event.endDate)}` : ''}</td></tr>
              <tr><th>الوقت</th><td>{event.time}</td></tr>
              <tr><th>المكان</th><td>{event.location}</td></tr>
              <tr><th>الطاقة الاستيعابية</th><td>{event.capacity} مقعد</td></tr>
              <tr><th>المسجلون</th><td>{event.registered}</td></tr>
              <tr>
                <th>حالة التسجيل</th>
                <td><span className={isFull ? 'status-full' : 'status-open'}>{isFull ? '🔴 مكتمل' : '🟢 مفتوح للتسجيل'}</span></td>
              </tr>
            </tbody>
          </table>
          <RegistrationBar capacity={event.capacity} registered={event.registered} />
          <div className="modal-reg-method">
            <h4>طريقة التسجيل</h4>
            <p>{event.registrationMethod}</p>
            <a href={event.registrationLink} className="reg-btn" target="_blank" rel="noreferrer"
              style={{ background: isFull || status === 'ended' ? '#b2bec3' : catColor, pointerEvents: isFull || status === 'ended' ? 'none' : 'auto' }}>
              {isFull || status === 'ended' ? 'التسجيل غير متاح' : 'سجّل الآن'}
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
  const [copied, share] = useShareUrl()
  if (!circular) return null

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
                  <img key={i} src={img} alt=""
                    className={`modal-thumb${i === imgIdx ? ' active' : ''}`}
                    onClick={() => setImgIdx(i)} />
                ))}
              </div>
            )}
          </div>
        )}
        <div className="modal-content">
          <div className="modal-header-row">
            <span className="modal-category" style={{ background: SECONDARY }}>تعميم رسمي</span>
            <button className="share-btn" onClick={share}>
              {copied === 'ok' ? '✅ تم نسخ الرابط' : copied === 'fail' ? '⚠️ تعذّر النسخ' : '🔗 مشاركة'}
            </button>
          </div>
          <h2 className="modal-title">{circular.title}</h2>
          <div className="meta-item"><span className="meta-icon">📅</span><span>{formatDate(circular.date)}</span></div>
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
  const status = getEventStatus(event)
  const sm = statusMeta[status]

  return (
    <div className={`event-card${status === 'ended' ? ' card-ended' : ''}`}>
      <div className="card-img-wrap">
        <img src={event.images[0]} alt={event.title} className="card-img" />
        <span className="card-category" style={{ background: catColor }}>{event.category}</span>
        {status !== 'upcoming' && (
          <span className="card-status-badge" style={{ background: sm.color }}>{sm.label}</span>
        )}
        {full && status === 'upcoming' && <span className="card-full-badge">مكتمل</span>}
      </div>
      <div className="card-body">
        <h3 className="card-title">{event.title}</h3>
        <div className="card-meta">
          <span>📅 {formatDate(event.date)}{event.endDate && event.endDate !== event.date ? ` — ${formatDate(event.endDate)}` : ''}</span>
          <span>📍 {event.location}</span>
        </div>
        <div className="card-mini-bar">
          <div className="card-mini-fill" style={{ width: `${pct}%`, background: full ? '#e17055' : catColor }} />
        </div>
        <button className="card-btn" onClick={onOpen}
          style={{ borderColor: status === 'ended' ? '#b2bec3' : catColor, color: status === 'ended' ? '#b2bec3' : catColor }}>
          {status === 'ended' ? 'عرض التفاصيل' : 'اطّلع على التفاصيل'}
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

// ─── NewsSection ──────────────────────────────────────────
function NewsSection() {
  const featured = newsItems[0]
  const rest = newsItems.slice(1)
  return (
    <div className="news-section">
      <h3 className="section-title">آخر الأخبار</h3>
      <div className="news-layout">
        <div className="news-featured-card">
          <img src={featured.image} alt={featured.title} className="news-featured-img" />
          <div className="news-featured-overlay">
            <span className="news-cat-badge" style={{ background: newsCatColors[featured.category] || PRIMARY }}>
              {featured.category}
            </span>
            <h3 className="news-featured-title">{featured.title}</h3>
            <p className="news-featured-summary">{featured.summary}</p>
            <span className="news-featured-date">📅 {formatDate(featured.date)}</span>
          </div>
        </div>
        <div className="news-cards-grid">
          {rest.map(item => (
            <div key={item.id} className="news-card">
              <img src={item.image} alt={item.title} className="news-card-img" />
              <div className="news-card-body">
                <span className="news-cat-badge small" style={{ background: newsCatColors[item.category] || PRIMARY }}>
                  {item.category}
                </span>
                <h4 className="news-card-title">{item.title}</h4>
                <p className="news-card-summary">{item.summary}</p>
                <span className="news-card-date">📅 {formatDate(item.date)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── HomePage ─────────────────────────────────────────────
function HomePage() {
  const ongoingCount = events.filter(e => getEventStatus(e) === 'ongoing').length
  const openCount = events.filter(e => e.registered < e.capacity).length
  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="hero-badge">🦷 موقع رسمي معتمد</div>
        <h2 className="hero-title">نقابة أطباء الأسنان<br />فرع اللاذقية</h2>
        <p className="hero-subtitle">بوابتكم الرسمية للفعاليات والتعميمات والأخبار المهنية</p>
        <div className="hero-actions">
          <a href="#events" className="hero-btn primary-btn">🗓️ الفعاليات</a>
          <a href="#circulars" className="hero-btn secondary-btn">📋 التعميمات</a>
        </div>
        <div className="hero-stats-bar">
          <div className="hero-stat"><span>{events.length}</span><span>فعالية مسجلة</span></div>
          <div className="hero-stat-div" />
          <div className="hero-stat"><span>{ongoingCount}</span><span>فعالية جارية</span></div>
          <div className="hero-stat-div" />
          <div className="hero-stat"><span>{circulars.length}</span><span>تعميم رسمي</span></div>
          <div className="hero-stat-div" />
          <div className="hero-stat"><span>{openCount}</span><span>مفتوح للتسجيل</span></div>
        </div>
      </div>

      <div className="home-stats">
        {[
          { num: events.length, label: 'إجمالي الفعاليات', color: PRIMARY },
          { num: openCount, label: 'مفتوح للتسجيل', color: '#00b894' },
          { num: events.filter(e => getEventStatus(e) === 'ongoing').length, label: 'فعالية جارية', color: '#fd79a8' },
          { num: circulars.length, label: 'تعميم رسمي', color: SECONDARY },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ borderTopColor: s.color }}>
            <span className="stat-num" style={{ color: s.color }}>{s.num}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="home-featured">
        <h3 className="section-title">أبرز الفعاليات القادمة</h3>
        <div className="featured-grid">
          {events.filter(e => getEventStatus(e) !== 'ended').slice(0, 3).map(event => {
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

      <NewsSection />

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
const STATUS_FILTERS = ['الكل', 'قادمة', 'جارية', 'منتهية', 'مكتمل التسجيل', 'تسجيل مفتوح']

function EventsPage({ openEventId }) {
  const [selected, setSelected] = useState(null)
  const [catFilter, setCatFilter] = useState('الكل')
  const [statusFilter, setStatusFilter] = useState('الكل')
  const [yearFilter, setYearFilter] = useState('الكل')

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    setSelected(openEventId ? (events.find(e => e.id === openEventId) || null) : null)
  }, [openEventId])

  const categories = ['الكل', ...Array.from(new Set(events.map(e => e.category)))]
  const years = ['الكل', ...Array.from(new Set(events.map(e => e.date.slice(0, 4)))).sort((a, b) => b - a)]

  let filtered = events
  if (catFilter !== 'الكل') filtered = filtered.filter(e => e.category === catFilter)
  if (yearFilter !== 'الكل') filtered = filtered.filter(e => e.date.startsWith(yearFilter))
  if (statusFilter === 'مكتمل التسجيل') filtered = filtered.filter(e => e.registered >= e.capacity)
  else if (statusFilter === 'تسجيل مفتوح') filtered = filtered.filter(e => e.registered < e.capacity)
  else if (statusFilter === 'منتهية') filtered = filtered.filter(e => getEventStatus(e) === 'ended')
  else if (statusFilter === 'جارية') filtered = filtered.filter(e => getEventStatus(e) === 'ongoing')
  else if (statusFilter === 'قادمة') filtered = filtered.filter(e => getEventStatus(e) === 'upcoming')

  return (
    <div className="section-page">
      <div className="section-banner" style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, #667eea 100%)` }}>
        <h2>🗓️ الفعاليات</h2>
        <p>اكتشف جميع الفعاليات والأنشطة المهنية لنقابة أطباء الأسنان</p>
      </div>

      <div className="filter-panel">
        <div className="filter-group">
          <span className="filter-group-label">التصنيف</span>
          <div className="filter-chips">
            {categories.map(cat => (
              <button key={cat}
                className={`filter-btn${catFilter === cat ? ' active' : ''}`}
                onClick={() => setCatFilter(cat)}>{cat}</button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <span className="filter-group-label">الحالة</span>
          <div className="filter-chips">
            {STATUS_FILTERS.map(s => (
              <button key={s}
                className={`filter-btn${statusFilter === s ? ' active' : ''}`}
                onClick={() => setStatusFilter(s)}>{s}</button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <span className="filter-group-label">السنة</span>
          <div className="filter-chips">
            {years.map(y => (
              <button key={y}
                className={`filter-btn${yearFilter === y ? ' active' : ''}`}
                onClick={() => setYearFilter(y)}>{y}</button>
            ))}
          </div>
        </div>
        <div className="filter-results">
          عرض <strong>{filtered.length}</strong> من <strong>{events.length}</strong> فعالية
        </div>
      </div>

      <main className="events-grid">
        {filtered.length > 0 ? filtered.map(event => (
          <EventCard key={event.id} event={event}
            onOpen={() => { window.location.hash = `events/${event.id}` }} />
        )) : (
          <div className="no-results">🔍 لا توجد فعاليات تطابق الفلاتر المحددة</div>
        )}
      </main>
      {selected && <EventModal event={selected} onClose={() => { window.location.hash = 'events' }} />}
    </div>
  )
}

// ─── CircularsPage ────────────────────────────────────────
function CircularsPage({ openCircularId }) {
  const [selected, setSelected] = useState(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    setSelected(openCircularId ? (circulars.find(c => c.id === openCircularId) || null) : null)
  }, [openCircularId])

  return (
    <div className="section-page">
      <div className="section-banner" style={{ background: `linear-gradient(135deg, ${SECONDARY} 0%, #1a7a5e 100%)` }}>
        <h2>📋 التعميمات</h2>
        <p>اطّلع على آخر التعميمات والإعلانات الرسمية لنقابة أطباء الأسنان</p>
      </div>
      <main className="circulars-list">
        {circulars.map(c => (
          <CircularCard key={c.id} circular={c}
            onOpen={() => { window.location.hash = `circulars/${c.id}` }} />
        ))}
      </main>
      {selected && <CircularModal circular={selected} onClose={() => { window.location.hash = 'circulars' }} />}
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────
function App() {
  const hash = useHash()
  const clean = hash.replace(/^#/, '') || 'home'
  const [section, rawId] = clean.split('/')
  const itemId = rawId ? parseInt(rawId, 10) : null

  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const prevSection = useRef(null)

  useEffect(() => {
    if (prevSection.current !== null && prevSection.current !== section) {
      setLoading(true)
      const t = setTimeout(() => setLoading(false), 480)
      return () => clearTimeout(t)
    }
    prevSection.current = section
  }, [section])

  // close mobile nav on navigate
  useEffect(() => { setMobileNavOpen(false) }, [section])

  // close mobile nav on ESC
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') setMobileNavOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="app" dir="rtl">
      {loading && <LoadingOverlay />}

      <header className="site-header">
        <div className="header-inner">
          <a href="#home" className="site-logo">
            <span className="logo-icon">🦷</span>
            <div className="logo-text-block">
              <span className="logo-title">نقابة أطباء الأسنان</span>
              <span className="logo-sub">فرع اللاذقية</span>
            </div>
          </a>
          <nav className="main-nav">
            <a href="#home" className={`nav-link${section === 'home' || section === '' ? ' active' : ''}`}>الرئيسية</a>
            <a href="#events" className={`nav-link${section === 'events' ? ' active' : ''}`}>الفعاليات</a>
            <a href="#circulars" className={`nav-link${section === 'circulars' ? ' active' : ''}`}>التعميمات</a>
          </nav>
          <button className="burger-btn" onClick={() => setMobileNavOpen(true)} aria-label="القائمة">
            <span /><span /><span />
          </button>
        </div>
      </header>

      {mobileNavOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileNavOpen(false)}>
          <nav className="mobile-nav-drawer" onClick={e => e.stopPropagation()} dir="rtl">
            <button className="mobile-nav-close" onClick={() => setMobileNavOpen(false)}>✕</button>
            <div className="mobile-nav-logo">
              <span className="mobile-nav-logo-icon">🦷</span>
              <div>
                <div className="mobile-nav-logo-title">نقابة أطباء الأسنان</div>
                <div className="mobile-nav-logo-sub">فرع اللاذقية</div>
              </div>
            </div>
            <a href="#home" className={`mobile-nav-link${section === 'home' || section === '' ? ' active' : ''}`}>
              🏠 الرئيسية
            </a>
            <a href="#events" className={`mobile-nav-link${section === 'events' ? ' active' : ''}`}>
              🗓️ الفعاليات
            </a>
            <a href="#circulars" className={`mobile-nav-link${section === 'circulars' ? ' active' : ''}`}>
              📋 التعميمات
            </a>
          </nav>
        </div>
      )}

      <Ticker items={tickerItems} />

      <div className={`page-content${loading ? ' page-content-loading' : ''}`}>
        {(section === 'home' || section === '') && <HomePage />}
        {section === 'events' && <EventsPage openEventId={itemId} />}
        {section === 'circulars' && <CircularsPage openCircularId={itemId} />}
      </div>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo-icon">🦷</span>
            <div>
              <div className="footer-brand-name">نقابة أطباء الأسنان — فرع اللاذقية</div>
              <div className="footer-brand-addr">شارع الرئيس، مبنى النقابة، اللاذقية — سوريا</div>
            </div>
          </div>
          <div className="footer-links">
            <a href="#home">الرئيسية</a>
            <a href="#events">الفعاليات</a>
            <a href="#circulars">التعميمات</a>
          </div>
          <div className="footer-copy">© 2026 — جميع الحقوق محفوظة</div>
        </div>
      </footer>
    </div>
  )
}

export default App
