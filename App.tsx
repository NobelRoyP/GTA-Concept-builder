
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageGeneratorForm } from './components/ImageGeneratorForm';
import { ImageViewer } from './components/ImageViewer';
import { Gallery } from './components/Gallery';
import { generateImage } from './services/geminiService';
import type { GeneratedImage, AspectRatio } from './types';

const App: React.FC = () => {
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = useCallback(async (prompt: string, aspectRatio: AspectRatio) => {
    setIsLoading(true);
    setError(null);
    try {
      const imageData = await generateImage(prompt, aspectRatio);
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: `data:image/jpeg;base64,${imageData}`,
        prompt,
      };
      setGeneratedImages(prevImages => [newImage, ...prevImages]);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to generate image: ${err.message}. Please try again.`);
      } else {
        setError('An unknown error occurred.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://picsum.photos/seed/miami-vice/1920/1080')"}}>
      <div className="min-h-screen bg-black bg-opacity-70 backdrop-blur-sm">
        <Header />
        <main className="container mx-auto p-4 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ImageGeneratorForm onGenerate={handleGenerateImage} isLoading={isLoading} />
            </div>
            <div className="lg:col-span-2">
              <ImageViewer
                isLoading={isLoading}
                latestImage={generatedImages[0] || null}
                error={error}
              />
            </div>
          </div>
          <Gallery images={generatedImages} />
        </main>
      </div>
    </div>
  );
};

export default App;
