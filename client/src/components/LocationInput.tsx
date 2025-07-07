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
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a zip code or address..."
          disabled={isLoading}
          className="flex-grow w-full px-5 py-3 bg-card border border-gray-600 rounded-md focus:ring-2 focus:ring-accent focus:outline-none transition-all text-white placeholder-gray-400"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleGeoLocate}
            disabled={isLoading}
            className="p-3 bg-card border border-gray-600 rounded-md hover:bg-gray-700 disabled:opacity-50 transition-colors flex items-center justify-center"
            aria-label="Use my current location"
          >
            <CompassIcon className="w-6 h-6 text-accent" />
          </button>
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="w-full sm:w-auto px-6 py-3 bg-accent text-primary font-bold rounded-md hover:bg-cyan-300 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Wandering...' : 'Wander'}
          </button>
        </div>
      </form>
      {geoError && <p className="text-red-400 text-sm mt-2 text-center">{geoError}</p>}
    </div>
  );
};

export default LocationInput;
