import React from 'react';
import './index.scss';

interface LanguageNavProps {
  languages: string[];
  currentLanguage: string;
  onSelectLanguage: (language: string) => void;
}

const LanguageNav: React.FC<LanguageNavProps> = ({ 
  languages, 
  currentLanguage, 
  onSelectLanguage 
}) => {
  
  
  return (
    <div className='language-nav'>
      {
        languages.map((language, index) => (
          <span
            key={index}
            onClick={() => onSelectLanguage(language)}
            className={currentLanguage === language ? 'active-filter' : 'inactive-filter'}
          >
            {language}
          </span>
        ))
      }
    </div>
  );
};

export default LanguageNav;