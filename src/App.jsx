import { useState, useEffect } from 'react';
import TopNavigation from './components/TopNavigation';
import SideNavigation from './components/SideNavigation';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';

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
  return (
    error.name === 'QuotaExceededError' ||
    error.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
    error.code === 22 ||
    error.code === 1014
  );
};

function App() {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('dossier_data');
    if (saved) {
      try {
        return { ...initialData, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Failed to parse dossier_data', e);
      }
    }
    return initialData;
  });
  const [activeTab, setActiveTab] = useState('editor');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    // Debounce the localStorage save by 1 second to avoid UI lag/thrashing
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem('dossier_data', JSON.stringify(resumeData));
      } catch (error) {
        if (isQuotaExceededError(error)) {
          alert('Storage limit reached! Delete old resumes from the dashboard to save new ones or remove your profile photo.');
        } else {
          console.error('Failed to save dossier_data', error);
        }
      }
    }, 1000);
    
    // Clear timeout on every change to restart the debounce timer
    return () => clearTimeout(timeout);
  }, [resumeData]);

  useEffect(() => {
    const handleToggle = () => setIsPreviewMode(prev => !prev);
    window.addEventListener('toggle-preview', handleToggle);
    return () => window.removeEventListener('toggle-preview', handleToggle);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        localStorage.setItem('dossier_data', JSON.stringify(resumeData));
      } catch (error) {
        console.error('Failed to save dossier_data before unload', error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [resumeData]);

  // Update top-level personal info fields
  const updatePersonalInfo = (field, value) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  // Add a new empty entry to an array (education, experience, or projects) with a valid unique ID
  const addEntry = (type) => {
    setResumeData((prev) => {
      const newEntry = { id: generateId() };
      
      if (type === 'education') {
        Object.assign(newEntry, { institution: '', degree: '', startYear: '', endYear: '' });
      } else if (type === 'experience') {
        Object.assign(newEntry, { company: '', role: '', description: '', startYear: '', endYear: '', isCurrent: false });
      } else if (type === 'projects') {
        Object.assign(newEntry, { title: '', role: '', description: '' });
      } else if (type === 'languages') {
        Object.assign(newEntry, { language: '', proficiency: '' });
      }

      return {
        ...prev,
        [type]: [...prev[type], newEntry]
      };
    });
  };

  const fillExampleData = () => {
    setResumeData({
      fullName: 'Wyze',
      jobTitle: 'Frontend Developer',
      email: 'hello@wyze.com',
      phone: '+855 987-6543',
      location: 'Cambodia, Phnom penh',
      summary: 'Motivated and detail-oriented Junior Frontend Developer with a strong foundation in React and modern JavaScript. Passionate about building accessible, responsive web interfaces and eager to contribute to a collaborative engineering team. Fast learner with a proven track record of delivering clean, maintainable code during internships and academic projects.',
      linkedin: 'linkedin.com/in/wyze',
      portfolio: 'wyze.dev',
      profileImage: '',
      education: [
        { id: generateId(), institution: 'Cambodia Academy of Digital Technology', degree: 'B.S. Computer Science', startYear: '2024', endYear: '2028' }
      ],
      experience: [
        { id: generateId(), company: 'Digital Solutions Inc.', role: 'Frontend Web Intern', description: 'Assisted in the development of responsive UI components using React and Tailwind CSS. Collaborated with senior developers to improve website accessibility scores to 100 on Lighthouse. Participated in daily stand-ups and agile sprint planning.', startYear: '2023', endYear: '', isCurrent: true },
        { id: generateId(), company: 'University Tech Labs', role: 'Student Web Developer', description: 'Maintained the department website and updated content schemas using HTML, CSS, and vanilla JavaScript. Automated broken-link reporting using a custom Node.js script.', startYear: '2021', endYear: '2023', isCurrent: false }
      ],
      skills: ['HTML/CSS', 'JavaScript (ES6+)', 'React', 'Tailwind CSS', 'Git & GitHub', 'Figma', 'Responsive Design'],
      projects: [
        { id: generateId(), title: 'Interactive Portfolio', role: 'Sole Developer', description: 'Designed and developed a personal portfolio website from scratch using React, Vite, and Tailwind CSS. Implemented smooth scrolling and dynamic routing.' },
        { id: generateId(), title: 'Weather Application', role: 'Frontend Dev', description: 'Built a real-time weather dashboard utilizing the OpenWeather API. Features include geolocation tracking and dynamic background changes based on the forecast.' }
      ],
      expertise: [],
      keywords: [],
      languages: [
        { id: generateId(), language: 'Khmer', proficiency: 'Native' },
        { id: generateId(), language: 'English', proficiency: 'Intermediate' }
      ],
    });
  };

  const clearData = () => {
    setResumeData(initialData);
  };

  // Remove an entry strictly by its unique ID
  const removeEntry = (type, id) => {
    setResumeData((prev) => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
  };

  // Update a specific field for a specific entry identified by ID
  const updateEntry = (type, id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [type]: prev[type].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // Add a new skill
  const addSkill = (skillString) => {
    const trimmed = skillString.trim();
    if (trimmed) {
      setResumeData(prev => {
        if (prev.skills.includes(trimmed)) return prev;
        return { ...prev, skills: [...prev.skills, trimmed] };
      });
    }
  };

  // Remove a skill by index
  const removeSkill = (index) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Top Navigation */}
      <TopNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Conditional Side Navigation (only show in Editor) */}
      {activeTab === 'editor' && !isPreviewMode && <SideNavigation fullName={resumeData.fullName} />}

      {/* Main Content Canvas */}
      <main className={`${activeTab === 'editor' && !isPreviewMode ? 'lg:ml-64' : ''} pt-16 h-screen flex flex-col md:flex-row overflow-hidden bg-surface transition-all duration-300`}>
        {activeTab === 'editor' && (
          <>
            {/* Left Panel: Form Editor */}
            {!isPreviewMode && (
              <EditorPanel 
                resumeData={resumeData} 
                updatePersonalInfo={updatePersonalInfo}
                addEntry={addEntry}
                removeEntry={removeEntry}
                updateEntry={updateEntry}
                addSkill={addSkill}
                removeSkill={removeSkill}
                fillExampleData={fillExampleData}
                clearData={clearData}
              />
            )}
            {/* Right Panel: Resume Preview */}
            <PreviewPanel resumeData={resumeData} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
