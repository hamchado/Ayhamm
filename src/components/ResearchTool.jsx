import { useState } from 'react'
import ReferenceExtractor from './ReferenceExtractor'
import SPSSAnalysis from './SPSSAnalysis'
import ArticleWriter from './ArticleWriter'
import AIAssistant from './AIAssistant'
import './ResearchTool.css'

const TABS = [
  { id: 'references', label: '📚 استخراج المراجع', component: ReferenceExtractor },
  { id: 'spss', label: '📊 التحليل الإحصائي', component: SPSSAnalysis },
  { id: 'article', label: '✍️ كتابة المقال', component: ArticleWriter },
  { id: 'ai', label: '🤖 المساعد الذكي', component: AIAssistant },
]

function ResearchTool() {
  const [activeTab, setActiveTab] = useState('references')

  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component

  return (
    <div className="research-tool" dir="rtl">
      <header className="app-header">
        <h1 className="app-title">🔬 أداة البحث العلمي</h1>
        <p className="app-subtitle">استخراج المراجع · التحليل الإحصائي · كتابة المقالات</p>
      </header>

      <nav className="main-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`main-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="tab-content">
        {ActiveComponent && <ActiveComponent />}
      </main>
    </div>
  )
}

export default ResearchTool
