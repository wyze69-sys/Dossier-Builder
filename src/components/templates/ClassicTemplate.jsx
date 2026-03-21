const ClassicTemplate = ({ data }) => {
  return (
    <div className="w-full min-h-[297mm] bg-white font-serif text-slate-900 p-8 space-y-6 flex flex-col">
      {/* Header - Aligned Left for professional consistency */}
      {(data.fullName || data.jobTitle || data.email || data.phone || data.location || data.linkedin || data.portfolio) && (
        <header className="flex flex-col items-start space-y-3 pb-6 border-b-[3px] border-slate-900">
          {data.fullName && (
            <h1 className="text-4xl font-bold tracking-tight text-black">
              {data.fullName}
            </h1>
          )}
          {data.jobTitle && (
            <h2 className="text-lg italic text-slate-700">
              {data.jobTitle}
            </h2>
          )}
          <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1 text-sm text-slate-600">
            {data.email && <span>{data.email}</span>}
            {data.email && data.phone && <span>•</span>}
            {data.phone && <span>{data.phone}</span>}
            {(data.email || data.phone) && data.location && <span>•</span>}
            {data.location && <span>{data.location}</span>}
            {(data.email || data.phone || data.location) && data.linkedin && <span>•</span>}
            {data.linkedin && <span>{data.linkedin.replace(/^https?:\/\//, '')}</span>}
            {(data.email || data.phone || data.location || data.linkedin) && data.portfolio && <span>•</span>}
            {data.portfolio && <span>{data.portfolio.replace(/^https?:\/\//, '')}</span>}
          </div>
        </header>
      )}

      <div className="flex-1 flex flex-col gap-3 mt-4">
        {/* Summary */}
        {data.summary && (
          <section className="flex-1 bg-slate-50 p-5 rounded-2xl flex flex-col justify-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black border-b border-slate-200 pb-2 mb-4">
              Professional Summary
            </h3>
            <p className="text-[12px] leading-relaxed text-slate-800 text-justify hyphens-auto break-words">
              {data.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="flex-1 bg-slate-50 p-5 rounded-2xl flex flex-col justify-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black border-b border-slate-200 pb-2 mb-4">
              Experience
            </h3>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-[14px] text-black">{exp.company}</h4>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {exp.startYear} {(exp.startYear && (exp.endYear || exp.isCurrent)) ? '—' : ''} {exp.isCurrent ? 'Present' : exp.endYear}
                    </span>
                  </div>
                  {exp.role && <p className="text-[12px] italic text-slate-700 font-medium">{exp.role}</p>}
                  {exp.description && (
                    <p className="text-[12px] leading-relaxed text-slate-800 text-justify hyphens-auto break-words">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section className="flex-1 bg-slate-50 p-5 rounded-2xl flex flex-col justify-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black border-b border-slate-200 pb-2 mb-4">
              Selected Projects
            </h3>
            <div className="space-y-4">
              {data.projects.map((proj) => (
                <div key={proj.id} className="space-y-2">
                  <div className="flex justify-between items-baseline text-black font-bold text-[14px]">
                    <h4>{proj.title}</h4>
                  </div>
                  {proj.role && <p className="text-[12px] italic text-slate-700 font-medium">{proj.role}</p>}
                  {proj.description && (
                    <p className="text-[12px] leading-relaxed text-slate-800 text-justify hyphens-auto break-words">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section className="flex-1 bg-slate-50 p-5 rounded-2xl flex flex-col justify-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black border-b border-slate-200 pb-2 mb-4">
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    {edu.degree && <h4 className="font-bold text-[14px] text-black">{edu.degree}</h4>}
                    {edu.institution && <p className="text-[11px] text-slate-600 italic">{edu.institution}</p>}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500">
                    {edu.startYear} {(edu.startYear && edu.endYear) ? '—' : ''} {edu.endYear}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="flex-1 bg-slate-50 p-5 rounded-2xl flex flex-col justify-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black border-b border-slate-200 pb-2 mb-4">
              Technical Skills
            </h3>
            <p className="text-[12px] leading-relaxed text-slate-800">
              {data.skills.join(', ')}
            </p>
          </section>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <section className="flex-1 bg-slate-50 p-5 rounded-2xl flex flex-col justify-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black border-b border-slate-200 pb-2 mb-4">
              Languages
            </h3>
            <div className="flex flex-col gap-2">
              {data.languages.map((lang, index) => (
                <div key={lang.id || index} className="flex justify-between text-[12px] text-slate-800 max-w-sm">
                  <span className="font-bold">{lang.language}</span>
                  <span className="italic">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ClassicTemplate;
