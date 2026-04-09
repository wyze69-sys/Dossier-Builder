import React from 'react';

const FormInput = ({ label, value, onChange, type = "text", placeholder = "", maxLength, showCounter = false }) => {
  const isTextarea = type === "textarea";
  const currentLength = typeof value === 'string' ? value.length : 0;

  const commonClasses = "w-full px-4 bg-white border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-lg text-sm transition-all duration-200 ease-in-out text-slate-800 placeholder:text-slate-400";

  return (
    <div className="space-y-1.5 w-full">
      {label ? (
        <label className="text-[11px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
          {label}
        </label>
      ) : null}
      {isTextarea ? (
        <textarea
          className={`${commonClasses} p-4 h-24 resize-none`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      ) : (
        <input
          className={`${commonClasses} h-10`}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      )}
      {showCounter && typeof maxLength === 'number' && (
        <p className="text-[10px] text-on-surface-variant/70 text-right pr-1">
          {currentLength}/{maxLength}
        </p>
      )}
    </div>
  );
};

export default FormInput;
