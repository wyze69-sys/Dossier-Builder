const TopNavigation = ({ activeTab, setActiveTab, isPreviewMode }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-md transition-colors dark:border-slate-800/80 dark:bg-slate-900/85 dark:shadow-none">
      <div className="flex flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-6 md:py-0">
        <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center md:gap-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="truncate text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-xl font-manrope">
              Dossier Builder
            </span>
            <span className="hidden rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 sm:inline-flex">
              Live Preview
            </span>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex h-16 items-center gap-8">
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
        </div>

        {/* Action Buttons */}
        <div className="flex w-full items-center gap-2 sm:gap-3 md:w-auto">
          <button 
            type="button" 
            onClick={() => window.dispatchEvent(new Event('toggle-preview'))}
            className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-primary-light/20 px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary-light/40 sm:flex-none sm:px-4 sm:text-sm"
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
              {isPreviewMode ? 'edit_note' : 'visibility'}
            </span>
            <span className="truncate">{isPreviewMode ? 'Back to Editor' : 'Live Preview'}</span>
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('download-pdf'))}
            className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg active:scale-95 sm:flex-none sm:px-5 sm:text-sm"
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">download</span>
            <span className="truncate">Download PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
