import { useState, useEffect } from 'react';

const navItems = [
  { icon: 'person', label: 'Personal', id: 'personal' },
  { icon: 'school', label: 'Education', id: 'education' },
  { icon: 'work', label: 'Experience', id: 'experience' },
  { icon: 'psychology', label: 'Skills', id: 'skills' },
  { icon: 'translate', label: 'Languages', id: 'languages' },
  { icon: 'architecture', label: 'Projects', id: 'projects' },
];

const SideNavigation = () => {
  const [activeSection, setActiveSection] = useState('personal');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id.replace('section-', ''));
          }
        });
      },
      { root: document.getElementById('editor-scroll-container'), rootMargin: '-10% 0px -80% 0px' }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(`section-${item.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    const el = document.getElementById(`section-${id}`);
    const container = document.getElementById('editor-scroll-container');
    if (el && container) {
      // Calculate position relative to container
      const topPos = el.offsetTop - container.offsetTop;
      container.scrollTo({
        top: topPos,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <aside className="app-side-navigation hidden lg:flex flex-col fixed left-0 top-16 h-[calc(100vh-64px)] w-64 p-4 gap-2 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-r border-slate-200/60">
      {/* Section Header */}
      <div className="mb-6 px-2">
        <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 font-manrope">
          Resume Sections
        </h2>
        <p className="text-[11px] text-slate-500 mt-1">Curate your professional story</p>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            type="button"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-manrope text-xs uppercase tracking-widest font-semibold transition-all duration-200 ease-in-out ${
              activeSection === item.id
                ? 'bg-indigo-50/50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-l-[3px] border-indigo-600 pl-[9px] shadow-sm hover:-translate-y-0.5'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:-translate-y-0.5 border-l-[3px] border-transparent pl-[9px]'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

    </aside>
  );
};

export default SideNavigation;
