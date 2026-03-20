const CreativeTemplate = ({ data }) => {
  return (
    <div className="w-full min-h-[297mm] bg-white font-sans text-slate-800 flex flex-col items-center pt-10 p-8 box-border">
      
      {/* Header Profile */}
      <div className="flex flex-col items-center w-full max-w-2xl text-center mb-8">
        {data.profileImage && (
          <div className="w-40 h-40 rounded-full overflow-hidden border-[6px] border-[#0d9488]/20 shadow-xl mb-6">
            <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
        <h1 className="text-5xl font-extrabold text-[#115e59] tracking-tight mb-2">{data.fullName}</h1>
        <h2 className="text-xl font-bold uppercase tracking-widest text-[#0d9488] px-6 py-2 bg-[#f0fdfa] rounded-full inline-block">
          {data.jobTitle}
        </h2>

        {data.summary && (
          <p className="mt-8 text-sm text-slate-600 leading-relaxed max-w-xl mx-auto italic">
            "{data.summary}"
          </p>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="w-full grid grid-cols-12 gap-6 flex-1">
        
        {/* LEFT COLUMN: Contact & Modular Metadata (4 cols) */}
        <aside className="col-span-4 space-y-6">
          
          {/* Contact Module */}
          <div className="bg-[#f0fdfa] p-6 rounded-2xl shadow-sm border border-[#ccfbf1]">
            <h3 className="text-[13px] font-black text-[#0f766e] tracking-widest uppercase mb-4">Contact</h3>
            <div className="space-y-4 text-xs font-semibold text-slate-700">
              {data.email && <div className="flex flex-col"><span className="text-[#0d9488]/80 text-[10px] uppercase tracking-wider mb-0.5">Email</span>{data.email}</div>}
              {data.phone && <div className="flex flex-col"><span className="text-[#0d9488]/80 text-[10px] uppercase tracking-wider mb-0.5">Phone</span>{data.phone}</div>}
              {data.location && <div className="flex flex-col"><span className="text-[#0d9488]/80 text-[10px] uppercase tracking-wider mb-0.5">Location</span>{data.location}</div>}
              {data.linkedin && <div className="flex flex-col"><span className="text-[#0d9488]/80 text-[10px] uppercase tracking-wider mb-0.5">LinkedIn</span>{data.linkedin.replace(/(^\w+:|^)\/\//, '')}</div>}
              {data.portfolio && <div className="flex flex-col"><span className="text-[#0d9488]/80 text-[10px] uppercase tracking-wider mb-0.5">Portfolio</span>{data.portfolio.replace(/(^\w+:|^)\/\//, '')}</div>}
            </div>
          </div>

          {/* Skills Module */}
          {data.skills && data.skills.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-[13px] font-black text-[#115e59] tracking-widest uppercase pb-2 border-b-2 border-[#115e59]">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="text-[11px] font-bold text-white bg-[#0f766e] px-3 py-1.5 rounded-lg shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages Module */}
          {data.languages && data.languages.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-[13px] font-black text-[#115e59] tracking-widest uppercase pb-2 border-b-2 border-[#115e59]">Languages</h3>
              <div className="flex flex-col gap-3">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-800">{lang.language}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488]">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </aside>

        {/* RIGHT COLUMN: Experience & Education (8 cols) */}
        <main className="col-span-8 space-y-6">
          
          {/* Experience Array */}
          {data.experience && data.experience.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-10 rounded-full bg-[#115e59] text-white flex items-center justify-center font-bold font-serif text-xl border-4 border-[#ccfbf1]">1</span>
                <h3 className="text-2xl font-black text-[#115e59] tracking-tight">Experience</h3>
              </div>
              <div className="space-y-4 relative">
                <div className="absolute left-5 top-8 bottom-4 w-0.5 bg-slate-200 z-0"></div>
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative z-10 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-[#0f766e]">{exp.role}</h4>
                      <div className="text-[10px] font-black tracking-widest uppercase bg-[#f0fdfa] text-[#0d9488] px-2.5 py-1 rounded-full border border-[#ccfbf1]">
                        {exp.startYear} — {exp.isCurrent ? 'Present' : exp.endYear}
                      </div>
                    </div>
                    <h5 className="text-sm font-bold text-slate-800 mb-3">{exp.company}</h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed text-justify hyphens-auto break-words">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Array */}
          {data.education && data.education.length > 0 && (
            <div className="pt-4">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-10 rounded-full bg-[#0d9488] text-white flex items-center justify-center font-bold font-serif text-xl border-4 border-[#ccfbf1]">2</span>
                <h3 className="text-2xl font-black text-[#115e59] tracking-tight">Education</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                    <h4 className="text-sm font-bold text-[#0f766e] leading-tight mb-1">{edu.degree}</h4>
                    <h5 className="text-xs font-semibold text-slate-600 mb-3">{edu.institution}</h5>
                    <div className="text-[10px] font-black tracking-widest uppercase text-slate-400">
                      {edu.startYear} — {edu.endYear}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Array */}
          {data.projects && data.projects.length > 0 && (
            <div className="pt-4">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-10 rounded-full bg-[#475569] text-white flex items-center justify-center font-bold font-serif text-xl border-4 border-slate-200">3</span>
                <h3 className="text-2xl font-black text-[#334155] tracking-tight">Projects</h3>
              </div>
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-sm font-bold text-[#334155]">{proj.title}</h4>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">{proj.role}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed text-justify hyphens-auto break-words">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};

export default CreativeTemplate;
