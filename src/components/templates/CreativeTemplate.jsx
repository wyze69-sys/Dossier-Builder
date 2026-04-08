const CreativeTemplate = ({ data }) => {
  const contactItems = [
    data.email,
    data.phone,
    data.location,
    data.linkedin ? data.linkedin.replace(/(^\w+:|^)\/\//, '') : '',
    data.portfolio ? data.portfolio.replace(/(^\w+:|^)\/\//, '') : ''
  ].filter(Boolean);

  return (
    <div className="w-full min-h-[1123px] h-full bg-white font-sans text-slate-900 px-7 py-8 box-border flex gap-7">
      {/* Sidebar / Left Column */}
      <aside className="w-[35%] flex flex-col gap-6">
        {data.profileImage && (
          <div className="print-avoid-break w-32 h-32 rounded-full overflow-hidden border-4 border-teal-500 bg-teal-50 self-center">
            <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
        <header className="resume-header print-avoid-break flex flex-col gap-1.5">
          <h1 className="text-[32px] font-black tracking-tight leading-none text-teal-900">{data.fullName}</h1>
          <h2 className="text-[14px] font-bold uppercase tracking-[0.15em] text-teal-600 mt-1">{data.jobTitle}</h2>
          
          {contactItems.length > 0 && (
            <div className="flex flex-col gap-1.5 mt-2.5">
              {contactItems.map((item, idx) => (
                <p key={idx} className="text-[12px] font-medium text-slate-600 flex items-center gap-2">
                  <span className="w-[5px] h-[5px] rounded-full bg-teal-400 shrink-0"></span>
                  {item}
                </p>
              ))}
            </div>
          )}
        </header>

        {data.summary && (
          <div className="print-avoid-break bg-teal-50 p-4 rounded-xl border-l-[3.5px] border-teal-500">
            <p className="text-[12px] font-medium leading-relaxed text-teal-900 text-justify italic">
              "{data.summary}"
            </p>
          </div>
        )}

        {data.skills && data.skills.length > 0 && (
          <section className="print-avoid-break mt-1">
            <h3 className="text-[13px] font-black uppercase tracking-widest text-teal-800 mb-2.5 flex items-center gap-2">
              <span className="h-[2px] flex-1 bg-teal-100 rounded-full"></span>
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="print-avoid-break text-[11px] font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-lg">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {data.languages && data.languages.length > 0 && (
          <section className="print-avoid-break mt-1">
            <h3 className="text-[13px] font-black uppercase tracking-widest text-teal-800 mb-2.5 flex items-center gap-2">
              <span className="h-[2px] flex-1 bg-teal-100 rounded-full"></span>
              Languages
            </h3>
            <div className="space-y-2">
              {data.languages.map((lang) => (
                <div key={lang.id} className="print-avoid-break flex justify-between items-center bg-slate-50 px-3 py-1.5 rounded-lg">
                  <span className="text-[12px] font-bold text-slate-700">{lang.language}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Main Content / Right Column */}
      <main className="w-[65%] flex flex-col gap-6">
        {data.experience && data.experience.length > 0 && (
          <section className="print-avoid-break">
            <h3 className="text-[18px] font-black text-slate-900 mb-3.5 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"></path></svg>
              </span>
              Experience
            </h3>
            <div className="space-y-4.5">
              {data.experience.map((exp) => (
                <div key={exp.id} className="print-avoid-break group mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="text-[14px] font-black text-slate-800">{exp.role}</h4>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-2 py-0.5 rounded ml-2 whitespace-nowrap">
                      {exp.startYear} - {exp.isCurrent ? 'Present' : exp.endYear}
                    </span>
                  </div>
                  <p className="text-[12.5px] font-bold text-slate-500 mb-1.5">{exp.company}</p>
                  <p className="text-[12px] font-light leading-relaxed text-slate-700 text-justify">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects && data.projects.length > 0 && (
          <section className="print-avoid-break">
            <h3 className="text-[18px] font-black text-slate-900 mb-3.5 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path></svg>
              </span>
              Projects
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {data.projects.map((proj) => (
                <div key={proj.id} className="print-avoid-break bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <h4 className="text-[13px] font-black text-slate-800 mb-1">{proj.title}</h4>
                  {proj.role && <p className="text-[11px] font-bold text-teal-600 mb-1.5 uppercase tracking-wider">{proj.role}</p>}
                  <p className="text-[11px] font-light leading-relaxed text-slate-600">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section className="print-avoid-break">
            <h3 className="text-[18px] font-black text-slate-900 mb-3.5 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path></svg>
              </span>
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="print-avoid-break flex gap-3.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div className="flex-1">
                    <h4 className="text-[13px] font-black text-slate-800">{edu.degree}</h4>
                    <p className="text-[12px] font-medium text-slate-600 mt-0.5">{edu.institution}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-teal-600 bg-white px-2 py-0.5 rounded shadow-sm">
                      {edu.startYear} - {edu.endYear}
                    </span>
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

export default CreativeTemplate;
