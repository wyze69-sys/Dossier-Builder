import FormInput from './common/FormInput';

const ProjectsForm = ({ projects, addEntry, removeEntry, updateEntry }) => {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">architecture</span>
          Selected Projects
        </h3>
        <button
          type="button"
          onClick={addEntry}
          className="self-start text-xs font-bold text-primary hover:underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[18px]">add</span> Add Project
        </button>
      </div>

      {/* Projects Cards */}
      <div className="space-y-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-surface-container-lowest rounded-xl p-5 ambient-shadow relative group fade-slide-in sm:p-6"
          >
            {/* Delete Button */}
            <button
              type="button"
              onClick={() => removeEntry(proj.id)}
              className="absolute top-4 right-4 text-outline hover:text-error transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="grid grid-cols-1 gap-4">
              <FormInput
                label="Project Title"
                value={proj.title}
                onChange={(e) => updateEntry(proj.id, 'title', e.target.value)}
              />
              <FormInput
                label="Role / Contribution"
                value={proj.role}
                onChange={(e) => updateEntry(proj.id, 'role', e.target.value)}
              />
              <FormInput
                label="Description & Impact"
                type="textarea"
                value={proj.description}
                onChange={(e) => updateEntry(proj.id, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsForm;
