import { useState } from 'react';

const LanguagesForm = ({ data = [], addEntry, removeEntry, updateEntry }) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 ambient-shadow space-y-6 fade-slide-in mt-6 sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">translate</span>
          Languages
        </h3>
        <button
          type="button"
          onClick={() => addEntry('languages')}
          className="flex self-start items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary-fixed"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          ADD LANGUAGE
        </button>
      </div>

      <div className="space-y-6">
        {data.map((lang, index) => (
          <div key={lang.id} className="relative bg-surface p-5 rounded-xl border border-outline-variant/30 slide-in sm:p-6" style={{ animationDelay: `${index * 50}ms` }}>
            <button
              type="button"
              onClick={() => removeEntry('languages', lang.id)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="grid grid-cols-1 gap-6 pr-0 md:grid-cols-2 sm:pr-8">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
                  Language Name
                </label>
                <input
                  className="w-full h-10 px-4 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                  type="text"
                  value={lang.language || ''}
                  onChange={(e) => updateEntry('languages', lang.id, 'language', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
                  Proficiency Level
                </label>
                <select
                  className="w-full h-10 px-4 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                  value={lang.proficiency || ''}
                  onChange={(e) => updateEntry('languages', lang.id, 'proficiency', e.target.value)}
                >
                  <option value="" disabled>Select proficiency...</option>
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Proficient">Proficient</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Beginner">Beginner</option>
                </select>
              </div>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div className="text-center py-6 text-sm text-on-surface-variant/60 italic border-2 border-dashed border-outline-variant/30 rounded-xl">
            No languages added yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguagesForm;
