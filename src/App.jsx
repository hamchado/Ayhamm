import { useEffect, useMemo, useState } from 'react'
import './App.css'

const highlights = [
  { value: '3,100+', label: 'طبيب وطبيبة أسنان' },
  { value: '52', label: 'نشاط علمي سنوي' },
  { value: '17', label: 'لجنة تخصصية' },
]

const services = [
  {
    title: 'التسجيل والترخيص',
    text: 'متابعة معاملات الانتساب وتجديد الترخيص عبر مسار واضح ومنظم.',
  },
  {
    title: 'التعليم المستمر',
    text: 'برامج تدريبية، ورش علمية، ونقاط CME لدعم التطور المهني للأطباء.',
  },
  {
    title: 'الخدمات النقابية',
    text: 'إعلانات رسمية، تعاميم، نماذج، ودعم مهني مباشر لأعضاء الفرع.',
  },
]

const newsSections = [
  {
    id: 'latest-news',
    title: 'آخر الأخبار',
    description: 'تغطية مستمرة لآخر مستجدات فرع اللاذقية.',
  },
  {
    id: 'activities',
    title: 'الأنشطة والفعاليات',
    description: 'ورش، مؤتمرات، ومحاضرات علمية في محافظة اللاذقية.',
  },
  {
    id: 'announcements',
    title: 'الإعلانات النقابية',
    description: 'إعلانات وتنويهات إدارية ومهنية للأعضاء.',
  },
]

const newsItems = [
  {
    slug: 'launch-cme-platform-lattakia',
    section: 'latest-news',
    title: 'إطلاق بوابة التعليم الطبي المستمر لأطباء الأسنان في اللاذقية',
    date: '15 أيار 2026',
    excerpt: 'إطلاق منصة رقمية لتتبع الأنشطة العلمية والنقاط التدريبية بسهولة.',
    content: [
      'أعلنت نقابة أطباء الأسنان فرع اللاذقية إطلاق بوابة التعليم الطبي المستمر بصيغة رقمية حديثة، بهدف تسهيل وصول الأطباء إلى المحاضرات والدورات المعتمدة.',
      'تتضمن البوابة سجلًا شخصيًا لكل طبيب يوضح النقاط العلمية المكتسبة، مع آلية واضحة لتحديث البيانات ومراجعتها بشكل دوري.',
      'تدعو النقابة جميع الأطباء لتفعيل حساباتهم والاطلاع على الدليل الإرشادي المتاح ضمن قسم الأخبار.',
    ],
  },
  {
    slug: 'summer-scientific-forum',
    section: 'activities',
    title: 'الملتقى العلمي الصيفي لطب الأسنان الترميمي',
    date: '2 حزيران 2026',
    excerpt: 'برنامج علمي مكثف حول بروتوكولات الترميم الحديثة.',
    content: [
      'تنظم النقابة ملتقى علميًا صيفيًا يتضمن جلسات تخصصية تفاعلية بمشاركة نخبة من المحاضرين.',
      'يركز الملتقى على التطبيقات السريرية الحديثة في طب الأسنان الترميمي والعلاج المحافظ.',
      'يمنح المشاركون شهادة حضور ونقاط تعليم طبي مستمر وفق الأنظمة المعتمدة.',
    ],
  },
  {
    slug: 'membership-renewal-deadline',
    section: 'announcements',
    title: 'تحديد آخر موعد لتجديد الاشتراك النقابي السنوي',
    date: '11 حزيران 2026',
    excerpt: 'تنويه بخصوص المواعيد والإجراءات المطلوبة لتجديد الاشتراك.',
    content: [
      'تذكر النقابة السادة الأعضاء بآخر موعد لتجديد الاشتراك السنوي ضمن الفترة المحددة في الإعلان الرسمي.',
      'يرجى استكمال الوثائق المطلوبة عبر مكتب شؤون الأطباء أو من خلال النماذج الإلكترونية المتاحة.',
      'الالتزام بالمواعيد يضمن استمرارية الخدمات النقابية والاستفادة من البرامج المهنية.',
    ],
  },
]

function getRoute() {
  const rawHash = window.location.hash.replace(/^#\/?/, '')
  if (!rawHash) return { type: 'home' }

  const hash = decodeURIComponent(rawHash)

  if (hash.startsWith('news/')) {
    return { type: 'news', slug: hash.replace('news/', '') }
  }

  if (hash.startsWith('news-section/')) {
    return { type: 'news-section', sectionId: hash.replace('news-section/', '') }
  }

  return { type: 'home' }
}

function shareTo(platform) {
  const pageUrl = encodeURIComponent(window.location.href)
  const title = encodeURIComponent('نقابة أطباء الأسنان فرع اللاذقية')

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
  const [route, setRoute] = useState(getRoute())

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const currentNews = useMemo(
    () => (route.type === 'news' ? newsItems.find((item) => item.slug === route.slug) : null),
    [route],
  )

  const currentSection = useMemo(
    () =>
      route.type === 'news-section'
        ? newsSections.find((section) => section.id === route.sectionId)
        : null,
    [route],
  )

  const sectionNews = useMemo(
    () =>
      currentSection ? newsItems.filter((item) => item.section === currentSection.id) : [],
    [currentSection],
  )

  return (
    <div className="site" dir="rtl">
      <header className="topbar">
        <div className="container topbar__inner">
          <a className="brand" href="#/">
            <span className="logo-placeholder" aria-hidden="true">
              ن أ
            </span>
            <strong>نقابة أطباء الأسنان فرع اللاذقية</strong>
          </a>
          <nav>
            <a href="#/">الرئيسية</a>
            <a href="#services">الخدمات</a>
            <a href="#news-anchor">الأخبار</a>
            <a href="#about">عن النقابة</a>
          </nav>
        </div>
      </header>

      {route.type === 'home' && (
        <>
          <section className="hero">
            <div className="container hero__grid">
              <div>
                <p className="eyebrow">هوية رسمية حديثة</p>
                <h1>بوابة نقابية متكاملة لأطباء الأسنان في محافظة اللاذقية</h1>
                <p className="hero__text">
                  منصة رقمية احترافية بهوية بصرية أخضر/ذهبي، لتنظيم الخدمات النقابية، الأخبار،
                  والأنشطة العلمية ضمن تجربة استخدام واضحة ومتناسقة.
                </p>
                <div className="hero__actions">
                  <a href="#services" className="btn btn--primary">
                    الخدمات الرئيسية
                  </a>
                  <a href="#news-anchor" className="btn btn--ghost">
                    آخر الأخبار
                  </a>
                </div>
              </div>
              <div className="hero__panel">
                <h2>مؤشرات الفرع</h2>
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
                <p>إدارة متكاملة للخدمات المهنية والإدارية ضمن واجهة موحدة.</p>
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

            <section id="news-anchor" className="section">
              <div className="section__head">
                <h2>الأخبار</h2>
                <p>اختر قسمًا إخباريًا أو افتح تفاصيل أي خبر مباشرة.</p>
              </div>

              <div className="cards">
                {newsSections.map((section) => (
                  <article key={section.id} className="card">
                    <h3>{section.title}</h3>
                    <p>{section.description}</p>
                    <a className="link" href={`#/news-section/${section.id}`}>
                      عرض القسم
                    </a>
                  </article>
                ))}
              </div>

              <div className="timeline">
                {newsItems.map((item) => (
                  <article key={item.slug} className="timeline__item">
                    <p className="meta">{item.date}</p>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                    <a className="link" href={`#/news/${item.slug}`}>
                      قراءة الخبر
                    </a>
                  </article>
                ))}
              </div>
            </section>

            <section id="about" className="section about">
              <h2>عن النقابة</h2>
              <p>
                تمثل نقابة أطباء الأسنان فرع اللاذقية الإطار المهني المنظم لعمل الأطباء، وتدعم
                التطوير العلمي، الممارسة الآمنة، وخدمة المجتمع.
              </p>
              <p>
                تم اعتماد تصميم أصلي وهوية بصرية مستقلة تتماشى مع الطابع الرسمي للنقابة وتُسهّل
                التعديل المستقبلي السريع للمحتوى والأقسام.
              </p>
            </section>
          </main>
        </>
      )}

      {route.type === 'news-section' && currentSection && (
        <main className="container section-page">
          <a className="back-link" href="#/">
            ← العودة إلى الرئيسية
          </a>
          <h1>{currentSection.title}</h1>
          <p className="section-description">{currentSection.description}</p>

          <div className="timeline">
            {sectionNews.map((item) => (
              <article key={item.slug} className="timeline__item">
                <p className="meta">{item.date}</p>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <a className="link" href={`#/news/${item.slug}`}>
                  قراءة الخبر
                </a>
              </article>
            ))}
          </div>
        </main>
      )}

      {route.type === 'news' && currentNews && (
        <main className="container section-page">
          <a className="back-link" href="#/">
            ← العودة إلى الرئيسية
          </a>
          <article className="news-detail">
            <p className="meta">{currentNews.date}</p>
            <h1>{currentNews.title}</h1>
            {currentNews.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <a className="link" href={`#/news-section/${currentNews.section}`}>
              عرض المزيد من نفس القسم
            </a>
          </article>
        </main>
      )}

      {(route.type === 'news' && !currentNews) ||
      (route.type === 'news-section' && !currentSection) ? (
        <main className="container section-page">
          <a className="back-link" href="#/">
            ← العودة إلى الرئيسية
          </a>
          <h1>المحتوى غير متوفر</h1>
          <p>الصفحة المطلوبة غير موجودة أو تم نقلها.</p>
        </main>
      ) : null}

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
        <small>© 2026 نقابة أطباء الأسنان فرع اللاذقية</small>
      </footer>
    </div>
  )
}

export default App
