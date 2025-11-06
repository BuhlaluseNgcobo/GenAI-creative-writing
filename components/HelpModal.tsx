import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-gray-900/60 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-500/50 rounded-xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 text-gray-700 dark:text-gray-300 space-y-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Help & Information</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">&times;</button>
        </div>

        <div>
            <h3 className="font-semibold text-lg text-blue-500 dark:text-blue-400 mb-2">About This Tool</h3>
            <p>PentaCore is a creative tool that uses Google's Gemini model to generate stories and poems based on your inputs. Feel free to experiment with different themes, tones, and prompts to spark your creativity!</p>
        </div>

        <div>
            <h3 className="font-semibold text-lg text-blue-500 dark:text-blue-400 mb-2">Key Features</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li><strong>Story & Poem Generation:</strong> Choose between creating a narrative story or a lyrical poem.</li>
                <li><strong>Customizable Parameters:</strong> Fine-tune your creation with options for theme, custom prompts, tone, length, writing style, and more.</li>
                <li><strong>AI-Generated Artwork:</strong> Each piece of content is accompanied by a unique, AI-generated image that visually represents the theme.</li>
                <li><strong>Save Creations:</strong> Keep your favorite generated pieces in the "Saved Creations" panel for easy access.</li>
                <li><strong>Export Options:</strong> Export your work as a PDF, a plain text (.txt) file, or copy it directly to your clipboard.</li>
                <li><strong>Light & Dark Mode:</strong> Switch between themes for your preferred viewing comfort.</li>
            </ul>
        </div>

        <div>
            <h3 className="font-semibold text-lg text-blue-500 dark:text-blue-400 mb-2">Performance & Token Usage</h3>
            <p>Each generation's processing time is displayed on the result card. While this tool doesn't display exact token counts, you can think of tokens as pieces of words. Longer and more complex requests and responses use more tokens.</p>
        </div>

        <div>
            <h3 className="font-semibold text-lg text-blue-500 dark:text-blue-400 mb-2">API Usage Limits & Costs</h3>
            <p>This application uses the Gemini API, which has usage limits and potential costs associated with it, especially for high-volume use.</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li><strong>Free Tier:</strong> Google typically offers a generous free tier for the Gemini API, which is often sufficient for personal projects and experimentation.</li>
                <li><strong>Rate Limits:</strong> The API has rate limits, such as a certain number of requests per minute. If you make requests too quickly, you may receive an error.</li>
                <li><strong>Costs:</strong> Beyond the free tier, usage is billed based on the number of input and output characters or tokens. For detailed and up-to-date pricing information, please refer to the official Google AI Platform pricing page.</li>
            </ul>
             <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Note: This is a general guide. For specific details, always check the official Google Cloud documentation.</p>
        </div>
        
        <div className="text-right">
            <button 
                onClick={onClose}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-2 px-6 rounded-md hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};