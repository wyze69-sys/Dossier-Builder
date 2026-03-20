const ProfessionalTemplate = ({ data }) => {
  return (
    <div className="w-full min-h-[297mm] flex font-sans text-slate-800 tracking-tight leading-relaxed">
      <aside className="w-[28%] bg-[#0f2942] text-white p-6 flex flex-col items-end text-right">
        {data.profileImage && (
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 mb-8 shrink-0">
            <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="space-y-4 w-full">
          {data.email && (
            <div>
              <h4 className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">Email</h4>
              <p className="text-xs break-words">{data.email}</p>
            </div>
          )}
          {data.phone && (
            <div>
              <h4 className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">Phone</h4>
              <p className="text-xs">{data.phone}</p>
            </div>
          )}
          {data.location && (
            <div>
              <h4 className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">Location</h4>
              <p className="text-xs">{data.location}</p>
            </div>
          )}
          {data.linkedin && (
            <div>
              <h4 className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">LinkedIn</h4>
              <p className="text-xs break-words">{data.linkedin.replace(/(^\w+:|^)\/\//, '')}</p>
            </div>
          )}
        </div>

        {data.skills && data.skills.length > 0 && (
          <div className="mt-10 w-full">
            <h4 className="text-[13px] font-bold text-blue-300 uppercase tracking-widest border-b border-white/20 pb-2 mb-4">Core Skills</h4>
            <div className="flex flex-col gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="text-xs font-medium">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {data.languages && data.languages.length > 0 && (
          <div className="mt-10 w-full">
            <h4 className="text-[13px] font-bold text-blue-300 uppercase tracking-widest border-b border-white/20 pb-2 mb-4">Languages</h4>
            <div className="flex flex-col gap-3">
              {data.languages.map((lang) => (
                <div key={lang.id} className="text-xs">
                  <p className="font-bold">{lang.language}</p>
                  <p className="text-white/70">{lang.proficiency}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main className="flex-1 bg-white p-8 flex flex-col space-y-6">
        
        <div className="border-b-[3px] border-[#0f2942] pb-6">
          <h1 className="text-5xl font-extrabold text-[#0f2942] tracking-tighter mb-2">{data.fullName}</h1>
          <h2 className="text-xl font-medium text-slate-500 uppercase tracking-widest">{data.jobTitle}</h2>
        </div>

        {data.summary && (
          <div>
            <p className="text-sm text-slate-700 leading-relaxed text-justify">{data.summary}</p>
          </div>
        )}

        {data.experience && data.experience.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-[#0f2942] uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#0f2942]"></span>
              Professional Experience
            </h3>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-slate-200">
                  <div className="absolute w-3 h-3 bg-[#0f2942] rounded-full -left-[7px] top-1.5 border-2 border-white"></div>
                  
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-base font-bold text-slate-800">{exp.role}</h4>
                    <span className="text-xs font-bold text-[#0f2942] bg-slate-100 px-2 py-1 rounded">
                      {exp.startYear} — {exp.isCurrent ? 'Present' : exp.endYear}
                    </span>
                  </div>
                  <h5 className="text-sm font-bold text-slate-500 mb-2">{exp.company}</h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed text-justify hyphens-auto break-words">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {data.education && data.education.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-[#0f2942] uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#0f2942]"></span>
                Education
              </h3>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="text-sm font-bold text-slate-800">{edu.degree}</h4>
                    <h5 className="text-xs text-slate-500">{edu.institution}</h5>
                    <p className="text-xs font-semibold text-[#0f2942] mt-1">{edu.startYear} — {edu.endYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.projects && data.projects.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-[#0f2942] uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#0f2942]"></span>
                Projects
              </h3>
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <h4 className="text-sm font-bold text-slate-800">{proj.title} <span className="text-xs font-normal text-slate-500 ml-1">| {proj.role}</span></h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-1 text-justify hyphens-auto break-words">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default ProfessionalTemplate;
