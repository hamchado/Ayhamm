import { useState, useRef, useEffect } from 'react'

// ─── GitHub API helpers ────────────────────────────────────────────────────────

async function ghGetFile(owner, repo, path, token) {
  const headers = { Accept: 'application/vnd.github+json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    { headers }
  )
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `HTTP ${res.status}`)
  }
  return res.json()
}

async function ghWriteFile(owner, repo, path, content, message, token, sha) {
  if (!token) throw new Error('مطلوب GitHub Token للكتابة في المستودع')
  const body = {
    message,
    content: btoa(unescape(encodeURIComponent(content))),
  }
  if (sha) body.sha = sha
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `HTTP ${res.status}`)
  }
  return res.json()
}

// ─── AI API helpers ────────────────────────────────────────────────────────────

/** OpenAI-compatible helper – works for OpenAI and GitHub Models (Copilot) */
async function callOpenAICompat(endpoint, apiKey, messages, model) {
  const res = await fetch(`${endpoint}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages, max_tokens: 2048 }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `HTTP ${res.status}`)
  }
  const data = await res.json()
  return data.choices[0].message.content
}

async function callOpenAI(apiKey, messages, model = 'gpt-4o-mini') {
  return callOpenAICompat('https://api.openai.com/v1', apiKey, messages, model)
}

/** GitHub Copilot via GitHub Models – uses your GitHub PAT as the API key */
async function callGitHubCopilot(ghToken, messages, model = 'gpt-4o') {
  return callOpenAICompat(
    'https://models.inference.ai.azure.com',
    ghToken,
    messages,
    model
  )
}

async function callGemini(apiKey, messages) {
  // Convert messages to Gemini format
  const contents = messages
    .filter(m => m.role !== 'system')
    .map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))
  // Prepend system message as first user turn if present
  const sysMsg = messages.find(m => m.role === 'system')
  if (sysMsg) {
    contents.unshift({ role: 'user', parts: [{ text: sysMsg.content }] })
    contents.splice(1, 0, { role: 'model', parts: [{ text: 'حسناً، سأتبع هذه التعليمات.' }] })
  }
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
    }
  )
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `HTTP ${res.status}`)
  }
  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '(لا يوجد رد)'
}

// ─── Component ────────────────────────────────────────────────────────────────

function AIAssistant() {
  // Settings
  const [provider, setProvider] = useState('copilot')
  const [aiKey, setAiKey] = useState('')
  const [copilotModel, setCopilotModel] = useState('gpt-4o')
  const [ghToken, setGhToken] = useState('')
  const [settingsOpen, setSettingsOpen] = useState(true)

  // GitHub file browser
  const [ghOwner, setGhOwner] = useState('')
  const [ghRepo, setGhRepo] = useState('')
  const [ghPath, setGhPath] = useState('')
  const [ghContent, setGhContent] = useState('')
  const [ghSha, setGhSha] = useState('')
  const [fileLoaded, setFileLoaded] = useState(false)
  const [fileLoading, setFileLoading] = useState(false)
  const [fileMsg, setFileMsg] = useState('')

  // GitHub writer
  const [writePath, setWritePath] = useState('')
  const [writeContent, setWriteContent] = useState('')
  const [writeMsg, setWriteMsg] = useState('')
  const [writeStatus, setWriteStatus] = useState('')
  const [writing, setWriting] = useState(false)

  // Chat
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [includeFile, setIncludeFile] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // ── Load file from GitHub ──
  async function loadFile() {
    if (!ghOwner || !ghRepo || !ghPath) {
      setFileMsg('⚠️ أدخل اسم المالك والمستودع والمسار')
      return
    }
    setFileLoading(true)
    setFileMsg('')
    try {
      const data = await ghGetFile(ghOwner, ghRepo, ghPath, ghToken)
      const decoded = decodeURIComponent(escape(atob(data.content.replace(/\n/g, ''))))
      setGhContent(decoded)
      setGhSha(data.sha)
      setWriteContent(decoded)
      setWritePath(ghPath)
      setFileLoaded(true)
      setFileMsg(`✅ تم تحميل الملف (${data.size} بايت) – SHA: ${data.sha.slice(0, 8)}`)
    } catch (e) {
      setFileMsg(`❌ خطأ: ${e.message}`)
    } finally {
      setFileLoading(false)
    }
  }

  // ── Write file to GitHub ──
  async function writeFile() {
    if (!ghOwner || !ghRepo || !writePath) {
      setWriteStatus('⚠️ أدخل معلومات المستودع والمسار')
      return
    }
    setWriting(true)
    setWriteStatus('')
    try {
      await ghWriteFile(
        ghOwner, ghRepo, writePath,
        writeContent,
        writeMsg || 'Update via AI Assistant',
        ghToken,
        writePath === ghPath ? ghSha : undefined
      )
      setWriteStatus('✅ تم حفظ الملف في GitHub بنجاح')
      // Refresh SHA
      const refreshed = await ghGetFile(ghOwner, ghRepo, writePath, ghToken).catch(() => null)
      if (refreshed) setGhSha(refreshed.sha)
    } catch (e) {
      setWriteStatus(`❌ خطأ: ${e.message}`)
    } finally {
      setWriting(false)
    }
  }

  // ── Send message to AI ──
  async function sendMessage() {
    if (!input.trim()) return

    // For Copilot the GitHub token acts as the key; for others a separate key is needed
    const effectiveKey = provider === 'copilot' ? ghToken : aiKey
    if (!effectiveKey.trim()) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: provider === 'copilot'
          ? '⚠️ أدخل GitHub Token في الإعدادات أولاً (يُستخدم كمفتاح لـ Copilot).'
          : '⚠️ أدخل مفتاح API الخاص بك في الإعدادات أولاً.',
      }])
      return
    }

    const userText = input.trim()
    setInput('')

    // Build context
    let systemContent = 'أنت مساعد ذكاء اصطناعي متخصص في البحث العلمي والبرمجة. أجب باللغة العربية ما لم يُطلب منك خلاف ذلك.'
    if (includeFile && ghContent) {
      systemContent += `\n\nمحتوى الملف المرفق من GitHub (${ghPath}):\n\`\`\`\n${ghContent}\n\`\`\``
    }

    const newHistory = [...messages, { role: 'user', content: userText }]
    setMessages(newHistory)
    setSending(true)

    try {
      const builtMessages = [{ role: 'system', content: systemContent }, ...newHistory]
      let reply
      if (provider === 'copilot') {
        reply = await callGitHubCopilot(ghToken, builtMessages, copilotModel)
      } else if (provider === 'openai') {
        reply = await callOpenAI(aiKey, builtMessages)
      } else {
        reply = await callGemini(aiKey, builtMessages)
      }

      const assistantMsg = { role: 'assistant', content: reply }
      setMessages(prev => [...prev, assistantMsg])

      // Auto-fill write box with AI reply for easy export
      setWriteContent(reply)
    } catch (e) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ خطأ في الاتصال بـ AI: ${e.message}`,
      }])
    } finally {
      setSending(false)
    }
  }

  function clearChat() {
    setMessages([])
  }

  function copyToWriteBox(text) {
    setWriteContent(text)
  }

  return (
    <div className="section ai-assistant">

      {/* ── Settings Panel ── */}
      <div className="ai-settings-bar">
        <button
          className="tab-btn"
          style={{ marginBottom: 0 }}
          onClick={() => setSettingsOpen(o => !o)}
        >
          ⚙️ الإعدادات {settingsOpen ? '▲' : '▼'}
        </button>
      </div>

      {settingsOpen && (
        <div className="ai-settings-panel">
          <div className="settings-row">
            <div className="input-group">
              <label>مزود الذكاء الاصطناعي</label>
              <select
                className="rows-select"
                value={provider}
                onChange={e => setProvider(e.target.value)}
              >
                <option value="copilot">🤖 GitHub Copilot (GitHub Models)</option>
                <option value="gemini">Google Gemini (gemini-2.0-flash)</option>
                <option value="openai">OpenAI (gpt-4o-mini)</option>
              </select>
            </div>

            {provider === 'copilot' && (
              <div className="input-group">
                <label>
                  النموذج
                </label>
                <select
                  className="rows-select"
                  value={copilotModel}
                  onChange={e => setCopilotModel(e.target.value)}
                >
                  <option value="gpt-4o">gpt-4o</option>
                  <option value="gpt-4o-mini">gpt-4o-mini</option>
                  <option value="o1-mini">o1-mini</option>
                  <option value="o1-preview">o1-preview</option>
                  <option value="Meta-Llama-3.1-405B-Instruct">Llama 3.1 405B</option>
                  <option value="Mistral-large">Mistral Large</option>
                </select>
              </div>
            )}

            {provider !== 'copilot' && (
              <div className="input-group">
                <label>
                  {provider === 'openai' ? 'OpenAI API Key' : 'Google Gemini API Key'}
                  &nbsp;
                  <a
                    href={provider === 'openai'
                      ? 'https://platform.openai.com/api-keys'
                      : 'https://aistudio.google.com/app/apikey'}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-link"
                    style={{ fontSize: '0.78rem' }}
                  >
                    احصل على مفتاح
                  </a>
                </label>
                <input
                  type="password"
                  className="mu-input"
                  placeholder="أدخل المفتاح هنا..."
                  value={aiKey}
                  onChange={e => setAiKey(e.target.value)}
                />
              </div>
            )}

            <div className="input-group">
              <label>
                GitHub Personal Access Token
                &nbsp;
                <a
                  href="https://github.com/settings/tokens"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-link"
                  style={{ fontSize: '0.78rem' }}
                >
                  إنشاء Token
                </a>
              </label>
              <input
                type="password"
                className="mu-input"
                placeholder={provider === 'copilot' ? 'ghp_... (مطلوب للـ Copilot والكتابة)' : 'ghp_... (مطلوب للكتابة)'}
                value={ghToken}
                onChange={e => setGhToken(e.target.value)}
              />
              {provider === 'copilot' && (
                <small className="hint">
                  💡 للـ Copilot: يُستخدم نفس الـ Token للدردشة وقراءة/كتابة الملفات
                </small>
              )}
            </div>
          </div>

          <div className="settings-row">
            <div className="input-group">
              <label>مالك المستودع (Owner)</label>
              <input
                type="text"
                className="mu-input"
                placeholder="مثال: hamchado"
                value={ghOwner}
                onChange={e => setGhOwner(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>اسم المستودع (Repo)</label>
              <input
                type="text"
                className="mu-input"
                placeholder="مثال: Ayhamm"
                value={ghRepo}
                onChange={e => setGhRepo(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── GitHub File Browser ── */}
      <div className="ai-panel">
        <h3 className="panel-title">📂 قراءة ملف من GitHub</h3>
        <div className="gh-file-row">
          <input
            type="text"
            className="search-input"
            placeholder="مسار الملف: مثال notes.txt أو src/data.txt"
            value={ghPath}
            onChange={e => setGhPath(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && loadFile()}
          />
          <button className="btn-primary" onClick={loadFile} disabled={fileLoading}>
            {fileLoading ? '⏳...' : '📥 تحميل'}
          </button>
        </div>
        {fileMsg && (
          <div className={`status-msg ${fileMsg.startsWith('✅') ? 'ok' : 'err'}`}>
            {fileMsg}
          </div>
        )}
        {fileLoaded && (
          <div className="file-preview">
            <div className="file-preview-header">
              <span>{ghPath}</span>
              <button className="btn-save" onClick={() => setIncludeFile(f => !f)}>
                {includeFile ? '✅ مُضمَّن في المحادثة' : '➕ أضف للمحادثة'}
              </button>
            </div>
            <pre className="file-content">{ghContent}</pre>
          </div>
        )}
      </div>

      {/* ── Chat Interface ── */}
      <div className="ai-panel">
        <div className="panel-title-row">
          <h3 className="panel-title">🤖 المحادثة مع الذكاء الاصطناعي</h3>
          {messages.length > 0 && (
            <button className="btn-remove" onClick={clearChat} title="مسح المحادثة">
              🗑 مسح
            </button>
          )}
        </div>

        <div className="chat-box" ref={chatEndRef}>
          {messages.length === 0 && (
            <div className="chat-empty">
              💬 ابدأ محادثة مع الذكاء الاصطناعي...
              <br />
              <small>يمكنك تحميل ملف من GitHub وإضافته كسياق للمحادثة</small>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.role}`}>
              <div className="msg-role">
                {m.role === 'user' ? '👤 أنت' : '🤖 AI'}
              </div>
              <pre className="msg-content">{m.content}</pre>
              {m.role === 'assistant' && (
                <button
                  className="btn-save"
                  style={{ marginTop: '0.5rem' }}
                  onClick={() => copyToWriteBox(m.content)}
                >
                  📋 نسخ إلى محرر الملفات
                </button>
              )}
            </div>
          ))}
          {sending && (
            <div className="chat-msg assistant">
              <div className="msg-role">🤖 AI</div>
              <div className="typing-indicator">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-row">
          <textarea
            className="data-textarea chat-input"
            placeholder="اكتب رسالتك هنا... (Enter للإرسال، Shift+Enter لسطر جديد)"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
            rows={3}
            disabled={sending}
          />
          <div className="chat-controls">
            {fileLoaded && (
              <label className="include-file-label">
                <input
                  type="checkbox"
                  checked={includeFile}
                  onChange={e => setIncludeFile(e.target.checked)}
                />
                {' '}إضافة الملف كسياق
              </label>
            )}
            <button
              className="btn-primary"
              onClick={sendMessage}
              disabled={sending || !input.trim()}
            >
              {sending ? '⏳ جارٍ الإرسال...' : '➤ إرسال'}
            </button>
          </div>
        </div>
      </div>

      {/* ── GitHub File Writer ── */}
      <div className="ai-panel">
        <h3 className="panel-title">💾 كتابة/تعديل ملف في GitHub</h3>
        <div className="write-meta-row">
          <div className="input-group">
            <label>مسار الملف في المستودع</label>
            <input
              type="text"
              className="mu-input"
              placeholder="مثال: notes.txt أو output/result.txt"
              value={writePath}
              onChange={e => setWritePath(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>رسالة الـ Commit</label>
            <input
              type="text"
              className="mu-input"
              placeholder="مثال: Update notes via AI"
              value={writeMsg}
              onChange={e => setWriteMsg(e.target.value)}
            />
          </div>
        </div>
        <div className="input-group" style={{ marginBottom: '0.8rem' }}>
          <label>محتوى الملف (يمكن تعديله يدوياً)</label>
          <textarea
            className="data-textarea"
            rows={8}
            value={writeContent}
            onChange={e => setWriteContent(e.target.value)}
            placeholder="محتوى الملف الذي سيُحفظ في GitHub..."
            dir="auto"
          />
        </div>
        <div className="write-actions">
          <button
            className="btn-primary"
            onClick={writeFile}
            disabled={writing || !writeContent}
          >
            {writing ? '⏳ جارٍ الحفظ...' : '☁️ حفظ في GitHub'}
          </button>
          {messages.length > 0 && (
            <button
              className="btn-secondary"
              onClick={() => {
                const last = [...messages].reverse().find(m => m.role === 'assistant')
                if (last) setWriteContent(last.content)
              }}
            >
              ⬇️ استخدام آخر رد من AI
            </button>
          )}
        </div>
        {writeStatus && (
          <div className={`status-msg ${writeStatus.startsWith('✅') ? 'ok' : 'err'}`}
            style={{ marginTop: '0.8rem' }}>
            {writeStatus}
          </div>
        )}
      </div>

    </div>
  )
}

export default AIAssistant
