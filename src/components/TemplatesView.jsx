const TemplatesView = () => {
  const templates = [
    { id: 'modern', name: 'Modern Architecture', desc: 'Clean lines and distinct hierarchy.', active: true },
    { id: 'classic', name: 'Classic Serif', desc: 'Traditional elegance and timeless reading experience.', active: false },
    { id: 'minimal', name: 'Minimalist Sans', desc: 'Space-efficient, focusing exclusively on content.', active: false },
    { id: 'creative', name: 'Creative Portfolio', desc: 'Bold colors for design-focused professionals.', active: false },
    { id: 'executive', name: 'Executive Suite', desc: 'Optimized for ATS and C-level board reviews.', active: false },
    { id: 'developer', name: 'Code Contributor', desc: 'Monospace accents with GitHub metrics integration.', active: false },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-10 bg-surface">
      <div className="max-w-6xl mx-auto space-y-10 pb-20 fade-slide-in">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-on-surface font-manrope tracking-tight">
            Template Library
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            Choose the perfect architectural framework for your professional story. All templates are ATS-friendly and auto-format your existing data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <div 
              key={tpl.id} 
              className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 ${
                tpl.active ? 'ring-2 ring-primary ring-offset-4 shadow-xl' : 'ambient-shadow hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              <div className="aspect-[1/1.4] bg-surface-container-low p-6 flex flex-col justify-between">
                <div className="w-full h-12 bg-surface-container-highest rounded-lg mb-4 opacity-50" />
                <div className="space-y-3 opacity-50">
                  <div className="w-3/4 h-3 bg-surface-container-highest rounded-full" />
                  <div className="w-1/2 h-3 bg-surface-container-highest rounded-full" />
                  <div className="w-full h-3 bg-surface-container-highest rounded-full" />
                  <div className="w-5/6 h-3 bg-surface-container-highest rounded-full" />
                </div>
                
                {tpl.active && (
                  <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    Active
                  </div>
                )}
                
                {/* Overlay on hover */}
                <div className={`absolute inset-0 bg-primary/90 flex items-center justify-center transition-opacity duration-300 ${tpl.active ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                  <button type="button" className="px-6 py-2 bg-white text-primary font-bold rounded-lg text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Apply Template
                  </button>
                </div>
              </div>
              <div className="bg-white p-5 border-t border-outline-variant/30">
                <h3 className="font-bold text-on-surface mb-1 flex items-center justify-between">
                  {tpl.name}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {tpl.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesView;
