import FormInput from './common/FormInput';
import { useResume } from '../context/ResumeContext';

const EducationForm = () => {
  const { resumeData, addEntry: addEntryAction, removeEntry: removeEntryAction, updateEntry: updateEntryAction } = useResume();
  const education = resumeData.education;

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
          onClick={() => addEntryAction('education')}
          className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[18px]">add</span> Add Degree
        </button>
      </div>

      {/* Education Cards / Empty State */}
      <div className="space-y-4">
        {education.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12 bg-surface-container-lowest rounded-xl border-2 border-dashed border-outline-variant/40 text-center fade-slide-in">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40">school</span>
            <div>
              <p className="text-sm font-bold text-on-surface-variant">No Education Added Yet</p>
              <p className="text-xs text-on-surface-variant/60 mt-1">Add your degrees, certifications, or courses.</p>
            </div>
            <button
              type="button"
              onClick={() => addEntryAction('education')}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all duration-300 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Add Your First Degree
            </button>
          </div>
        ) : (
          education.map((edu) => (
            <div
              key={edu.id}
              className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow relative group fade-slide-in"
            >
              {/* Delete Button */}
              <button
                type="button"
                onClick={() => removeEntryAction('education', edu.id)}
                className="absolute top-4 right-4 text-outline hover:text-error transition-colors opacity-0 group-hover:opacity-100"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <FormInput
                    label="Institution"
                    value={edu.institution}
                    onChange={(e) => updateEntryAction('education', edu.id, 'institution', e.target.value)}
                  />
                </div>
                <FormInput
                  label="Degree"
                  value={edu.degree}
                  onChange={(e) => updateEntryAction('education', edu.id, 'degree', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <FormInput
                    label="Start"
                    value={edu.startYear}
                    onChange={(e) => updateEntryAction('education', edu.id, 'startYear', e.target.value)}
                  />
                  <FormInput
                    label="End"
                    value={edu.endYear}
                    onChange={(e) => updateEntryAction('education', edu.id, 'endYear', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EducationForm;
