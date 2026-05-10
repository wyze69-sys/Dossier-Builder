import React, { useState } from 'react';

const FormInput = ({ label, value, onChange, type = "text", placeholder = "", maxLength, showCounter = false, validate }) => {
  const [error, setError] = useState(null);
  const isTextarea = type === "textarea";
  const currentLength = typeof value === 'string' ? value.length : 0;

  const handleBlur = () => {
    if (validate) {
      const result = validate(value || '');
      setError(result || null);
    }
  };

  const handleChange = (e) => {
    if (error) setError(null);
    onChange(e);
  };

  const inputClasses = `w-full px-4 bg-white border shadow-sm focus:outline-none rounded-lg text-sm transition-all duration-200 ease-in-out text-slate-800 placeholder:text-slate-400 ${
    error
      ? 'border-error focus:ring-2 focus:ring-error/20 focus:border-error'
      : 'border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
  }`;

  return (
    <div className="space-y-1.5 w-full">
      <label className="text-[11px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
        {label}
      </label>
      {isTextarea ? (
        <textarea
          className={`${inputClasses} p-4 h-24 resize-none`}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      ) : (
        <input
          className={`${inputClasses} h-10`}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      )}
      {error && (
        <p className="text-[11px] text-error mt-1 ml-1">{error}</p>
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
