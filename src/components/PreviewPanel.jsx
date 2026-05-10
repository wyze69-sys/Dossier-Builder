import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import ResumeDocument from './ResumeDocument';
import { useResume } from '../context/ResumeContext';

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

const PreviewPanel = forwardRef((props, ref) => {
  const { resumeData } = useResume();
  const [template, setTemplate] = useState('professional');
  const [scale, setScale] = useState(1);
  const [zoomOffset, setZoomOffset] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
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
      setZoomOffset(0); // reset zoom offset on resize
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-pdf-target');
    if (!element) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      pdf.save('resume.pdf');
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  useImperativeHandle(ref, () => ({
    triggerDownload: handleDownloadPDF,
  }));

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
    </section>
  );
});

PreviewPanel.displayName = 'PreviewPanel';

export default PreviewPanel;
