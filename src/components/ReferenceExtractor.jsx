import { useState } from 'react'

const CROSSREF_API = 'https://api.crossref.org/works'

function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

function ReferenceExtractor() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState([])
  const [rows, setRows] = useState(10)

  async function search() {
    if (!query.trim()) return
    setLoading(true)
    setError('')
    setResults([])
    try {
      const url = `${CROSSREF_API}?query=${encodeURIComponent(query)}&rows=${rows}&select=title,author,published-print,published-online,DOI,container-title,volume,issue,page,abstract,type,publisher`
      const res = await fetch(url)
      if (!res.ok) throw new Error('فشل الاتصال بقاعدة البيانات')
      const data = await res.json()
      setResults(data.message.items || [])
    } catch (e) {
      setError(e.message || 'حدث خطأ أثناء البحث')
    } finally {
      setLoading(false)
    }
  }

  function getYear(item) {
    const pd = item['published-print'] || item['published-online']
    if (pd && pd['date-parts'] && pd['date-parts'][0]) {
      return pd['date-parts'][0][0]
    }
    return 'غير محدد'
  }

  function getAuthors(item) {
    if (!item.author || !item.author.length) return 'غير محدد'
    return item.author
      .slice(0, 5)
      .map(a => `${a.family || ''}${a.given ? ', ' + a.given : ''}`)
      .join(' ; ') + (item.author.length > 5 ? ' وآخرون' : '')
  }

  function getJournal(item) {
    const ct = item['container-title']
    if (ct && ct.length) return ct[0]
    return 'غير محدد'
  }

  function formatAPA(item) {
    const authors = item.author
      ? item.author
          .slice(0, 6)
          .map(a => {
            const family = a.family || ''
            const initial = (a.given || '').charAt(0)
            if (!family) return initial ? `${initial}.` : 'مجهول'
            return initial ? `${family}، ${initial}.` : family
          })
          .join('، ')
      : 'مجهول'
    const year = getYear(item)
    const title = item.title?.[0] || 'بدون عنوان'
    const journal = getJournal(item)
    const vol = item.volume ? `${item.volume}` : ''
    const issue = item.issue ? `(${item.issue})` : ''
    const page = item.page ? `، ${item.page}` : ''
    const doi = item.DOI ? ` https://doi.org/${item.DOI}` : ''
    return `${authors} (${year}). ${title}. ${journal}, ${vol}${issue}${page}.${doi}`
  }

  function saveRef(item) {
    if (!saved.find(s => s.DOI === item.DOI)) {
      setSaved(prev => [...prev, item])
    }
  }

  function removeRef(doi) {
    setSaved(prev => prev.filter(s => s.DOI !== doi))
  }

  function exportRefs() {
    const text = saved.map((item, i) => `[${i + 1}] ${formatAPA(item)}`).join('\n\n')
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'references.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="section">
      <h2 className="section-title">📚 استخراج المراجع العلمية</h2>
      <p className="section-desc">
        ابحث عن منشورات مرجعية من المجلات العلمية المحكّمة عبر قاعدة بيانات Crossref
      </p>

      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="أدخل الموضوع أو الكلمات المفتاحية بالعربية أو الإنجليزية..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && search()}
        />
        <select
          className="rows-select"
          value={rows}
          onChange={e => setRows(Number(e.target.value))}
        >
          <option value={5}>5 نتائج</option>
          <option value={10}>10 نتائج</option>
          <option value={20}>20 نتيجة</option>
          <option value={50}>50 نتيجة</option>
        </select>
        <button className="btn-primary" onClick={search} disabled={loading}>
          {loading ? '⏳ جارٍ البحث...' : '🔍 بحث'}
        </button>
      </div>

      {error && <div className="error-box">⚠️ {error}</div>}

      {results.length > 0 && (
        <div className="results-section">
          <h3>نتائج البحث ({results.length})</h3>
          <div className="results-list">
            {results.map((item, i) => (
              <div key={item.DOI || i} className="result-card">
                <div className="result-title">
                  {item.title?.[0] || 'بدون عنوان'}
                </div>
                <div className="result-meta">
                  <span>👥 {getAuthors(item)}</span>
                  <span>📰 {getJournal(item)}</span>
                  <span>📅 {getYear(item)}</span>
                  {item.type && <span>📄 {item.type}</span>}
                </div>
                {item.abstract && (
                  <div className="result-abstract">
                    <strong>الملخص:</strong>{' '}
                    {stripHtml(item.abstract).slice(0, 300)}
                    {stripHtml(item.abstract).length > 300 ? '...' : ''}
                  </div>
                )}
                <div className="result-cite">
                  <strong>APA:</strong> {formatAPA(item)}
                </div>
                <div className="result-actions">
                  {item.DOI && (
                    <a
                      href={`https://doi.org/${item.DOI}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-link"
                    >
                      🔗 فتح المقال
                    </a>
                  )}
                  <button
                    className="btn-save"
                    onClick={() => saveRef(item)}
                    disabled={!!saved.find(s => s.DOI === item.DOI)}
                  >
                    {saved.find(s => s.DOI === item.DOI) ? '✅ محفوظ' : '💾 حفظ'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {saved.length > 0 && (
        <div className="saved-section">
          <div className="saved-header">
            <h3>📋 المراجع المحفوظة ({saved.length})</h3>
            <button className="btn-export" onClick={exportRefs}>
              ⬇️ تصدير قائمة المراجع
            </button>
          </div>
          <ol className="saved-list">
            {saved.map((item, i) => (
              <li key={item.DOI || i} className="saved-item">
                <span>{formatAPA(item)}</span>
                <button className="btn-remove" onClick={() => removeRef(item.DOI)}>
                  ✕
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

export default ReferenceExtractor
