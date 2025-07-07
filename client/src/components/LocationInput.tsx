import { useState } from 'react';
import { CompassIcon } from './icons';

interface LocationInputProps {
  onSearch: (location: string) => void;
  isLoading: boolean;
}

const LocationInput = ({ onSearch, isLoading }: LocationInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [geoError, setGeoError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleGeoLocate = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }
    
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onSearch(`${latitude},${longitude}`);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setGeoError('Unable to retrieve your location. Please enter manually.');
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 p-6 glass-morphism rounded-2xl">
        <div className="relative flex-grow">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Try 'San Francisco' or 'New York City'..."
            disabled={isLoading}
            className="w-full px-6 py-4 bg-gradient-to-r from-card/50 to-card/30 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all text-white placeholder-gray-400 text-lg backdrop-blur-sm"
          />
          <div className="absolute right-4 top-4 text-xs text-gray-500 pointer-events-none bg-gray-800/80 px-2 py-1 rounded-md">
            🚀 Auto-complete coming soon
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleGeoLocate}
            disabled={isLoading}
            className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl hover:from-blue-500/30 hover:to-purple-500/30 disabled:opacity-50 transition-all duration-300 flex items-center justify-center group backdrop-blur-sm"
            aria-label="Use my current location"
          >
            <CompassIcon className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
          </button>
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-8 py-4 bg-gradient-to-r from-accent to-blue-400 text-primary font-bold rounded-xl hover:from-accent/90 hover:to-blue-400/90 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-accent/25 transform hover:scale-105"
          >
            {isLoading ? '✨ Wandering...' : '🗺️ Start Adventure'}
          </button>
        </div>
      </form>
      {geoError && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg text-red-300 text-sm text-center backdrop-blur-sm">
          {geoError}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
