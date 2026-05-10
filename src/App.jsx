import { useRef, useState, useEffect } from 'react';
import { ResumeProvider } from './context/ResumeContext';
import TopNavigation from './components/TopNavigation';
import SideNavigation from './components/SideNavigation';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';

function AppLayout() {
  const [activeTab, setActiveTab] = useState('editor');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const previewRef = useRef(null);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const handleDownloadPDF = () => {
    if (previewRef.current) {
      previewRef.current.triggerDownload();
    }
  };

  const handleTogglePreview = () => {
    setIsPreviewMode(prev => !prev);
  };

  return (
    <div className="bg-surface dark:bg-slate-900 selection:bg-primary-fixed selection:text-on-primary-fixed">
      <TopNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onDownloadPDF={handleDownloadPDF}
        onTogglePreview={handleTogglePreview}
        isDark={isDark}
        toggleDark={toggleDark}
      />
      {activeTab === 'editor' && !isPreviewMode && <SideNavigation />}
      <main className={`${activeTab === 'editor' && !isPreviewMode ? 'lg:ml-64' : ''} pt-16 h-screen flex flex-col md:flex-row overflow-hidden bg-surface dark:bg-slate-800 transition-all duration-300`}>
        {activeTab === 'editor' && (
          <>
            {!isPreviewMode && <EditorPanel />}
            <PreviewPanel ref={previewRef} />
          </>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <ResumeProvider>
      <AppLayout />
    </ResumeProvider>
  );
}

export default App;
