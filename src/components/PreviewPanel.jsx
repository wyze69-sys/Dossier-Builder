import { useState, useEffect, useRef } from 'react';
import ResumeDocument from './ResumeDocument';

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

const PreviewPanel = ({ resumeData }) => {
  const [template, setTemplate] = useState('professional');
  const [scale, setScale] = useState(1);
  const [zoomOffset, setZoomOffset] = useState(0);
  const containerRef = useRef(null);
  const previewScale = Math.max(0.3, scale + zoomOffset);

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

  const handleDownloadPDF = () => {
    window.print();
  };

  useEffect(() => {
    window.addEventListener('download-pdf', handleDownloadPDF);
    return () => window.removeEventListener('download-pdf', handleDownloadPDF);
  }, []);

  return (
    <section ref={containerRef} className="flex-1 overflow-visible bg-white p-4 sm:p-6 md:flex md:flex-col md:overflow-y-auto md:p-10">
      <div className="resume-preview-controls mx-auto mb-6 flex w-full max-w-[794px] flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full overflow-x-auto rounded-xl bg-white p-1 shadow-sm sm:w-auto">
          <div className="flex min-w-max items-center gap-1">
            {['professional', 'modern', 'creative'].map(t => (
              <button 
                key={t}
                type="button"
                onClick={() => setTemplate(t)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold capitalize transition-colors sm:px-4 ${template === t ? 'bg-primary text-white' : 'text-slate-600 hover:bg-primary-light/30'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="self-end rounded-lg bg-white p-1 shadow-sm sm:self-auto flex items-center gap-1">
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

      <div className="w-full overflow-x-auto pb-4">
        <div className="flex justify-center">
          <div
            className="resume-preview-scale-shell transition-[width,height] duration-200 ease-out"
            style={{
              width: `${A4_WIDTH_PX * previewScale}px`,
              height: `${A4_HEIGHT_PX * previewScale}px`,
            }}
          >
            <div
              style={{
                transform: `scale(${previewScale})`,
                transformOrigin: 'top left',
              }}
              className="transition-transform duration-200 ease-out"
            >
              <div id="resume-pdf-target" className="resume-a4-lock shadow-2xl">
                <ResumeDocument data={resumeData} template={template} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewPanel;
