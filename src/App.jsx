import { useEffect, useMemo, useState } from 'react'
import './App.css'

const highlights = [
  { value: '3,100+', label: 'طبيب وطبيبة أسنان' },
  { value: '52', label: 'نشاط علمي سنوي' },
  { value: '17', label: 'لجنة تخصصية' },
  { value: '24/7', label: 'تحديثات رقمية مستمرة' },
]

const services = [
  {
    icon: '🧾',
    title: 'التسجيل والترخيص',
    text: 'متابعة معاملات الانتساب وتجديد الترخيص بمسار واضح وتتبّع مبسط.',
  },
  {
    icon: '🎓',
    title: 'التعليم المستمر',
    text: 'ورش ودورات علمية تفاعلية مع نقاط CME ضمن خطة تدريب سنوية.',
  },
  {
    icon: '📣',
    title: 'الخدمات النقابية',
    text: 'إعلانات وتعاميم ونماذج إلكترونية ضمن تجربة استخدام أسرع.',
  },
  {
    icon: '🛡️',
    title: 'الدعم المهني',
    text: 'مساندة مهنية للأعضاء في القضايا النقابية والإجرائية اليومية.',
  },
]

const newsSections = [
  {
    id: 'latest-news',
    title: 'آخر الأخبار',
    description: 'تحديثات فورية بأسلوب موجز وواضح مشابه لنمط البوابات الرسمية الكبيرة.',
  },
  {
    id: 'activities',
    title: 'الأخبار والأنشطة',
    description: 'تغطية الأنشطة العلمية، الورش، المؤتمرات، والفعاليات المهنية.',
  },
  {
    id: 'announcements',
    title: 'الإعلانات النقابية',
    description: 'تنويهات إدارية ومهنية مهمة للأعضاء مع وصول سريع للتفاصيل.',
  },
]

const newsItems = [
  {
    slug: 'latest-syndicate-updates-may-2026',
    section: 'latest-news',
    title: 'آخر الأخبار: تحديثات نقابية ومهنية لشهر أيار 2026',
    date: '15 أيار 2026',
    excerpt: 'حزمة تحديثات جديدة لخدمات الأعضاء والبوابة الإلكترونية للنقابة.',
    cover: 'https://picsum.photos/seed/news-cover-1/1200/700',
    reporter: 'المكتب الإعلامي',
    readTime: '4 دقائق',
    tags: ['آخر الأخبار', 'خدمات رقمية', 'نقابة'],
    gallery: [
      'https://picsum.photos/seed/news-gallery-1a/1100/700',
      'https://picsum.photos/seed/news-gallery-1b/1100/700',
    ],
    content: [
      'تعلن نقابة أطباء الأسنان فرع اللاذقية عن مجموعة تحديثات جديدة تشمل تبسيط إجراءات المعاملات وتوسيع نافذة الخدمات الرقمية.',
      'تشمل التحديثات تحسين عرض الأخبار لتكون القراءة أسرع مع تفاصيل منظمة وروابط مشاركة مباشرة.',
      'تدعو النقابة جميع الأطباء للاطلاع الدوري على قسم آخر الأخبار لمتابعة المستجدات الرسمية أولًا بأول.',
    ],
  },
  {
    slug: 'scientific-activity-restorative-dentistry',
    section: 'activities',
    title: 'نشاط علمي حول أحدث بروتوكولات الترميم السني',
    date: '2 حزيران 2026',
    excerpt: 'برنامج علمي مكثف بمشاركة خبراء في طب الأسنان الترميمي.',
    cover: 'https://picsum.photos/seed/news-cover-2/1200/700',
    reporter: 'لجنة التعليم المستمر',
    readTime: '5 دقائق',
    tags: ['أنشطة', 'علمي', 'تدريب'],
    gallery: [
      'https://picsum.photos/seed/news-gallery-2a/1100/700',
      'https://picsum.photos/seed/news-gallery-2b/1100/700',
    ],
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
    cover: 'https://picsum.photos/seed/news-cover-3/1200/700',
    reporter: 'شؤون الأطباء',
    readTime: '3 دقائق',
    tags: ['إعلانات', 'اشتراكات', 'تنويه'],
    gallery: [
      'https://picsum.photos/seed/news-gallery-3a/1100/700',
      'https://picsum.photos/seed/news-gallery-3b/1100/700',
    ],
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
    cover: 'https://picsum.photos/seed/news-cover-4/1200/700',
    reporter: 'وحدة التحول الرقمي',
    readTime: '4 دقائق',
    tags: ['آخر الأخبار', 'تحول رقمي', 'خدمات'],
    gallery: [
      'https://picsum.photos/seed/news-gallery-4a/1100/700',
      'https://picsum.photos/seed/news-gallery-4b/1100/700',
    ],
    content: [
      'أطلق الفرع مجموعة خدمات رقمية جديدة لتسهيل تقديم الطلبات النقابية دون الحاجة إلى مراجعات متعددة.',
      'تساعد هذه الباقة في تسريع مسار المعاملات ورفع كفاءة التواصل بين الأعضاء والفرع.',
      'يمكن الوصول إلى جميع الخدمات عبر البوابة الرسمية من قسم الأخبار والخدمات.',
    ],
  },
]

const tickerItems = [
  'تحديثات يومية مع صياغة واضحة وسريعة القراءة',
  'أولوية للأخبار الرسمية والتنويهات النقابية',
  'تغطية الفعاليات العلمية والمجتمعية بشكل بصري احترافي',
]

const editorialPillars = [
  {
    title: 'الموثوقية',
    text: 'كل خبر يعرض بصيغة رسمية مختصرة مع تاريخ واضح ومسار وصول مباشر للتفاصيل.',
  },
  {
    title: 'السرعة',
    text: 'واجهة أخبار سريعة التحميل والتصفح مع تسلسل منطقي يقود المستخدم للمعلومة فوراً.',
  },
  {
    title: 'الوضوح البصري',
    text: 'تباين قوي، مسافات متناسقة، وبطاقات مقروءة على كل أحجام الشاشات.',
  },
]

const stylePresets = [
  { id: 'default', label: 'رسمي كلاسيكي', radius: 14, gap: 1, themeClass: '' },
  { id: 'royal', label: 'ملكي فاخر', radius: 22, gap: 1.08, themeClass: 'site--theme-royal' },
  { id: 'midnight', label: 'ليلي حديث', radius: 12, gap: 0.95, themeClass: 'site--theme-midnight' },
]

const buttonVariants = [
  { id: 'rounded', label: 'منحني', className: 'site--btn-rounded' },
  { id: 'pill', label: 'حبّة', className: 'site--btn-pill' },
  { id: 'sharp', label: 'حواف واضحة', className: 'site--btn-sharp' },
]

const cardVariants = [
  { id: 'soft', label: 'ناعم', className: 'site--cards-soft' },
  { id: 'glass', label: 'زجاجي', className: 'site--cards-glass' },
  { id: 'bold', label: 'جريء', className: 'site--cards-bold' },
]

const galleryCategories = [
  { id: 'all', label: 'كل الأقسام' },
  { id: 'scientific', label: 'علمي' },
  { id: 'community', label: 'مجتمعي' },
  { id: 'training', label: 'تدريبي' },
  { id: 'conference', label: 'مؤتمرات' },
]

const dayFilters = [
  { id: 'all', label: 'كل المدد' },
  { id: '1', label: 'فعالية يوم واحد' },
  { id: '2-3', label: 'من 2 إلى 3 أيام' },
  { id: '4+', label: '4 أيام وأكثر' },
]

const events = [
  {
    id: 'summer-forum-2026',
    title: 'الملتقى الصيفي المتقدم لطب الأسنان الترميمي',
    category: 'scientific',
    categoryLabel: 'علمي',
    days: 3,
    date: '10-12 تموز 2026',
    location: 'قاعة المؤتمرات - اللاذقية',
    description: 'جلسات علمية مكثفة مع تطبيقات سريرية مباشرة وحالات تفاعلية.',
    cover: 'https://picsum.photos/seed/summer-forum-cover/1200/700',
    agenda: [
      { day: 'اليوم 1', section: 'جلسات افتتاحية وتحديثات علمية متقدمة' },
      { day: 'اليوم 2', section: 'ورش تطبيقية في الترميم المحافظ' },
      { day: 'اليوم 3', section: 'حالات سريرية تفاعلية وتقييم نهائي' },
    ],
    price: '250,000 ل.س',
    registration: 'التسجيل عبر نموذج النشاط العلمي في البوابة أو من خلال مكتب التعليم المستمر.',
    photos: [
      'https://picsum.photos/seed/summer-forum-1/900/600',
      'https://picsum.photos/seed/summer-forum-2/900/600',
      'https://picsum.photos/seed/summer-forum-3/900/600',
    ],
  },
  {
    id: 'volunteer-dental-week',
    title: 'أسبوع العيادات التطوعية لخدمة المجتمع',
    category: 'community',
    categoryLabel: 'مجتمعي',
    days: 5,
    date: '18-22 آب 2026',
    location: 'عدة مراكز مجتمعية - اللاذقية',
    description: 'مبادرة مجتمعية تقدم فحوصات وتوعية صحية في عدة أحياء.',
    cover: 'https://picsum.photos/seed/community-week-cover/1200/700',
    agenda: [
      { day: 'اليوم 1', section: 'انطلاق الحملة وتوزيع الفرق' },
      { day: 'اليوم 2', section: 'عيادات ميدانية مجانية في الأحياء' },
      { day: 'اليوم 3', section: 'جلسات توعية مدرسية' },
      { day: 'اليوم 4', section: 'فحوصات تخصصية للحالات المحولة' },
      { day: 'اليوم 5', section: 'تقرير ختامي وتوصيات المجتمع' },
    ],
    price: 'مجاني',
    registration: 'التسجيل التطوعي عبر لجنة العمل المجتمعي مع تأكيد الاسم والاختصاص.',
    photos: [
      'https://picsum.photos/seed/community-week-1/900/600',
      'https://picsum.photos/seed/community-week-2/900/600',
      'https://picsum.photos/seed/community-week-3/900/600',
    ],
  },
  {
    id: 'digital-workflow-bootcamp',
    title: 'معسكر العمل الرقمي لعيادات الأسنان',
    category: 'training',
    categoryLabel: 'تدريبي',
    days: 2,
    date: '3-4 أيلول 2026',
    location: 'مركز التدريب النقابي',
    description: 'تدريب عملي على إدارة مواعيد المرضى والملفات الطبية رقمياً.',
    cover: 'https://picsum.photos/seed/bootcamp-cover/1200/700',
    agenda: [
      { day: 'اليوم 1', section: 'تهيئة الأنظمة وإدارة السجلات الطبية' },
      { day: 'اليوم 2', section: 'سيناريوهات تشغيل وحوكمة بيانات' },
    ],
    price: '180,000 ل.س',
    registration: 'حجز المقعد عبر منصة التدريب الرقمي ثم تسديد الرسوم في صندوق الفرع.',
    photos: [
      'https://picsum.photos/seed/bootcamp-1/900/600',
      'https://picsum.photos/seed/bootcamp-2/900/600',
      'https://picsum.photos/seed/bootcamp-3/900/600',
    ],
  },
  {
    id: 'regional-conference-innovation',
    title: 'المؤتمر الإقليمي لابتكارات طب الأسنان',
    category: 'conference',
    categoryLabel: 'مؤتمرات',
    days: 1,
    date: '20 تشرين الأول 2026',
    location: 'مدينة المعارض - اللاذقية',
    description: 'جلسات رئيسية ومعرض تقنيات حديثة من شركات ومراكز تدريب.',
    cover: 'https://picsum.photos/seed/conference-cover/1200/700',
    agenda: [{ day: 'اليوم 1', section: 'جلسات رئيسية + معرض ابتكارات' }],
    price: '300,000 ل.س',
    registration: 'التسجيل الإلكتروني المباشر مع إرسال رمز التأكيد إلى البريد الإلكتروني.',
    photos: [
      'https://picsum.photos/seed/conference-1/900/600',
      'https://picsum.photos/seed/conference-2/900/600',
      'https://picsum.photos/seed/conference-3/900/600',
    ],
  },
]

function getRoute() {
  const rawHash = window.location.hash.replace(/^#\/?/, '')
  if (!rawHash) return { type: 'home' }

  const hash = decodeURIComponent(rawHash)

  if (hash === 'about') return { type: 'about' }
  if (hash === 'events-gallery') return { type: 'events-gallery' }
  if (hash === 'admin-dashboard') return { type: 'admin-dashboard' }

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
  const [galleryCategory, setGalleryCategory] = useState('all')
  const [galleryDays, setGalleryDays] = useState('all')
  const [newsSectionFilter, setNewsSectionFilter] = useState('all')
  const [newsSearch, setNewsSearch] = useState('')
  const [adminRadius, setAdminRadius] = useState(14)
  const [adminGap, setAdminGap] = useState(1)
  const [buttonVariant, setButtonVariant] = useState('rounded')
  const [cardVariant, setCardVariant] = useState('soft')
  const [themeVariant, setThemeVariant] = useState('default')
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

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const byCategory = galleryCategory === 'all' || event.category === galleryCategory

      const byDays =
        galleryDays === 'all' ||
        (galleryDays === '1' && event.days === 1) ||
        (galleryDays === '2-3' && event.days >= 2 && event.days <= 3) ||
        (galleryDays === '4+' && event.days >= 4)

      return byCategory && byDays
    })
  }, [galleryCategory, galleryDays])

  const galleryInsights = useMemo(() => {
    const totalPhotos = filteredEvents.reduce((sum, event) => sum + event.photos.length, 0)
    const totalDays = filteredEvents.reduce((sum, event) => sum + event.days, 0)
    return {
      events: filteredEvents.length,
      photos: totalPhotos,
      days: totalDays,
    }
  }, [filteredEvents])

  const previousNews = newsIndex > 0 ? newsItems[newsIndex - 1] : null
  const nextNews = newsIndex >= 0 && newsIndex < newsItems.length - 1 ? newsItems[newsIndex + 1] : null
  const featuredNews = newsItems[0]
  const latestHeadlines = newsItems.slice(0, 4)
  const selectedTheme = stylePresets.find((item) => item.id === themeVariant) ?? stylePresets[0]
  const selectedButtonClass =
    buttonVariants.find((item) => item.id === buttonVariant)?.className ?? 'site--btn-rounded'
  const selectedCardClass =
    cardVariants.find((item) => item.id === cardVariant)?.className ?? 'site--cards-soft'

  const filteredLatestNews = useMemo(() => {
    const query = newsSearch.trim().toLowerCase()
    return newsItems
      .filter((item) => newsSectionFilter === 'all' || item.section === newsSectionFilter)
      .filter((item) => {
        if (!query) return true
        const haystack = `${item.title} ${item.excerpt} ${item.tags.join(' ')}`.toLowerCase()
        return haystack.includes(query)
      })
  }, [newsSearch, newsSectionFilter])

  function applyPreset(presetId) {
    const preset = stylePresets.find((item) => item.id === presetId)
    if (!preset) return
    setThemeVariant(preset.id)
    setAdminRadius(preset.radius)
    setAdminGap(preset.gap)
  }

  function renderHome() {
    return (
      <>
        <section className="hero hero--premium">
          <div className="container hero__grid">
            <div className="fade-up">
              <p className="eyebrow">بوابة رقمية متقدمة للنقابة</p>
              <h1>تجربة أخبار وفعاليات بمعايير UI/UX حديثة</h1>
              <p className="hero__text">
                تصميم متوازن وسريع، مستوحى من أسلوب المنصات الرسمية الكبيرة، مع إبراز آخر الأخبار
                ومعرض فعاليات ذكي حسب عدد الأيام والتصنيف.
              </p>
              <div className="hero__actions">
                <a href="#/news-section/latest-news" className="btn btn--lux">
                  آخر الأخبار
                </a>
                <a href="#/events-gallery" className="btn btn--primary">
                  معرض الفعاليات
                </a>
                <a href="#/about" className="btn btn--ghost">
                  من نحن
                </a>
              </div>
            </div>

            <div className="hero__panel glass fade-up delay-1">
              <h2>مؤشرات الفرع</h2>
              <div className="metrics metrics--2col">
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

        <section className="news-ticker">
          <div className="container news-ticker__inner">
            <strong>موجز الأخبار</strong>
            <div className="news-ticker__track">
              {[...tickerItems, ...tickerItems].map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <main className="container">
          <section className="section">
            <div className="section__head fade-up">
              <h2>الواجهة الإخبارية الرسمية</h2>
              <p>توزيع بصري أقرب للمنصات الإخبارية الكبرى مع خبر رئيسي وعناوين مباشرة.</p>
            </div>
            <div className="news-layout">
              <article className="news-lead card card--news fade-up">
                <p className="meta">{featuredNews.date}</p>
                <h3>{featuredNews.title}</h3>
                <p>{featuredNews.excerpt}</p>
                <div className="news-lead__actions">
                  <a className="btn btn--lux" href={`#/news/${featuredNews.slug}`}>
                    اقرأ الخبر الرئيسي
                  </a>
                  <a className="btn btn--ghost" href={`#/news-section/${featuredNews.section}`}>
                    جميع أخبار القسم
                  </a>
                </div>
              </article>

              <aside className="news-brief card fade-up delay-1">
                <h3>عناوين سريعة</h3>
                <ul>
                  {latestHeadlines.map((item) => (
                    <li key={item.slug}>
                      <a href={`#/news/${item.slug}`}>{item.title}</a>
                      <small>{item.date}</small>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>

          <section className="section">
            <div className="section__head fade-up">
              <h2>الخدمات الأساسية</h2>
              <p>نظام واجهات أبسط، بطاقات أوضح، وأزرار عملية سريعة.</p>
            </div>
            <div className="cards cards--premium">
              {services.map((service, index) => (
                <article key={service.title} className={`card card--feature fade-up delay-${(index % 3) + 1}`}>
                  <span className="card__icon" aria-hidden="true">
                    {service.icon}
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <button type="button" className="btn btn--small btn--ghost">
                    التفاصيل
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section__head fade-up">
              <h2>أحدث الأخبار بشكل احترافي</h2>
              <p>فلترة مباشرة، بطاقات محسنة، ونقر كامل للانتقال إلى صفحة الخبر.</p>
            </div>
            <div className="news-filter-bar fade-up">
              <div className="filter-chips">
                <button
                  type="button"
                  className={`chip ${newsSectionFilter === 'all' ? 'chip--active' : ''}`}
                  onClick={() => setNewsSectionFilter('all')}
                >
                  كل الأخبار
                </button>
                {newsSections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    className={`chip ${newsSectionFilter === section.id ? 'chip--active' : ''}`}
                    onClick={() => setNewsSectionFilter(section.id)}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
              <input
                type="search"
                value={newsSearch}
                onChange={(event) => setNewsSearch(event.target.value)}
                className="news-search"
                placeholder="ابحث داخل آخر الأخبار..."
                aria-label="بحث في آخر الأخبار"
              />
            </div>
            <div className="cards cards--premium">
              {filteredLatestNews.slice(0, 6).map((item, index) => (
                <a
                  key={item.slug}
                  href={`#/news/${item.slug}`}
                  className={`card card--news card--news-link fade-up delay-${(index % 3) + 1}`}
                >
                  <img src={item.cover} alt={item.title} className="news-card__image" loading="lazy" />
                  <p className="meta">{item.date}</p>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <span className="btn btn--small btn--lux">قراءة كاملة</span>
                </a>
              ))}
            </div>
            {filteredLatestNews.length === 0 ? (
              <p className="empty-state">لا توجد نتائج مطابقة للفلاتر الحالية.</p>
            ) : null}
          </section>

          <section className="section">
            <div className="section__head fade-up">
              <h2>خارطة الأقسام والتوجيه</h2>
              <p>انتقال سريع لكل قسم أساسي داخل الموقع.</p>
            </div>
            <div className="cards cards--premium">
              <article className="card card--feature hover-lift">
                <h3>الرئيسية</h3>
                <p>الواجهة العامة والملخص السريع.</p>
                <a className="btn btn--small btn--primary" href="#/">
                  فتح الرئيسية
                </a>
              </article>
              <article className="card card--feature hover-lift">
                <h3>الأخبار والأنشطة</h3>
                <p>تغطية متكاملة للأخبار المرتبطة بالفعاليات العلمية.</p>
                <a className="btn btn--small btn--primary" href="#/news-section/activities">
                  فتح القسم
                </a>
              </article>
              <article className="card card--feature hover-lift">
                <h3>آخر الأخبار</h3>
                <p>أحدث التحديثات الرسمية بأسلوب عرض متجدد.</p>
                <a className="btn btn--small btn--primary" href="#/news-section/latest-news">
                  عرض آخر الأخبار
                </a>
              </article>
              <article className="card card--feature hover-lift">
                <h3>معرض الفعاليات</h3>
                <p>صور الفعاليات حسب عدد الأيام والتصنيف.</p>
                <a className="btn btn--small btn--primary" href="#/events-gallery">
                  فتح المعرض
                </a>
              </article>
            </div>
          </section>

          <section className="section">
            <div className="section__head fade-up">
              <h2>معاينة سريعة لمعرض الفعاليات</h2>
              <p>عرض مختصر قبل الدخول للمعرض الكامل.</p>
            </div>
            <div className="cards cards--premium">
              {events.slice(0, 2).map((event) => (
                <article key={event.id} className="card card--feature gallery-preview hover-lift">
                  <img src={event.photos[0]} alt={event.title} loading="lazy" />
                  <div className="gallery-preview__content">
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <div className="badges-row">
                      <span className="badge">{event.categoryLabel}</span>
                      <span className="badge">{event.days} أيام</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <a href="#/events-gallery" className="btn btn--lux">
              عرض المعرض الكامل
            </a>
          </section>

          <section className="section member-journey">
            <div className="section__head fade-up">
              <h2>رحلة العضو داخل المنصة</h2>
              <p>مسار واضح من الاطلاع وحتى تنفيذ الإجراء المطلوب خلال دقائق.</p>
            </div>
            <div className="cards cards--premium">
              <article className="card card--feature hover-lift">
                <h3>1) اكتشف</h3>
                <p>تصفّح آخر الأخبار والفعاليات في واجهة مخصصة للقراءة السريعة.</p>
              </article>
              <article className="card card--feature hover-lift">
                <h3>2) اختر</h3>
                <p>استخدم فلاتر الأيام والتصنيفات للوصول الدقيق للفعالية المطلوبة.</p>
              </article>
              <article className="card card--feature hover-lift">
                <h3>3) تفاعل</h3>
                <p>شارك الأخبار والفعاليات مباشرة عبر وسائل التواصل من داخل الصفحة.</p>
              </article>
            </div>
          </section>

          <section className="section">
            <div className="section__head fade-up">
              <h2>روح المنصة الإخبارية</h2>
              <p>ثلاث ركائز تحافظ على أناقة الموقع الرسمي وقوته في نقل الأخبار.</p>
            </div>
            <div className="cards cards--premium">
              {editorialPillars.map((pillar, index) => (
                <article key={pillar.title} className={`card card--feature fade-up delay-${(index % 3) + 1}`}>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </article>
              ))}
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

        <div className="timeline timeline--premium">
          {sectionNews.map((item, index) => (
            <article key={item.slug} className={`timeline__item card--feature fade-up delay-${(index % 3) + 1}`}>
              <p className="meta">{item.date}</p>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
              <a className="btn btn--small btn--primary" href={`#/news/${item.slug}`}>
                قراءة الخبر
              </a>
            </article>
          ))}
        </div>
      </main>
    )
  }

  function renderEventsGallery() {
    return (
      <main className="container section-page fade-up">
        <a className="back-link" href="#/">
          ← العودة إلى الرئيسية
        </a>

        <h1>معرض صور الفعاليات</h1>
        <p className="section-description">
          استعرض الفعاليات حسب القسم وعدد أيام كل فعالية ضمن تجربة بصرية مميزة.
        </p>

        <section className="gallery-filters">
          <div>
            <h3>التصنيف</h3>
            <div className="filter-chips">
              {galleryCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`chip ${galleryCategory === category.id ? 'chip--active' : ''}`}
                  onClick={() => setGalleryCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3>عدد الأيام</h3>
            <div className="filter-chips">
              {dayFilters.map((day) => (
                <button
                  key={day.id}
                  type="button"
                  className={`chip ${galleryDays === day.id ? 'chip--active' : ''}`}
                  onClick={() => setGalleryDays(day.id)}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery-insights">
          <article className="insight-card">
            <p>{galleryInsights.events}</p>
            <small>فعالية مطابقة</small>
          </article>
          <article className="insight-card">
            <p>{galleryInsights.photos}</p>
            <small>صورة ضمن النتائج</small>
          </article>
          <article className="insight-card">
            <p>{galleryInsights.days}</p>
            <small>إجمالي أيام التغطية</small>
          </article>
        </section>

        <div className="event-grid">
          {filteredEvents.map((event) => (
            <article key={event.id} className="event-card" id={event.id}>
              <img className="event-card__cover" src={event.cover} alt={event.title} loading="lazy" />
              <div className="event-card__head">
                <h2>{event.title}</h2>
                <div className="badges-row">
                  <span className="badge">{event.categoryLabel}</span>
                  <span className="badge">{event.days} أيام</span>
                </div>
              </div>

              <p>{event.description}</p>
              <p className="meta">{event.date} • {event.location}</p>

              <div className="agenda">
                <h3>برنامج الأيام</h3>
                <div className="agenda__list">
                  {event.agenda.map((agendaItem) => (
                    <div key={`${event.id}-${agendaItem.day}`} className="agenda__item">
                      <strong>{agendaItem.day}</strong>
                      <span>{agendaItem.section}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="event-photos">
                {event.photos.map((photoUrl, idx) => (
                  <img key={photoUrl} src={photoUrl} alt={`${event.title} - صورة ${idx + 1}`} loading="lazy" />
                ))}
              </div>

              <div className="event-card__footer">
                <span>إجمالي الصور: {event.photos.length}</span>
                <span>السعر: {event.price}</span>
                <button type="button" className="btn btn--small btn--lux">
                  حفظ للمراجعة
                </button>
              </div>
              <div className="event-registration">
                <h3>طريقة التسجيل</h3>
                <p>{event.registration}</p>
              </div>
            </article>
          ))}
        </div>

        {filteredEvents.length === 0 ? (
          <p className="empty-state">لا توجد فعاليات مطابقة للفلاتر المختارة حاليًا.</p>
        ) : null}
      </main>
    )
  }

  function renderAboutPage() {
    return (
      <main className="container section-page fade-up">
        <a className="back-link" href="#/">
          ← العودة إلى الرئيسية
        </a>
        <article className="news-detail glass">
          <h1>من نحن</h1>
          <p>
            نقابة أطباء الأسنان فرع اللاذقية هي المظلة المهنية الرسمية التي تمثل أطباء الأسنان في
            المحافظة، وتعمل على تنظيم المهنة، تطوير المهارات، وخدمة المجتمع.
          </p>
          <p>
            نطوّر المنصة باستمرار وفق مبادئ UX الحديثة: وضوح التوجيه، سرعة الوصول، وتقديم المحتوى
            بشكل سهل القراءة على كل الأجهزة.
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
          <img src={currentNews.cover} alt={currentNews.title} className="news-detail__cover" loading="lazy" />
          <table className="news-table">
            <tbody>
              <tr>
                <th scope="row">القسم</th>
                <td>{newsSections.find((section) => section.id === currentNews.section)?.title ?? '—'}</td>
              </tr>
              <tr>
                <th scope="row">التاريخ</th>
                <td>{currentNews.date}</td>
              </tr>
              <tr>
                <th scope="row">المصدر</th>
                <td>{currentNews.reporter}</td>
              </tr>
              <tr>
                <th scope="row">مدة القراءة</th>
                <td>{currentNews.readTime}</td>
              </tr>
            </tbody>
          </table>
          <p className="meta">{currentNews.date}</p>
          <h1>{currentNews.title}</h1>
          {currentNews.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="badges-row">
            {currentNews.tags.map((tag) => (
              <span key={tag} className="badge">
                {tag}
              </span>
            ))}
          </div>
          <div className="news-detail__gallery">
            {currentNews.gallery.map((imageUrl, index) => (
              <img key={`${imageUrl}-${index}`} src={imageUrl} alt={`${currentNews.title} - ${index + 1}`} loading="lazy" />
            ))}
          </div>

          <div className="news-actions">
            <button
              type="button"
              className="btn btn--small btn--lux"
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

  function renderAdminDashboard() {
    return (
      <main className="container section-page fade-up">
        <a className="back-link" href="#/">
          ← العودة إلى الرئيسية
        </a>
        <section className="admin-panel">
          <h1>Dashboard السوبر أدمن</h1>
          <p>تخصيص سريع للسحب والاختيار حتى تبدّل شكل الموقع كامل بسهولة.</p>

          <div className="admin-grid">
            <article className="admin-card">
              <h2>الثيمات الجاهزة</h2>
              <div className="filter-chips">
                {stylePresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={`chip ${themeVariant === preset.id ? 'chip--active' : ''}`}
                    onClick={() => applyPreset(preset.id)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </article>

            <article className="admin-card">
              <h2>شكل الأزرار</h2>
              <div className="filter-chips">
                {buttonVariants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    className={`chip ${buttonVariant === variant.id ? 'chip--active' : ''}`}
                    onClick={() => setButtonVariant(variant.id)}
                  >
                    {variant.label}
                  </button>
                ))}
              </div>
            </article>

            <article className="admin-card">
              <h2>شكل البطاقات</h2>
              <div className="filter-chips">
                {cardVariants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    className={`chip ${cardVariant === variant.id ? 'chip--active' : ''}`}
                    onClick={() => setCardVariant(variant.id)}
                  >
                    {variant.label}
                  </button>
                ))}
              </div>
            </article>

            <article className="admin-card">
              <h2>الأبعاد (سحب)</h2>
              <label className="admin-slider">
                <span>استدارة العناصر: {adminRadius}px</span>
                <input
                  type="range"
                  min="8"
                  max="28"
                  step="1"
                  value={adminRadius}
                  onChange={(event) => setAdminRadius(Number(event.target.value))}
                />
              </label>
              <label className="admin-slider">
                <span>كثافة المسافات: {adminGap.toFixed(2)}x</span>
                <input
                  type="range"
                  min="0.85"
                  max="1.2"
                  step="0.01"
                  value={adminGap}
                  onChange={(event) => setAdminGap(Number(event.target.value))}
                />
              </label>
            </article>
          </div>
        </section>
      </main>
    )
  }

  return (
    <div
      className={`site ${selectedTheme.themeClass} ${selectedButtonClass} ${selectedCardClass}`}
      style={
        {
          '--ui-radius': `${adminRadius}px`,
          '--ui-gap-scale': adminGap,
        }
      }
      dir="rtl"
    >
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
            <a href="#/events-gallery">معرض الفعاليات</a>
            <a href="#/admin-dashboard">Dashboard</a>
            <a href="#/about">من نحن</a>
          </nav>
        </div>
      </header>

      {notificationPermission !== 'granted' ? (
        <section className="notification-strip">
          <div className="container notification-strip__inner">
            <p>
              {notificationPermission === 'denied' && 'تم رفض الإشعارات. يمكنك تفعيلها من إعدادات المتصفح.'}
              {notificationPermission === 'default' && 'فعّل الإشعارات للحصول على آخر الأخبار فور نشرها.'}
              {notificationPermission === 'unsupported' && 'متصفحك لا يدعم إشعارات الويب.'}
            </p>
            {notificationPermission !== 'unsupported' ? (
              <button type="button" className="btn btn--small btn--primary" onClick={requestNotifications}>
                طلب إرسال إشعارات
              </button>
            ) : null}
          </div>
        </section>
      ) : null}

      {route.type === 'home' && renderHome()}
      {route.type === 'about' && renderAboutPage()}
      {route.type === 'events-gallery' && renderEventsGallery()}
      {route.type === 'admin-dashboard' && renderAdminDashboard()}
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
