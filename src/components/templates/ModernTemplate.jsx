const ModernTemplate = ({ data }) => {
  return (
    <div className="flex w-full min-h-[297mm] font-manrope text-slate-900 bg-white">
      <div className="w-[28%] bg-[#0B1426] text-white p-6 flex flex-col gap-6">
        <div className="space-y-4">
          {data.profileImage && (
            <div className="w-24 h-24 rounded-2xl bg-slate-800 overflow-hidden">
              <img
                alt="Profile"
                className="w-full h-full object-cover"
                src={data.profileImage}
              />
            </div>
          )}
          
          <div className="space-y-1">
            <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] text-blue-400">
              Contact
            </h4>
            <ul className="space-y-3 text-[11px] font-light opacity-90">
              {data.email && (
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">mail</span>
                  {data.email}
                </li>
              )}
              {data.phone && (
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">call</span>
                  {data.phone}
                </li>
              )}
              {data.location && (
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  {data.location}
                </li>
              )}
              {data.linkedin && (
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">link</span>
                  {data.linkedin.replace(/^https?:\/\//, '')}
                </li>
              )}
              {data.portfolio && (
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">public</span>
                  {data.portfolio.replace(/^https?:\/\//, '')}
                </li>
              )}
            </ul>
          </div>
        </div>

        {data.skills && data.skills.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] text-blue-400">
              Skills
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-blue-500/20 text-blue-100 rounded text-[10px] font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.expertise && data.expertise.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] text-blue-400">
              Expertise
            </h4>
            <div className="flex flex-col gap-3">
              {data.expertise.map((item, index) => (
                <div key={item.id || index} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-medium">
                    <span>{item.name}</span>
                    <span>{item.level}%</span>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.languages && data.languages.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] text-blue-400">
              Languages
            </h4>
            <div className="flex flex-col gap-3">
              {data.languages.map((lang, index) => (
                <div key={lang.id || index} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-medium">
                    <span>{lang.language}</span>
                    <span className="text-blue-200">{lang.proficiency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 p-8 bg-white">
        {(data.fullName || data.jobTitle) && (
          <header className="mb-8">
            {data.fullName && (
              <h1 className="text-4xl font-extrabold tracking-tight leading-none mb-2">
                {data.fullName}
              </h1>
            )}
            {data.jobTitle && (
              <h2 className="text-xl font-medium text-blue-700 tracking-wide">
                {data.jobTitle}
              </h2>
            )}
            <div className="w-16 h-1 bg-slate-200 mt-4" />
          </header>
        )}

        <div className="space-y-6">
          {data.summary && (
            <section className="space-y-4">
              <h3 className="text-[13px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Profile
              </h3>
              <p className="text-[11px] leading-relaxed text-slate-600 whitespace-pre-wrap hyphens-auto break-words">
                {data.summary}
              </p>
            </section>
          )}

          {data.experience && data.experience.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                Experience
              </h3>
              <div className="flex flex-col gap-6">
                {data.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-slate-300"
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      {exp.company && <h4 className="text-base font-bold text-slate-800">{exp.company}</h4>}
                      {(exp.startYear || exp.endYear || exp.isCurrent) && (
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          {exp.startYear} {(exp.startYear && (exp.endYear || exp.isCurrent)) ? '—' : ''} {exp.isCurrent ? 'Present' : exp.endYear}
                        </span>
                      )}
                    </div>
                    {exp.role && <p className="text-xs font-semibold text-blue-700 mb-2">{exp.role}</p>}
                    {exp.description && (
                      <p className="text-[11px] leading-relaxed text-slate-600 whitespace-pre-wrap hyphens-auto break-words">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects && data.projects.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                Selected Projects
              </h3>
              <div className="flex flex-col gap-6">
                {data.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-slate-300"
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      {proj.title && <h4 className="text-base font-bold text-slate-800">{proj.title}</h4>}
                    </div>
                    {proj.role && <p className="text-xs font-semibold text-blue-700 mb-2">{proj.role}</p>}
                    {proj.description && (
                      <p className="text-[11px] leading-relaxed text-slate-600 whitespace-pre-wrap hyphens-auto break-words">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education && data.education.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                Education
              </h3>
              <div className="flex flex-col gap-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between gap-4">
                    <div className="space-y-1">
                      {edu.degree && <h4 className="text-sm font-bold text-slate-800">{edu.degree}</h4>}
                      {edu.institution && <p className="text-[11px] text-slate-500">{edu.institution}</p>}
                    </div>
                    <div className="text-right">
                      {(edu.startYear || edu.endYear) && (
                        <p className="text-[10px] font-bold text-slate-400">
                          {edu.startYear} {(edu.startYear && edu.endYear) ? '—' : ''} {edu.endYear}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
