import React, { useState, useMemo } from 'react';
import type { FormState } from '../types';
import { WritingType, Tone, Theme, PointOfView } from '../types';
import { WRITING_TYPES, TONES, THEMES, POINTS_OF_VIEW } from '../constants';

interface GeneratorFormProps {
  onGenerate: (formState: FormState) => void;
  isLoading: boolean;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate, isLoading }) => {
  const [writingType, setWritingType] = useState<WritingType>(WritingType.Story);
  const [useCustomPrompt, setUseCustomPrompt] = useState(false);
  const [theme, setTheme] = useState<string>(THEMES[0]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [tone, setTone] = useState<Tone>(TONES[0]);
  const [length, setLength] = useState('');
  const [characters, setCharacters] = useState('');
  const [writingStyle, setWritingStyle] = useState('');
  const [pointOfView, setPointOfView] = useState<PointOfView>(PointOfView.ThirdPersonLimited);
  const [setting, setSetting] = useState('');

  const isFormValid = useMemo(() => {
    if (useCustomPrompt) {
      return customPrompt.trim().length > 0;
    }
    return theme.length > 0;
  }, [useCustomPrompt, customPrompt, theme]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid && !isLoading) {
      onGenerate({ writingType, theme, tone, customPrompt, length, characters, writingStyle, pointOfView, setting });
    }
  };

  const commonInputClasses = "w-full bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400 dark:placeholder-gray-500";
  const commonLabelClasses = "block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300";

  return (
    <div className="bg-white/80 dark:bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Create Your Masterpiece</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={commonLabelClasses}>Writing Type</label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-200 dark:bg-white/5 rounded-md">
            {WRITING_TYPES.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setWritingType(type)}
                className={`px-4 py-2 text-sm font-semibold rounded transition-colors ${writingType === type ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 dark:hover:bg-white/10'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
           <label className={commonLabelClasses}>Prompt</label>
           <div className="flex items-center space-x-4 mb-2">
             <label className="flex items-center space-x-2 text-sm cursor-pointer">
               <input type="radio" name="promptType" checked={!useCustomPrompt} onChange={() => setUseCustomPrompt(false)} className="form-radio bg-gray-300 dark:bg-gray-700 text-blue-500 focus:ring-blue-500"/>
               <span>Theme</span>
             </label>
             <label className="flex items-center space-x-2 text-sm cursor-pointer">
               <input type="radio" name="promptType" checked={useCustomPrompt} onChange={() => setUseCustomPrompt(true)} className="form-radio bg-gray-300 dark:bg-gray-700 text-blue-500 focus:ring-blue-500"/>
               <span>Custom</span>
             </label>
           </div>
           {useCustomPrompt ? (
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g., A detective discovers a secret society of time travelers..."
                className={`${commonInputClasses} h-24`}
              />
            ) : (
              <select value={theme} onChange={(e) => setTheme(e.target.value)} className={commonInputClasses}>
                {THEMES.map(th => <option key={th} value={th} className="bg-white dark:bg-gray-800 text-black dark:text-white">{th}</option>)}
              </select>
            )}
        </div>
        
        <div>
          <label htmlFor="tone" className={commonLabelClasses}>Tone / Mood</label>
          <select id="tone" value={tone} onChange={(e) => setTone(e.target.value as Tone)} className={commonInputClasses}>
            {TONES.map(t => <option key={t} value={t} className="bg-white dark:bg-gray-800 text-black dark:text-white">{t}</option>)}
          </select>
        </div>
        
        <div className="border-t border-gray-200 dark:border-white/10 pt-4">
          <h3 className="text-md font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Fine-Tune Your Creation (Optional)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {writingType === WritingType.Story && (
                <div>
                    <label htmlFor="pov" className={commonLabelClasses}>Point of View</label>
                    <select id="pov" value={pointOfView} onChange={(e) => setPointOfView(e.target.value as PointOfView)} className={commonInputClasses}>
                        {POINTS_OF_VIEW.map(pov => <option key={pov} value={pov} className="bg-white dark:bg-gray-800 text-black dark:text-white">{pov}</option>)}
                    </select>
                </div>
            )}
            <div>
                <label htmlFor="style" className={commonLabelClasses}>Writing Style</label>
                <input id="style" type="text" value={writingStyle} onChange={(e) => setWritingStyle(e.target.value)} placeholder="e.g., Poetic, Shakespearean" className={commonInputClasses} />
            </div>
            {writingType === WritingType.Story && (
                <div>
                    <label htmlFor="setting" className={commonLabelClasses}>Setting</label>
                    <input id="setting" type="text" value={setting} onChange={(e) => setSetting(e.target.value)} placeholder="e.g., A city on Mars" className={commonInputClasses} />
                </div>
            )}
            <div>
                <label htmlFor="length" className={commonLabelClasses}>Length (words)</label>
                <input id="length" type="text" value={length} onChange={(e) => setLength(e.target.value)} placeholder="e.g., 200" className={commonInputClasses} />
            </div>
            {writingType === WritingType.Story && (
                <div>
                    <label htmlFor="characters" className={commonLabelClasses}>Characters</label>
                    <input id="characters" type="text" value={characters} onChange={(e) => setCharacters(e.target.value)} placeholder="e.g., Alex and Luna" className={commonInputClasses} />
                </div>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={!isFormValid || isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 px-4 rounded-md hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate'
          )}
        </button>
      </form>
    </div>
  );
};