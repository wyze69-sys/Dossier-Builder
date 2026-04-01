import React from 'react';

const FormInput = ({ label, value, onChange, type = "text", placeholder = "" }) => {
  const isTextarea = type === "textarea";

  const commonClasses = "w-full px-4 bg-slate-50 border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-lg text-sm transition-all duration-200 ease-in-out text-slate-800 placeholder:text-slate-400";

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
