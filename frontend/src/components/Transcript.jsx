import React from 'react';
import { Button } from './ui/button';
import { FileText } from 'lucide-react';

const Transcript = ({ text, isGenerated }) => {
  return (
    <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm mt-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Transcript</h3>
        {isGenerated && (
          <div className="flex items-center">
            <FileText className="mr-2 h-4 w-4 text-blue-500" /> {/* Updated icon color */}
            <span className="text-sm text-blue-500">Generated</span> {/* Updated text color */}
          </div>
        )}
      </div>
      <div className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
        {text}
      </div>
    </div>
  );
};

export default Transcript;
