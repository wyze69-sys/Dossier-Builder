const TopNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <header className="fixed top-0 w-full flex justify-between items-center px-6 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 shadow-sm dark:shadow-none transition-colors">
      {/* Logo & Badge */}
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 font-manrope">
          Dossier Builder
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-bold uppercase tracking-wider">
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
        <button
          onClick={() => setActiveTab('resumes')}
          className={`h-16 flex items-center transition-colors font-semibold ${
            activeTab === 'resumes' 
              ? 'text-blue-700 dark:text-blue-400 border-b-2 border-blue-700' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          My Resumes
        </button>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button 
          type="button" 
          onClick={() => window.dispatchEvent(new Event('toggle-preview'))}
          className="px-4 py-2 text-sm font-medium text-secondary hover:bg-slate-100/50 rounded-lg transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">visibility</span>
          Live Preview
        </button>
        <button type="button" onClick={() => window.dispatchEvent(new Event('download-pdf'))} className="px-5 py-2 text-sm font-semibold text-white btn-primary-gradient rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">download</span>
          Download PDF
        </button>
      </div>
    </header>
  );
};

export default TopNavigation;
