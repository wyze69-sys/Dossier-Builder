import FormInput from './common/FormInput';
import { useResume } from '../context/ResumeContext';

const ProjectsForm = () => {
  const { resumeData, addEntry: addEntryAction, removeEntry: removeEntryAction, updateEntry: updateEntryAction } = useResume();
  const projects = resumeData.projects;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">architecture</span>
          Selected Projects
        </h3>
        <button
          type="button"
          onClick={() => addEntryAction('projects')}
          className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[18px]">add</span> Add Project
        </button>
      </div>

      {/* Projects Cards */}
      <div className="space-y-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow relative group fade-slide-in"
          >
            {/* Delete Button */}
            <button
              type="button"
              onClick={() => removeEntryAction('projects', proj.id)}
              className="absolute top-4 right-4 text-outline hover:text-error transition-colors opacity-0 group-hover:opacity-100"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="grid grid-cols-1 gap-4">
              <FormInput
                label="Project Title"
                value={proj.title}
                onChange={(e) => updateEntryAction('projects', proj.id, 'title', e.target.value)}
              />
              <FormInput
                label="Role / Contribution"
                value={proj.role}
                onChange={(e) => updateEntryAction('projects', proj.id, 'role', e.target.value)}
              />
              <FormInput
                label="Description & Impact"
                type="textarea"
                value={proj.description}
                onChange={(e) => updateEntryAction('projects', proj.id, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsForm;
