const EducationForm = ({ education, addEntry, removeEntry, updateEntry }) => {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">school</span>
          Education
        </h3>
        <button
          type="button"
          onClick={addEntry}
          className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[18px]">add</span> Add Degree
        </button>
      </div>

      {/* Education Cards */}
      <div className="space-y-4">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow relative group fade-slide-in"
          >
            {/* Delete Button */}
            <button
              type="button"
              onClick={() => removeEntry(edu.id)}
              className="absolute top-4 right-4 text-outline hover:text-error transition-colors opacity-0 group-hover:opacity-100"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
                  Institution
                </label>
                <input
                  className="w-full h-9 px-3 bg-surface-container-low border-none rounded-lg text-sm input-focus-glow"
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEntry(edu.id, 'institution', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
                  Degree
                </label>
                <input
                  className="w-full h-9 px-3 bg-surface-container-low border-none rounded-lg text-sm input-focus-glow"
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEntry(edu.id, 'degree', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
                    Start
                  </label>
                  <input
                    className="w-full h-9 px-3 bg-surface-container-low border-none rounded-lg text-sm input-focus-glow"
                    type="text"
                    value={edu.startYear}
                    onChange={(e) => updateEntry(edu.id, 'startYear', e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
                    End
                  </label>
                  <input
                    className="w-full h-9 px-3 bg-surface-container-low border-none rounded-lg text-sm input-focus-glow"
                    type="text"
                    value={edu.endYear}
                    onChange={(e) => updateEntry(edu.id, 'endYear', e.target.value)}
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

export default EducationForm;
