import { useState } from 'react';
import { useResume } from '../context/ResumeContext';

const SkillsForm = () => {
  const { resumeData, addSkill, removeSkill } = useResume();
  const skills = resumeData.skills;
  const [newSkill, setNewSkill] = useState('');

  const handleAdd = () => {
    if (newSkill.trim()) {
      // Split by comma in case user pastes a comma-separated list
      const items = newSkill.split(',').map(s => s.trim()).filter(Boolean);
      items.forEach(item => {
        addSkill(item);
      });
      setNewSkill('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-6">
      <div className="px-1">
        <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">psychology</span>
          Technical Expertise
        </h3>
      </div>

      <div className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow space-y-4">
        {/* Skill Tags */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary-container text-on-secondary-fixed-variant text-xs font-semibold rounded-full"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="material-symbols-outlined text-[14px] hover:text-error transition-colors"
              >
                close
              </button>
            </span>
          ))}
        </div>

        {/* Add Skill Input */}
        <div className="relative flex items-center">
          <input
            className="w-full h-10 px-4 pr-12 bg-surface-container-low border-none rounded-lg text-sm input-focus-glow transition-all"
            type="text"
            placeholder="E.g. JavaScript, React, Node.js..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            type="button" 
            onClick={handleAdd}
            className="absolute right-2 p-1.5 flex items-center justify-center text-outline hover:text-primary transition-colors rounded-md hover:bg-surface-container-high"
            title="Add Skill"
          >
            <span className="material-symbols-outlined text-[20px]">
              add_circle
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
