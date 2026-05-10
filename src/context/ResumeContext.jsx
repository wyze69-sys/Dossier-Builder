import { createContext, useContext, useReducer, useState, useEffect } from 'react';

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

const initialData = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  linkedin: '',
  portfolio: '',
  profileImage: '',
  education: [],
  experience: [],
  skills: [],
  projects: [],
  expertise: [],
  keywords: [],
  languages: [],
};

const isQuotaExceededError = (error) => {
  if (!error) return false;
  return (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED' || error.code === 22 || error.code === 1014);
};

// The example data for fillExampleData action
const exampleData = {
  fullName: 'Wyze',
  jobTitle: 'Frontend Developer',
  email: 'hello@wyze.com',
  phone: '+855 987-6543',
  location: 'Cambodia, Phnom penh',
  summary: 'Motivated and detail-oriented Junior Frontend Developer with a strong foundation in React and modern JavaScript. Passionate about building accessible, responsive web interfaces and eager to contribute to a collaborative engineering team. Fast learner with a proven track record of delivering clean, maintainable code during internships and academic projects.',
  linkedin: 'linkedin.com/in/wyze',
  portfolio: 'wyze.dev',
  profileImage: '',
  education: [{ institution: 'Cambodia Academy of Digital Technology', degree: 'B.S. Computer Science', startYear: '2024', endYear: '2028' }],
  experience: [
    { company: 'Digital Solutions Inc.', role: 'Frontend Web Intern', description: 'Assisted in the development of responsive UI components using React and Tailwind CSS. Collaborated with senior developers to improve website accessibility scores to 100 on Lighthouse. Participated in daily stand-ups and agile sprint planning.', startYear: '2023', endYear: '', isCurrent: true },
    { company: 'University Tech Labs', role: 'Student Web Developer', description: 'Maintained the department website and updated content schemas using HTML, CSS, and vanilla JavaScript. Automated broken-link reporting using a custom Node.js script.', startYear: '2021', endYear: '2023', isCurrent: false }
  ],
  skills: ['HTML/CSS', 'JavaScript (ES6+)', 'React', 'Tailwind CSS', 'Git & GitHub', 'Figma', 'Responsive Design'],
  projects: [
    { title: 'Interactive Portfolio', role: 'Sole Developer', description: 'Designed and developed a personal portfolio website from scratch using React, Vite, and Tailwind CSS. Implemented smooth scrolling and dynamic routing.' },
    { title: 'Weather Application', role: 'Frontend Dev', description: 'Built a real-time weather dashboard utilizing the OpenWeather API. Features include geolocation tracking and dynamic background changes based on the forecast.' }
  ],
  expertise: [],
  keywords: [],
  languages: [
    { language: 'Khmer', proficiency: 'Native' },
    { language: 'English', proficiency: 'Intermediate' }
  ],
};

function resumeReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PERSONAL':
      return { ...state, [action.field]: action.value };
    case 'ADD_ENTRY': {
      const newEntry = { id: generateId() };
      if (action.entryType === 'education') Object.assign(newEntry, { institution: '', degree: '', startYear: '', endYear: '' });
      else if (action.entryType === 'experience') Object.assign(newEntry, { company: '', role: '', description: '', startYear: '', endYear: '', isCurrent: false });
      else if (action.entryType === 'projects') Object.assign(newEntry, { title: '', role: '', description: '' });
      else if (action.entryType === 'languages') Object.assign(newEntry, { language: '', proficiency: '' });
      return { ...state, [action.entryType]: [...state[action.entryType], newEntry] };
    }
    case 'REMOVE_ENTRY':
      return { ...state, [action.entryType]: state[action.entryType].filter(item => item.id !== action.id) };
    case 'UPDATE_ENTRY':
      return {
        ...state,
        [action.entryType]: state[action.entryType].map(item =>
          item.id === action.id ? { ...item, [action.field]: action.value } : item
        )
      };
    case 'ADD_SKILL': {
      const trimmed = action.skill.trim();
      if (!trimmed || state.skills.includes(trimmed)) return state;
      return { ...state, skills: [...state.skills, trimmed] };
    }
    case 'REMOVE_SKILL':
      return { ...state, skills: state.skills.filter((_, i) => i !== action.index) };
    case 'FILL_EXAMPLE':
      return {
        ...exampleData,
        education: exampleData.education.map(e => ({ ...e, id: generateId() })),
        experience: exampleData.experience.map(e => ({ ...e, id: generateId() })),
        projects: exampleData.projects.map(e => ({ ...e, id: generateId() })),
        languages: exampleData.languages.map(e => ({ ...e, id: generateId() })),
      };
    case 'CLEAR_DATA':
      return initialData;
    default:
      return state;
  }
}

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resumeData, dispatch] = useReducer(resumeReducer, initialData, () => {
    const saved = localStorage.getItem('dossier_data');
    if (saved) {
      try { return { ...initialData, ...JSON.parse(saved) }; } catch (e) { console.error('Failed to parse dossier_data', e); }
    }
    return initialData;
  });

  const [activeTab, setActiveTab] = useState('editor');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Debounced localStorage save
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem('dossier_data', JSON.stringify(resumeData));
      } catch (error) {
        if (isQuotaExceededError(error)) {
          alert('Storage limit reached! Remove your profile photo to save.');
        } else {
          console.error('Failed to save dossier_data', error);
        }
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [resumeData]);

  // Save before unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      try { localStorage.setItem('dossier_data', JSON.stringify(resumeData)); }
      catch (e) { console.error('Failed to save before unload', e); }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [resumeData]);

  const updatePersonalInfo = (field, value) => dispatch({ type: 'UPDATE_PERSONAL', field, value });
  const addEntry = (entryType) => dispatch({ type: 'ADD_ENTRY', entryType });
  const removeEntry = (entryType, id) => dispatch({ type: 'REMOVE_ENTRY', entryType, id });
  const updateEntry = (entryType, id, field, value) => dispatch({ type: 'UPDATE_ENTRY', entryType, id, field, value });
  const addSkill = (skill) => dispatch({ type: 'ADD_SKILL', skill });
  const removeSkill = (index) => dispatch({ type: 'REMOVE_SKILL', index });
  const fillExampleData = () => dispatch({ type: 'FILL_EXAMPLE' });
  const clearData = () => dispatch({ type: 'CLEAR_DATA' });

  const value = {
    resumeData,
    activeTab, setActiveTab,
    isPreviewMode, setIsPreviewMode,
    updatePersonalInfo,
    addEntry, removeEntry, updateEntry,
    addSkill, removeSkill,
    fillExampleData, clearData,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used inside ResumeProvider');
  return ctx;
}
