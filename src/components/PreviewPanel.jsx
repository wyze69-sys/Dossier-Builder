import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import ResumeDocument from './ResumeDocument';

const PreviewPanel = ({ resumeData, saveToDashboard }) => {
  const [template, setTemplate] = useState('modern');
  const [scale, setScale] = useState(1);
  const [zoomOffset, setZoomOffset] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      
      // A4 proportions at standard 96 DPI
      const A4_HEIGHT = 1123;
      const A4_WIDTH = 794;
      
      const availableWidth = container.clientWidth - 48;
      const availableHeight = container.clientHeight - 48;
      
      const widthScale = availableWidth / A4_WIDTH;
      const heightScale = availableHeight / A4_HEIGHT;
      
      const newScale = Math.min(widthScale, heightScale, 1.2); 
      setScale(newScale > 0 ? newScale : 1);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-pdf-target');
    if (!element) return;
    
    // 1. Store original styles to restore later
    const originalStyle = element.getAttribute('style');
    
    // 2. Temporarily reset styles for clean capture
    // Resetting transform, margins, and ensuring it's at normal scale (1)
    element.style.transform = 'none';
    element.style.margin = '0';
    element.style.padding = '0';
    element.style.position = 'relative';
    element.style.left = '0';
    element.style.top = '0';

    try {
      // Small delay to ensure styles are applied
      await new Promise(resolve => setTimeout(resolve, 50));

      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true, 
        logging: false, 
        windowWidth: document.documentElement.offsetWidth,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // 3. Instantiate jsPDF as specified (landscape 'p', mm, a4)
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // 4. Add image at (0, 0, 210, 297)
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      
      if (saveToDashboard) {
        saveToDashboard();
      }
      pdf.save('My_Professional_Resume.pdf');
    } catch (error) {
      console.error('Failed to generate PDF', error);
    } finally {
      // 5. Restore original styles immediately
      if (originalStyle) {
        element.setAttribute('style', originalStyle);
      } else {
        element.style.transform = `scale(${Math.max(0.2, scale + zoomOffset)})`;
        element.style.transformOrigin = 'top center';
        element.style.marginBottom = `calc(-297mm * ${1 - Math.max(0.2, scale + zoomOffset)})`;
      }
    }
  };

  useEffect(() => {
    const handleTrigger = () => handleDownloadPDF();
    window.addEventListener('download-pdf', handleTrigger);
    return () => window.removeEventListener('download-pdf', handleTrigger);
  }, []);

  return (
    <section ref={containerRef} className="flex-1 overflow-y-auto p-6 md:p-10 bg-surface-container flex flex-col items-center">
      <div className="w-full max-w-[210mm] mb-8 flex items-center justify-between">
        <div className="bg-surface-container-highest p-1 rounded-xl flex items-center gap-1 overflow-x-auto no-scrollbar">
          {['modern', 'classic', 'minimal', 'professional', 'creative', 'elegant'].map(t => (
            <button 
              key={t}
              type="button"
              onClick={() => setTemplate(t)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors capitalize whitespace-nowrap ${template === t ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:bg-white/50'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-white p-1 rounded-lg">
          <button 
            type="button" 
            onClick={() => setZoomOffset(prev => prev - 0.1)}
            className="w-7 h-7 flex items-center justify-center rounded-md text-on-surface-variant hover:bg-slate-100 transition-colors"
            title="Zoom Out"
          >
            <span className="material-symbols-outlined text-[18px]">zoom_out</span>
          </button>
          <span className="text-xs font-bold text-slate-600 min-w-[40px] text-center">
            {Math.round(Math.max(0.2, scale + zoomOffset) * 100)}%
          </span>
          <button 
            type="button" 
            onClick={() => setZoomOffset(prev => prev + 0.1)}
            className="w-7 h-7 flex items-center justify-center rounded-md text-on-surface-variant hover:bg-slate-100 transition-colors"
            title="Zoom In"
          >
            <span className="material-symbols-outlined text-[18px]">zoom_in</span>
          </button>
        </div>
      </div>

      <div 
        id="resume-pdf-target"
        style={{
          transform: `scale(${Math.max(0.2, scale + zoomOffset)})`,
          transformOrigin: 'top center',
          marginBottom: `calc(-297mm * ${1 - Math.max(0.2, scale + zoomOffset)})`
        }}
      >
        <ResumeDocument data={resumeData} template={template} />
      </div>

      <footer className="mt-8 text-xs text-on-surface-variant/60 flex items-center gap-2">
        <span className="material-symbols-outlined text-[16px]">lock</span>
        Auto-saved 2 minutes ago
      </footer>
    </section>
  );
};

export default PreviewPanel;
