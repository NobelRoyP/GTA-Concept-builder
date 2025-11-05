
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 md:px-8 text-center bg-black bg-opacity-30">
      <h1 className="font-gta text-5xl md:text-7xl font-bold tracking-wider">
        <span className="text-pink-500">VICE CITY</span> <span className="text-cyan-400">AI</span>
      </h1>
      <p className="mt-2 text-lg md:text-xl text-gray-300">Concept Art Director</p>
    </header>
  );
};
