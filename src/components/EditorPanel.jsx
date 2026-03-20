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
    <section id="editor-scroll-container" className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 bg-surface-container-low/50 smooth-scroll">
      <div className="max-w-2xl mx-auto space-y-12 pb-20">
        {/* Section Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-on-surface font-manrope tracking-tight">
              Craft Your Profile
            </h1>
            <p className="text-on-surface-variant text-sm">
              Every detail counts in the architectural dossier of your career.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={clearData}
              className="px-4 py-2 text-xs font-semibold text-error bg-error/10 hover:bg-error/20 rounded-lg transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
              Clear Data
            </button>
            <button
              type="button"
              onClick={fillExampleData}
              className="px-4 py-2 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors flex items-center gap-2"
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
