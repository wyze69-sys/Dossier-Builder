const ProfessionalTemplate = ({ data }) => {
  const contactParts = [
    data.location,
    data.phone,
    data.email,
    data.linkedin ? data.linkedin.replace(/(^\w+:|^)\/\//, '') : '',
    data.portfolio ? data.portfolio.replace(/(^\w+:|^)\/\//, '') : ''
  ].filter(Boolean);

  const sectionHeadingClass = 'text-[13px] font-bold uppercase tracking-widest border-b-[2px] border-black pb-1 mb-2.5 mt-4';

  return (
    <div className="w-full min-h-[1123px] bg-white text-black px-11 pt-11 pb-10 box-border" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
      <header className="resume-header text-center mb-5 print-avoid-break relative">
        {data.profileImage && (
          <div className="absolute left-0 top-0 w-24 h-24 rounded-md overflow-hidden border border-gray-300 bg-gray-100">
            <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
        <h1 className="text-[32px] font-extrabold tracking-widest leading-none uppercase mb-2">{data.fullName}</h1>
        {data.jobTitle && (
          <p className="text-[14px] font-bold uppercase tracking-widest mb-1.5 text-gray-800">{data.jobTitle}</p>
        )}
        {contactParts.length > 0 && (
          <p className="text-[12px] leading-relaxed text-gray-700">
            {contactParts.join('  •  ')}
          </p>
        )}
      </header>

      {data.summary && (
        <section className="print-avoid-break">
          <h2 className={sectionHeadingClass}>Professional Summary</h2>
          <p className="text-[12.5px] leading-snug text-justify text-gray-900">{data.summary}</p>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section>
          <h2 className={sectionHeadingClass}>Professional Experience</h2>
          <div className="space-y-3.5">
            {data.experience.map((exp) => (
              <article key={exp.id} className="print-avoid-break">
                <div className="flex items-baseline justify-between mb-[1px]">
                  <h3 className="text-[14px] font-bold">{exp.role}</h3>
                  <p className="text-[12px] font-bold whitespace-nowrap">
                    {exp.startYear} - {exp.isCurrent ? 'Present' : exp.endYear}
                  </p>
                </div>
                <p className="text-[13px] italic font-semibold mb-1">{exp.company}</p>
                {exp.description && (
                  <p className="text-[12.5px] leading-snug text-justify text-gray-900">{exp.description}</p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section>
          <h2 className={sectionHeadingClass}>Education</h2>
          <div className="space-y-2.5">
            {data.education.map((edu) => (
              <article key={edu.id} className="print-avoid-break">
                <div className="flex items-baseline justify-between mb-[1px]">
                  <h3 className="text-[14px] font-bold">{edu.degree}</h3>
                  <p className="text-[12px] font-bold whitespace-nowrap">{edu.startYear} - {edu.endYear}</p>
                </div>
                <p className="text-[13px] italic font-semibold">{edu.institution}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {data.projects && data.projects.length > 0 && (
        <section>
          <h2 className={sectionHeadingClass}>Projects</h2>
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <article key={proj.id} className="print-avoid-break">
                <h3 className="text-[14px] font-bold mb-0.5">
                  {proj.title}
                  {proj.role ? <span className="font-normal italic"> – {proj.role}</span> : null}
                </h3>
                {proj.description && <p className="text-[12.5px] leading-snug text-justify text-gray-900">{proj.description}</p>}
              </article>
            ))}
          </div>
        </section>
      )}

      {((data.skills && data.skills.length > 0) || (data.languages && data.languages.length > 0)) && (
        <section className="print-avoid-break">
          <h2 className={sectionHeadingClass}>Additional Information</h2>
          <div className="text-[12.5px] leading-snug space-y-1.5">
            {data.skills && data.skills.length > 0 && (
              <p><span className="font-bold">Technical Skills:</span> {data.skills.join(', ')}</p>
            )}
            {data.languages && data.languages.length > 0 && (
              <p><span className="font-bold">Languages:</span> {data.languages.map((lang) => `${lang.language}${lang.proficiency ? ` (${lang.proficiency})` : ''}`).join(', ')}</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfessionalTemplate;