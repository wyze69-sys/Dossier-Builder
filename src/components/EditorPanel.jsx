import PersonalInfoForm from './PersonalInfoForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import SkillsForm from './SkillsForm';
import LanguagesForm from './LanguagesForm';
import ProjectsForm from './ProjectsForm';

const EditorPanel = ({ 
  resumeData, 
  updatePersonalInfo,
  addEntry,
  removeEntry,
  updateEntry,
  addSkill,
  removeSkill,
  fillExampleData,
  clearData
}) => {
  return (
    <section id="editor-scroll-container" className="flex-1 overflow-visible bg-surface-container-low/50 p-4 smooth-scroll sm:p-6 md:overflow-y-auto md:p-10">
      <div className="max-w-2xl mx-auto space-y-12 pb-20">
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-on-surface font-manrope tracking-tight sm:text-3xl">
              Craft Your Profile
            </h1>
            <p className="text-on-surface-variant text-sm">
              Every detail counts in the architectural dossier of your career.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={clearData}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100 sm:w-auto"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
              Clear Data
            </button>
            <button
              type="button"
              onClick={fillExampleData}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-100 sm:w-auto"
            >
              <span className="material-symbols-outlined text-[16px]">magic_button</span>
              Fill with Example
            </button>
          </div>
        </div>

        {/* Form Sections */}
        <div id="section-personal">
          <PersonalInfoForm
            data={{
              fullName: resumeData.fullName,
              jobTitle: resumeData.jobTitle,
              email: resumeData.email,
              phone: resumeData.phone,
              summary: resumeData.summary,
              linkedin: resumeData.linkedin,
              portfolio: resumeData.portfolio,
              location: resumeData.location,
              profileImage: resumeData.profileImage,
            }}
            updatePersonalInfo={updatePersonalInfo}
          />
        </div>
        
        <div id="section-education">
          <EducationForm 
            education={resumeData.education} 
            addEntry={() => addEntry('education')}
            removeEntry={(id) => removeEntry('education', id)}
            updateEntry={(id, field, value) => updateEntry('education', id, field, value)}
          />
        </div>
        
        <div id="section-experience">
          <ExperienceForm 
            experience={resumeData.experience} 
            addEntry={() => addEntry('experience')}
            removeEntry={(id) => removeEntry('experience', id)}
            updateEntry={(id, field, value) => updateEntry('experience', id, field, value)}
          />
        </div>
        
        <div id="section-skills">
          <SkillsForm 
            skills={resumeData.skills} 
            addSkill={addSkill}
            removeSkill={removeSkill}
          />
        </div>

        <div id="section-languages">
          <LanguagesForm 
            data={resumeData.languages || []} 
            addEntry={addEntry}
            removeEntry={removeEntry}
            updateEntry={updateEntry}
          />
        </div>

        <div id="section-projects">
          <ProjectsForm 
            projects={resumeData.projects} 
            addEntry={() => addEntry('projects')}
            removeEntry={(id) => removeEntry('projects', id)}
            updateEntry={(id, field, value) => updateEntry('projects', id, field, value)}
          />
        </div>
      </div>
    </section>
  );
};

export default EditorPanel;
