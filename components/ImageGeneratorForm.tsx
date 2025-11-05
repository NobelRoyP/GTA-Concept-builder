
import React, { useState } from 'react';
import type { AspectRatio } from '../types';

interface ImageGeneratorFormProps {
  onGenerate: (prompt: string, aspectRatio: AspectRatio) => void;
  isLoading: boolean;
}

const aspectRatios: AspectRatio[] = ["1:1", "16:9", "9:16", "4:3", "3:4"];

export const ImageGeneratorForm: React.FC<ImageGeneratorFormProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState<string>('A high-speed police chase on a neon-lit bridge at sunset, with sports cars and helicopters.');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt, aspectRatio);
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-md p-6 rounded-lg shadow-lg border border-gray-700">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="prompt" className="block text-cyan-400 font-gta text-2xl mb-2 tracking-wide">
            Art Direction
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A stylish character leaning against a classic convertible"
            className="w-full h-40 p-3 bg-gray-900 text-gray-200 border-2 border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-6">
          <label className="block text-cyan-400 font-gta text-2xl mb-2 tracking-wide">
            Aspect Ratio
          </label>
          <div className="grid grid-cols-3 gap-2">
            {aspectRatios.map((ratio) => (
              <button
                key={ratio}
                type="button"
                onClick={() => setAspectRatio(ratio)}
                disabled={isLoading}
                className={`py-2 px-1 text-center rounded-md transition-all text-sm md:text-base ${
                  aspectRatio === ratio
                    ? 'bg-pink-600 text-white font-bold ring-2 ring-pink-400'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full font-gta text-3xl py-3 px-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-md hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-60 disabled:cursor-wait"
        >
          {isLoading ? 'Generating...' : 'Generate Art'}
        </button>
      </form>
    </div>
  );
};
