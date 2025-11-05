
import React from 'react';
import type { GeneratedImage } from '../types';

interface GalleryProps {
  images: GeneratedImage[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="font-gta text-4xl text-cyan-400 mb-4 tracking-wide">Concept History</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {images.map((image) => (
          <div key={image.id} className="group relative overflow-hidden rounded-lg shadow-lg border-2 border-gray-800 hover:border-pink-500 transition-colors">
            <img src={image.url} alt={image.prompt} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 w-full h-full bg-black bg-opacity-70 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <p className="text-white text-xs line-clamp-3">{image.prompt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
