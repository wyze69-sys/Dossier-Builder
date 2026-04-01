import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

const toText = (value) => (typeof value === 'string' ? value.trim() : '');

const normalizeArray = (value) => (Array.isArray(value) ? value : []);

const hasMeaningfulEntry = (item) => {
  if (!item || typeof item !== 'object') return false;
  return Object.entries(item).some(([key, value]) => {
    if (key === 'id') return false;
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return true;
    return toText(value).length > 0;
  });
};

const normalizeResumeData = (rawData = {}) => {
  const data = rawData && typeof rawData === 'object' ? rawData : {};

  return {
    fullName: toText(data.fullName),
    jobTitle: toText(data.jobTitle),
    email: toText(data.email),
    phone: toText(data.phone),
    location: toText(data.location),
    summary: toText(data.summary),
    linkedin: toText(data.linkedin),
    portfolio: toText(data.portfolio),
    profileImage: toText(data.profileImage),
    education: normalizeArray(data.education).filter(hasMeaningfulEntry),
    experience: normalizeArray(data.experience).filter(hasMeaningfulEntry),
    projects: normalizeArray(data.projects).filter(hasMeaningfulEntry),
    languages: normalizeArray(data.languages).filter(hasMeaningfulEntry),
    expertise: normalizeArray(data.expertise).filter(hasMeaningfulEntry),
    keywords: normalizeArray(data.keywords).filter(Boolean),
    skills: normalizeArray(data.skills).map(toText).filter(Boolean),
  };
};

const ResumeDocument = ({ data, template = 'modern' }) => {
  const normalizedData = normalizeResumeData(data);

  return (
    <div
      className="bg-white shadow-2xl mx-auto relative flex flex-col"
      style={{
        width: '794px',
        minHeight: '1123px',
        boxSizing: 'border-box',
        overflow: 'visible'
      }}
      data-resume-document="true"
    >
      {template === 'modern' && <ModernTemplate data={normalizedData} />}
      {template === 'professional' && <ProfessionalTemplate data={normalizedData} />}
      {template === 'creative' && <CreativeTemplate data={normalizedData} />}
    </div>
  );
};

export default ResumeDocument;
