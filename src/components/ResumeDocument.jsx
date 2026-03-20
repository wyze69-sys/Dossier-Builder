import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ElegantTemplate from './templates/ElegantTemplate';

const ResumeDocument = ({ data, template = 'modern' }) => {
  return (
    <div
      className="w-[210mm] min-h-[297mm] bg-white shadow-2xl mx-auto overflow-hidden relative"
      id="resume-document"
    >
      {template === 'modern' && <ModernTemplate data={data} />}
      {template === 'classic' && <ClassicTemplate data={data} />}
      {template === 'minimal' && <MinimalTemplate data={data} />}
      {template === 'professional' && <ProfessionalTemplate data={data} />}
      {template === 'creative' && <CreativeTemplate data={data} />}
      {template === 'elegant' && <ElegantTemplate data={data} />}
    </div>
  );
};

export default ResumeDocument;
