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
    text: 'برامج تدريبية وورش علمية لدعم التطور المهني للأطباء.',
  },
  {
    title: 'الخدمات النقابية',
    text: 'إعلانات رسمية، تعاميم، ونماذج إلكترونية للأعضاء.',
  },
]

const newsSections = [
  {
    id: 'latest-news',
    title: 'آخر الأخبار',
    description: 'تغطية مستمرة لآخر مستجدات الفرع بصياغة مشابهة لقسم آخر الأخبار الرسمي.',
  },
  {
    id: 'activities',
    title: 'الأخبار والأنشطة',
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
    slug: 'latest-syndicate-updates-may-2026',
    section: 'latest-news',
    title: 'آخر الأخبار: تحديثات نقابية ومهنية لشهر أيار 2026',
    date: '15 أيار 2026',
    excerpt: 'حزمة تحديثات جديدة لخدمات الأعضاء والبوابة الإلكترونية للنقابة.',
    content: [
      'تعلن نقابة أطباء الأسنان فرع اللاذقية عن مجموعة تحديثات جديدة تشمل تبسيط إجراءات المعاملات وتوسيع نافذة الخدمات الرقمية.',
      'تشمل التحديثات تطوير قسم الأخبار ليعرض المحتوى بشكل أسرع مع صفحات تفصيلية لكل خبر وقابلية مشاركة مباشرة.',
      'تدعو النقابة جميع الأطباء للاطلاع الدوري على قسم آخر الأخبار لمتابعة المستجدات الرسمية أولًا بأول.',
    ],
  },
  {
    slug: 'scientific-activity-restorative-dentistry',
    section: 'activities',
    title: 'نشاط علمي حول أحدث بروتوكولات الترميم السني',
    date: '2 حزيران 2026',
    excerpt: 'برنامج علمي مكثف بمشاركة خبراء في طب الأسنان الترميمي.',
    content: [
      'ينطلق النشاط العلمي ضمن خطة الفرع السنوية للتعليم المستمر، مع جلسات تطبيقية مركزة.',
      'يركز البرنامج على القرارات السريرية الحديثة في الترميمات المحافظة والتعامل مع الحالات المعقدة.',
      'يحصل المشاركون على شهادة حضور معتمدة ونقاط تعليم طبي مستمر.',
    ],
  },
  {
    slug: 'membership-renewal-final-notice',
    section: 'announcements',
    title: 'إعلان هام: الموعد النهائي لتجديد الاشتراك السنوي',
    date: '11 حزيران 2026',
    excerpt: 'تنويه رسمي بخصوص المواعيد والإجراءات المطلوبة لتجديد الاشتراك.',
    content: [
      'تؤكد النقابة على ضرورة استكمال إجراءات تجديد الاشتراك ضمن المدة المحددة في التعميم الرسمي.',
      'تُستقبل الطلبات عبر مكتب شؤون الأطباء أو عبر النماذج الإلكترونية المعتمدة.',
      'الالتزام بالمواعيد يضمن استمرارية جميع الخدمات النقابية والمهنية.',
    ],
  },
  {
    slug: 'latest-news-digital-services-launch',
    section: 'latest-news',
    title: 'آخر الأخبار: إطلاق باقة خدمات رقمية جديدة',
    date: '20 حزيران 2026',
    excerpt: 'إطلاق نماذج رقمية جديدة لتسريع تقديم الطلبات والمتابعة.',
    content: [
      'أطلق الفرع مجموعة خدمات رقمية جديدة لتسهيل تقديم الطلبات النقابية دون الحاجة إلى مراجعات متعددة.',
      'تساعد هذه الباقة في تسريع مسار المعاملات ورفع كفاءة التواصل بين الأعضاء والفرع.',
      'يمكن الوصول إلى جميع الخدمات عبر البوابة الرسمية من قسم الأخبار والخدمات.',
    ],
  },
]

function getRoute() {
  const rawHash = window.location.hash.replace(/^#\/?/, '')
  if (!rawHash) return { type: 'home' }

  const hash = decodeURIComponent(rawHash)

  if (hash === 'about') return { type: 'about' }

  if (hash.startsWith('news/')) {
    return { type: 'news', slug: hash.replace('news/', '') }
  }

  if (hash.startsWith('news-section/')) {
    return { type: 'news-section', sectionId: hash.replace('news-section/', '') }
  }

  return { type: 'home' }
}

function shareTo(platform, targetUrl = window.location.href, targetTitle = 'نقابة أطباء الأسنان فرع اللاذقية') {
  const pageUrl = encodeURIComponent(targetUrl)
  const title = encodeURIComponent(targetTitle)

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
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTopButton, setShowTopButton] = useState(false)
  const [notificationPermission, setNotificationPermission] = useState(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'unsupported',
  )

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute())
      setMenuOpen(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const onScroll = () => setShowTopButton(window.scrollY > 320)

    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  async function requestNotifications() {
    if (!('Notification' in window)) {
      setNotificationPermission('unsupported')
      return
    }

    try {
      const permission = await Notification.requestPermission()
      setNotificationPermission(permission)
    } catch {
      setNotificationPermission('denied')
    }
  }

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

  const newsIndex = useMemo(
    () => (currentNews ? newsItems.findIndex((item) => item.slug === currentNews.slug) : -1),
    [currentNews],
  )

  const previousNews = newsIndex > 0 ? newsItems[newsIndex - 1] : null
  const nextNews = newsIndex >= 0 && newsIndex < newsItems.length - 1 ? newsItems[newsIndex + 1] : null

  function renderHome() {
    return (
      <>
        <section className="hero">
          <div className="container hero__grid">
            <div className="fade-up">
              <p className="eyebrow">هوية رسمية حديثة</p>
              <h1>بوابة نقابية متكاملة لأطباء الأسنان في محافظة اللاذقية</h1>
              <p className="hero__text">
                منصة رسمية بهوية أخضر/ذهبي، مع أقسام واضحة: الرئيسية، الأخبار والأنشطة، آخر
                الأخبار، ومن نحن.
              </p>
              <div className="hero__actions">
                <a href="#/news-section/activities" className="btn btn--primary">
                  الأخبار والأنشطة
                </a>
                <a href="#/news-section/latest-news" className="btn btn--ghost">
                  آخر الأخبار
                </a>
                <a href="#/about" className="btn btn--ghost">
                  من نحن
                </a>
              </div>
            </div>

            <div className="hero__panel fade-up delay-1">
              <h2>مؤشرات الفرع</h2>
              <div className="metrics">
                {highlights.map((item) => (
                  <div key={item.label} className="metric hover-lift">
                    <p>{item.value}</p>
                    <small>{item.label}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <main className="container">
          <section className="section">
            <div className="section__head fade-up">
              <h2>الخدمات الرئيسية</h2>
              <p>إدارة متكاملة للخدمات المهنية والإدارية ضمن واجهة موحدة.</p>
            </div>
            <div className="cards">
              {services.map((service, index) => (
                <article key={service.title} className={`card hover-lift fade-up delay-${(index % 3) + 1}`}>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section__head fade-up">
              <h2>الأقسام</h2>
              <p>توجيه مباشر وسريع للأقسام الأساسية.</p>
            </div>
            <div className="cards">
              <article className="card hover-lift">
                <h3>الرئيسية</h3>
                <p>الواجهة العامة والملخص السريع للخدمات.</p>
                <a className="link" href="#/">
                  الذهاب إلى الرئيسية
                </a>
              </article>
              <article className="card hover-lift">
                <h3>الأخبار والأنشطة</h3>
                <p>جميع الأخبار المتعلقة بالأنشطة العلمية والفعاليات.</p>
                <a className="link" href="#/news-section/activities">
                  فتح الأخبار والأنشطة
                </a>
              </article>
              <article className="card hover-lift">
                <h3>آخر الأخبار</h3>
                <p>آخر الأخبار المحدثة بصياغة مشابهة للقسم المرجعي.</p>
                <a className="link" href="#/news-section/latest-news">
                  فتح آخر الأخبار
                </a>
              </article>
            </div>
          </section>
        </main>
      </>
    )
  }

  function renderNewsSectionPage() {
    if (!currentSection) return null

    return (
      <main className="container section-page fade-up">
        <a className="back-link" href="#/">
          ← العودة إلى الرئيسية
        </a>
        <h1>{currentSection.title}</h1>
        <p className="section-description">{currentSection.description}</p>

        <div className="timeline">
          {sectionNews.map((item, index) => (
            <article key={item.slug} className={`timeline__item hover-lift fade-up delay-${(index % 3) + 1}`}>
              <p className="meta">{item.date}</p>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
              <a className="btn btn--small" href={`#/news/${item.slug}`}>
                قراءة الخبر
              </a>
            </article>
          ))}
        </div>
      </main>
    )
  }

  function renderAboutPage() {
    return (
      <main className="container section-page fade-up">
        <a className="back-link" href="#/">
          ← العودة إلى الرئيسية
        </a>
        <article className="news-detail">
          <h1>من نحن</h1>
          <p>
            نقابة أطباء الأسنان فرع اللاذقية هي المظلة المهنية الرسمية التي تمثل أطباء الأسنان في
            المحافظة، وتعمل على تنظيم المهنة، تطوير المهارات، وخدمة المجتمع.
          </p>
          <p>
            نلتزم بتقديم خدمات نقابية حديثة، وتعزيز التعليم المستمر، ودعم الممارسة المهنية الآمنة
            وفق المعايير المعتمدة.
          </p>
          <p>
            تعتمد المنصة الحالية شعارًا مؤقتًا وهوية بصرية باللونين الأخضر والذهبي إلى حين اعتماد
            الهوية النهائية.
          </p>
        </article>
      </main>
    )
  }

  function renderNewsDetail() {
    if (!currentNews) return null
    const newsUrl = `${window.location.origin}${window.location.pathname}#/news/${currentNews.slug}`

    return (
      <main className="container section-page fade-up">
        <a className="back-link" href={`#/news-section/${currentNews.section}`}>
          ← العودة إلى القسم
        </a>
        <article className="news-detail">
          <p className="meta">{currentNews.date}</p>
          <h1>{currentNews.title}</h1>
          {currentNews.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <div className="news-actions">
            <button
              type="button"
              className="btn btn--small"
              onClick={() => shareTo('whatsapp', newsUrl, currentNews.title)}
            >
              مشاركة الخبر
            </button>
            <a className="btn btn--small btn--ghost" href={`#/news-section/${currentNews.section}`}>
              المزيد من نفس القسم
            </a>
          </div>

          <div className="pager">
            {previousNews ? (
              <a className="pager__link" href={`#/news/${previousNews.slug}`}>
                السابق: {previousNews.title}
              </a>
            ) : (
              <span className="pager__empty">لا يوجد خبر سابق</span>
            )}

            {nextNews ? (
              <a className="pager__link" href={`#/news/${nextNews.slug}`}>
                التالي: {nextNews.title}
              </a>
            ) : (
              <span className="pager__empty">لا يوجد خبر لاحق</span>
            )}
          </div>
        </article>
      </main>
    )
  }

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

          <button
            type="button"
            className={`burger ${menuOpen ? 'active' : ''}`}
            aria-label="فتح قائمة التنقل"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <a href="#/">الرئيسية</a>
            <a href="#/news-section/activities">الأخبار والأنشطة</a>
            <a href="#/news-section/latest-news">آخر الأخبار</a>
            <a href="#/about">من نحن</a>
          </nav>
        </div>
      </header>

      <section className="notification-strip">
        <div className="container notification-strip__inner">
          <p>
            {notificationPermission === 'granted' && 'الإشعارات مفعّلة ✅'}
            {notificationPermission === 'denied' && 'تم رفض الإشعارات. يمكنك تفعيلها من إعدادات المتصفح.'}
            {notificationPermission === 'default' && 'للحصول على آخر الأخبار فورًا، فعّل الإشعارات.'}
            {notificationPermission === 'unsupported' && 'متصفحك لا يدعم إشعارات الويب.'}
          </p>
          {notificationPermission !== 'granted' && notificationPermission !== 'unsupported' ? (
            <button type="button" className="btn btn--small" onClick={requestNotifications}>
              طلب إرسال إشعارات
            </button>
          ) : null}
        </div>
      </section>

      {route.type === 'home' && renderHome()}
      {route.type === 'about' && renderAboutPage()}
      {route.type === 'news-section' && currentSection && renderNewsSectionPage()}
      {route.type === 'news' && currentNews && renderNewsDetail()}

      {(route.type === 'news' && !currentNews) ||
      (route.type === 'news-section' && !currentSection) ? (
        <main className="container section-page fade-up">
          <a className="back-link" href="#/">
            ← العودة إلى الرئيسية
          </a>
          <h1>المحتوى غير متوفر</h1>
          <p>الصفحة المطلوبة غير موجودة أو تم نقلها.</p>
        </main>
      ) : null}

      {showTopButton ? (
        <button
          type="button"
          className="to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="العودة إلى الأعلى"
        >
          ↑
        </button>
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
