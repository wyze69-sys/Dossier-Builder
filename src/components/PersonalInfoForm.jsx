import FormInput from './common/FormInput';
import { useResume } from '../context/ResumeContext';

const PersonalInfoForm = () => {
  const { resumeData: data, updatePersonalInfo } = useResume();

  const handleChange = (field) => (e) => {
    updatePersonalInfo(field, e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const SIZE_LIMIT_MB = 1.5;

        const drawAndExportPng = (maxWidth) => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          return canvas.toDataURL('image/png');
        };

        const estimateSizeMb = (base64String) => (base64String.length * 0.75) / 1024 / 1024;

        let compressedBase64 = drawAndExportPng(400);
        if (estimateSizeMb(compressedBase64) > SIZE_LIMIT_MB) {
          compressedBase64 = drawAndExportPng(200);
        }

        if (estimateSizeMb(compressedBase64) > SIZE_LIMIT_MB) {
          compressedBase64 = drawAndExportPng(150);
        }

        if (estimateSizeMb(compressedBase64) > SIZE_LIMIT_MB) {
          alert('Image too large for local storage. Please choose a smaller file.');
          return;
        }

        updatePersonalInfo('profileImage', compressedBase64);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
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
        <FormInput
          label="Full Name"
          value={data.fullName || ''}
          onChange={handleChange('fullName')}
        />
        <FormInput
          label="Job Title"
          value={data.jobTitle || ''}
          onChange={handleChange('jobTitle')}
        />
        <FormInput
          label="Email Address"
          type="email"
          value={data.email || ''}
          onChange={handleChange('email')}
          validate={(val) => {
            if (!val) return null;
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? null : 'Please enter a valid email address';
          }}
        />
        <FormInput
          label="Phone Number"
          type="tel"
          value={data.phone || ''}
          onChange={handleChange('phone')}
          validate={(val) => {
            if (!val) return null;
            return val.replace(/\D/g, '').length >= 7 ? null : 'Please enter a valid phone number';
          }}
        />
      </div>

      <FormInput
        label="Location / Address"
        value={data.location || ''}
        onChange={handleChange('location')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="LinkedIn Profile"
          type="url"
          value={data.linkedin || ''}
          onChange={handleChange('linkedin')}
          validate={(val) => {
            if (!val) return null;
            try {
              const url = new URL(val.startsWith('http') ? val : `https://${val}`);
              return (url.hostname.endsWith('linkedin.com') || url.hostname === 'lnkd.in')
                ? null
                : 'This does not look like a LinkedIn URL';
            } catch {
              return 'This does not look like a LinkedIn URL';
            }
          }}
        />
        <FormInput
          label="Portfolio / GitHub"
          type="url"
          value={data.portfolio || ''}
          onChange={handleChange('portfolio')}
          validate={(val) => {
            if (!val) return null;
            try {
              new URL(val.startsWith('http') ? val : `https://${val}`);
              return null;
            } catch {
              return 'Please enter a valid URL';
            }
          }}
        />
      </div>

      <FormInput
        label="Summary"
        type="textarea"
        value={data.summary || ''}
        onChange={handleChange('summary')}
        maxLength={780}
        showCounter
      />

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
