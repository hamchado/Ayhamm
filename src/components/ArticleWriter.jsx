import { useState } from 'react'

const SECTIONS = [
  { id: 'title', label: 'عنوان البحث', placeholder: 'أدخل عنوان البحث العلمي...', rows: 2 },
  { id: 'abstract', label: 'الملخص (Abstract)', placeholder: 'اكتب ملخصاً موجزاً للبحث (150–250 كلمة)...', rows: 5 },
  { id: 'keywords', label: 'الكلمات المفتاحية', placeholder: 'مثال: التعلم الآلي، معالجة اللغة، التحليل الإحصائي', rows: 2 },
  { id: 'introduction', label: 'المقدمة (Introduction)', placeholder: 'اكتب مقدمة تتضمن خلفية الدراسة وأهميتها وإشكاليتها...', rows: 8 },
  { id: 'problem', label: 'مشكلة الدراسة', placeholder: 'صِف مشكلة البحث وأسئلة الدراسة بوضوح...', rows: 4 },
  { id: 'objectives', label: 'أهداف الدراسة', placeholder: 'اذكر أهداف البحث (يمكن استخدام ترقيم أو نقاط)...', rows: 4 },
  { id: 'hypotheses', label: 'فرضيات الدراسة', placeholder: 'اذكر فرضيات البحث...', rows: 4 },
  { id: 'literature', label: 'الإطار النظري والدراسات السابقة', placeholder: 'ناقش الأدبيات والدراسات ذات الصلة...', rows: 8 },
  { id: 'methodology', label: 'منهجية البحث (Methodology)', placeholder: 'صِف المنهج المستخدم، مجتمع الدراسة، العينة، أدوات جمع البيانات...', rows: 8 },
  { id: 'results', label: 'النتائج (Results)', placeholder: 'اعرض نتائج التحليل الإحصائي...', rows: 8 },
  { id: 'discussion', label: 'المناقشة (Discussion)', placeholder: 'فسّر النتائج وناقشها في ضوء الدراسات السابقة...', rows: 8 },
  { id: 'conclusion', label: 'الخاتمة والتوصيات', placeholder: 'اكتب خاتمة وأبرز التوصيات...', rows: 5 },
  { id: 'references', label: 'قائمة المراجع', placeholder: 'أدرج المراجع بصيغة APA أو أي نظام توثيق معتمد...', rows: 6 },
]

const TEMPLATES = {
  quantitative: {
    name: 'دراسة كمية',
    values: {
      title: 'أثر [المتغير المستقل] على [المتغير التابع]: دراسة ميدانية على [مجتمع الدراسة]',
      abstract: 'هدفت هذه الدراسة إلى الكشف عن أثر [المتغير المستقل] على [المتغير التابع] لدى [مجتمع الدراسة]. اعتمدت الدراسة المنهج الوصفي التحليلي، وتكوّنت عينة الدراسة من [العدد] فرداً تم اختيارهم بالطريقة [العشوائية/القصدية]. استخدمت الدراسة [اسم الاستبانة] أداةً لجمع البيانات، وتمت معالجة البيانات باستخدام برنامج SPSS. أشارت النتائج إلى [أبرز النتائج]. وأوصت الدراسة بـ[أبرز التوصيات].',
      keywords: '[المتغير المستقل]، [المتغير التابع]، [مجتمع الدراسة]، المنهج الكمي',
      introduction: 'يُعدّ موضوع [الموضوع] من المواضيع التي نالت اهتماماً واسعاً في الأدبيات الأكاديمية خلال السنوات الأخيرة، لما له من أهمية بالغة في [المجال]. وقد تباينت الدراسات في تناول هذا الموضوع من زوايا مختلفة، غير أن الفجوة البحثية لا تزال قائمة فيما يتعلق بـ[الفجوة]. من هذا المنطلق جاءت هذه الدراسة.',
      problem: 'تتمحور مشكلة الدراسة حول التساؤل الرئيسي الآتي:\nما أثر [المتغير المستقل] على [المتغير التابع] لدى [مجتمع الدراسة]؟\nويتفرع منه الأسئلة الفرعية الآتية:\n1. ما مستوى [المتغير المستقل] لدى أفراد العينة؟\n2. ما مستوى [المتغير التابع] لدى أفراد العينة؟\n3. هل توجد فروق ذات دلالة إحصائية في [المتغير التابع] تُعزى إلى [المتغير المستقل]؟',
      objectives: '1. التعرف على مستوى [المتغير المستقل] لدى أفراد عينة الدراسة.\n2. التعرف على مستوى [المتغير التابع] لدى أفراد عينة الدراسة.\n3. الكشف عن أثر [المتغير المستقل] على [المتغير التابع].\n4. تقديم توصيات عملية في ضوء نتائج الدراسة.',
      hypotheses: 'H₀: لا يوجد أثر ذو دلالة إحصائية عند مستوى (α ≤ 0.05) لـ[المتغير المستقل] على [المتغير التابع].\nH₁: يوجد أثر ذو دلالة إحصائية عند مستوى (α ≤ 0.05) لـ[المتغير المستقل] على [المتغير التابع].',
      literature: 'أولاً: الإطار النظري\n[اشرح المفاهيم النظرية المرتبطة بالمتغيرات]\n\nثانياً: الدراسات السابقة\nأجرى [الباحث، السنة] دراسة هدفت إلى ... وتوصل إلى ...\nكما أجرى [الباحث، السنة] دراسة ...',
      methodology: 'منهج الدراسة: اعتمدت الدراسة المنهج الوصفي التحليلي.\nمجتمع الدراسة: يتكون مجتمع الدراسة من [وصف المجتمع].\nعينة الدراسة: تم اختيار عينة عشوائية مكونة من [العدد] فرداً.\nأداة الدراسة: استخدمت الدراسة استبانة مؤلفة من [العدد] فقرة موزعة على [العدد] محاور.\nصدق الأداة وثباتها: تحقق من صدق الأداة من خلال [الأسلوب]، وبلغ معامل ألفا كرونباخ [القيمة].\nالأساليب الإحصائية: استُخدم برنامج SPSS وتضمنت الأساليب: التكرارات والنسب المئوية، والمتوسطات الحسابية والانحرافات المعيارية، ومعامل ارتباط بيرسون، وتحليل الانحدار.',
      results: 'أولاً: الإحصاء الوصفي\n[أدرج جدول المتوسطات والانحرافات المعيارية]\n\nثانياً: اختبار الفرضيات\n- نتائج معامل الارتباط بيرسون: r = [القيمة]، وهي دالة إحصائياً عند مستوى (α ≤ 0.05).\n- نتائج تحليل الانحدار: β = [القيمة]، R² = [القيمة].',
      discussion: 'تتسق النتيجة الأولى مع ما توصل إليه [الباحث، السنة] الذي أكد...\nفي المقابل، تختلف هذه النتيجة مع دراسة [الباحث، السنة] التي أشارت إلى...\nويُعزى ذلك إلى [التفسير].',
      conclusion: 'خلصت الدراسة إلى جملة من النتائج أبرزها:\n1. [النتيجة الأولى]\n2. [النتيجة الثانية]\n\nالتوصيات:\n1. [التوصية الأولى]\n2. [التوصية الثانية]',
      references: '',
    },
  },
  qualitative: {
    name: 'دراسة نوعية',
    values: {
      title: 'استكشاف [الظاهرة] من منظور [المشاركين]: دراسة نوعية',
      abstract: 'هدفت هذه الدراسة النوعية إلى استكشاف [الظاهرة] من وجهة نظر [المشاركين]. اعتمدت الدراسة المنهج الظاهراتي/الإثنوغرافي، وأُجريت مقابلات معمّقة مع [العدد] مشاركاً. تم تحليل البيانات باستخدام التحليل الموضوعاتي (Thematic Analysis). وتوصلت الدراسة إلى [أبرز النتائج].',
      keywords: '[الظاهرة]، [المشاركون]، دراسة نوعية، تحليل موضوعاتي',
      introduction: 'تُعدّ ظاهرة [الظاهرة] من الظواهر التي تستدعي فهماً عميقاً لا يكتفي بالأرقام والقياس الكمي، بل يتطلب الغوص في التجارب المعيشية للأفراد. من هذا المنطلق انطلقت هذه الدراسة النوعية.',
      problem: 'تسعى الدراسة إلى الإجابة عن السؤال الجوهري:\nكيف يعيش [المشاركون] تجربة [الظاهرة]؟ وما المعاني التي يبنونها حولها؟',
      objectives: '1. استكشاف تجارب [المشاركين] مع [الظاهرة].\n2. فهم المعاني التي يُسبغها [المشاركون] على [الظاهرة].\n3. استخلاص الأنماط والموضوعات المشتركة.',
      hypotheses: 'لا تسعى الدراسات النوعية إلى اختبار فرضيات مسبقة، بل تنطلق من تساؤلات بحثية مفتوحة تتشكّل في ضوء البيانات المُجمَّعة.',
      literature: '[استعرض الأدبيات النوعية ذات الصلة]',
      methodology: 'منهج الدراسة: المنهج النوعي (الظاهراتي / دراسة الحالة).\nأداة جمع البيانات: مقابلات معمّقة شبه منظمة.\nالمشاركون: [وصف المشاركين وطريقة اختيارهم].\nتحليل البيانات: التحليل الموضوعاتي وفق خطوات Braun & Clarke (2006).',
      results: '[اعرض الموضوعات الرئيسية المستخلصة من البيانات مع الاقتباسات الداعمة]',
      discussion: '[ناقش الموضوعات في ضوء الأدبيات والدراسات السابقة]',
      conclusion: '[خلاصة الدراسة والتوصيات والبحوث المقترحة]',
      references: '',
    },
  },
}

function ArticleWriter() {
  const [values, setValues] = useState(() =>
    Object.fromEntries(SECTIONS.map(s => [s.id, '']))
  )
  const [preview, setPreview] = useState(false)
  const [authorInfo, setAuthorInfo] = useState({
    name: '',
    affiliation: '',
    email: '',
    date: new Date().toLocaleDateString('ar-SA'),
  })

  function applyTemplate(tplKey) {
    const tpl = TEMPLATES[tplKey]
    if (tpl) setValues(tpl.values)
  }

  function exportArticle() {
    const lines = []
    lines.push('═'.repeat(60))
    lines.push(values.title || 'بدون عنوان')
    lines.push('═'.repeat(60))
    if (authorInfo.name) lines.push(`الباحث: ${authorInfo.name}`)
    if (authorInfo.affiliation) lines.push(`الانتماء المؤسسي: ${authorInfo.affiliation}`)
    if (authorInfo.email) lines.push(`البريد الإلكتروني: ${authorInfo.email}`)
    if (authorInfo.date) lines.push(`التاريخ: ${authorInfo.date}`)
    lines.push('')
    SECTIONS.slice(1).forEach(s => {
      if (values[s.id]) {
        lines.push('─'.repeat(50))
        lines.push(s.label)
        lines.push('─'.repeat(50))
        lines.push(values[s.id])
        lines.push('')
      }
    })
    const text = lines.join('\n')
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'scientific_article.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="section">
      <h2 className="section-title">✍️ كتابة المقال العلمي</h2>
      <p className="section-desc">
        استخدم القوالب أو ابدأ من الصفر لكتابة مقالك العلمي المحكّم وفق المعايير الأكاديمية
      </p>

      <div className="template-bar">
        <span>قوالب جاهزة:</span>
        {Object.entries(TEMPLATES).map(([k, t]) => (
          <button key={k} className="btn-template" onClick={() => applyTemplate(k)}>
            {t.name}
          </button>
        ))}
        <button
          className="btn-template"
          onClick={() => setValues(Object.fromEntries(SECTIONS.map(s => [s.id, ''])))}
        >
          مسح الكل
        </button>
      </div>

      <div className="author-info">
        <h4>معلومات الباحث</h4>
        <div className="author-fields">
          {[
            { key: 'name', label: 'اسم الباحث', ph: 'الاسم الكامل' },
            { key: 'affiliation', label: 'الانتماء المؤسسي', ph: 'الجامعة / المؤسسة' },
            { key: 'email', label: 'البريد الإلكتروني', ph: 'example@university.edu' },
            { key: 'date', label: 'التاريخ', ph: '' },
          ].map(f => (
            <div key={f.key} className="author-field">
              <label>{f.label}</label>
              <input
                type="text"
                value={authorInfo[f.key]}
                onChange={e => setAuthorInfo(prev => ({ ...prev, [f.key]: e.target.value }))}
                placeholder={f.ph}
              />
            </div>
          ))}
        </div>
      </div>

      {!preview ? (
        <div className="article-form">
          {SECTIONS.map(s => (
            <div key={s.id} className="article-section">
              <label className="article-label">{s.label}</label>
              <textarea
                className="article-textarea"
                placeholder={s.placeholder}
                value={values[s.id]}
                onChange={e => setValues(prev => ({ ...prev, [s.id]: e.target.value }))}
                rows={s.rows}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="article-preview">
          <div className="preview-header">
            <h2>{values.title || '(بدون عنوان)'}</h2>
            {authorInfo.name && <p><strong>الباحث:</strong> {authorInfo.name}</p>}
            {authorInfo.affiliation && <p><strong>الانتماء:</strong> {authorInfo.affiliation}</p>}
            {authorInfo.email && <p><strong>البريد:</strong> {authorInfo.email}</p>}
            {authorInfo.date && <p><strong>التاريخ:</strong> {authorInfo.date}</p>}
          </div>
          {SECTIONS.slice(1).map(s =>
            values[s.id] ? (
              <div key={s.id} className="preview-section">
                <h3>{s.label}</h3>
                <pre className="preview-text">{values[s.id]}</pre>
              </div>
            ) : null
          )}
        </div>
      )}

      <div className="article-actions">
        <button className="btn-secondary" onClick={() => setPreview(p => !p)}>
          {preview ? '✏️ تحرير' : '👁 معاينة'}
        </button>
        <button className="btn-export" onClick={exportArticle}>
          ⬇️ تصدير المقال
        </button>
      </div>
    </div>
  )
}

export default ArticleWriter
