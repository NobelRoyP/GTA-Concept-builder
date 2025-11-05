
import React from 'react';
import type { GeneratedImage } from '../types';

interface ImageViewerProps {
  isLoading: boolean;
  latestImage: GeneratedImage | null;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <div className="relative">
      <div className="w-24 h-24 border-4 border-dashed rounded-full animate-spin border-pink-500"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-gta text-cyan-400 text-lg">
        AI
      </div>
    </div>
    <p className="mt-4 text-gray-300 text-xl font-gta tracking-wider">Rendering Scene...</p>
  </div>
);

export const ImageViewer: React.FC<ImageViewerProps> = ({ isLoading, latestImage, error }) => {
  return (
    <div className="w-full aspect-video bg-gray-900 bg-opacity-70 backdrop-blur-md rounded-lg shadow-lg flex items-center justify-center p-2 border-2 border-gray-700">
      <div className="w-full h-full flex items-center justify-center">
        {isLoading && <LoadingSpinner />}
        {!isLoading && error && (
          <div className="text-center p-4">
            <h3 className="text-red-500 font-gta text-2xl mb-2">Generation Failed</h3>
            <p className="text-red-300">{error}</p>
          </div>
        )}
        {!isLoading && !error && latestImage && (
          <img
            src={latestImage.url}
            alt={latestImage.prompt}
            className="max-w-full max-h-full object-contain rounded-md"
          />
        )}
        {!isLoading && !error && !latestImage && (
          <div className="text-center p-4">
            <h2 className="font-gta text-4xl text-cyan-400 mb-2">Welcome Director</h2>
            <p className="text-gray-400">Use the panel on the left to generate your first concept art.</p>
          </div>
        )}
      </div>
    </div>
  );
};
