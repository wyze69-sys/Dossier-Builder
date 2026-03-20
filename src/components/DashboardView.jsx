import { useState, useEffect } from 'react';

const DashboardView = ({ loadResume }) => {
  const [savedResumes, setSavedResumes] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('saved_resumes');
    if (saved) {
      try {
        setSavedResumes(JSON.parse(saved).reverse());
      } catch (e) {
        console.error('Failed to parse saved_resumes', e);
      }
    }
  }, []);

  const deleteResume = (idx) => {
    const updated = savedResumes.filter((_, i) => i !== idx);
    setSavedResumes(updated);
    localStorage.setItem('saved_resumes', JSON.stringify([...updated].reverse()));
  };

  return (
    <div className="flex-1 w-full h-full bg-surface-container-low/50 p-6 md:p-12 overflow-y-auto fade-slide-in">
      <div className="max-w-6xl mx-auto space-y-10 pb-20">
        <header className="space-y-2">
          <h1 className="text-3xl font-extrabold text-on-surface font-manrope tracking-tight">
            My Resumes
          </h1>
          <p className="text-on-surface-variant text-sm">
            Manage and view your saved architectural dossiers.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            onClick={() => loadResume(null)}
            className="aspect-[1/1.4] border-2 border-dashed border-outline-variant/60 rounded-xl flex flex-col items-center justify-center gap-4 hover:bg-primary-fixed/30 hover:border-primary/50 transition-colors cursor-pointer group bg-surface-container-lowest"
          >
            <span className="material-symbols-outlined text-[40px] text-outline group-hover:text-primary transition-colors">
              add_circle
            </span>
            <span className="text-sm font-bold text-on-surface-variant group-hover:text-primary transition-colors font-manrope">
              New Resume
            </span>
          </div>

          {savedResumes.map((resume, index) => (
            <div key={resume.savedAt || index} className="aspect-[1/1.4] bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden border border-outline-variant/30 group flex flex-col relative">
              <div 
                className="h-[75%] bg-slate-100 border-b border-outline-variant/30 flex items-center justify-center relative p-4"
                onClick={() => loadResume(resume)}
              >
                 <div className="w-full h-full bg-white shadow-sm flex flex-col p-4 gap-2.5">
                    <div className="w-1/2 h-2.5 bg-slate-300 rounded" />
                    <div className="w-1/3 h-1.5 bg-slate-200 rounded" />
                    <div className="w-full h-px bg-slate-200 my-2" />
                    <div className="w-full h-2 bg-slate-100 rounded" />
                    <div className="w-11/12 h-2 bg-slate-100 rounded" />
                    <div className="w-4/5 h-2 bg-slate-100 rounded" />
                 </div>
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm transition-opacity">
                      Load Resume
                    </span>
                 </div>
              </div>
              <div className="h-[25%] p-4 flex justify-between items-center bg-white">
                <div className="flex flex-col justify-center overflow-hidden">
                  <h3 className="text-sm font-bold text-slate-800 font-manrope truncate">{resume.fullName || 'Untitled'}</h3>
                  <p className="text-[11px] text-slate-500 truncate">{new Date(resume.savedAt).toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => deleteResume(index)} 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
                  title="Delete"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
