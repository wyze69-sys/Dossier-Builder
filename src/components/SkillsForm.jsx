import { useState } from 'react';

const SkillsForm = ({ skills, addSkill, removeSkill }) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAdd = () => {
    if (newSkill.trim()) {
      addSkill(newSkill);
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
                className="material-symbols-outlined text-[14px]"
              >
                close
              </button>
            </span>
          ))}
        </div>

        {/* Add Skill Input */}
        <div className="relative">
          <input
            className="w-full h-10 px-4 pr-10 bg-surface-container-low border-none rounded-lg text-sm input-focus-glow transition-all"
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="button" onClick={handleAdd}>
            <span className="material-symbols-outlined absolute right-3 top-2.5 text-outline">
              add_circle
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
