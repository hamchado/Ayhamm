import { useState } from 'react'
import './App.css'

const stats = [
  { label: 'سنوات الخبرة', value: '12+' },
  { label: 'ابتسامات موثقة', value: '1500+' },
  { label: 'حالات معقدة', value: '320+' },
  { label: 'نسبة الرضا', value: '98%' },
]

const services = [
  {
    title: 'تخطيط الابتسامة الرقمية',
    description: 'محاكاة ثلاثية الأبعاد لنتيجة العلاج قبل البدء لضمان الثقة والوضوح.',
  },
  {
    title: 'طب أسنان الأطفال',
    description: 'جلسات لطيفة مع متابعة نفسية لضمان تجربة مريحة للصغار.',
  },
  {
    title: 'علاجات اللثة المتقدمة',
    description: 'تشخيص مبكر وتنظيف عميق واستعادة صحة اللثة والأنسجة.',
  },
  {
    title: 'تقويم شفاف',
    description: 'خطط تقويم غير مرئية مع متابعة رقمية أسبوعية.',
  },
]

const treatments = [
  {
    title: 'زراعة الأسنان الفورية',
    detail: 'تعويض فوري للأسنان المفقودة مع تثبيت قوي وآمن.',
  },
  {
    title: 'ابتسامة هوليود',
    detail: 'عدسات خزفية دقيقة وتصميم شخصي يتناسب مع ملامح الوجه.',
  },
  {
    title: 'علاج العصب المجهري',
    detail: 'تقنيات تكبير متقدمة لضمان تنظيف كامل وحماية السن.',
  },
  {
    title: 'ترميمات تجميلية',
    detail: 'حشوات تجميلية غير مرئية تعيد للسن شكله الطبيعي.',
  },
  {
    title: 'تبييض احترافي',
    detail: 'جلسات سريعة ونتائج فورية بأمان على اللثة والمينا.',
  },
  {
    title: 'علاج المفصل الفكي',
    detail: 'تشخيص دقيق ومتابعة متعددة التخصصات لراحة طويلة.',
  },
]

const cases = [
  {
    title: 'إعادة بناء الابتسامة الأمامية',
    description: 'ترميم خزفي كامل مع محاذاة دقيقة للأسنان الأمامية خلال 14 يوماً.',
    tag: 'موثقة بصور ما قبل/بعد',
    duration: 'مدة العلاج: 3 جلسات',
    technique: 'تقنيات تجميلية دقيقة',
    gradient: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
  },
  {
    title: 'زراعة سن أمامي فورية',
    description: 'إعادة التعويض مع الحفاظ على شكل اللثة الطبيعي.',
    tag: 'حالة موثوقة',
    duration: 'مدة العلاج: 48 ساعة',
    technique: 'زراعة فورية',
    gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
  },
  {
    title: 'تقويم شفاف مع متابعة رقمية',
    description: 'خطة علاج مرنة مع تصوير أسبوعي وتعديلات دقيقة.',
    tag: 'موثقة بالمتابعة',
    duration: 'مدة العلاج: 6 أشهر',
    technique: 'تقويم شفاف',
    gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
  },
  {
    title: 'علاج لثة متقدم',
    description: 'تنظيف عميق واستعادة ثبات الأسنان مع خطة وقاية طويلة.',
    tag: 'ملف علاجي موثق',
    duration: 'مدة العلاج: 4 جلسات',
    technique: 'علاج لثة',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
]

const highlights = [
  {
    title: 'متابعة رقمية أسبوعية',
    detail: 'نستخدم منصات متابعة تفاعلية لضمان سير العلاج خطوة بخطوة.',
  },
  {
    title: 'تجهيزات تصوير متقدمة',
    detail: 'تصوير بانورامي وسيفالومتري بجودة عالية لتشخيص دقيق.',
  },
  {
    title: 'فريق متعدد التخصصات',
    detail: 'تعاون بين التجميل، الجراحة، وتقويم الأسنان لتحقيق أفضل نتيجة.',
  },
]

const timeline = [
  {
    year: '2012',
    title: 'التخرج من جامعة دمشق',
    detail: 'بكالوريوس طب الأسنان مع تدريب سريري مكثف.',
  },
  {
    year: '2016',
    title: 'زمالة تجميل الأسنان',
    detail: 'برامج احترافية في تصميم الابتسامة الرقمية.',
  },
  {
    year: '2020',
    title: 'إطلاق العيادة الرقمية',
    detail: 'اعتماد بروتوكولات رقمية كاملة للتشخيص والمتابعة.',
  },
  {
    year: '2024',
    title: 'أكثر من 1500 حالة موثقة',
    detail: 'معرض متكامل للحالات قبل وبعد العلاج.',
  },
]

function App() {
  const [appointmentStatus, setAppointmentStatus] = useState('')
  const [fileStatus, setFileStatus] = useState('')

  const handleAppointmentSubmit = (event) => {
    event.preventDefault()
    setAppointmentStatus('تم إرسال طلبك بنجاح، سنعاود التواصل خلال 24 ساعة.')
    event.target.reset()
  }

  const handleFileSubmit = (event) => {
    event.preventDefault()
    setFileStatus('تم استلام ملفك الطبي وسيتم التواصل معك قريباً.')
    event.target.reset()
  }

  return (
    <div className="page" dir="rtl">
      <nav className="navbar">
        <div className="brand">
          <span className="brand-mark">A</span>
          <div>
            <p className="brand-title">د. أيهم حمشو</p>
            <p className="brand-subtitle">طبيب أسنان سوري</p>
          </div>
        </div>
        <div className="nav-links">
          <a href="#profile">البروفايل</a>
          <a href="#services">الخدمات</a>
          <a href="#cases">الحالات الموثوقة</a>
          <a href="#cv">السيرة الذاتية</a>
          <a href="#appointment">احجز موعد</a>
        </div>
        <a className="nav-cta" href="#appointment">احجز الآن</a>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="hero-text">
              <span className="badge">عيادة رقمية متكاملة</span>
              <h1>ابتسامة واثقة تبدأ بخطة علاج دقيقة ومتابعة موثوقة.</h1>
              <p>
                نُقدّم تجربة علاجية حديثة تجمع بين التجميل والعلاج الوقائي مع
                توثيق كامل للحالات ونتائج واضحة قبل وبعد.
              </p>
              <div className="hero-actions">
                <a className="primary" href="#appointment">احجز استشارة</a>
                <a className="secondary" href="#cases">شاهد الحالات</a>
              </div>
              <div className="hero-meta">
                <div>
                  <h4>موقع العيادة</h4>
                  <p>دمشق · المالكي</p>
                </div>
                <div>
                  <h4>ساعات العمل</h4>
                  <p>يومياً 10:00 - 19:00</p>
                </div>
                <div>
                  <h4>رقم التواصل</h4>
                  <p dir="ltr">+963 933 000 000</p>
                </div>
              </div>
            </div>

            <div className="hero-card">
              <div className="hero-visual">
                <div className="orb"></div>
                <div className="orb small"></div>
              </div>
              <div className="hero-card-body">
                <h3>جلسة تقييم رقمية</h3>
                <p>
                  تحليل كامل لصحة الفم مع خطة علاج مفصلة وتقدير زمني واضح.
                </p>
                <div className="hero-tags">
                  <span>تقنيات ليزر</span>
                  <span>خطة شخصية</span>
                  <span>تقرير PDF</span>
                </div>
              </div>
            </div>
          </div>

          <div className="stats">
            {stats.map((item) => (
              <div className="stat-card" key={item.label}>
                <h3>{item.value}</h3>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="profile">
          <div className="section-heading">
            <div>
              <p className="section-kicker">البروفايل الاحترافي</p>
              <h2>منهجية موثوقة وخبرة سورية أصيلة.</h2>
            </div>
            <p className="section-subtitle">
              نركز على الوقاية أولاً ثم التجميل المتقدم، مع توثيق دقيق لكل خطوة.
            </p>
          </div>

          <div className="profile-grid">
            <div className="profile-card">
              <h3>ملف الطبيب</h3>
              <p>
                طبيب أسنان بخبرة تزيد عن 12 عاماً، متخصص في تجميل الأسنان
                وزراعة الأسنان الفورية مع اعتماد بروتوكولات رقمية متقدمة.
              </p>
              <div className="profile-list">
                {highlights.map((item) => (
                  <div className="profile-item" key={item.title}>
                    <h4>{item.title}</h4>
                    <p>{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="timeline">
              {timeline.map((item) => (
                <div className="timeline-item" key={item.year}>
                  <span className="timeline-year">{item.year}</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section muted" id="services">
          <div className="section-heading">
            <div>
              <p className="section-kicker">الخدمات</p>
              <h2>حلول شاملة لصحة فموية مثالية.</h2>
            </div>
            <p className="section-subtitle">
              من الاستشارة الأولى إلى الخطة العلاجية النهائية، نهتم بالتفاصيل.
            </p>
          </div>
          <div className="card-grid">
            {services.map((service) => (
              <article className="info-card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a className="text-button" href="#appointment">احجز استشارة</a>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="treatments">
          <div className="section-heading">
            <div>
              <p className="section-kicker">العلاجات</p>
              <h2>تقنيات حديثة لنتائج أسرع وأدق.</h2>
            </div>
            <p className="section-subtitle">
              نستخدم أحدث المعدات لضمان راحة المريض وسرعة التعافي.
            </p>
          </div>
          <div className="card-grid treatments">
            {treatments.map((treatment) => (
              <article className="treatment-card" key={treatment.title}>
                <h3>{treatment.title}</h3>
                <p>{treatment.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section muted" id="cases">
          <div className="section-heading">
            <div>
              <p className="section-kicker">معرض الحالات الموثوقة</p>
              <h2>نتائج موثقة تعكس دقة العمل.</h2>
            </div>
            <p className="section-subtitle">
              كل حالة موثقة بصور وتقارير لضمان الشفافية والثقة.
            </p>
          </div>
          <div className="case-grid">
            {cases.map((caseItem) => (
              <article className="case-card" key={caseItem.title}>
                <div
                  className="case-media"
                  style={{ background: caseItem.gradient }}
                >
                  <span>{caseItem.tag}</span>
                </div>
                <div className="case-body">
                  <h3>{caseItem.title}</h3>
                  <p>{caseItem.description}</p>
                  <div className="case-meta">
                    <span>{caseItem.duration}</span>
                    <span>{caseItem.technique}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="cv">
          <div className="section-heading">
            <div>
              <p className="section-kicker">السيرة الذاتية</p>
              <h2>ملف مهني متاح للتحميل.</h2>
            </div>
            <p className="section-subtitle">
              حمل السيرة الذاتية كاملة أو ارفع ملفك الطبي للحصول على استشارة.
            </p>
          </div>
          <div className="cv-grid">
            <div className="cv-card">
              <h3>تحميل السيرة الذاتية</h3>
              <p>
                ملف يتضمن المؤهلات والشهادات والدورات المعتمدة.
              </p>
              <a className="primary" href="/cv-ayham.txt" download>
                تحميل CV
              </a>
              <div className="cv-tags">
                <span>PDF / نصي</span>
                <span>محدث 2026</span>
              </div>
            </div>
            <form className="cv-form" onSubmit={handleFileSubmit}>
              <h3>ارفع ملفك الطبي</h3>
              <p>
                شاركنا صور الأشعة أو التقارير لنجهز خطة علاج أولية.
              </p>
              <label htmlFor="medical-file">اختر الملف</label>
              <input id="medical-file" type="file" accept=".pdf,.jpg,.png" required />
              <button type="submit" className="secondary">
                إرسال الملف
              </button>
              {fileStatus ? (
                <p className="form-status" role="status">{fileStatus}</p>
              ) : null}
            </form>
          </div>
        </section>

        <section className="section muted" id="appointment">
          <div className="section-heading">
            <div>
              <p className="section-kicker">التواصل والحجز</p>
              <h2>احجز موعدك بسهولة.</h2>
            </div>
            <p className="section-subtitle">
              فريقنا سيرد عليك خلال 24 ساعة مع تأكيد الموعد.
            </p>
          </div>
          <div className="appointment">
            <form className="appointment-form" onSubmit={handleAppointmentSubmit}>
              <div className="input-group">
                <label htmlFor="full-name">الاسم الكامل</label>
                <input id="full-name" type="text" placeholder="اكتب اسمك" required />
              </div>
              <div className="input-group">
                <label htmlFor="phone">رقم الهاتف</label>
                <input id="phone" type="tel" placeholder="+963 9xx xxx xxx" required />
              </div>
              <div className="input-group">
                <label htmlFor="service">الخدمة المطلوبة</label>
                <select id="service" required>
                  <option>استشارة عامة</option>
                  <option>تجميل الأسنان</option>
                  <option>زراعة الأسنان</option>
                  <option>تقويم شفاف</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="message">ملاحظات إضافية</label>
                <textarea id="message" rows="4" placeholder="اكتب التفاصيل"></textarea>
              </div>
              <button type="submit" className="primary">
                إرسال الطلب
              </button>
              {appointmentStatus ? (
                <p className="form-status" role="status">{appointmentStatus}</p>
              ) : null}
            </form>
            <div className="appointment-info">
              <h3>معلومات سريعة</h3>
              <ul>
                <li>عناوين متعددة في دمشق وريفها.</li>
                <li>خدمة طوارئ للأسنان حتى الساعة 22:00.</li>
                <li>تعقيم كامل وفق بروتوكولات منظمة الصحة.</li>
              </ul>
              <div className="info-card highlight">
                <h4>تقييمات المرضى</h4>
                <p>4.9/5 بناءً على 860 تقييم موثق.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <h3>د. أيهم حمشو</h3>
          <p>عيادة رقمية متخصصة في تجميل وزراعة الأسنان.</p>
        </div>
        <div>
          <h4>روابط سريعة</h4>
          <div className="footer-links">
            <a href="#profile">البروفايل</a>
            <a href="#services">الخدمات</a>
            <a href="#cases">الحالات</a>
            <a href="#appointment">الحجز</a>
          </div>
        </div>
        <div>
          <h4>تواصل</h4>
          <p dir="ltr">+963 933 000 000</p>
          <p>info@ayhamdental.com</p>
        </div>
      </footer>
    </div>
  )
}

export default App
