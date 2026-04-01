import { useState, useEffect } from 'react';

const navItems = [
  { icon: 'person', label: 'Personal', id: 'personal' },
  { icon: 'school', label: 'Education', id: 'education' },
  { icon: 'work', label: 'Experience', id: 'experience' },
  { icon: 'psychology', label: 'Skills', id: 'skills' },
  { icon: 'translate', label: 'Languages', id: 'languages' },
  { icon: 'architecture', label: 'Projects', id: 'projects' },
];

const SideNavigation = ({ fullName }) => {
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
    <aside className="hidden lg:flex flex-col fixed left-0 top-16 h-[calc(100vh-64px)] w-64 p-4 gap-2 bg-slate-50 dark:bg-slate-950 border-r border-outline-variant/30">
      {/* Section Header */}
      <div className="mb-6 px-2">
        <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-on-surface-variant font-manrope">
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
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-manrope text-xs uppercase tracking-widest font-semibold transition-all duration-300 ease-in-out ${
              activeSection === item.id
                ? 'bg-primary-fixed/30 text-primary border-l-2 border-primary pl-[10px] shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 hover:translate-x-1 border-l-2 border-transparent pl-[10px]'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* User Profile Card */}
      <div className="mt-auto p-4 bg-surface-container-low rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[18px]">account_circle</span>
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface">{fullName || 'User'}</p>
            <p className="text-[10px] text-on-surface-variant">Free Plan</p>
          </div>
        </div>
        <button type="button" className="w-full py-2 bg-on-secondary-fixed text-white text-[10px] font-bold uppercase tracking-widest rounded-lg">
          Upgrade
        </button>
      </div>
    </aside>
  );
};

export default SideNavigation;
