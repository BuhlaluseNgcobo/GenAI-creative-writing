import React from 'react';
import type { GeneratedContent } from '../types';
import { CopyIcon, TxtIcon, PdfIcon, SaveIcon, CheckIcon } from './icons/Icons';

interface ResultCardProps {
  result: GeneratedContent;
  onSave: () => void;
  onExport: (content: GeneratedContent, format: 'txt' | 'pdf' | 'clipboard') => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onSave, onExport }) => {
  return (
    <div className="bg-white/80 dark:bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-lg animate-fade-in">
      {result.imageUrl && (
        <img src={result.imageUrl} alt={`AI-generated image for ${result.theme}`} className="w-full h-64 object-cover rounded-lg mb-4 border border-gray-200 dark:border-white/10" />
      )}
      <div className="flex justify-between items-start mb-3">
        <div>
            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">Your Generated Content</h3>
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>{result.type}</span>
                <span className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></span>
                <span>{result.tone}</span>
                <span className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></span>
                <span>{`~${result.generationTime}s`}</span>
            </div>
        </div>
        <div className="flex items-center space-x-2">
           {result.isSaved ? (
             <button disabled className="flex items-center space-x-2 bg-green-100 text-green-600 dark:bg-green-500/30 dark:text-green-400 px-3 py-2 rounded-md text-sm cursor-default">
               <CheckIcon className="w-4 h-4"/>
               <span>Saved</span>
             </button>
           ) : (
             <button onClick={onSave} className="flex items-center space-x-2 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-500/20 dark:text-green-300 dark:hover:bg-green-500/40 transition-colors text-sm">
               <SaveIcon className="w-4 h-4"/>
               <span>Save</span>
             </button>
           )}
        </div>
      </div>
      
      <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-white/5 p-4 rounded-md my-4 max-h-96 overflow-y-auto">
        {result.text}
      </p>

      <div className="flex justify-end items-center space-x-2">
        <button onClick={() => onExport(result, 'clipboard')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors" title="Copy to Clipboard">
            <CopyIcon className="w-5 h-5"/>
        </button>
        <button onClick={() => onExport(result, 'txt')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors" title="Export as TXT">
            <TxtIcon className="w-5 h-5"/>
        </button>
        <button onClick={() => onExport(result, 'pdf')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors" title="Export as PDF">
            <PdfIcon className="w-5 h-5"/>
        </button>
      </div>
    </div>
  );
};