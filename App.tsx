import React, { useState, useCallback, useEffect } from 'react';
import { GeneratorForm } from './components/GeneratorForm';
import { ResultCard } from './components/ResultCard';
import { SavedResults } from './components/SavedResults';
import { HelpModal } from './components/HelpModal';
import { Loader } from './components/Loader';
import { ThemeToggle } from './components/ThemeToggle';
import { generateCreativeContent } from './services/geminiService';
import type { FormState, GeneratedContent } from './types';
import { InfoIcon, PaintBrushIcon } from './components/icons/Icons';

declare global {
  interface Window {
    jspdf: any;
  }
}

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<GeneratedContent | null>(null);
  const [savedResults, setSavedResults] = useState<GeneratedContent[]>([]);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleGenerate = async (formState: FormState) => {
    setIsLoading(true);
    setError(null);
    setCurrentResult(null);
    try {
      const result = await generateCreativeContent(formState);
      setCurrentResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveResult = useCallback(() => {
    if (currentResult && !currentResult.isSaved) {
      const savedVersion = { ...currentResult, isSaved: true };
      setCurrentResult(savedVersion);
      setSavedResults(prev => [savedVersion, ...prev]);
    }
  }, [currentResult]);

  const handleExport = useCallback((content: GeneratedContent, format: 'txt' | 'pdf' | 'clipboard') => {
    const textContent = `Type: ${content.type}\nTheme: ${content.theme}\nTone: ${content.tone}\n\n${content.text}`;
    
    switch (format) {
      case 'clipboard':
        navigator.clipboard.writeText(textContent);
        alert('Copied to clipboard!');
        break;
      case 'txt':
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `creative-writing-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        break;
      case 'pdf':
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const leftMargin = 15;
        const topMargin = 20;
        const contentWidth = doc.internal.pageSize.getWidth() - (leftMargin * 2);
        let yOffset = topMargin;

        if (content.imageUrl) {
          try {
            // A fixed height for the image.
            const imgHeight = 80;
            doc.addImage(content.imageUrl, 'PNG', leftMargin, yOffset, contentWidth, imgHeight, undefined, 'FAST');
            yOffset += imgHeight + 12;
          } catch (e) {
            console.error("Error adding image to PDF:", e);
            // If image fails, just leave a bit of space and continue.
            yOffset += 10;
          }
        }
        
        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(`A ${content.tone} ${content.type}`, leftMargin, yOffset);
        yOffset += 8;

        doc.setFontSize(22);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0);
        // The theme/prompt is the title
        const titleLines = doc.splitTextToSize(content.theme, contentWidth);
        doc.text(titleLines, leftMargin, yOffset);
        yOffset += (titleLines.length * 10) + 10; // Adjust spacing based on title lines

        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(40);
        const splitText = doc.splitTextToSize(content.text, contentWidth);
        doc.text(splitText, leftMargin, yOffset);

        doc.save(`creative-writing-${Date.now()}.pdf`);
        break;
    }
  }, []);

  const lightBgStyle = {
    backgroundImage: `
        radial-gradient(at 20% 20%, hsla(210, 90%, 80%, 0.2) 0px, transparent 50%),
        radial-gradient(at 80% 0%, hsla(190, 96%, 80%, 0.2) 0px, transparent 50%),
        radial-gradient(at 80% 80%, hsla(220, 94%, 80%, 0.2) 0px, transparent 50%)
    `,
    backgroundColor: '#f0f9ff' // light sky blue
  };

  const darkBgStyle = {
    backgroundImage: `
        radial-gradient(at 20% 20%, hsla(220, 80%, 25%, 0.3) 0px, transparent 50%),
        radial-gradient(at 80% 0%, hsla(200, 70%, 30%, 0.3) 0px, transparent 50%),
        radial-gradient(at 80% 80%, hsla(240, 60%, 20%, 0.3) 0px, transparent 50%)
    `,
    backgroundColor: '#08102a' // navy blue
  };

  return (
    <div className="min-h-screen text-slate-800 dark:text-white font-sans p-4 sm:p-8 transition-colors duration-300" 
         style={theme === 'light' ? lightBgStyle : darkBgStyle}>
      <div className="max-w-6xl mx-auto">
        
        <header className="flex justify-between items-center mb-8 p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/10 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <PaintBrushIcon className="w-10 h-10 text-blue-500 dark:text-blue-400" />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
              PentaCore
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button 
              onClick={() => setIsHelpModalOpen(true)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Help and Info"
            >
              <InfoIcon className="w-6 h-6" />
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
            {isLoading && <Loader />}
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 dark:bg-red-500/20 dark:border-red-500 dark:text-red-300 px-4 py-3 rounded-lg" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {currentResult && !isLoading && (
              <ResultCard 
                result={currentResult} 
                onSave={handleSaveResult}
                onExport={handleExport}
              />
            )}
          </div>

          <SavedResults results={savedResults} onExport={handleExport} />
        </main>
        
        <footer className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm">
          <p>Powered by Google's Gemini API. Content is AI-generated.</p>
        </footer>
      </div>

      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
    </div>
  );
};

export default App;