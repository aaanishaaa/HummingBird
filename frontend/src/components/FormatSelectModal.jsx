import React from 'react';
import { Folder } from 'lucide-react';

const FormatSelectModal = ({ onFormatSelect, onClose }) => {
  const formats = [
    { id: 'pdf', label: '.pdf' },
    { id: 'word', label: '.word' },
    { id: 'txt', label: '.txt' },
  ];

  return (
    <div className="modal" onClick={onClose}>
      <div 
        className="modal-content flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={onClose}
        >
          ✕
        </button>
        
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
          <Folder className="w-8 h-8 text-amber-400" />
        </div>
        
        <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Choose the format!</h3>
        
        <div className="w-full space-y-3">
          {formats.map((format) => (
            <button
              key={format.id}
              className="w-full bg-black hover:bg-gray-800 dark:bg-black dark:hover:bg-gray-900 text-white dark:text-gray-200 py-3 rounded-lg font-medium transition-colors"
              onClick={() => onFormatSelect(format.id)}
            >
              {format.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormatSelectModal;
