import React from 'react';

const FormInput = ({ label, value, onChange, type = "text", placeholder = "" }) => {
  const isTextarea = type === "textarea";

  const commonClasses = "w-full px-4 bg-surface-container-low border-none rounded-lg text-sm input-focus-glow transition-all";

  return (
    <div className="space-y-1.5 w-full">
      <label className="text-[11px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
        {label}
      </label>
      {isTextarea ? (
        <textarea
          className={`${commonClasses} p-4 h-24 resize-none`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={`${commonClasses} h-10`}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FormInput;
