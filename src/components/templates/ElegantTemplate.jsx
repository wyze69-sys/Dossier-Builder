const ElegantTemplate = ({ data }) => {
  return (
    <div className="w-full min-h-[297mm] bg-[#faf9f6] text-[#2c2c2c] p-8 box-border flex flex-col items-center">
      
      {/* Header Container */}
      <header className="w-full flex justify-between items-center border-b border-[#2c2c2c] pb-8 mb-8">
        
        {/* Left Side: Name and Title */}
        <div className="flex-1">
          <h1 className="text-5xl font-serif tracking-tight text-[#1a1a1a] mb-2 font-medium">
            {data.fullName}
          </h1>
          <h2 className="text-xs font-sans tracking-[0.3em] uppercase text-[#5a5a5a]">
            {data.jobTitle}
          </h2>
        </div>

        {/* Right Side: Contact Array */}
        <div className="text-right flex flex-col gap-1 items-end pt-2">
          {data.email && <p className="text-[11px] font-sans tracking-widest text-[#5a5a5a]">{data.email}</p>}
          {data.phone && <p className="text-[11px] font-sans tracking-widest text-[#5a5a5a]">{data.phone}</p>}
          {data.location && <p className="text-[11px] font-sans tracking-widest text-[#5a5a5a]">{data.location}</p>}
          {data.linkedin && <p className="text-[11px] font-sans tracking-widest text-[#5a5a5a]">{data.linkedin.replace(/(^\w+:|^)\/\//, '')}</p>}
        </div>
      </header>

      {/* Secondary Top Row: Picture + Summary */}
      <div className="w-full flex gap-10 items-start mb-8">
        {data.profileImage && (
          <div className="w-32 h-32 shrink-0 grayscale hover:grayscale-0 transition-all duration-700">
            <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
        {data.summary && (
          <p className="flex-1 font-serif text-sm leading-8 text-[#4a4a4a] text-justify pt-1">
            <span className="text-3xl font-serif text-[#b8a99a] leading-none float-left mr-2 -mt-1">"</span>
            {data.summary}
          </p>
        )}
      </div>

      {/* Grid Layout for Core Content */}
      <div className="w-full grid grid-cols-12 gap-6 flex-1">
        
        {/* Left Span: Details (4 Cols) */}
        <aside className="col-span-4 flex flex-col gap-4">
          
          {/* Education Block */}
          {data.education && data.education.length > 0 && (
            <div className="flex-1 bg-black/5 p-5 rounded-2xl flex flex-col justify-center">
              <h3 className="text-[13px] font-sans tracking-[0.25em] uppercase text-[#1a1a1a] pb-3 mb-2 border-b border-[#dddddd]/50">Education</h3>
              <div className="space-y-5">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-serif text-[13px] font-medium text-[#2c2c2c]">{edu.degree}</h4>
                    <h5 className="font-sans text-[11px] text-[#5a5a5a] mt-1">{edu.institution}</h5>
                    <p className="font-sans text-[9px] tracking-widest uppercase text-[#8a8a8a] mt-1">
                      {edu.startYear} — {edu.endYear}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages Block */}
          {data.languages && data.languages.length > 0 && (
            <div className="flex-1 bg-black/5 p-5 rounded-2xl flex flex-col justify-center">
              <h3 className="text-[13px] font-sans tracking-[0.25em] uppercase text-[#1a1a1a] pb-3 mb-2 border-b border-[#dddddd]/50">Languages</h3>
              <div className="space-y-3">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-baseline border-b border-dashed border-[#e5e5e5] pb-2">
                    <span className="font-serif text-[13px] text-[#2c2c2c]">{lang.language}</span>
                    <span className="font-sans text-[9px] tracking-widest uppercase text-[#8a8a8a]">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Block */}
          {data.skills && data.skills.length > 0 && (
            <div className="flex-1 bg-black/5 p-5 rounded-2xl flex flex-col justify-center">
              <h3 className="text-[13px] font-sans tracking-[0.25em] uppercase text-[#1a1a1a] pb-3 mb-2 border-b border-[#dddddd]/50">Expertise</h3>
              <div className="flex flex-col gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="font-sans text-[11px] tracking-wide text-[#5a5a5a] flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#b8a99a] rounded-full"></span>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

        </aside>


        {/* Right Span: Experience (8 Cols) */}
        <main className="col-span-8 flex flex-col gap-4">
          
          {/* Experience Timeline */}
          {data.experience && data.experience.length > 0 && (
            <div className="flex-1 bg-black/5 p-6 rounded-2xl flex flex-col justify-center">
              <h3 className="text-[13px] font-sans tracking-[0.25em] uppercase text-[#1a1a1a] pb-3 mb-4 border-b border-[#dddddd]/50">Experience</h3>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-serif text-[15px] font-medium text-[#1a1a1a]">{exp.company}</h4>
                      <span className="font-sans text-[10px] tracking-wider uppercase text-[#8a8a8a]">
                        {exp.startYear} — {exp.isCurrent ? 'Present' : exp.endYear}
                      </span>
                    </div>
                    <h5 className="font-sans text-[11px] font-semibold text-[#5a5a5a] tracking-wide mb-3">{exp.role}</h5>
                    <p className="font-serif text-[13px] text-[#4a4a4a] leading-7 text-justify hyphens-auto break-words">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Focus */}
          {data.projects && data.projects.length > 0 && (
            <div className="flex-1 bg-black/5 p-6 rounded-2xl flex flex-col justify-center">
              <h3 className="text-[13px] font-sans tracking-[0.25em] uppercase text-[#1a1a1a] pb-3 mb-4 border-b border-[#dddddd]/50">Selected Works</h3>
              <div className="space-y-6">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <h4 className="font-serif text-[14px] font-medium text-[#1a1a1a] mb-1">{proj.title} <span className="font-sans text-[10px] text-[#8a8a8a] ml-2 tracking-widest uppercase">{proj.role}</span></h4>
                    <p className="font-serif text-[13px] text-[#4a4a4a] leading-7 text-justify hyphens-auto break-words">
                      {proj.description}
                    </p>
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

export default ElegantTemplate;
