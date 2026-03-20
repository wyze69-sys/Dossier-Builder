const ExperienceForm = ({ experience, addEntry, removeEntry, updateEntry }) => {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">work</span>
          Professional Experience
        </h3>
        <button
          type="button"
          onClick={addEntry}
          className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[18px]">add</span> Add Role
        </button>
      </div>

      {/* Experience Cards */}
      <div className="space-y-4">
        {experience.map((exp) => (
          <div
            key={exp.id}
            className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow relative group fade-slide-in"
          >
            {/* Delete Button */}
            <button
              type="button"
              onClick={() => removeEntry(exp.id)}
              className="absolute top-4 right-4 text-outline hover:text-error transition-colors opacity-0 group-hover:opacity-100"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
                    Company
                  </label>
                  <input
                    className="w-full h-9 px-3 bg-surface-container-low border-none rounded-lg text-sm input-focus-glow"
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateEntry(exp.id, 'company', e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
                    Role
                  </label>
                  <input
                    className="w-full h-9 px-3 bg-surface-container-low border-none rounded-lg text-sm input-focus-glow"
                    type="text"
                    value={exp.role}
                    onChange={(e) => updateEntry(exp.id, 'role', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
                  Description
                </label>
                <textarea
                  className="w-full p-3 bg-surface-container-low border-none rounded-lg text-sm input-focus-glow h-24 resize-none"
                  value={exp.description}
                  onChange={(e) => updateEntry(exp.id, 'description', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5 flex flex-col justify-end">
                  <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
                    Start Year
                  </label>
                  <input
                    className="w-full h-9 px-3 bg-surface-container-low border-none rounded-lg text-sm input-focus-glow"
                    type="text"
                    value={exp.startYear}
                    onChange={(e) => updateEntry(exp.id, 'startYear', e.target.value)}
                  />
                </div>
                <div className="space-y-1.5 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-1 ml-1">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.isCurrent || false}
                      onChange={(e) => updateEntry(exp.id, 'isCurrent', e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-outline text-primary focus:ring-primary"
                    />
                    <label htmlFor={`current-${exp.id}`} className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider cursor-pointer">
                      I currently work here
                    </label>
                  </div>
                  <input
                    className={`w-full h-9 px-3 border-none rounded-lg text-sm input-focus-glow ${exp.isCurrent ? 'bg-surface-container-highest text-on-surface-variant/50 cursor-not-allowed opacity-50' : 'bg-surface-container-low'}`}
                    type="text"
                    value={exp.isCurrent ? 'Present' : exp.endYear}
                    disabled={exp.isCurrent}
                    onChange={(e) => updateEntry(exp.id, 'endYear', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;
