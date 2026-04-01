const ModernTemplate = ({ data }) => {
  const Icon = ({ name, className = "" }) => {
    const icons = {
      mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
      phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
      location: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
      link: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>,
      public: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
    };
    return <span className={`inline-block shrink-0 ${className}`}>{icons[name]}</span>;
  };

  const SidebarHeading = ({ children }) => (
    <h3 className="text-[12px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2 pb-1 border-b border-slate-700">
      {children}
    </h3>
  );

  const MainHeading = ({ children }) => (
    <h3 className="text-[13px] font-black uppercase tracking-[0.25em] text-slate-800 mb-3 pb-1 border-b-2 border-slate-900 inline-block pr-6">
      {children}
    </h3>
  );

  return (
    <div className="w-full min-h-[1123px] font-sans text-slate-900 bg-white flex box-border">
      {/* Sidebar - Sharp Dark Background */}
      <aside className="w-[30%] bg-slate-900 text-white p-7 flex flex-col gap-8">
        <div className="space-y-5 print-avoid-break">
          {data.profileImage && (
            <div 
              className="w-28 h-28 rounded-full bg-slate-800 bg-cover bg-center shrink-0 border-[3px] border-slate-700 shadow-lg"
              style={{ backgroundImage: `url(${data.profileImage})` }}
            />
          )}
          
          <div className="space-y-3">
            <SidebarHeading>Contact</SidebarHeading>
            <ul className="space-y-2.5 text-[11.5px] font-medium text-slate-300">
              {data.email && (
                <li className="flex items-start gap-2">
                  <Icon name="mail" className="w-[15px] h-[15px] text-slate-500 mt-0.5" />
                  <span className="break-all">{data.email}</span>
                </li>
              )}
              {data.phone && (
                <li className="flex items-start gap-2">
                  <Icon name="phone" className="w-[15px] h-[15px] text-slate-500 mt-0.5" />
                  {data.phone}
                </li>
              )}
              {data.location && (
                <li className="flex items-start gap-2">
                  <Icon name="location" className="w-[15px] h-[15px] text-slate-500 mt-0.5" />
                  {data.location}
                </li>
              )}
              {data.linkedin && (
                <li className="flex items-start gap-2">
                  <Icon name="link" className="w-[15px] h-[15px] text-slate-500 mt-0.5" />
                  <span className="break-all">{data.linkedin.replace(/^https?:\/\//, '')}</span>
                </li>
              )}
              {data.portfolio && (
                <li className="flex items-start gap-2">
                  <Icon name="public" className="w-[15px] h-[15px] text-slate-500 mt-0.5" />
                  <span className="break-all">{data.portfolio.replace(/^https?:\/\//, '')}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {data.skills && data.skills.length > 0 && (
          <div className="space-y-3 print-avoid-break">
            <SidebarHeading>Skills</SidebarHeading>
            <div className="flex flex-col gap-1.5">
              {data.skills.map((skill, index) => (
                <span key={index} className="text-[12px] font-bold text-slate-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-sm shrink-0"></span>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.languages && data.languages.length > 0 && (
          <div className="space-y-3 print-avoid-break">
            <SidebarHeading>Languages</SidebarHeading>
            <div className="flex flex-col gap-2">
              {data.languages.map((lang, index) => (
                <div key={lang.id || index} className="flex flex-col">
                  <span className="text-[12px] font-bold text-slate-200">{lang.language}</span>
                  <span className="text-[9.5px] uppercase tracking-widest text-slate-500">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content - Crisp White */}
      <main className="w-[70%] p-9 bg-white flex flex-col gap-5">
        {(data.fullName || data.jobTitle) && (
          <header className="print-avoid-break mb-1">
            {data.fullName && (
              <h1 className="text-[36px] font-black tracking-tighter leading-none mb-1 text-slate-900 uppercase">
                {data.fullName}
              </h1>
            )}
            {data.jobTitle && (
              <h2 className="text-[14px] font-bold uppercase tracking-[0.25em] text-slate-500">
                {data.jobTitle}
              </h2>
            )}
          </header>
        )}

        {data.summary && (
          <section className="print-avoid-break">
            <MainHeading>Profile</MainHeading>
            <p className="text-[12.5px] leading-relaxed text-slate-700 text-justify font-medium">
              {data.summary}
            </p>
          </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section className="print-avoid-break">
            <MainHeading>Experience</MainHeading>
            <div className="flex flex-col gap-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="print-avoid-break relative pl-4 border-l-2 border-slate-900">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="text-[14px] font-black text-slate-900">{exp.role}</h4>
                    {(exp.startYear || exp.endYear || exp.isCurrent) && (
                      <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap ml-2">
                        {exp.startYear} — {exp.isCurrent ? 'Present' : exp.endYear}
                      </span>
                    )}
                  </div>
                  {exp.company && <p className="text-[12px] font-black text-slate-600 mb-1.5 uppercase tracking-wider">{exp.company}</p>}
                  {exp.description && (
                    <p className="text-[12px] font-medium leading-relaxed text-slate-700 text-justify">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects && data.projects.length > 0 && (
          <section className="print-avoid-break">
            <MainHeading>Projects</MainHeading>
            <div className="flex flex-col gap-4">
              {data.projects.map((proj) => (
                <div key={proj.id} className="print-avoid-break relative pl-4 border-l-2 border-slate-900">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="text-[14px] font-black text-slate-900">{proj.title}</h4>
                  </div>
                  {proj.role && <p className="text-[12px] font-black text-slate-600 mb-1.5 uppercase tracking-wider">{proj.role}</p>}
                  {proj.description && (
                    <p className="text-[12px] font-medium leading-relaxed text-slate-700 text-justify">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section className="print-avoid-break">
            <MainHeading>Education</MainHeading>
            <div className="flex flex-col gap-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="print-avoid-break flex justify-between gap-4">
                  <div className="space-y-1">
                    {edu.degree && <h4 className="text-[13px] font-black text-slate-900">{edu.degree}</h4>}
                    {edu.institution && <p className="text-[11.5px] font-bold text-slate-600 uppercase tracking-wide">{edu.institution}</p>}
                  </div>
                  <div className="text-right">
                    {(edu.startYear || edu.endYear) && (
                      <p className="text-[10.5px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                        {edu.startYear} — {edu.endYear}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ModernTemplate;