import { useResume } from '../context/ResumeContext';

const TopNavigation = ({ activeTab, setActiveTab, onDownloadPDF, onTogglePreview }) => {
  const { isDark, toggleDark } = useResume();

  return (
    <header className="fixed top-0 w-full flex justify-between items-center px-6 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 shadow-sm dark:shadow-none transition-colors">
      {/* Logo & Badge */}
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 font-manrope">
          Dossier Builder
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
          Live Preview
        </span>
      </div>

      {/* Navigation Tabs */}
      <nav className="hidden md:flex items-center gap-8">
        <button
          onClick={() => setActiveTab('editor')}
          className={`h-16 flex items-center transition-colors font-semibold ${
            activeTab === 'editor'
              ? 'text-blue-700 dark:text-blue-400 border-b-2 border-blue-700'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Editor
        </button>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onTogglePreview}
          className="px-4 py-2 text-sm font-bold text-primary bg-primary-light/20 hover:bg-primary-light/40 rounded-lg transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">visibility</span>
          Live Preview
        </button>
        <button
          type="button"
          onClick={toggleDark}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        <button
          type="button"
          onClick={onDownloadPDF}
          className="px-5 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-lg shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">download</span>
          Download PDF
        </button>
      </div>
    </header>
  );
};

export default TopNavigation;
