import { useState } from 'react'

// ─── Statistical helpers ───────────────────────────────────────────────────────

function parseData(raw) {
  return raw
    .split(/[\n,;\t]+/)
    .map(v => v.trim())
    .filter(v => v !== '')
    .map(Number)
    .filter(v => !isNaN(v))
}

function mean(arr) {
  return arr.reduce((s, v) => s + v, 0) / arr.length
}

function variance(arr, pop = false) {
  const denom = pop ? arr.length : arr.length - 1
  if (denom <= 0) return NaN
  const m = mean(arr)
  const sumSq = arr.reduce((s, v) => s + (v - m) ** 2, 0)
  return sumSq / denom
}

function stdDev(arr, pop = false) {
  return Math.sqrt(variance(arr, pop))
}

function median(arr) {
  const sorted = [...arr].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid]
}

function mode(arr) {
  const freq = {}
  arr.forEach(v => { freq[v] = (freq[v] || 0) + 1 })
  const maxFreq = Math.max(...Object.values(freq))
  if (maxFreq === 1) return 'لا يوجد منوال'
  return Object.keys(freq)
    .filter(k => freq[k] === maxFreq)
    .join(', ')
}

function skewness(arr) {
  const n = arr.length
  if (n < 3) return NaN
  const m = mean(arr)
  const s = stdDev(arr)
  if (s === 0) return 0
  return (n / ((n - 1) * (n - 2))) *
    arr.reduce((sum, v) => sum + ((v - m) / s) ** 3, 0)
}

function kurtosis(arr) {
  const n = arr.length
  if (n < 4) return NaN
  const m = mean(arr)
  const s = stdDev(arr)
  if (s === 0) return 0
  return (
    (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3)) *
    arr.reduce((sum, v) => sum + ((v - m) / s) ** 4, 0)
  ) - (3 * (n - 1) ** 2) / ((n - 2) * (n - 3))
}

function pearsonCorrelation(x, y) {
  if (x.length !== y.length || x.length < 2) return null
  const mx = mean(x), my = mean(y)
  const num = x.reduce((s, xi, i) => s + (xi - mx) * (y[i] - my), 0)
  const den = Math.sqrt(
    x.reduce((s, xi) => s + (xi - mx) ** 2, 0) *
    y.reduce((s, yi) => s + (yi - my) ** 2, 0)
  )
  if (den === 0) return null
  return num / den
}

function tTestOneSample(arr, mu = 0) {
  const n = arr.length
  const m = mean(arr)
  const s = stdDev(arr)
  const t = (m - mu) / (s / Math.sqrt(n))
  return { t, df: n - 1, mean: m, stdDev: s, n }
}

function tTestIndependent(x, y) {
  const nx = x.length, ny = y.length
  const mx = mean(x), my = mean(y)
  const sx = stdDev(x), sy = stdDev(y)
  const sp = Math.sqrt(((nx - 1) * sx ** 2 + (ny - 1) * sy ** 2) / (nx + ny - 2))
  const t = (mx - my) / (sp * Math.sqrt(1 / nx + 1 / ny))
  return { t, df: nx + ny - 2, mean1: mx, mean2: my, std1: sx, std2: sy, n1: nx, n2: ny }
}

function linearRegression(x, y) {
  if (x.length !== y.length || x.length < 2) return null
  const mx = mean(x), my = mean(y)
  const b1 =
    x.reduce((s, xi, i) => s + (xi - mx) * (y[i] - my), 0) /
    x.reduce((s, xi) => s + (xi - mx) ** 2, 0)
  const b0 = my - b1 * mx
  const yHat = x.map(xi => b0 + b1 * xi)
  const ssTot = y.reduce((s, yi) => s + (yi - my) ** 2, 0)
  const ssRes = y.reduce((s, yi, i) => s + (yi - yHat[i]) ** 2, 0)
  const r2 = 1 - ssRes / ssTot
  // Use pearsonCorrelation for r to preserve sign accurately
  const r = pearsonCorrelation(x, y) ?? 0
  return { b0, b1, r2, r }
}

/** Approximate t-distribution critical value at α=0.05 (two-tailed) using df. */
function tCritical(df) {
  // Use a lookup table for common df values; fall back to 1.96 for large df
  const table = {
    1: 12.706, 2: 4.303, 3: 3.182, 4: 2.776, 5: 2.571,
    6: 2.447, 7: 2.365, 8: 2.306, 9: 2.262, 10: 2.228,
    11: 2.201, 12: 2.179, 13: 2.160, 14: 2.145, 15: 2.131,
    16: 2.120, 17: 2.110, 18: 2.101, 19: 2.093, 20: 2.086,
    25: 2.060, 30: 2.042, 40: 2.021, 60: 2.000, 120: 1.980,
  }
  if (df in table) return table[df]
  // Linear interpolation for intermediate df
  const keys = Object.keys(table).map(Number).sort((a, b) => a - b)
  for (let i = 0; i < keys.length - 1; i++) {
    if (df >= keys[i] && df <= keys[i + 1]) {
      const t0 = table[keys[i]], t1 = table[keys[i + 1]]
      const frac = (df - keys[i]) / (keys[i + 1] - keys[i])
      return t0 + frac * (t1 - t0)
    }
  }
  return 1.96 // large df
}

function fmt(v, d = 4) {
  if (typeof v !== 'number') return v
  return isNaN(v) ? 'N/A' : v.toFixed(d)
}

// ─── Component ────────────────────────────────────────────────────────────────

function SPSSAnalysis() {
  const [activeTest, setActiveTest] = useState('descriptive')
  const [data1, setData1] = useState('')
  const [data2, setData2] = useState('')
  const [mu, setMu] = useState('0')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const tests = [
    { id: 'descriptive', label: '📊 الإحصاء الوصفي' },
    { id: 'correlation', label: '🔗 معامل الارتباط' },
    { id: 'ttest1', label: '📐 اختبار t (عينة واحدة)' },
    { id: 'ttest2', label: '📐 اختبار t (عينتان)' },
    { id: 'regression', label: '📈 الانحدار الخطي' },
  ]

  function runAnalysis() {
    setError('')
    setResult(null)
    const arr1 = parseData(data1)
    if (arr1.length < 2) {
      setError('الرجاء إدخال ما لا يقل عن قيمتين رقميتين في المتغير الأول.')
      return
    }

    if (activeTest === 'descriptive') {
      const sorted = [...arr1].sort((a, b) => a - b)
      setResult({
        type: 'descriptive',
        data: {
          'عدد القيم (N)': arr1.length,
          'المتوسط الحسابي': fmt(mean(arr1)),
          'الوسيط': fmt(median(arr1)),
          'المنوال': mode(arr1),
          'الانحراف المعياري': fmt(stdDev(arr1)),
          'التباين': fmt(variance(arr1)),
          'أدنى قيمة': fmt(sorted[0]),
          'أعلى قيمة': fmt(sorted[sorted.length - 1]),
          'المدى': fmt(sorted[sorted.length - 1] - sorted[0]),
          'الالتواء (Skewness)': fmt(skewness(arr1)),
          'التفرطح (Kurtosis)': fmt(kurtosis(arr1)),
          'المجموع': fmt(arr1.reduce((s, v) => s + v, 0)),
        },
      })
      return
    }

    const arr2 = parseData(data2)
    if ((activeTest === 'correlation' || activeTest === 'ttest2' || activeTest === 'regression') && arr2.length < 2) {
      setError('الرجاء إدخال ما لا يقل عن قيمتين في المتغير الثاني.')
      return
    }

    if (activeTest === 'correlation') {
      if (arr1.length !== arr2.length) {
        setError('يجب أن يتساوى عدد قيم المتغيرين.')
        return
      }
      const r = pearsonCorrelation(arr1, arr2)
      if (r === null) {
        setError('تعذّر حساب معامل الارتباط (تحقق من البيانات).')
        return
      }
      const n = arr1.length
      const t = r * Math.sqrt(n - 2) / Math.sqrt(1 - r ** 2)
      setResult({
        type: 'correlation',
        data: {
          'معامل ارتباط بيرسون (r)': fmt(r),
          'معامل التحديد (R²)': fmt(r ** 2),
          'قيمة t': fmt(t),
          'درجات الحرية (df)': n - 2,
          'عدد الحالات (N)': n,
          'تفسير الارتباط': interpretCorrelation(r),
        },
      })
      return
    }

    if (activeTest === 'ttest1') {
      const muVal = parseFloat(mu)
      if (isNaN(muVal)) {
        setError('الرجاء إدخال قيمة المتوسط الافتراضي بشكل صحيح.')
        return
      }
      const res = tTestOneSample(arr1, muVal)
      setResult({
        type: 'ttest',
        data: {
          'المتوسط الحسابي': fmt(res.mean),
          'الانحراف المعياري': fmt(res.stdDev),
          'عدد الحالات (N)': res.n,
          'المتوسط الافتراضي (μ₀)': muVal,
          'قيمة t': fmt(res.t),
          'درجات الحرية (df)': res.df,
          'القرار (α=0.05)': Math.abs(res.t) > tCritical(res.df) ? 'رفض H₀ (توجد فروق دالة إحصائياً)' : 'قبول H₀ (لا توجد فروق دالة إحصائياً)',
        },
      })
      return
    }

    if (activeTest === 'ttest2') {
      if (arr1.length < 2 || arr2.length < 2) {
        setError('كل مجموعة يجب أن تحتوي على قيمتين على الأقل.')
        return
      }
      const res = tTestIndependent(arr1, arr2)
      setResult({
        type: 'ttest',
        data: {
          'متوسط المجموعة الأولى': fmt(res.mean1),
          'انحراف المجموعة الأولى': fmt(res.std1),
          'حجم المجموعة الأولى (n₁)': res.n1,
          'متوسط المجموعة الثانية': fmt(res.mean2),
          'انحراف المجموعة الثانية': fmt(res.std2),
          'حجم المجموعة الثانية (n₂)': res.n2,
          'قيمة t': fmt(res.t),
          'درجات الحرية (df)': res.df,
          'القرار (α=0.05)': Math.abs(res.t) > tCritical(res.df) ? 'رفض H₀ (توجد فروق دالة إحصائياً)' : 'قبول H₀ (لا توجد فروق دالة إحصائياً)',
        },
      })
      return
    }

    if (activeTest === 'regression') {
      if (arr1.length !== arr2.length) {
        setError('يجب أن يتساوى عدد قيم المتغيرين.')
        return
      }
      const res = linearRegression(arr1, arr2)
      if (!res) {
        setError('تعذّر حساب الانحدار (تحقق من البيانات).')
        return
      }
      setResult({
        type: 'regression',
        data: {
          'معامل ارتباط بيرسون (r)': fmt(res.r),
          'معامل التحديد (R²)': fmt(res.r2),
          'معامل الانحدار (β₁)': fmt(res.b1),
          'الثابت (β₀)': fmt(res.b0),
          'معادلة الانحدار': `ŷ = ${fmt(res.b0)} + ${fmt(res.b1)} × X`,
          'جودة التوفيق': interpretR2(res.r2),
        },
      })
    }
  }

  function interpretCorrelation(r) {
    const abs = Math.abs(r)
    const dir = r >= 0 ? 'طردي' : 'عكسي'
    if (abs >= 0.9) return `ارتباط ${dir} قوي جداً`
    if (abs >= 0.7) return `ارتباط ${dir} قوي`
    if (abs >= 0.5) return `ارتباط ${dir} متوسط`
    if (abs >= 0.3) return `ارتباط ${dir} ضعيف`
    return `ارتباط ${dir} ضعيف جداً أو معدوم`
  }

  function interpretR2(r2) {
    if (r2 >= 0.9) return 'ممتاز – النموذج يفسر ≥90% من التباين'
    if (r2 >= 0.7) return 'جيد – النموذج يفسر ≥70% من التباين'
    if (r2 >= 0.5) return 'مقبول – النموذج يفسر ≥50% من التباين'
    return 'ضعيف – النموذج يفسر أقل من 50% من التباين'
  }

  const showData2 = ['correlation', 'ttest2', 'regression'].includes(activeTest)

  return (
    <div className="section">
      <h2 className="section-title">📊 التحليل الإحصائي (SPSS)</h2>
      <p className="section-desc">
        أدخل البيانات وحدد نوع التحليل المطلوب؛ يمكنك الفصل بين القيم بمسافة أو فاصلة أو سطر جديد
      </p>

      <div className="test-tabs">
        {tests.map(t => (
          <button
            key={t.id}
            className={`tab-btn ${activeTest === t.id ? 'active' : ''}`}
            onClick={() => { setActiveTest(t.id); setResult(null); setError('') }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="data-inputs">
        <div className="input-group">
          <label>
            {activeTest === 'regression'
              ? 'المتغير المستقل (X)'
              : activeTest === 'ttest2'
              ? 'المجموعة الأولى'
              : 'البيانات (المتغير الأول)'}
          </label>
          <textarea
            className="data-textarea"
            placeholder="مثال: 5, 7, 3, 8, 6, 9, 4"
            value={data1}
            onChange={e => setData1(e.target.value)}
            rows={4}
          />
        </div>

        {activeTest === 'ttest1' && (
          <div className="input-group">
            <label>المتوسط الافتراضي (μ₀)</label>
            <input
              type="number"
              className="mu-input"
              value={mu}
              onChange={e => setMu(e.target.value)}
              placeholder="0"
            />
          </div>
        )}

        {showData2 && (
          <div className="input-group">
            <label>
              {activeTest === 'regression'
                ? 'المتغير التابع (Y)'
                : activeTest === 'ttest2'
                ? 'المجموعة الثانية'
                : 'البيانات (المتغير الثاني)'}
            </label>
            <textarea
              className="data-textarea"
              placeholder="مثال: 12, 15, 10, 18, 14, 20, 11"
              value={data2}
              onChange={e => setData2(e.target.value)}
              rows={4}
            />
          </div>
        )}
      </div>

      {error && <div className="error-box">⚠️ {error}</div>}

      <button className="btn-primary" onClick={runAnalysis}>
        ▶ تشغيل التحليل
      </button>

      {result && (
        <div className="result-box">
          <h3>
            {activeTest === 'descriptive' && '📊 نتائج الإحصاء الوصفي'}
            {activeTest === 'correlation' && '🔗 نتائج تحليل الارتباط'}
            {activeTest === 'ttest1' && '📐 نتائج اختبار t (عينة واحدة)'}
            {activeTest === 'ttest2' && '📐 نتائج اختبار t (عينتان مستقلتان)'}
            {activeTest === 'regression' && '📈 نتائج الانحدار الخطي البسيط'}
          </h3>
          <table className="stats-table">
            <tbody>
              {Object.entries(result.data).map(([k, v]) => (
                <tr key={k}>
                  <td className="stat-key">{k}</td>
                  <td className="stat-val">{String(v)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn-export"
            onClick={() => {
              const text = Object.entries(result.data)
                .map(([k, v]) => `${k}: ${v}`)
                .join('\n')
              const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'spss_results.txt'
              a.click()
              URL.revokeObjectURL(url)
            }}
          >
            ⬇️ تصدير النتائج
          </button>
        </div>
      )}
    </div>
  )
}

export default SPSSAnalysis
