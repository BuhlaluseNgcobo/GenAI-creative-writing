import React from 'react';
import type { GeneratedContent } from '../types';
import { CopyIcon, TxtIcon, PdfIcon, EmptySavedIcon } from './icons/Icons';

interface SavedResultsProps {
  results: GeneratedContent[];
  onExport: (content: GeneratedContent, format: 'txt' | 'pdf' | 'clipboard') => void;
}

export const SavedResults: React.FC<SavedResultsProps> = ({ results, onExport }) => {
  return (
    <div className="bg-white/80 dark:bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Saved Creations</h2>
      {results.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-10 flex flex-col items-center justify-center space-y-4">
          <EmptySavedIcon className="w-16 h-16 text-gray-400 dark:text-gray-500" />
          <p className="font-semibold">Your saved creations will appear here.</p>
          <p className="text-sm">Generate some content and click "Save"!</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[calc(100vh-20rem)] overflow-y-auto pr-2">
          {results.map((result) => (
            <div key={result.id} className="bg-gray-100 dark:bg-white/5 p-3 rounded-lg flex items-center space-x-4">
              {result.imageUrl && (
                <img src={result.imageUrl} alt={`Thumbnail for ${result.theme}`} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
              )}
              <div className="flex-grow min-w-0">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 truncate pr-4">{result.theme}</h4>
                  <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>{result.type}</span>
                      <span className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></span>
                      <span>{result.tone}</span>
                  </div>
              </div>
              <div className="flex space-x-1 flex-shrink-0">
                  <button onClick={() => onExport(result, 'clipboard')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors" title="Copy to Clipboard">
                    <CopyIcon className="w-4 h-4"/>
                  </button>
                  <button onClick={() => onExport(result, 'txt')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors" title="Export as TXT">
                      <TxtIcon className="w-4 h-4"/>
                  </button>
                  <button onClick={() => onExport(result, 'pdf')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors" title="Export as PDF">
                      <PdfIcon className="w-4 h-4"/>
                  </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};