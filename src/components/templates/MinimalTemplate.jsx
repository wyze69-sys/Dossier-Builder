// Helper to strip protocol for a cleaner URL display
const formatUrl = (url) => url?.replace(/^https?:\/\//, '');

// Helper to format consistent date ranges
const formatDateRange = (start, end, isCurrent) => {
  if (!start && !end && !isCurrent) return null;
  return `${start} ${start && (end || isCurrent) ? '—' : ''} ${isCurrent ? 'Present' : end}`;
};

const MinimalTemplate = ({ data }) => {
  const {
    fullName,
    jobTitle,
    email,
    phone,
    location,
    linkedin,
    portfolio,
    summary,
    experience,
    projects,
    education,
    skills,
    languages
  } = data || {};

  const hasContactInfo = fullName || jobTitle || email || phone || location || linkedin || portfolio;

  return (
    <div className="w-full min-h-[297mm] bg-white font-sans text-slate-800 p-8 flex flex-col grayscale">
      
      {/* --- Header Section --- */}
      {hasContactInfo && (
        <header className="mb-8">
          {fullName && (
            <h1 className="text-[28px] font-medium tracking-[0.2em] uppercase text-black mb-1">
              {fullName}
            </h1>
          )}
          {jobTitle && (
            <h2 className="text-xs tracking-[0.1em] text-slate-400 uppercase mb-4">
              {jobTitle}
            </h2>
          )}
          
          {/* --- Contact Details --- */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[10px] text-slate-500 tracking-wider">
            {email && <span>{email}</span>}
            {phone && <span>{phone}</span>}
            {location && <span>{location}</span>}
            {linkedin && <span>{formatUrl(linkedin)}</span>}
            {portfolio && <span>{formatUrl(portfolio)}</span>}
          </div>
        </header>
      )}

      <div className="flex-1 flex flex-col gap-3 mt-4">
        
        {/* --- Professional Summary --- */}
        {summary && (
          <section className="flex-1 grid grid-cols-12 gap-6 bg-slate-50 p-5 rounded-2xl">
            <h3 className="col-span-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-slate-400 pt-1">
              Profile
            </h3>
            <div className="col-span-9">
              <p className="text-[11px] leading-relaxed text-slate-600 font-light text-justify hyphens-auto break-words">
                {summary}
              </p>
            </div>
          </section>
        )}

        {/* --- Work Experience --- */}
        {experience?.length > 0 && (
          <section className="flex-1 grid grid-cols-12 gap-6 bg-slate-50 p-5 rounded-2xl">
            <h3 className="col-span-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-slate-400 pt-1">
              Experience
            </h3>
            <div className="col-span-9 space-y-6">
              {experience.map((exp, index) => (
                <div key={exp.id || index} className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <div>
                      {exp.company && <h4 className="text-sm font-semibold text-black tracking-wide">{exp.company}</h4>}
                      {exp.role && <p className="text-xs text-slate-500 mt-1">{exp.role}</p>}
                    </div>
                    {formatDateRange(exp.startYear, exp.endYear, exp.isCurrent) && (
                      <span className="text-[11px] tracking-widest text-slate-400 uppercase whitespace-nowrap ml-4">
                        {formatDateRange(exp.startYear, exp.endYear, exp.isCurrent)}
                      </span>
                    )}
                  </div>
                  {exp.description && (
                    <p className="text-[11px] leading-relaxed text-slate-600 font-light text-justify hyphens-auto break-words">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- Featured Projects --- */}
        {projects?.length > 0 && (
          <section className="flex-1 grid grid-cols-12 gap-6 bg-slate-50 p-5 rounded-2xl">
            <h3 className="col-span-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-slate-400 pt-1">
              Projects
            </h3>
            <div className="col-span-9 space-y-6">
              {projects.map((proj, index) => (
                <div key={proj.id || index} className="space-y-3">
                  <div className="flex flex-col">
                    {proj.title && <h4 className="text-sm font-semibold text-black tracking-wide">{proj.title}</h4>}
                    {proj.role && <p className="text-xs text-slate-500 mt-1">{proj.role}</p>}
                  </div>
                  {proj.description && (
                    <p className="text-[11px] leading-relaxed text-slate-600 font-light text-justify hyphens-auto break-words">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- Education --- */}
        {education?.length > 0 && (
          <section className="flex-1 grid grid-cols-12 gap-6 bg-slate-50 p-5 rounded-2xl">
            <h3 className="col-span-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-slate-400 pt-1">
              Education
            </h3>
            <div className="col-span-9 space-y-4">
              {education.map((edu, index) => (
                <div key={edu.id || index} className="flex justify-between items-baseline">
                  <div className="space-y-1">
                    {edu.degree && <h4 className="text-sm font-semibold text-black tracking-wide">{edu.degree}</h4>}
                    {edu.institution && <p className="text-[11px] text-slate-500">{edu.institution}</p>}
                  </div>
                  {formatDateRange(edu.startYear, edu.endYear, false) && (
                    <span className="text-[11px] tracking-widest text-slate-400 uppercase whitespace-nowrap ml-4">
                      {formatDateRange(edu.startYear, edu.endYear, false)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- Core Skills --- */}
        {skills?.length > 0 && (
          <section className="flex-1 grid grid-cols-12 gap-6 bg-slate-50 p-5 rounded-2xl">
            <h3 className="col-span-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-slate-400 pt-1">
              Skills
            </h3>
            <div className="col-span-9 flex flex-wrap gap-x-6 gap-y-3 pt-0.5">
              {skills.map((skill, index) => (
                <span key={index} className="text-xs text-slate-600 font-light tracking-wide">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* --- Languages --- */}
        {languages?.length > 0 && (
          <section className="flex-1 grid grid-cols-12 gap-6 bg-slate-50 p-5 rounded-2xl">
            <h3 className="col-span-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-slate-400 pt-1">
              Languages
            </h3>
            <div className="col-span-9 flex flex-col gap-3 pt-0.5">
              {languages.map((lang, index) => (
                <div key={lang.id || index} className="flex justify-between items-baseline max-w-xs">
                  <span className="text-xs text-slate-800 font-semibold tracking-wide">
                    {lang.language}
                  </span>
                  <span className="text-[10px] text-slate-500 font-light tracking-widest uppercase">
                    {lang.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MinimalTemplate;
