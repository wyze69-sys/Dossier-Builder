import { useState, useEffect, useRef } from 'react';
import ResumeDocument from './ResumeDocument';

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

const getRelativeTimeText = (timestamp) => {
  if (!timestamp) return 'Not saved yet';
  const elapsedMs = Date.now() - timestamp;
  const elapsedMinutes = Math.max(0, Math.floor(elapsedMs / 60000));
  if (elapsedMinutes < 1) return 'Saved just now';
  if (elapsedMinutes === 1) return 'Saved 1 minute ago';
  if (elapsedMinutes < 60) return `Saved ${elapsedMinutes} minutes ago`;
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours === 1) return 'Saved 1 hour ago';
  if (elapsedHours < 24) return `Saved ${elapsedHours} hours ago`;
  return `Saved on ${new Date(timestamp).toLocaleDateString()}`;
};

const PreviewPanel = ({ resumeData, saveToDashboard }) => {
  const [template, setTemplate] = useState('professional');
  const [scale, setScale] = useState(1);
  const [zoomOffset, setZoomOffset] = useState(0);
  const [lastSavedAt, setLastSavedAt] = useState(Date.now());
  const containerRef = useRef(null);

  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const availableWidth = container.clientWidth - 48;
      const availableHeight = container.clientHeight - 48;
      const widthScale = availableWidth / A4_WIDTH_PX;
      const heightScale = availableHeight / A4_HEIGHT_PX;
      const newScale = Math.min(widthScale, heightScale, 1.2); 
      setScale(newScale > 0 ? newScale : 1);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  useEffect(() => {
    setLastSavedAt(Date.now());
  }, [resumeData]);

  const handleDownloadPDF = () => {
    if (saveToDashboard) saveToDashboard();
    setLastSavedAt(Date.now());
    window.print();
  };

  useEffect(() => {
    window.addEventListener('download-pdf', handleDownloadPDF);
    return () => window.removeEventListener('download-pdf', handleDownloadPDF);
  }, []);

  return (
    <section ref={containerRef} className="flex-1 overflow-y-auto p-6 md:p-10 bg-white flex flex-col items-center">
      <div className="resume-preview-controls w-full max-w-[794px] mb-8 flex items-center justify-between">
        <div className="bg-white shadow-sm p-1 rounded-xl flex items-center gap-1 overflow-x-auto">
          {['professional', 'modern', 'creative'].map(t => (
            <button 
              key={t}
              type="button"
              onClick={() => setTemplate(t)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors capitalize whitespace-nowrap ${template === t ? 'bg-primary text-white' : 'text-slate-600 hover:bg-primary-light/30'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-white shadow-sm p-1 rounded-lg">
          <button 
            type="button" 
            onClick={() => setZoomOffset(prev => prev - 0.1)}
            className="w-7 h-7 flex items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">zoom_out</span>
          </button>
          <span className="text-xs font-bold text-slate-600 min-w-[40px] text-center">
            {Math.round(Math.max(0.2, scale + zoomOffset) * 100)}%
          </span>
          <button 
            type="button" 
            onClick={() => setZoomOffset(prev => prev + 0.1)}
            className="w-7 h-7 flex items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">zoom_in</span>
          </button>
        </div>
      </div>

      <div
        style={{
          transform: `scale(${Math.max(0.3, scale + zoomOffset)})`,
          transformOrigin: 'top center',
        }}
        className="resume-preview-scale-shell transition-transform duration-200 ease-out"
      >
        <div id="resume-pdf-target" className="resume-a4-lock shadow-2xl">
          <ResumeDocument data={resumeData} template={template} />
        </div>
      </div>

      <footer className="resume-preview-footer mt-8 text-xs text-slate-400 flex items-center gap-2">
        <span className="material-symbols-outlined text-[16px]">lock</span>
        {getRelativeTimeText(lastSavedAt)}
      </footer>
    </section>
  );
};

export default PreviewPanel;