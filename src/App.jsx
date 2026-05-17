import './App.css'

const highlights = [
  {
    value: '2,850+',
    label: 'طبيب أسنان مسجل',
  },
  {
    value: '48',
    label: 'نشاط علمي سنويًا',
  },
  {
    value: '14',
    label: 'لجنة تخصصية',
  },
]

const services = [
  {
    title: 'شؤون الأطباء',
    text: 'إدارة التسجيل والترخيص وتجديد العضوية مع مسار رقمي واضح وسريع.',
  },
  {
    title: 'التطوير العلمي',
    text: 'برامج تدريبية متقدمة ومحاضرات دورية بالشراكة مع خبراء محليين ودوليين.',
  },
  {
    title: 'التوعية المجتمعية',
    text: 'مبادرات صحية موجهة للمدارس والأحياء لتعزيز صحة الفم والأسنان.',
  },
]

const events = [
  {
    date: '10 حزيران 2026',
    title: 'الملتقى العلمي الصيفي',
    text: 'جلسات تخصصية تفاعلية حول علاجات الأسنان المحافظة والتجميلية.',
  },
  {
    date: '26 تموز 2026',
    title: 'ورشة إدارة العيادات',
    text: 'أدوات عملية لتنظيم الجودة، الملفات الطبية، وتجربة المريض.',
  },
  {
    date: '18 أيلول 2026',
    title: 'المؤتمر المهني السنوي',
    text: 'لقاء مهني موسع لتبادل الخبرات وعرض أحدث التطبيقات السريرية.',
  },
]

function shareTo(platform) {
  const pageUrl = encodeURIComponent(window.location.href)
  const title = encodeURIComponent('Latakia Dental Syndicate Branch')

  const links = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
    whatsapp: `https://wa.me/?text=${title}%20${pageUrl}`,
    telegram: `https://t.me/share/url?url=${pageUrl}&text=${title}`,
    x: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${title}`,
  }

  const url = links[platform]
  if (!url) return

  window.open(url, '_blank', 'noopener,noreferrer')
}

function App() {
  return (
    <div className="site" dir="rtl">
      <header className="topbar">
        <div className="container topbar__inner">
          <strong>نقابة أطباء الأسنان - فرع اللاذقية</strong>
          <nav>
            <a href="#services">الخدمات</a>
            <a href="#events">الفعاليات</a>
            <a href="#about">عن النقابة</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container hero__grid">
          <div>
            <p className="eyebrow">هوية رقمية حديثة</p>
            <h1>بوابة مهنية متكاملة لخدمة أطباء الأسنان في اللاذقية</h1>
            <p className="hero__text">
              تصميم بصري جديد بنمط رسمي وعملي، يركّز على وضوح المحتوى وسهولة الوصول
              للخدمات والفعاليات العلمية.
            </p>
            <div className="hero__actions">
              <a href="#services" className="btn btn--primary">
                استكشف الخدمات
              </a>
              <a href="#events" className="btn btn--ghost">
                جدول الفعاليات
              </a>
            </div>
          </div>
          <div className="hero__panel">
            <h2>مؤشرات سريعة</h2>
            <div className="metrics">
              {highlights.map((item) => (
                <div key={item.label} className="metric">
                  <p>{item.value}</p>
                  <small>{item.label}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="container">
        <section id="services" className="section">
          <div className="section__head">
            <h2>الخدمات الرئيسية</h2>
            <p>تنظيم مهني متكامل يربط الطبيب بالنقابة عبر واجهة واضحة وسريعة.</p>
          </div>
          <div className="cards">
            {services.map((service) => (
              <article key={service.title} className="card">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="events" className="section">
          <div className="section__head">
            <h2>أجندة الفعاليات</h2>
            <p>برنامج موسمي متجدد للدورات والمؤتمرات والملتقيات العلمية.</p>
          </div>
          <div className="timeline">
            {events.map((event) => (
              <article key={event.title} className="timeline__item">
                <p className="meta">{event.date}</p>
                <h3>{event.title}</h3>
                <p>{event.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section about">
          <h2>عن النقابة</h2>
          <p>
            مؤسسة مهنية تُعنى بتمثيل أطباء الأسنان وتطوير بيئة العمل العلمي والخدمي
            بما ينسجم مع احتياجات المجتمع والمنظومة الصحية.
          </p>
          <p>
            تعتمد الهوية البصرية الجديدة على طابع رسمي حديث مختلف، مع ألوان هادئة
            وتخطيط واضح يعزز تجربة المستخدم ويحافظ على استقلالية التصميم.
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>شارك البوابة عبر وسائل التواصل</p>
        <div className="share-buttons">
          <button type="button" onClick={() => shareTo('facebook')}>
            Facebook
          </button>
          <button type="button" onClick={() => shareTo('whatsapp')}>
            WhatsApp
          </button>
          <button type="button" onClick={() => shareTo('telegram')}>
            Telegram
          </button>
          <button type="button" onClick={() => shareTo('x')}>
            X
          </button>
        </div>
        <small>© 2026 نقابة أطباء الأسنان - فرع اللاذقية</small>
      </footer>
    </div>
  )
}

export default App
