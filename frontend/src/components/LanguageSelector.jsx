import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const LanguageSelector = ({ onLanguageSelect }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'german', label: 'German' },
    { value: 'french', label: 'French' },
  ];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.label);
    onLanguageSelect(language.value);
    setIsOpen(false);

    toast({
      title: "Changes applied successfully!",
      variant: "default",
    });
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <span className="mr-1 text-lg font-medium dark:text-gray-200 dark:bg-gray-700 px-4 py-4 rounded h-[50px] w-[130px] flex items-center">
          Language :
        </span>
        <div className="relative">
          <button
            className="white-button min-w-[160px] flex items-center justify-between"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{selectedLanguage}</span>
            <svg
              className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {languages.map((language) => (
                <label
                  key={language.value}
                  className="flex items-center px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox mr-3 h-4 w-4 text-teal-500"
                    checked={selectedLanguage === language.label}
                    onChange={() => handleLanguageSelect(language)}
                  />
                  <span className="text-gray-800 dark:text-gray-200">{language.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
