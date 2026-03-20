const PersonalInfoForm = ({ data, updatePersonalInfo }) => {
  const handleChange = (field) => (e) => {
    updatePersonalInfo(field, e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl p-8 ambient-shadow space-y-6 fade-slide-in">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">person</span>
          Personal Information
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
            Full Name
          </label>
          <input
            className="w-full h-10 px-4 bg-surface-container-low border-none rounded-lg text-sm input-focus-glow transition-all"
            type="text"
            value={data.fullName}
            onChange={handleChange('fullName')}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
            Job Title
          </label>
          <input
            className="w-full h-10 px-4 bg-surface-container-low border-none rounded-lg text-sm input-focus-glow transition-all"
            type="text"
            value={data.jobTitle}
            onChange={handleChange('jobTitle')}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
            Email Address
          </label>
          <input
            className="w-full h-10 px-4 bg-surface-container-low border-none rounded-lg text-sm input-focus-glow transition-all"
            type="email"
            value={data.email}
            onChange={handleChange('email')}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
            Phone Number
          </label>
          <input
            className="w-full h-10 px-4 bg-surface-container-low border-none rounded-lg text-sm input-focus-glow transition-all"
            type="tel"
            value={data.phone}
            onChange={handleChange('phone')}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
          Location / Address
        </label>
        <input
          className="w-full h-10 px-4 bg-surface-container-low border-none rounded-lg text-sm input-focus-glow transition-all"
          type="text"
          value={data.location || ''}
          onChange={handleChange('location')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
            LinkedIn Profile
          </label>
          <input
            className="w-full h-10 px-4 bg-surface-container-low border-none rounded-lg text-sm input-focus-glow transition-all"
            type="url"
            value={data.linkedin || ''}
            onChange={handleChange('linkedin')}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
            Portfolio / GitHub
          </label>
          <input
            className="w-full h-10 px-4 bg-surface-container-low border-none rounded-lg text-sm input-focus-glow transition-all"
            type="url"
            value={data.portfolio || ''}
            onChange={handleChange('portfolio')}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase text-on-surface-variant tracking-wider ml-1">
          Summary
        </label>
        <textarea
          className="w-full p-4 bg-surface-container-low border-none rounded-lg text-sm input-focus-glow transition-all h-32 resize-none"
          value={data.summary || ''}
          onChange={handleChange('summary')}
        />
      </div>

      {/* Photo Upload Area */}
      <div className="pt-4">
        <label className="w-full h-32 border-2 border-dashed border-outline-variant/50 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-primary-fixed/20 transition-all cursor-pointer group relative overflow-hidden">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          
          {data.profileImage ? (
            <>
              <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                <span className="material-symbols-outlined mb-1">cameraswitch</span>
                <span className="text-xs font-bold">Change Photo</span>
              </div>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                cloud_upload
              </span>
              <span className="text-xs font-semibold text-on-surface-variant">Upload Professional Portrait</span>
              <span className="text-[10px] text-outline">JPG, PNG up to 5MB</span>
            </>
          )}
        </label>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
