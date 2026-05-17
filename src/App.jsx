import './App.css'

const posts = [
  {
    title: 'تحديث النقابة: تنظيم الترخيص المهني',
    date: '15 أيار 2026',
    image:
      'https://images.unsplash.com/photo-1588776814546-ec7e89f0d4f1?auto=format&fit=crop&w=1200&q=80',
    text: 'تعلن نقابة أطباء الأسنان - فرع اللاذقية عن بدء استقبال طلبات تجديد التراخيص المهنية وفق التعليمات الجديدة المعتمدة من مجلس النقابة المركزي.',
  },
  {
    title: 'إطلاق حملة صحة الفم المدرسية',
    date: '8 أيار 2026',
    image:
      'https://images.unsplash.com/photo-1588774069162-1327f4f2f67f?auto=format&fit=crop&w=1200&q=80',
    text: 'بالتعاون مع مديرية التربية في اللاذقية، تبدأ النقابة حملة توعوية في المدارس حول الوقاية من تسوس الأسنان والعناية اليومية بصحة الفم.',
  },
]

const trainings = [
  {
    title: 'دورة معالجة الجذور المتقدمة',
    date: '22 حزيران 2026',
    place: 'قاعة النقابة - اللاذقية',
    image:
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'ورشة التركيبات الرقمية CAD/CAM',
    date: '4 تموز 2026',
    place: 'مركز التدريب الطبي',
    image:
      'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'المؤتمر السنوي لصحة الفم',
    date: '19 آب 2026',
    place: 'فندق لاميرا - اللاذقية',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1200&q=80',
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
  const monthlySchedule = [
    { day: 'الأحد', activity: 'استقبال طلبات الانتساب', time: '09:00 - 12:00' },
    { day: 'الثلاثاء', activity: 'استشارات مهنية للأطباء الجدد', time: '10:00 - 13:00' },
    { day: 'الخميس', activity: 'ندوة توعوية مفتوحة للأهالي', time: '11:00 - 14:00' },
  ]

  return (
    <div className="site" dir="rtl">
      <header className="hero">
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="badge">الجمهورية العربية السورية</p>
          <h1>Latakia Dental Syndicate Branch</h1>
          <p>
            منصة إلكترونية لنشر الأخبار المهنية، الفعاليات العلمية، والمؤتمرات الخاصة
            بأطباء الأسنان في محافظة اللاذقية.
          </p>
          <nav className="hero__nav">
            <a href="#posts">المنشورات</a>
            <a href="#gallery">المعرض</a>
            <a href="#about">من نحن</a>
          </nav>
        </div>
      </header>

      <main className="container">
        <section id="posts" className="section">
          <h2>المنشورات</h2>
          <div className="grid two">
            {posts.map((post) => (
              <article key={post.title} className="card">
                <img src={post.image} alt={post.title} className="card__image" />
                <div className="card__body">
                  <p className="meta">{post.date}</p>
                  <h3>{post.title}</h3>
                  <p>{post.text}</p>
                </div>
              </article>
            ))}
          </div>

          <article className="card table-card">
            <div className="card__body">
              <h3>جدول الفعاليات النقابية الأسبوعي</h3>
              <p>يُحدّث هذا الجدول بشكل دوري لمتابعة مواعيد النشاطات المهنية والتوعوية.</p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>اليوم</th>
                      <th>النشاط</th>
                      <th>الوقت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlySchedule.map((item) => (
                      <tr key={item.day}>
                        <td>{item.day}</td>
                        <td>{item.activity}</td>
                        <td>{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </article>
        </section>

        <section id="gallery" className="section">
          <h2>معرض الدورات التدريبية والمؤتمرات</h2>
          <div className="grid three">
            {trainings.map((item) => (
              <article key={item.title} className="card">
                <img src={item.image} alt={item.title} className="card__image" />
                <div className="card__body">
                  <h3>{item.title}</h3>
                  <p className="meta">{item.date}</p>
                  <p>{item.place}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section about">
          <h2>من نحن</h2>
          <p>
            نقابة أطباء الأسنان - فرع اللاذقية جهة مهنية تعنى بتنظيم شؤون المهنة، دعم
            التطوير العلمي المستمر، وتمثيل أطباء الأسنان في المحافظة.
          </p>
          <ul>
            <li>تطوير الكفاءة المهنية عبر الدورات وورش العمل.</li>
            <li>تعزيز التواصل بين الأطباء والمؤسسات الصحية.</li>
            <li>نشر التوعية المجتمعية حول صحة الفم والأسنان.</li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>شارك الموقع عبر وسائل التواصل الاجتماعي</p>
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
        <small>© 2026 Latakia Dental Syndicate Branch</small>
      </footer>
    </div>
  )
}

export default App
