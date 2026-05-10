import { useResume } from '../context/ResumeContext';
import PersonalInfoForm from './PersonalInfoForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import SkillsForm from './SkillsForm';
import LanguagesForm from './LanguagesForm';
import ProjectsForm from './ProjectsForm';

const EditorPanel = () => {
  const { fillExampleData, clearData } = useResume();

  return (
    <section id="editor-scroll-container" className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 bg-surface-container-low/50 smooth-scroll">
      <div className="max-w-2xl mx-auto space-y-12 pb-20">
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
              className="px-4 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
              Clear Data
            </button>
            <button
              type="button"
              onClick={fillExampleData}
              className="px-4 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">magic_button</span>
              Fill with Example
            </button>
          </div>
        </div>

        <div id="section-personal"><PersonalInfoForm /></div>
        <div id="section-education"><EducationForm /></div>
        <div id="section-experience"><ExperienceForm /></div>
        <div id="section-skills"><SkillsForm /></div>
        <div id="section-languages"><LanguagesForm /></div>
        <div id="section-projects"><ProjectsForm /></div>
      </div>
    </section>
  );
};

export default EditorPanel;
