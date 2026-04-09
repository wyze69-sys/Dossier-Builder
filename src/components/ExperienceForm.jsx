import FormInput from './common/FormInput';

const ExperienceForm = ({ experience, addEntry, removeEntry, updateEntry }) => {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">work</span>
          Professional Experience
        </h3>
        <button
          type="button"
          onClick={addEntry}
          className="self-start text-xs font-bold text-primary hover:underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[18px]">add</span> Add Role
        </button>
      </div>

      {/* Experience Cards / Empty State */}
      <div className="space-y-4">
        {experience.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12 bg-surface-container-lowest rounded-xl border-2 border-dashed border-outline-variant/40 text-center fade-slide-in">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40">work</span>
            <div>
              <p className="text-sm font-bold text-on-surface-variant">No Experience Added Yet</p>
              <p className="text-xs text-on-surface-variant/60 mt-1">Showcase your roles, internships, or freelance work.</p>
            </div>
            <button
              type="button"
              onClick={addEntry}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all duration-300 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Add Your First Role
            </button>
          </div>
        ) : (
          experience.map((exp) => (
            <div
              key={exp.id}
              className="bg-surface-container-lowest rounded-xl p-5 ambient-shadow relative group fade-slide-in sm:p-6"
            >
              {/* Delete Button */}
              <button
                type="button"
                onClick={() => removeEntry(exp.id)}
                className="absolute top-4 right-4 text-outline hover:text-error transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Company"
                    value={exp.company}
                    onChange={(e) => updateEntry(exp.id, 'company', e.target.value)}
                  />
                  <FormInput
                    label="Role"
                    value={exp.role}
                    onChange={(e) => updateEntry(exp.id, 'role', e.target.value)}
                  />
                </div>
                <FormInput
                  label="Description"
                  type="textarea"
                  value={exp.description}
                  onChange={(e) => updateEntry(exp.id, 'description', e.target.value)}
                  maxLength={360}
                  showCounter
                />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex flex-col justify-end">
                    <FormInput
                      label="Start Year"
                      value={exp.startYear}
                      onChange={(e) => updateEntry(exp.id, 'startYear', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5 flex flex-col justify-end">
                    <div className="mb-1 ml-1 flex items-start gap-2">
                      <input
                        type="checkbox"
                        id={`current-${exp.id}`}
                        checked={exp.isCurrent || false}
                        onChange={(e) => updateEntry(exp.id, 'isCurrent', e.target.checked)}
                        className="w-3.5 h-3.5 rounded border-outline text-primary focus:ring-primary"
                      />
                      <label htmlFor={`current-${exp.id}`} className="cursor-pointer text-[10px] font-bold uppercase leading-4 tracking-wider text-on-surface-variant">
                        I currently work here
                      </label>
                    </div>
                    {exp.isCurrent ? (
                      <div className="space-y-1.5 w-full">
                        <input
                          className="w-full h-10 px-4 border-none rounded-lg text-sm bg-surface-container-highest text-on-surface-variant/50 cursor-not-allowed opacity-50"
                          type="text"
                          value="Present"
                          disabled
                        />
                      </div>
                    ) : (
                      <FormInput
                        label=""
                        value={exp.endYear}
                        onChange={(e) => updateEntry(exp.id, 'endYear', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;
